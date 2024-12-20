const fs = require("fs");
const templateString = require("es6-template-strings");

const clearAndUpper = text => text.replace(/-/, "").toUpperCase();

const toPascalCase = input => input.replace(/(^\w|-\w)/g, clearAndUpper);

const toCamelCase = text => {
  const a = text.toLowerCase().replace(/[-_\s.]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""));
  return a.substring(0, 1).toLowerCase() + a.substring(1);
};

const readTextFile = (file, pascalName, camelName, name) => {
  const data = fs.readFileSync(`scripts/${file}.txt`, "utf8");
  return templateString(data, { camelName, pascalName, name });
};

const writeComponent = (isClient, needType, componentDir, name, pascalName, camelName) => {
  let componentSrcFile = isClient ? "write-client-component" : "write-component";

  componentSrcFile = needType ? `${componentSrcFile}-with-type` : componentSrcFile;

  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }

  // Write component files
  fs.writeFileSync(`${componentDir}/${name}.tsx`, readTextFile(componentSrcFile, pascalName, camelName, name));
};

import("@inquirer/input")
  .then(async inputModule => {
    const input = inputModule.default;

    const componentName = await input({
      name: "name",
      message: "What is the name of the component (kebab-case)",
      validate: name => {
        if (!name) return "Please provide a name";
        if (!/^[a-z-]+$/.test(name)) return 'Please provide a name using kebab-case (i.e. : "text-area")';
        else return true;
      },
    });

    import("@inquirer/confirm")
      .then(async confirmModule => {
        const confirm = confirmModule.default;

        const isClient = await confirm({
          message: "Is it a client component?",
          name: "isClient",
        });

        const needType = await confirm({
          message: "Does this component need defined type?",
          name: "needType",
        });

        const pascalName = toPascalCase(componentName);
        const camelName = toCamelCase(componentName);
        const componentDir = `./components`;
        // File name is in kebab case always
        const componentFileName = `${componentDir}/${componentName}.tsx`;

        if (fs.existsSync(componentFileName)) throw new Error("A component with that name already exists.");

        writeComponent(isClient, needType, componentDir, componentName, pascalName, camelName);

        console.log(`
          |---------------------------------------------------|\n
          | Component '${pascalName}' generated successfully! |\n
          |___________________________________________________|\n
        `);

        import("@inquirer/confirm")
          .then(async confirmModule => {
            const confirm = confirmModule.default;

            const isUpdateIndexNeeded = await confirm({
              message: "Do you want to update all index files too?",
              name: "isUpdateIndexNeeded",
              default: false,
            });

            if (isUpdateIndexNeeded) {
              try {
                const { writeIndexInFolder } = await import("./update-index.js");
                writeIndexInFolder("./components");
              } catch (error) {
                console.error("Failed to import ./update-index.js", error);
              }
            }
          })
          .catch(error => {
            console.error("Failed to import @inquirer/confirm:", error);
          });
      })
      .catch(error => {
        console.error("Failed to import @inquirer/confirm:", error);
      });
  })
  .catch(error => {
    console.error("Failed to import @inquirer/input:", error);
  });
