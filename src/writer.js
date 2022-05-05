import fs from 'fs';

export default class Writer {

    constructor(parsedComponents) {
        this.components = parsedComponents;
    }

    iterateFiles() {
        this.makeDir("./selectors/");
        this.components.forEach((component) => {
            this.getOrCreateFile(component);
        })
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
        let declaration = `export const ${component.componentName}Selectors = {\n`;
        let closingBrackets = `};`;
        let properties = this.createClassProperties(component);
        fs.writeFileSync(filepath, utilityImport + declaration + properties + closingBrackets);
    }

    createClassProperties(component) {
        let classProperties = ``;
        component.selectors.forEach((selector) => {
            let propertyName = this.transformSelector(selector);
            classProperties += `\t${propertyName}: dataCy("${selector}"),\n`;
        })
        return classProperties;
    }

    transformSelector(selector) {
        let property = selector.split("-");
        for (let i = 1; i < property.length; i++) {
            property[i] = property[i].charAt(0).toUpperCase() + property[i].slice(1);
        }
        return property.join("");
    }
}