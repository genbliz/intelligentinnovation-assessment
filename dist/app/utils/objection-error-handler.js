"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatObjectionErrors = void 0;
const objection_1 = require("objection");
function formatObjectionErrors(err) {
    if (err instanceof objection_1.ValidationError) {
        switch (err.type) {
            case 'ModelValidation':
                return err.message;
            case 'RelationExpression':
                return `Data Relation error occured`;
        }
    }
    if (err instanceof objection_1.UniqueViolationError) {
        return `Unique key for: ${err.columns[0]}, violated.`;
    }
    if (err instanceof objection_1.DataError) {
        return `Data format error occured`;
    }
    if (err instanceof objection_1.ForeignKeyViolationError) {
        return `Foreign key violation occured.`;
    }
    if (err instanceof objection_1.NotNullViolationError) {
        return `Value for: ${err.column}, cannot be null.`;
    }
    if (err instanceof objection_1.ConstraintViolationError) {
        return `Data constraint violated`;
    }
    return null;
}
exports.formatObjectionErrors = formatObjectionErrors;
//# sourceMappingURL=objection-error-handler.js.map