"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefinedTableNamesPath = exports.MIGRATION_TABLE_NAME = exports.DefinedSchemaNames = exports.DefinedTableNames = void 0;
exports.DefinedTableNames = {
    COMMENTS: 'comments'
};
exports.DefinedSchemaNames = {
    ASSESSMENT_SERVICE: 'intelligentinnovation_assessment'
};
exports.MIGRATION_TABLE_NAME = 'intelligentinnovation_assessment_migrations';
function addPath() {
    const obj = {};
    Object.entries({ ...exports.DefinedTableNames }).forEach(([key, value]) => {
        obj[key] = `${exports.DefinedSchemaNames.ASSESSMENT_SERVICE}.${value}`;
    });
    return obj;
}
exports.DefinedTableNamesPath = addPath();
//# sourceMappingURL=constants.js.map