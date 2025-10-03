const filaGlobal = require('../../utils/queueManager');

module.exports = async(req, res) => {

    /*
    queremos que o corpo da requisição seja algo como
{
data: {
  "id": "1234567890",
  loja_id: "0987654321",
  valor: 150.75,
  quantidade: 3
}
    */
   if (!req.body || !req.body.data) {
    return res.status(400).send('Requisição inválida: corpo ausente ou formato incorreto');
   }

   const { id, loja_id, valor, quantidade } = req.body.data;

   if (!id || !loja_id || typeof valor !== 'number' || typeof quantidade !== 'number') {
    return res.status(400).json({mensagem: 'Requisição inválida: dados obrigatórios ausentes ou formato incorreto', status: 'bad'});
   }

   if (valor <= 0 || quantidade <= 0) {
    return res.status(400).json({mensagem: 'Requisição inválida: valor e quantidade devem ser positivos', status: 'bad'});
   }

/*
req.body.data.id
req.body.data.loja_id
req.body.data.valor
req.body.data.quantidade
*/

//var value = valor * quantidade;
//console.log("Compra do produto " + id + " na loja " + loja_id + " no valor unitário de R$ " + valor.toFixed(2) + " com quantidade " + quantidade + " totalizando R$ " + value.toFixed(2));

//logica de bd
  await filaGlobal.add('compra', req.body.data);
  res.status(202).json({mensagem: 'Compra realizada com sucesso, processamento em breve', status: 'pending'});
};
