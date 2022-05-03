import fs from 'fs';

export default class Reader {

    constructor() {
        this.files = [];
        this.vueFileData = [];
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
        let regex = /(<template>(.|\n)*?<\/template>)/;
        let componentTemplate = contents.match(regex)[0] ? contents.match(regex)[0] : null;
        if (componentTemplate) {
            return componentTemplate;
        } else {
            throw new Error(`Error parsing template from ${filePath}`);
        }
    }

    // isVueFile(filePath)

    readFiles(dir) {
        let dirContents = fs.readdirSync(dir);
        dirContents.forEach((dirItem) => {
            // console.log(dirItem)
            if (fs.statSync(`${dir}/${dirItem}`).isDirectory()) {
                this.readFiles(`${dir}/${dirItem}`)
            } else {
                this.files.push(`${dir}/${dirItem}`)
            }
        });

        console.log(this.files.length);


        // const componentName = this.getFileName(filePath);
        // const data = fs.readFileSync(filePath).toString();
        // const templateString = this.getTemplateFromFileContents(data, filePath);
        // this.files.push({
        //     componentName: componentName,
        //     templateString: templateString
        // });
        // return this.files;
    }


}