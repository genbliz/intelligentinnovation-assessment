import { Response } from 'express';
import { injectable } from 'inversify';
import { LoggingService } from '../services/logging-service';
import { UtilService } from '../services/util-services';
import { FriendlyErrorUtil } from '../utils/errors';

@injectable()
export abstract class BaseController extends FriendlyErrorUtil {
  protected success({
    res,
    data,
    message = '',
    httpStatus = 200
  }: {
    res: Response;
    data: any;
    message?: string;
    httpStatus?: number;
  }) {
    return res.status(httpStatus).json({
      status: 'success',
      message: message,
      data: data
    });
  }

  protected error({
    res,
    code,
    message,
    error,
    httpStatus = 400
  }: {
    res: Response;
    code?: string;
    message?: string;
    error?: any;
    httpStatus?: number;
  }) {
    const errorData = this.getFriendlyErrorMessage(error);

    if (error) {
      LoggingService.error(error);
    }

    if (message) {
      LoggingService.error(message);
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

  protected successPlain({ res, data = null, httpStatus = 200 }: { res: Response; data?: any; httpStatus?: number }) {
    return res.status(httpStatus).json(data);
  }

  protected successHtml({ res, html }: { res: Response; html: string }) {
    return res.contentType('html').send(html);
  }

  protected async successDownloadCsv({
    res,
    dataCsv,
    httpStatus = 200,
    downloadTitle
  }: {
    res: Response;
    dataCsv: string | { json: Record<string, any>[] };
    downloadTitle?: string;
    httpStatus?: number;
  }) {
    let dataCsvFinal = '';
    if (dataCsv && typeof dataCsv === 'object') {
      dataCsvFinal = await UtilService.jsonToCsvParse({
        jsonData: [...dataCsv?.json],
        fields: Object.keys(dataCsv?.json[0])
      });
    } else {
      dataCsvFinal = dataCsv;
    }
    const myFileName = downloadTitle ? `${downloadTitle}-${Date.now()}` : `${Date.now()}`;
    res.setHeader('Content-disposition', `attachment; filename=${myFileName}.csv`);
    res.setHeader('Content-type', 'text/csv');
    return res.status(httpStatus).send(dataCsvFinal);
  }

  protected successDownload({
    res,
    data = null,
    httpStatus = 200,
    downloadTitle
  }: {
    res: Response;
    data?: any;
    downloadTitle?: string;
    httpStatus?: number;
  }) {
    const dataRes = typeof data === 'string' ? data : JSON.stringify(data);
    const myFileName = downloadTitle ? `${downloadTitle}-${Date.now()}` : `${Date.now()}`;
    res.setHeader('Content-disposition', `attachment; filename=${myFileName}.json`);
    res.setHeader('Content-type', 'application/json');
    return res.status(httpStatus).send(dataRes);
  }
}
