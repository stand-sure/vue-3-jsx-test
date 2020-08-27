import { readFile } from "fs";
import { join } from "path";
import { promisify } from "util";

const ROOT_PATH = "../..";
const ENCODING = "utf8";

const readFileAsync = promisify(readFile);
/**
 * Reads the entire contents of a source code file.
 *
 * @param {string} name
 * @returns {Promise<string>}
 */
const readCodeFile = async (name) => {
    const filePath = join(ROOT_PATH, name);
    const fileText = await readFileAsync(filePath, ENCODING);
    return Promise.resolve(fileText.toString());
};

export { readCodeFile };
