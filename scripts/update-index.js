const fs = require("fs").promises;
const path = require("path");
const parser = require("@babel/parser");

/**
 * Parses a TypeScript/JavaScript file and extracts all export declarations
 * @param {string} filePath - Path to the file to parse
 * @returns {Map} Map of export names to their metadata
 */
const parseFileExports = async (filePath) => {
  // Initialize a Map to store exports. Key is the export name, value is an object with source and type information
  const exportsMap = new Map();

  try {
    // Read the file content
    const fileContent = await fs.readFile(filePath, "utf-8");

    // Parse the file content into an AST (Abstract Syntax Tree)
    // Enable TypeScript and JSX plugins for comprehensive parsing
    const ast = parser.parse(fileContent, {
      sourceType: "module",
      plugins: ["typescript", "jsx"],
    });

    // Iterate through each node in the AST
    for (const node of ast.program.body) {
      // Check if the node is any type of export declaration
      if (node.type === "ExportNamedDeclaration" || node.type === "ExportDefaultDeclaration" || node.type === "ExportAllDeclaration") {
        
        // Handle 'export * from' statements
        if (node.type === "ExportAllDeclaration") {
          exportsMap.set(`* from '${node.source.value}'`, { source: null, isType: false });
        } 
        // Handle default exports (export default ...)
        else if (node.type === "ExportDefaultDeclaration") {
          if (node.declaration) {
            let exportName = 'default';
            // If the export is an identifier (e.g., export default existingFunction)
            if (node.declaration.type === 'Identifier') {
              exportName = node.declaration.name;
            } 
            // If the export is a named function/class declaration (e.g., export default function foo(){})
            else if (node.declaration.id) {
              exportName = node.declaration.id.name;
            }
            exportsMap.set(exportName, { 
              source: path.parse(filePath).name, 
              isType: false 
            });
          }
        } 
        // Handle named exports (export const x = ..., export function y(){}, export type Z = ...)
        else if (node.type === "ExportNamedDeclaration") {
          let isTypeExport = false;
          
          // Check if this is a type export (interface, type alias, or enum)
          if (node.declaration && (
              node.declaration.type === "TSInterfaceDeclaration" || 
              node.declaration.type === "TSTypeAliasDeclaration" || 
              node.declaration.type === "TSEnumDeclaration"
          )) {
            isTypeExport = true;
          }

          // Handle direct exports (export const x = ..., export function y(){}, etc.)
          if (node.declaration) {
            // Handle variable declarations (export const x = ...)
            if (node.declaration.declarations) {
              node.declaration.declarations.forEach(declaration => {
                if (declaration.id && declaration.id.type === 'Identifier') {
                  exportsMap.set(declaration.id.name, { 
                    source: path.parse(filePath).name, 
                    isType: isTypeExport 
                  });
                }
              });
            } 
            // Handle function/class/interface declarations (export function x(){}, export class Y, etc.)
            else if (node.declaration.id) {
              exportsMap.set(node.declaration.id.name, { 
                source: path.parse(filePath).name, 
                isType: isTypeExport 
              });
            }
          }
          
          // Handle export specifiers (export { x }, export { x as y }, etc.)
          if (node.specifiers) {
            node.specifiers.forEach((specifier) => {
              if (specifier.exported) {
                exportsMap.set(specifier.exported.name, { 
                  source: path.parse(filePath).name, 
                  isType: isTypeExport 
                });
              }
            });
          }
        }
      }
    }
  } catch (parseError) {
    console.error(`Error parsing ${filePath}:`, parseError);
  }
  return exportsMap;
};

/**
 * Process a single directory to create/update its index.ts file
 * @param {string} dirPath - Path to the directory to process
 */
const processDirectory = async (dirPath) => {
  const indexFilePath = path.join(dirPath, "index.ts");
  // Map to store all exports from all files in the directory
  const allExports = new Map();

  try {
    // Get all .ts and .tsx files in the directory, excluding index.ts
    const componentFiles = (await fs.readdir(dirPath)).filter(
      (filename) => (filename.endsWith(".tsx") || filename.endsWith(".ts")) && filename !== "index.ts"
    );

    // Process each file in the directory
    for (const componentFile of componentFiles) {
      const componentPath = path.join(dirPath, componentFile);
      
      // Parse the file and get its exports
      const fileExports = await parseFileExports(componentPath);
      
      // Add this file's exports to the directory's total exports
      fileExports.forEach((value, key) => allExports.set(key, value));
    }

    // Check if index.ts already exists
    const indexFileExists = await fs.access(indexFilePath).then(() => true).catch(() => false);

    // If we found exports, create/update index.ts
    if (allExports.size > 0) {
      // Generate export statements for each export
      const exportStrings = Array.from(allExports.entries()).map(([exportedName, { source, isType }]) => {
        if (source === null) {
          // Handle 'export * from' statements
          return `export ${exportedName};`;
        } else {
          // Handle normal exports, adding 'type' keyword if it's a type export
          return `export ${isType ? "type " : ""}{ ${exportedName} } from "./${source}";`;
        }
      }).join('\n');

      // Write the index.ts file
      await fs.writeFile(indexFilePath, exportStrings + '\n');
      console.log(`Created index.ts in ${dirPath} with ${allExports.size} exports`);
    } 
    // If no exports were found but index.ts exists, remove it
    else if (indexFileExists) {
      await fs.unlink(indexFilePath);
      console.log(`Removed empty index.ts in ${dirPath} (no exports found)`);
    }
  } catch (error) {
    console.error(`Error processing directory ${dirPath}:`, error);
  }
};

/**
 * Main function to process all subdirectories in the components directory
 * @param {string} componentsDir - Path to the components directory
 */
const writeIndexInFolder = async (componentsDir) => {
  // Get all items in the components directory
  const items = await fs.readdir(componentsDir);

  // Process all directories in parallel
  await Promise.all(
    items.map(async (itemName) => {
      const itemPath = path.join(componentsDir, itemName);
      const itemStat = await fs.stat(itemPath);

      // Only process directories, skip files
      if (itemStat.isDirectory()) {
        await processDirectory(itemPath);
      }
    })
  );

  console.log(`
    |---------------------------------------------------|\n
    |              All index files updated              |\n
    |___________________________________________________|\n
  `);
};

// Start the process
module.exports = {
  parseFileExports,
  processDirectory,
  writeIndexInFolder,
};

// Start the process if this script is run directly
if (require.main === module) {
  writeIndexInFolder("./components");
}