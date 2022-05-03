import fs from 'fs';
import path from 'path';

export default class Reader {

    constructor() {
        this.files = [];
    }

    getFileName(file) {
        // regex to get filename without extension here
        const regex = new RegExp('(^.*\\w+).(vue|Vue)');
        let filename = file.match(regex)
        console.log(filename[2]);
    }

    getTemplateFromFileContents(contents) {

    }

    readFiles(filePath) {
        let fileContents = {}
        this.getFileName(filePath)
        const data = fs.readFileSync(filePath);
        return data.toString();
    }
}