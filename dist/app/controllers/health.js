"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
const tslib_1 = require("tslib");
const inversify_express_utils_1 = require("inversify-express-utils");
const baseController_1 = require("./baseController");
const inversify_config_1 = (0, tslib_1.__importDefault)(require("../config/inversify.config"));
const inversify_postman_collection_1 = require("inversify-postman-collection");
const route_def_1 = require("../route-def");
let HealthController = class HealthController extends baseController_1.BaseController {
    basicCheck(def, _, res) {
        return this.success({
            res,
            data: {},
            httpStatus: 200,
            message: 'Basic Health Check Assessment Route Working.'
        });
    }
    allRoute(def, req, res) {
        const routeInfo = (0, inversify_express_utils_1.getRouteInfo)(inversify_config_1.default);
        const result = (0, inversify_postman_collection_1.getRouteDefinitions)({
            routesDefs: routeInfo,
            title: 'Assessment Api',
            baseUrl: `{{api-base-url}}`,
            routeDefData: (0, route_def_1.getRouteDefinitionData)()
        });
        return this.successPlain({
            res,
            data: result
        });
    }
    allRouteHtml(def, req, res) {
        const routeInfo = (0, inversify_express_utils_1.getRouteInfo)(inversify_config_1.default);
        const result = (0, inversify_postman_collection_1.getRouteDefinitions)({
            routesDefs: routeInfo,
            title: 'Assessment Api',
            baseUrl: `{{api-base-url}}`,
            routeDefData: (0, route_def_1.getRouteDefinitionData)()
        });
        const html = (0, inversify_postman_collection_1.convertRouteDefinitionToHtml)({
            routeDefs: result,
            apiTitle: 'Assessment Api'
        });
        return this.successHtml({
            res,
            html
        });
    }
    allRouteDownload(def, req, res) {
        const routeInfo = (0, inversify_express_utils_1.getRouteInfo)(inversify_config_1.default);
        const headerEnvVariables = [['api-access', '{{auth-access-header}}']];
        const result = (0, inversify_postman_collection_1.getPostmanCollection)({
            headerEnvVariables,
            routesDefs: routeInfo,
            title: 'Assessment Api',
            baseUrl: `{{api-base-url}}`,
            routeDefData: (0, route_def_1.getRouteDefinitionData)()
        });
        return this.successDownload({
            res,
            data: result,
            downloadTitle: 'postman-api-collection'
        });
    }
};
(0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.httpGet)('/'),
    (0, tslib_1.__param)(0, (0, inversify_express_utils_1.queryParam)('def__Health_check')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, Object, Object]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], HealthController.prototype, "basicCheck", null);
(0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.httpGet)('/routes'),
    (0, tslib_1.__param)(0, (0, inversify_express_utils_1.queryParam)('def__View_all_available_route')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, Object, Object]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], HealthController.prototype, "allRoute", null);
(0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.httpGet)('/routes/html'),
    (0, tslib_1.__param)(0, (0, inversify_express_utils_1.queryParam)('def__View_all_available_route_html')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, Object, Object]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], HealthController.prototype, "allRouteHtml", null);
(0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.httpGet)('/postman'),
    (0, tslib_1.__param)(0, (0, inversify_express_utils_1.queryParam)('def__Download_postman_collection')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, Object, Object]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], HealthController.prototype, "allRouteDownload", null);
HealthController = (0, tslib_1.__decorate)([
    (0, inversify_express_utils_1.controller)('/health')
], HealthController);
exports.HealthController = HealthController;
//# sourceMappingURL=health.js.map