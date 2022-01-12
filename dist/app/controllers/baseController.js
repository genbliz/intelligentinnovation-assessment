"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const logging_service_1 = require("../services/logging-service");
const util_services_1 = require("../services/util-services");
const errors_1 = require("../utils/errors");
let BaseController = class BaseController extends errors_1.FriendlyErrorUtil {
    success({ res, data, message = '', httpStatus = 200 }) {
        return res.status(httpStatus).json({
            status: 'success',
            message: message,
            data: data
        });
    }
    error({ res, code, message, error, httpStatus = 400 }) {
        const errorData = this.getFriendlyErrorMessage(error);
        if (error) {
            logging_service_1.LoggingService.error(error);
        }
        if (message) {
            logging_service_1.LoggingService.error(message);
        }
        const httpStatus01 = errorData.httpStatus || httpStatus || 500;
        const message01 = message || errorData.message || 'Error occured';
        const code01 = errorData.code || code || 0;
        return res.status(httpStatus01).send({
            status: 'error',
            code: code01,
            message: message01
        });
    }
    successPlain({ res, data = null, httpStatus = 200 }) {
        return res.status(httpStatus).json(data);
    }
    successHtml({ res, html }) {
        return res.contentType('html').send(html);
    }
    async successDownloadCsv({ res, dataCsv, httpStatus = 200, downloadTitle }) {
        let dataCsvFinal = '';
        if (dataCsv && typeof dataCsv === 'object') {
            dataCsvFinal = await util_services_1.UtilService.jsonToCsvParse({
                jsonData: [...dataCsv?.json],
                fields: Object.keys(dataCsv?.json[0])
            });
        }
        else {
            dataCsvFinal = dataCsv;
        }
        const myFileName = downloadTitle ? `${downloadTitle}-${Date.now()}` : `${Date.now()}`;
        res.setHeader('Content-disposition', `attachment; filename=${myFileName}.csv`);
        res.setHeader('Content-type', 'text/csv');
        return res.status(httpStatus).send(dataCsvFinal);
    }
    successDownload({ res, data = null, httpStatus = 200, downloadTitle }) {
        const dataRes = typeof data === 'string' ? data : JSON.stringify(data);
        const myFileName = downloadTitle ? `${downloadTitle}-${Date.now()}` : `${Date.now()}`;
        res.setHeader('Content-disposition', `attachment; filename=${myFileName}.json`);
        res.setHeader('Content-type', 'application/json');
        return res.status(httpStatus).send(dataRes);
    }
};
BaseController = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)()
], BaseController);
exports.BaseController = BaseController;
//# sourceMappingURL=baseController.js.map