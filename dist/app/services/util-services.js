"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilService = void 0;
const tslib_1 = require("tslib");
const fs_1 = (0, tslib_1.__importDefault)(require("fs"));
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const shortid_1 = (0, tslib_1.__importDefault)(require("shortid"));
const uuid_1 = require("uuid");
const app_root_path_1 = (0, tslib_1.__importDefault)(require("app-root-path"));
const papaparse_1 = (0, tslib_1.__importDefault)(require("papaparse"));
const validator_1 = (0, tslib_1.__importDefault)(require("validator"));
class UtilityServiceBase {
    convertHexadecimalToNumber(hexString) {
        return parseInt(hexString, 16);
    }
    fileOrDirectoryExists(fullPath) {
        try {
            fs_1.default.accessSync(fullPath, fs_1.default.constants.F_OK);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    getFullPathFromRoot(path01) {
        const cwd = process.cwd();
        const rootFiles = [
            'package.json'
        ];
        const anyExists = rootFiles.some((fileName) => this.fileOrDirectoryExists(path_1.default.resolve(cwd, fileName)));
        if (anyExists) {
            return path_1.default.resolve(cwd, path01);
        }
        return path_1.default.resolve(app_root_path_1.default.path, path01);
    }
    isUUID(str) {
        return validator_1.default.isUUID(str);
    }
    getShortId() {
        return shortid_1.default.generate();
    }
    getUUID() {
        return (0, uuid_1.v4)();
    }
    unigueArray(arr) {
        return arr.filter((elem, pos, arr) => {
            return arr.indexOf(elem) === pos;
        });
    }
    convertObjectToJsonPlainObject(objData) {
        const objDataPlain = JSON.parse(JSON.stringify(objData));
        return objDataPlain;
    }
    castUndefinedToNull(objData) {
        const objDataPlain = {};
        Object.entries(objData).forEach(([key, value]) => {
            objDataPlain[key] = value === undefined ? null : value;
        });
        return objDataPlain;
    }
    base64Encode(str) {
        return Buffer.from(str).toString('base64');
    }
    base64Decode(str) {
        return Buffer.from(str, 'base64').toString('utf8');
    }
    waitUntilSeconds(seconds) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, Math.floor(seconds * 1000));
        });
    }
    waitUntilMilliseconds(ms) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, ms);
        });
    }
    removeDuplicateString(items) {
        if (!Array.isArray(items)) {
            return [];
        }
        return Array.from(new Set(items));
    }
    csv2JsonParseFileOrStringOrStream(csvFileOrStringOrStream) {
        return new Promise((resolve, reject) => {
            if (!csvFileOrStringOrStream) {
                reject('Invalid csv input');
                return;
            }
            papaparse_1.default.parse(csvFileOrStringOrStream, {
                skipEmptyLines: true,
                header: true,
                complete: (results) => {
                    resolve(results.data);
                },
                error: (err) => {
                    reject(err);
                }
            });
        });
    }
    jsonToCsvParse({ jsonData, fields }) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const csv = papaparse_1.default.unparse({
                        data: jsonData,
                        fields: fields
                    }, {
                        header: true,
                        quotes: true,
                        quoteChar: '"',
                        escapeChar: '"',
                        delimiter: ',',
                        newline: '\r\n'
                    });
                    resolve(csv);
                }
                catch (err) {
                    reject(err);
                }
            }, 2);
        });
    }
    groupOneBy(dataList, fn) {
        const aggr = {};
        if (dataList?.length) {
            dataList.forEach((data) => {
                const groupId = fn(data);
                if (aggr[groupId] === undefined) {
                    aggr[groupId] = data;
                }
            });
        }
        return aggr;
    }
    groupBy(dataList, fn) {
        const aggr = {};
        for (const data of dataList) {
            const groupId = fn(data);
            if (!aggr[groupId]) {
                aggr[groupId] = [];
            }
            aggr[groupId].push(data);
        }
        return aggr;
    }
    readFileAsync(path) {
        return new Promise((resolve, reject) => {
            fs_1.default.readFile(path, { encoding: 'utf8' }, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    writeFileAsync(path, data) {
        return new Promise((resolve, reject) => {
            fs_1.default.writeFile(path, data, { encoding: 'utf8' }, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    appendFileAsync(path, data) {
        return new Promise((resolve, reject) => {
            fs_1.default.appendFile(path, data, { encoding: 'utf8' }, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    convertKilometerToMeter(km) {
        return (km || 0) * 1000;
    }
}
exports.UtilService = new UtilityServiceBase();
//# sourceMappingURL=util-services.js.map