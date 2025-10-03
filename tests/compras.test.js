jest.mock('../utils/queueManager');
const request = require('supertest');
const app = require('../index');

jest.mock('../utils/queueManager');

describe('Post /compras.', () => {
  it('Deve realizar com sucesso a compra.', async () => {
    const res = await request(app)
      .post('/compras')
      .send({
    data: {
        id: "1234567890",
        loja_id: "0987654321",
        valor: 150.75,
        quantidade: 3
      }
    })
      .set('Accept', 'application/json');
    expect(res.statusCode).toBe(202);
    expect(res.body).toEqual({ mensagem: 'Compra realizada com sucesso, processamento em breve', status: 'pending'})
  });


  it('Deve falhar ao tentar realizar a compra com dados faltando.', async() => {
    const res = await request(app)
      .post('/compras')
      .send({
        data: {
          valor: 150.75,
          quantidade: 3
        }
      })
      .set('Accept', 'application/json');
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe('bad');
  })

  
  it('Deve falhar ao tentar realizar a compra com valor ou quantidade negativo.', async() => {
    const res = await request(app).post('/compras')
    .send({
    data: {
        id: "1234567890",
        loja_id: "0987654321",
        valor: -3,
        quantidade: 0
      }
    })
    .set('Accept', 'application/json');
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe('bad');

  })
});