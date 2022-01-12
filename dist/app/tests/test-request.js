"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestRequestService = void 0;
const tslib_1 = require("tslib");
const supertest_1 = (0, tslib_1.__importDefault)(require("supertest"));
const index_1 = (0, tslib_1.__importDefault)(require("../index"));
class TestServiceBase {
    baseHelpert({ httpRequest, params, headers }) {
        httpRequest.set('Accept', 'application/json');
        if (headers && Object.keys(headers).length) {
            Object.entries(headers).forEach(([key, value]) => {
                httpRequest.set(key, value);
            });
        }
        if (params && Object.keys(params).length) {
            httpRequest.query(params);
        }
        return httpRequest;
    }
    async post({ url, body, query, headers }) {
        const httpRequest = (0, supertest_1.default)(index_1.default).post(url);
        httpRequest.send(body);
        return await this.baseHelpert({
            httpRequest,
            params: query,
            headers
        });
    }
    async get({ url, query, headers }) {
        const httpRequest = (0, supertest_1.default)(index_1.default).get(url);
        return await this.baseHelpert({
            httpRequest,
            params: query,
            headers
        });
    }
    async put({ url, query, headers }) {
        const httpRequest = (0, supertest_1.default)(index_1.default).put(url);
        return await this.baseHelpert({
            httpRequest,
            params: query,
            headers
        });
    }
}
exports.TestRequestService = new TestServiceBase();
//# sourceMappingURL=test-request.js.map