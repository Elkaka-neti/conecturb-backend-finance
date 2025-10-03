const { Queue, Worker } = require('bullmq');
const Redis = require('ioredis');

const connection = new Redis({
  maxRetriesPerRequest: null,
  host: "127.0.0.1", 
  port: 6379
});

const filaGlobal = new Queue('filaG', { connection });

// Worker para processar jobs da fila
const worker = new Worker('filaG', async (job) => {
  
  if (job.name === 'entrega') {
    // TODO: Processar entrega
    console.log('Processando entrega:', job.data);

  } else if (job.name === 'compra') {

    // TODO: Processar compra
    console.log('Processando compra:', job.data);

  }
}, { connection });

module.exports = filaGlobal;