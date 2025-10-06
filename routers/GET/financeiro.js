module.exports = (req, res) => {
 
let {storeId, startDate, endDate} = req.query;

if(!storeId) {
    return res.status(400).json({message: 'Parâmetro storeId é obrigatório', status: 'error'});
}
if(!startDate || !endDate) {
    startDate = new Date().toISOString().split('T')[0];
    endDate = startDate;
}




}