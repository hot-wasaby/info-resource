import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/admin/dashboard (GET)', () => {
    return request(app.getHttpServer())
      .get('/admin/dashboard')
      .set('x-role', 'Admin')
      .expect(200)
      .expect({ message: 'Zona administrativă - doar pentru admini' });
  });
});
