import {
  getDriverAccount,
  getPassengerAccount,
} from '@blazing/test-factory/stubs';
import { destroyTestApp } from '@blazing/test-factory/utils';
import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { createTestApp } from './create-app';

describe('Accounts (Integration Specs)', () => {
  let app: INestApplication;
  let server: App;

  beforeAll(async () => {
    app = await createTestApp();
    server = app.getHttpServer();
  });

  afterAll(async () => {
    await destroyTestApp(app);
  });

  describe('POST /v1/sign-up', () => {
    it('should accept passenger sign-up of new accounts', async () => {
      const passenger = getPassengerAccount();
      const response = await request(server)
        .post('/v1/sign-up')
        .send(passenger);
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({ id: expect.any(String) });
    });
    it('should accept driver sign-up of new accounts', async () => {
      const driver = getDriverAccount();
      const response = await request(server).post('/v1/sign-up').send(driver);
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({ id: expect.any(String) });
    });
    it('should reject duplicated sign-up', async () => {
      const driver = getDriverAccount();
      const makeRequest = () =>
        request(server).post('/v1/sign-up').send(driver);
      const firstResponse = await makeRequest();
      const secondResponse = await makeRequest();
      expect(firstResponse.statusCode).toBe(201);
      expect(firstResponse.body).toEqual({ id: expect.any(String) });
      expect(secondResponse.statusCode).toBe(409);
    });
  });
  describe('POST /v1/sign-in', () => {
    it('should return an access_token', async () => {
      const passenger = getPassengerAccount();
      await request(server).post('/v1/sign-up').send(passenger);
      const response = await request(server)
        .post('/v1/sign-in')
        .send({ email: passenger.email, password: passenger.password });
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({ access_token: expect.any(String) });
    });
    it('should reject nonexisting accounts', async () => {
      const passenger = getPassengerAccount();
      const response = await request(server)
        .post('/v1/sign-in')
        .send({ email: passenger.email, password: passenger.password });
      expect(response.statusCode).toBe(401);
    });
  });
  describe('POST /v1/change-password', () => {
    it('should change the account password', async () => {
      const passenger = getPassengerAccount();
      await request(server).post('/v1/sign-up').send(passenger);
      const newPassword = faker.internet.password();
      const changePasswordResponse = await request(server)
        .post('/v1/change-password')
        .send({
          email: passenger.email,
          currentPassword: passenger.password,
          newPassword,
        });
      const oldPasswordSignInResponse = await request(server)
        .post('/v1/sign-in')
        .send({ email: passenger.email, password: passenger.password });
      const newPasswordSignInResponse = await request(server)
        .post('/v1/sign-in')
        .send({ email: passenger.email, password: newPassword });
      expect(changePasswordResponse.statusCode).toBe(201);
      expect(changePasswordResponse.body).toEqual({});
      expect(oldPasswordSignInResponse.statusCode).toBe(401);
      expect(newPasswordSignInResponse.statusCode).toBe(201);
      expect(newPasswordSignInResponse.body).toEqual({
        access_token: expect.any(String),
      });
    });
  });
});
