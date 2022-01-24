'use strict';

const { server } = require("../src/server.js");
const supertest = require('supertest');
const request = supertest(server);
const { Users } = require("../src/models");
const { db } = require('../src/models');


beforeAll(async () => {
  await Users.sync({ force: true })
  await db.sync();
});

afterAll(async () => {
  await Users.drop();
  await db.drop();
});

let testUsers = {
  admin: { username: "mya", password: "test", role: "admin" },
};


// Pre-load our database with fake Users
beforeAll( async () => {
  await Users.create(testUsers.admin)
});

const testQuote = {
  quote: 'They don\'t think it be like it is but it do.',
  source: 'Oscar Gamble'
}

let token;

describe('Testing the AUTHORIZED food router', () => {

  it('signin', async () => {
    const response = await request.post('/signin')
    .auth(testUsers.admin.username, testUsers.admin.password);
    token = response.body.token;
    expect(response.body.token).toBeDefined();
    expect(response.status).toEqual(200);
  }); 

  it('should CREATE one from foods data', async () => {
    const bearerResponse = await request
    .post('/api/quotes').send(testQuote)
    .set('Authorization', `Bearer ${token}`);
    expect(bearerResponse.body).toBeDefined();
    expect(bearerResponse.status).toEqual(201);
  });

  it('should read ALL from foods data', async () => {
    const bearerResponse = await request
    .get('/api/quotes')
    .set('Authorization', `Bearer ${token}`);
    expect(bearerResponse.body).toBeDefined();
    expect(bearerResponse.status).toEqual(200);
  });

  it('should read ONE from foods data', async () => {
    const bearerResponse = await request
    .get('/api/quotes/1')
    .set('Authorization', `Bearer ${token}`);
    expect(bearerResponse.body).toBeDefined();
    expect(bearerResponse.status).toEqual(200);
  });

  it('should UPDATE one from foods data', async () => {
    const bearerResponse = await request
    .put('/api/quotes/1').send({source: 'your mom'})
    .set('Authorization', `Bearer ${token}`);
    expect(bearerResponse.status).toEqual(202);
  });

  it('should DELETE one from foods data', async () => {
    const bearerResponse = await request
    .delete('/api/quotes/1')
    .set('Authorization', `Bearer ${token}`);
    expect(bearerResponse.status).toEqual(204);
  });
});