// Função utilitária para somar valores de um array de objetos
function sum(arr, key) {
    return arr.reduce((acc, item) => acc + (item[key] || 0), 0);
}

// Função para calcular média
function avg(arr, key) {
    if (!arr.length) return 0;
    return sum(arr, key) / arr.length;
}

// Função para calcular variação percentual
function percentChange(current, previous) {
    if (previous === 0) return null;
    return ((current - previous) / previous) * 100;
}

// Mock de dados de compras (simulando um banco)
const mockCompras = [
    { data: '2025-10-07', valor: 100 },
    { data: '2025-10-07', valor: 200 },
    { data: '2025-10-06', valor: 150 },
    { data: '2025-10-05', valor: 120 },
    { data: '2025-10-04', valor: 180 },
    { data: '2025-10-03', valor: 90 },
    { data: '2025-10-02', valor: 110 },
    { data: '2025-10-01', valor: 130 },
];

module.exports = (req, res) => {
    let { storeId, startDate, endDate, tipo } = req.query;

    // Validação básica
    if (!storeId) {
        return res.status(400).json({ message: 'Parâmetro storeId é obrigatório', status: 'error' });
    }

    // Datas padrão: hoje
    const today = new Date().toISOString().split('T')[0];
    if (!startDate) startDate = today;
    if (!endDate) endDate = startDate;

    // Filtro de compras por data
    const comprasHoje = mockCompras.filter(c => c.data === today);
    const comprasOntem = mockCompras.filter(c => c.data === getPreviousDate(today));
    const comprasSemana = mockCompras.filter(c => isInLastNDays(c.data, today, 7));

    // Ganho do dia
    const ganhoDia = sum(comprasHoje, 'valor');
    // Ganho do dia anterior
    const ganhoOntem = sum(comprasOntem, 'valor');
    // Porcentagem comparado ao dia anterior
    const variacao = percentChange(ganhoDia, ganhoOntem);
    // Média semanal
    const mediaSemana = avg(comprasSemana, 'valor');
    // Previsão de lucro (simples: média semanal * 7)
    const previsaoLucro = mediaSemana * 7;

    res.json({
        ganhoDia,
        ganhoOntem,
        variacao: variacao !== null ? variacao.toFixed(2) + '%' : 'N/A',
        mediaSemana: mediaSemana.toFixed(2),
        previsaoLucro: previsaoLucro.toFixed(2),
        status: 'ok',
    });
};

// Helpers
function getPreviousDate(dateStr) {
    const d = new Date(dateStr);
    d.setDate(d.getDate() - 1);
    return d.toISOString().split('T')[0];
}
function isInLastNDays(dateStr, refDateStr, n) {
    const d = new Date(dateStr);
    const ref = new Date(refDateStr);
    const diff = (ref - d) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff < n;
}