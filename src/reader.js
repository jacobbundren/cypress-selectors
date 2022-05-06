import fs from 'fs';

export default class Reader {

    constructor() {
        this.vueComponents = [];
    }

    getComponentName(file) {
        const regex = /(\w+)(.vue|.Vue)/;
        let componentName = file.match(regex)[1] ? file.match(regex)[1] : null;
        if (componentName) {
            return componentName;
        } else {
            throw new Error(`Error parsing filename from ${file}`);
        }
    }

    getTemplateFromFileContents(contents, filePath) {
        let regex = /(<template>(.|\n)*?<script>)/;
        let componentTemplate = contents.match(regex)[0] ? contents.match(regex)[0] : null;
        if (componentTemplate) {
            return componentTemplate;
        } else {
            throw new Error(`Error parsing template from ${filePath}`);
        }
    }

    isVueFile(filepath) {
        const regex = /(\w+)(.vue|.Vue)/;
        if (filepath.match(regex)) {
        }
        return filepath.match(regex);
    }

    buildFileList(dir) {
        let dirContents = fs.readdirSync(dir);
        dirContents.forEach((dirItem) => {
            if (fs.statSync(`${dir}/${dirItem}`).isDirectory()) {
                this.buildFileList(`${dir}/${dirItem}`)
            } else {
                if (this.isVueFile(`${dir}/${dirItem}`)) {
                    const data = fs.readFileSync(`${dir}/${dirItem}`).toString();
                    const componentName = this.getComponentName(`${dir}/${dirItem}`);
                    const componentTemplate = this.getTemplateFromFileContents(data, `${dir}/${dirItem}`);
                    this.vueComponents.push({
                        componentName: componentName,
                        componentTemplate: componentTemplate
                    });
                }
            }
        });
    }
}