import { Request, Response } from 'express';
import { controller, httpGet, queryParam } from 'inversify-express-utils';
import { BaseController } from './baseController';

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
}
