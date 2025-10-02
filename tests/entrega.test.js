const request = require('supertest');
const app = require("../index");

describe('POST /entrega', () => {

it('Deve retornar com sucesso a requisição e salva-la', async() => {
     const res = await request(app)
      .post('/entrega')
      .send({
    data: {
        id: 892382948,
        loja_id: 987654321,
        distance: 12,
        horario: 'guygyugyu',
        valor_corrida: 3.49
      }
    })
      .set('Accept', 'application/json');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ mensagem: 'Entrega realizada com sucesso', status: 'ok'})
  });

})