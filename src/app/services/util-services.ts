import fs from 'fs';
import path from 'path';
import shortid from 'shortid';
import { v4 as uuidv4 } from 'uuid';
import appRoot from 'app-root-path';
import Papa from 'papaparse';
import validator from 'validator';
import ip from 'ip';

class UtilityServiceBase {
  convertHexadecimalToNumber(hexString: string) {
    return parseInt(hexString, 16);
  }

  fileOrDirectoryExists(fullPath: string) {
    try {
      fs.accessSync(fullPath, fs.constants.F_OK);
      return true;
    } catch (e) {
      return false;
    }
  }

  getFullPathFromRoot(path01: string) {
    const cwd = process.cwd();
    const rootFiles = [
      //
      'package.json'
    ];
    const anyExists = rootFiles.some((fileName) => this.fileOrDirectoryExists(path.resolve(cwd, fileName)));
    if (anyExists) {
      return path.resolve(cwd, path01);
    }
    return path.resolve(appRoot.path, path01);
  }

  isUUID(str: string) {
    return validator.isUUID(str);
  }

  getShortId(): string {
    return shortid.generate();
  }

  getUUID() {
    return uuidv4();
  }

  getIpAddress() {
    return ip.address();
  }

  unigueArray<T>(arr: T[]) {
    return arr.filter((elem, pos, arr) => {
      return arr.indexOf(elem) === pos;
    });
  }

  convertObjectToJsonPlainObject<T = any>(objData: T) {
    const objDataPlain: T = JSON.parse(JSON.stringify(objData));
    return objDataPlain;
  }

  castUndefinedToNull<T = any>(objData: T) {
    const objDataPlain: any = {};
    Object.entries(objData).forEach(([key, value]) => {
      objDataPlain[key] = value === undefined ? null : value;
    });
    return objDataPlain;
  }

  base64Encode(str: string) {
    return Buffer.from(str).toString('base64');
  }

  base64Decode(str: string) {
    return Buffer.from(str, 'base64').toString('utf8');
  }

  waitUntilSeconds(seconds: number) {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, Math.floor(seconds * 1000));
    });
  }

  waitUntilMilliseconds(ms: number) {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }

  removeDuplicateString(items: string[]) {
    if (!Array.isArray(items)) {
      return [];
    }
    return Array.from(new Set(items));
  }

  csv2JsonParseFileOrStringOrStream<T = any>(csvFileOrStringOrStream: File | NodeJS.ReadableStream | string) {
    return new Promise<T[]>((resolve, reject) => {
      if (!csvFileOrStringOrStream) {
        reject('Invalid csv input');
        return;
      }
      Papa.parse<T>(csvFileOrStringOrStream, {
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

  jsonToCsvParse<T>({ jsonData, fields }: { jsonData: T[]; fields: (keyof T)[] }) {
    // https://www.papaparse.com/docs#json-to-csv
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        try {
          const csv = Papa.unparse(
            {
              data: jsonData,
              fields: fields as string[]
            },
            {
              header: true,
              quotes: true, // or array of booleans
              quoteChar: '"',
              escapeChar: '"',
              delimiter: ',',
              newline: '\r\n'
            }
          );
          resolve(csv);
        } catch (err) {
          reject(err);
        }
      }, 2);
    });
  }

  groupOneBy<T>(dataList: T[], fn: (dt: T) => string | number) {
    const aggr: Record<string, T> = {};
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

  groupBy<T>(dataList: T[], fn: (dt: T) => string | number) {
    const aggr: Record<string, T[]> = {};
    for (const data of dataList) {
      const groupId = fn(data);
      if (!aggr[groupId]) {
        aggr[groupId] = [];
      }
      aggr[groupId].push(data);
    }
    return aggr;
  }

  readFileAsync(path: string) {
    return new Promise<string>((resolve, reject) => {
      fs.readFile(path, { encoding: 'utf8' }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  writeFileAsync(path: string, data: string) {
    return new Promise<boolean>((resolve, reject) => {
      fs.writeFile(path, data, { encoding: 'utf8' }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }

  appendFileAsync(path: string, data: string) {
    return new Promise<boolean>((resolve, reject) => {
      fs.appendFile(path, data, { encoding: 'utf8' }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }

  convertKilometerToMeter(km: number) {
    return (km || 0) * 1000;
  }
}

export const UtilService = new UtilityServiceBase();
