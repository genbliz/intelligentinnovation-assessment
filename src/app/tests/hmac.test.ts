import { TestRequestService } from './test-request';
import { db } from '../config/db';

beforeEach(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

describe('Generate Hmac Secret', () => {
  it('should fail with missing user id', async () => {
    const result = await TestRequestService.post({
      url: `/hmac`,
      body: {}
    });
    expect(result).toBe(400);
  });

  it('should generate hmac secret for user', async () => {
    const result = await TestRequestService.post({
      url: `/hmac`,
      body: { user_id: '000449a7-cb06-4479-b9c0-19350d73544d' }
    });
    expect(result).toBe(201);
  });
});
