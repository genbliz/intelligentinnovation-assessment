import { Request, Response } from 'express';
import { controller, httpGet, queryParam, getRouteInfo } from 'inversify-express-utils';
import { BaseController } from './baseController';
import container from '../config/inversify.config';
import { convertRouteDefinitionToHtml, getPostmanCollection, getRouteDefinitions } from 'inversify-postman-collection';
import { getRouteDefinitionData } from '../route-def';

@controller('/health')
export class HealthController extends BaseController {
  @httpGet('/')
  basicCheck(@queryParam('def__Health_check') def: string, _: Request, res: Response) {
    return this.success({
      res,
      data: {},
      httpStatus: 200,
      message: 'Basic Health Check Assessment Route Working.'
    });
  }

  @httpGet('/routes')
  allRoute(@queryParam('def__View_all_available_route') def: string, req: Request, res: Response) {
    const routeInfo = getRouteInfo(container);
    const result = getRouteDefinitions({
      routesDefs: routeInfo,
      title: 'Assessment Api',
      baseUrl: `{{api-base-url}}`,
      routeDefData: getRouteDefinitionData()
    });
    return this.successPlain({
      res,
      data: result
    });
  }

  @httpGet('/routes/html')
  allRouteHtml(@queryParam('def__View_all_available_route_html') def: string, req: Request, res: Response) {
    const routeInfo = getRouteInfo(container);
    const result = getRouteDefinitions({
      routesDefs: routeInfo,
      title: 'Assessment Api',
      baseUrl: `{{api-base-url}}`,
      routeDefData: getRouteDefinitionData()
    });
    const html = convertRouteDefinitionToHtml({
      routeDefs: result,
      apiTitle: 'Assessment Api'
    });
    return this.successHtml({
      res,
      html
    });
  }

  @httpGet('/postman')
  allRouteDownload(@queryParam('def__Download_postman_collection') def: string, req: Request, res: Response) {
    const routeInfo = getRouteInfo(container);
    const headerEnvVariables = [['api-access', '{{auth-access-header}}']];
    const result = getPostmanCollection({
      headerEnvVariables,
      routesDefs: routeInfo,
      title: 'Assessment Api',
      baseUrl: `{{api-base-url}}`,
      routeDefData: getRouteDefinitionData()
    });
    return this.successDownload({
      res,
      data: result,
      downloadTitle: 'postman-api-collection'
    });
  }
}
