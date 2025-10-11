module.exports = (req, res) => {

  const {userType, id, limit, offset} = req.query;

  if (!userType || !['empresa', 'usuario', 'entregador'].includes(userType)) {
    return res.status(404).json({message: 'Dados invalidos, tipo de usuario não encontrado', status: 'bad' });
  }
  if(!id){
    return res.status(404).json({message: 'Dados invalidos, id não encontrado', status: 'bad' });
  }
  if(limit && isNaN(parseInt(limit))){
    return res.status(400).json({message: 'Dados invalidos, limit deve ser um número', status: 'bad' });
  }
  if(offset && isNaN(parseInt(offset))){
    return res.status(400).json({message: 'Dados invalidos, offset deve ser um número', status: 'bad' });
  }
  if(limit && parseInt(limit) > 100){
    return res.status(400).json({message: 'Dados invalidos, limit máximo é 100', status: 'bad' });
  }
  
  //SELECT * FROM compras WHERE ownerId = ${id} LIMIT ${limit || 50} OFFSET ${offset || 0}

/**
 * GET /compras
 * Lista compras, podendo filtrar por parâmetros (ex: data, empresa, valor mínimo, etc).
 * Exemplos de parâmetros: ?empresa_id=123&data_inicio=2023-10-01&data_fim=2023-10-31
 */
  // TODO: Buscar compras no banco de dados usando filtros recebidos em req.query
  // Exemplo de lógica:
  // const { empresa_id, data_inicio, data_fim, valor_minimo } = req.query;
  // Buscar compras que atendam aos filtros
  
// a ideia principal é sempre pedir um id de empresa, de usuario ou de entregador para evitar listas muito grandes
// e limitar o número de resultados retornados (ex: ?limit=50)

  res.json({ message: 'Lista de compras filtradas', status: 'ok', SQL: `SELECT * FROM compras WHERE ownerId = ${id} LIMIT ${limit || 50} OFFSET ${offset || 0}` });


}