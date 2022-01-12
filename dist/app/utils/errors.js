"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericResponseError = exports.FriendlyErrorUtil = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const validator_1 = (0, tslib_1.__importDefault)(require("validator"));
const logging_service_1 = require("../services/logging-service");
const objection_error_handler_1 = require("./objection-error-handler");
let FriendlyErrorUtil = class FriendlyErrorUtil {
    createFriendlyError(message, httpStatus = 400) {
        return new GenericResponseError({ error: message, httpStatus });
    }
    getFriendlyErrorMessage(err) {
        if (!err) {
            return {
                message: ''
            };
        }
        if (err instanceof GenericResponseError) {
            return {
                message: err.message,
                code: err.code,
                httpStatus: err.httpStatus
            };
        }
        const objectionError = (0, objection_error_handler_1.formatObjectionErrors)(err);
        if (objectionError) {
            return {
                message: objectionError
            };
        }
        if (err instanceof Error) {
            logging_service_1.LoggingService.error(err);
        }
        return {
            message: ''
        };
    }
    validateRequiredString(keyValueValidates) {
        const errors = [];
        Object.entries(keyValueValidates).forEach(([key, value]) => {
            if (!(value && typeof value === 'string')) {
                errors.push(`${key} is required`);
            }
        });
        if (errors.length) {
            throw this.createFriendlyError(`${errors.join('; ')}.`);
        }
    }
    validateRequiredUUID(keyValueValidates) {
        const errors = [];
        Object.entries(keyValueValidates).forEach(([key, value]) => {
            if (!(value && validator_1.default.isUUID(value))) {
                console.log({ uuid: value });
                errors.push(`${key} MUST be valid uuid`);
            }
        });
        if (errors.length) {
            throw this.createFriendlyError(`${errors.join('; ')}.`);
        }
    }
    validateRequiredNumber(keyValueValidates) {
        const errors = [];
        Object.entries(keyValueValidates).forEach(([key, value]) => {
            if (!(!isNaN(Number(value)) && typeof value === 'number')) {
                errors.push(`${key} is required`);
            }
        });
        if (errors.length) {
            throw this.createFriendlyError(`${errors.join('; ')}.`);
        }
    }
};
FriendlyErrorUtil = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)()
], FriendlyErrorUtil);
exports.FriendlyErrorUtil = FriendlyErrorUtil;
function resolveErrorParams({ errorOption, httpStatusX, codeX }) {
    let message = 'Unknown Error';
    let httpStatus = httpStatusX || 500;
    let code = codeX || 'E000';
    if (typeof errorOption === 'string') {
        message = errorOption;
    }
    else if (errorOption instanceof Error) {
        message = errorOption.message;
    }
    else if (typeof errorOption === 'object') {
        if (errorOption.error instanceof Error) {
            message = errorOption.error.message;
        }
        else if (typeof errorOption.error === 'string') {
            message = errorOption.error;
        }
        if (errorOption?.httpStatus) {
            httpStatus = errorOption?.httpStatus;
        }
        if (errorOption?.code) {
            code = errorOption?.code;
        }
        if (errorOption?.subject) {
            message = `${errorOption.subject}:: ${message}`;
        }
    }
    return { httpStatus, message, code };
}
class GenericResponseError extends Error {
    constructor(errorOption, httpStatus, code) {
        super(resolveErrorParams({ errorOption }).message);
        Object.defineProperty(this, "httpStatus", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { httpStatus: status01, code: code01 } = resolveErrorParams({
            errorOption,
            httpStatusX: httpStatus,
            codeX: code
        });
        this.httpStatus = status01;
        this.code = code01;
    }
    static fromError({ error, httpStatus, code }) {
        return new GenericResponseError({ error, httpStatus, code });
    }
}
exports.GenericResponseError = GenericResponseError;
//# sourceMappingURL=errors.js.map