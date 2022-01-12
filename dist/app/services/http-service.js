"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpService = void 0;
const tslib_1 = require("tslib");
const axios_1 = (0, tslib_1.__importDefault)(require("axios"));
class MyHeaders {
    constructor() {
        Object.defineProperty(this, "_headers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_normalizedNames", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._headers = new Map();
        this._normalizedNames = new Map();
    }
    append(name, value) {
        const existingValues = this.getAll(name);
        if (!existingValues) {
            this.set(name, value);
        }
        else {
            this.set(name, value, existingValues);
        }
    }
    delete(name) {
        const lcName = name.toLowerCase();
        this._normalizedNames.delete(lcName);
        this._headers.delete(lcName);
    }
    get(name) {
        const values = this.getAll(name);
        if (values === null) {
            return null;
        }
        return values.length > 1 ? values : values[0];
    }
    has(name) {
        return this._headers.has(name.toLowerCase());
    }
    keys() {
        return Array.from(this._normalizedNames.values());
    }
    values() {
        return Array.from(this._headers.values());
    }
    uniq(a) {
        return Array.from(new Set(a));
    }
    toJSON() {
        const serialized = {};
        this._headers.forEach((values, name) => {
            const split = [];
            values.forEach((v) => {
                split.push(...v.split(','));
            });
            const _name = this._normalizedNames.get(name);
            if (_name && split.length) {
                serialized[_name] = split.length > 1 ? split[0] : split[0];
            }
        });
        return serialized;
    }
    toArrayResult() {
        const obj = this.toJSON();
        return Object.entries(obj).map(([key, val]) => {
            return [key, val];
        });
    }
    getAll(name) {
        return this.has(name) ? this._headers.get(name.toLowerCase()) || null : null;
    }
    set(name, value, oldValues) {
        let _values = Array.isArray(value) ? [...value] : [value];
        if (oldValues) {
            _values = [..._values, ...oldValues];
        }
        _values = this.uniq(_values);
        this._headers.set(name.toLowerCase(), _values);
        this.setNormalizedName(name);
    }
    setNormalizedName(name) {
        const lcName = name.toLowerCase();
        if (!this._normalizedNames.has(lcName)) {
            this._normalizedNames.set(lcName, name);
        }
    }
}
class HttpServiceBase {
    post({ url, data, params, headers }) {
        return new Promise((resolve, reject) => {
            const _options = {};
            const appHeaders = new MyHeaders();
            appHeaders.append('Content-Type', 'application/json; charset=UTF-8');
            if (headers?.length) {
                for (const header of headers) {
                    appHeaders.append(header[0], header[1]);
                }
            }
            _options.headers = appHeaders.toJSON();
            if (params) {
                _options.params = params;
            }
            axios_1.default
                .post(url, data, _options)
                .then((body) => {
                resolve(body.data);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    put({ url, data, params, headers }) {
        return new Promise((resolve, reject) => {
            const _options = {};
            const appHeaders = new MyHeaders();
            appHeaders.append('Content-Type', 'application/json; charset=UTF-8');
            if (headers?.length) {
                for (const header of headers) {
                    appHeaders.append(header[0], header[1]);
                }
            }
            _options.headers = appHeaders.toJSON();
            if (params) {
                _options.params = params;
            }
            axios_1.default
                .put(url, data, _options)
                .then((body) => {
                resolve(body.data);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    get({ url, params, headers }) {
        return new Promise((resolve, reject) => {
            const _options = {};
            const appHeaders = new MyHeaders();
            appHeaders.append('Content-Type', 'application/json; charset=UTF-8');
            appHeaders.append('Accept', 'application/json');
            if (headers && headers.length) {
                for (const header of headers) {
                    appHeaders.append(header[0], header[1]);
                }
            }
            _options.headers = appHeaders.toJSON();
            if (params) {
                _options.params = params;
            }
            axios_1.default
                .get(url, _options)
                .then((result) => {
                resolve(result.data);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    getAxiosError(err) {
        if (err?.response) {
            const { data, status, statusText, headers } = err.response;
            if (data && status) {
                return {
                    data: data,
                    status,
                    statusText,
                    headers
                };
            }
        }
        else if (err?.request) {
            console.log({ requestErr: err?.request });
        }
        else {
            console.error('Error', err?.message);
        }
        return null;
    }
}
exports.HttpService = new HttpServiceBase();
//# sourceMappingURL=http-service.js.map