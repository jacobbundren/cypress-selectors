import Reader from "./src/reader.js";
import Parser from "./src/parser";

let reader = new Reader();
let parser = new Parser();
let dir = "../../tpg/clients/dyt-client/src";

reader.buildFileList(dir);

