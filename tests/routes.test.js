const request = require('supertest');
const express = require('express');

const app = require('../index'); 

describe('Testes das rotas', () => {
  it('GET /users deve responder 200', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Usuários GET');
  });
});
