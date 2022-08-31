import Reader from "./src/reader.js";
import Parser from "./src/parser.js";
import Writer from "./src/writer.js";

let reader = new Reader();
let parser = new Parser(reader.vueComponents);
let writer = new Writer(parser.parsedComponents);
let dir = ""; // TODO input dir

reader.buildFileList(dir);
parser.traverseComponents();
writer.iterateFiles();

// TODO: Convert all sync fs functions to async if time allows. Not really effecting performance.