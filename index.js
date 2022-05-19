import Reader from "./src/reader.js";
import Parser from "./src/parser.js";
import Writer from "./src/writer.js";

let reader = new Reader();
let parser = new Parser(reader.vueComponents);
let writer = new Writer(parser.parsedComponents);
let dir = "../../company/clients/vue-components/src/components";

reader.buildFileList(dir);
parser.traverseComponents();
writer.iterateFiles();
