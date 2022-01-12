import request from 'supertest';
import app from '../index';

class TestServiceBase {
  private baseHelpert({
    httpRequest,
    params,
    headers
  }: {
    httpRequest: request.Test;
    params: Record<string, unknown> | undefined;
    headers: Record<string, string> | undefined;
  }) {
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

  async post({
    url,
    body,
    query,
    headers
  }: {
    url: string;
    body: string | Record<string, any> | Record<string, any>[];
    query?: Record<string, unknown>;
    headers?: Record<string, string>;
  }) {
    const httpRequest = request(app).post(url);

    httpRequest.send(body);
    // httpRequest.set('Origin', 'http://localhost:3000');

    return await this.baseHelpert({
      httpRequest,
      params: query,
      headers
    });
  }

  async get({
    url,
    query,
    headers
  }: {
    url: string;
    query?: Record<string, unknown>;
    headers?: Record<string, string>;
  }) {
    const httpRequest = request(app).get(url);

    // httpRequest.set('Origin', 'http://localhost:3000');

    return await this.baseHelpert({
      httpRequest,
      params: query,
      headers
    });
  }

  async put({
    url,
    query,
    headers
  }: {
    url: string;
    query?: Record<string, unknown>;
    headers?: Record<string, string>;
  }) {
    const httpRequest = request(app).put(url);

    // httpRequest.set('Origin', 'http://localhost:3000');

    return await this.baseHelpert({
      httpRequest,
      params: query,
      headers
    });
  }
}

export const TestRequestService = new TestServiceBase();
