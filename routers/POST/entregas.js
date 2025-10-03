module.exports = (req, res) => {

    /*
    queremos que o corpo da requisição seja algo como
{
data: {
  'id': '123456788',
  'loja_id': '0987654321',
  'distance': 10.5,
  'horario': '2023-10-05T14:48:00.000Z',
  'valor_corrida': 3.50
}
    */
  if (!req.body || !req.body.data) {
   return res.status(400).json({ message: 'Requisição inválida: corpo ausente ou formato incorreto', status: 'bad' });
  }

   const {id, loja_id, distance, horario, valor_corrida } = req.body.data;

  if (!loja_id || typeof distance !== 'number' || !horario || typeof valor_corrida !== 'number') {
   return res.status(400).json({ message: 'Requisição inválida: dados obrigatórios ausentes ou formato incorreto', status: 'bad' });
  }

  if (distance <= 0 || valor_corrida <= 0) {
   return res.status(400).json({ message: 'Requisição inválida: distância e valor da corrida devem ser positivos', status: 'bad' });
  }
  if (!loja_id || typeof distance !== 'number' || !horario || typeof valor_corrida !== 'number') {
   return res.status(400).json({ message: 'Requisição inválida: dados obrigatórios ausentes ou formato incorreto', status: 'bad' });
  }


/*
req.body.data.id
req.body.data.loja_id
req.body.data.valor
req.body.data.quantidade
*/

// Alguma logica para transformar em peso a distancia e valor da corrida

console.log("Entrega para a loja " + loja_id + " com distância de " + distance.toFixed(2) + " km, no horário " + horario + " totalizando R$ " + valor_corrida.toFixed(2));

//logica de bd

  res.status(200).json({mensagem: 'Entrega realizada com sucesso', status: 'ok'});
};
