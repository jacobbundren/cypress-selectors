import fs from 'fs';

export default class Writer {

    constructor(parsedComponents) {
        this.components = parsedComponents;
    }

    iterateFiles() {
        this.makeDir("./selectors/");
        this.getOrCreateFile(this.components[0]);
        // this.components.forEach((component) => {
        //     this.writeFile(component);
        // })
    }

    makeDir(filepath) {
        try {
            fs.statSync(filepath);
        }
        catch(err) {
            if (err.code === "ENOENT") {
                fs.mkdirSync(filepath);
            }
        }
    }

    getOrCreateFile(component) {
        let filename = `${component.componentName}Selectors.js`
        let filepath = `./selectors/${filename}`;
        try {
            fs.statSync(filepath)
        } catch (err) {
            if (err.code === "ENOENT") {
                this.writeNewFile(component, filepath);
            }
        }
    }

    writeNewFile(component, filepath) {
        let utilityImport = `import { dataCy } from "../support/utilities"\n\n`;
        let classDeclaration = `export default class ${component.componentName}Selectors {\n\n`;
        let closingBrackets = `};`;

        fs.writeFileSync(filepath, utilityImport + classDeclaration + closingBrackets);
    }

    createClassProperties(component) {
        let classProperties = ``;
        component.selectors.forEach((selector) => {
            classProperties += `const ${selector}`
        })
    }

    transformSelector(selector) {
        
    }
}