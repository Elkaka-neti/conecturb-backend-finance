module.exports = (req, res) => {

  const {userType, ownerId, limit, offset} = req.query;
  if(!userType || !['entregador', 'empresa'].includes(userType)) {
    return res.status(400).json({message: 'Parâmetro userType é obrigatório e deve ser "entregador" ou "empresa"', status: 'error'});
  }
  if(!ownerId) {
    return res.status(400).json({message: 'algum id de usuario deve ser fornecido é obrigatório', status: 'error'});
  }

/**
 * GET /entregas
 * Lista entregas, podendo filtrar por parâmetros (ex: entregador, empresa, data, distância mínima, etc).
 * Exemplos de parâmetros: ?entregador_id=456&empresa_id=123&data=2023-10-03
 */
  // TODO: Buscar entregas no banco de dados usando filtros recebidos em req.query
  // Exemplo de lógica:
  // const { entregador_id, empresa_id, data, distancia_minima } = req.query;
  // Buscar entregas que atendam aos filtros

  //SELECT * FROM entregas WHERE (entregador_id = ${id} OR empresa_id = ${id})
  res.json({ message: 'Lista de entregas filtradas', status: 'ok', entregas: [] });


}