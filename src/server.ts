import fastify from 'fastify';
import crypto from 'node:crypto';
import { knex } from './database';

const app = fastify();

app.get('/hello', async () => {
  // CREATE
  // const transaction = await knex('transactions')
  //   .insert({
  //     id: crypto.randomUUID(),
  //     title: 'Transação de teste',
  //     amount: 1000,
  //   })
  //   .returning('*');

  // SELECT
  const transaction = await knex('transactions').select('*');
  return transaction;
});

app.listen({ port: 3000 }).then(() => {
  console.log('Server is running on port 3000');
});
