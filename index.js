import Reader from "./src/reader.js";
import Parser from "./src/parser.js";

let reader = new Reader();
let parser = new Parser(reader.vueComponents);
let dir = "../../tpg/clients/dyt-client/src";

reader.buildFileList(dir);
parser.traverseComponents();
