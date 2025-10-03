const request = require('supertest');
const app = require("../index");

describe('POST /entregas', () => {

it('Deve retornar com sucesso a requisição e salva-la', async() => {
     const res = await request(app)
      .post('/entregas')
      .send({
    data: {
        id: 892382948,
        loja_id: 987654321,
        distance: 12,
        horario: '12:30 12/12/2023',
        valor_corrida: 3.49
      }
    })
      .set('Accept', 'application/json');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ mensagem: 'Entrega realizada com sucesso', status: 'ok'})
  });

  it('Deve retornar erro 400 para requisição com distancia negativa', async() => {
    const res = await request(app)
     .post('/entregas')
     .send({
   data: {
       id: 892382948,
       loja_id: 987654321,
       distance: -12,
       horario: '12:30 12/12/2023',
       valor_corrida: 3.49
     }
   })
     .set('Accept', 'application/json');
   expect(res.statusCode).toBe(400);
   expect(res.body.status).toBe('bad');
  });


  })
