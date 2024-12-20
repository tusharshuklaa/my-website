const fs = require('fs')

const foldersToDelete = ['node_modules', '.turbo', 'dist', '.next']

const dirStartPath = ['apps', 'packages']
process.stdout.write(`Folder cleanup started...\n`)

const findFoldersByName = (startPath, folders) => {
  fs.readdir(startPath, { withFileTypes: true }, (_, files) => {
    try {
      files.forEach((file) => {
        const filePath = `${startPath}/${file.name}`
        if (file.isDirectory()) {
          if (folders.includes(file.name)) {
            process.stdout.write(`${file.name} folder deletion...\n`)
            try {
              fs.rmSync(filePath, { recursive: true, force: true })
            } catch (error) {
              process.stdout.write(`${error} catch fs.rmSync\n`)
            }
          } else {
            findFoldersByName(filePath, folders)
          }
        }
      })
    } catch (error) {
      process.stdout.write(`${error} catch files.forEach\n`)
    }
  })
}

dirStartPath.forEach((dir) => {
  findFoldersByName(dir, foldersToDelete)
})
