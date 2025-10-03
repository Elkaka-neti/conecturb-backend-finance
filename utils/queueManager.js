const { Queue, Worker } = require('bullmq');
const Redis = require('ioredis');

const connection = new Redis();

const globalQueue = new Queue('globalQueue', { connection });

// Worker para processar jobs da fila
const worker = new Worker('globalQueue', async (job) => {
  
  if (job.name === 'entrega') {
    // TODO: Processar entrega
    console.log('Processando entrega:', job.data);

  } else if (job.name === 'compra') {

    // TODO: Processar compra
    console.log('Processando compra:', job.data);

  }
}, { connection });

module.exports = globalQueue;