import z from 'zod';
import { FastifyInstance } from 'fastify';
import { knex } from '../database';
import { randomUUID } from 'node:crypto';

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    // SELECT
    const transaction = await knex('transactions').select('*');
    return transaction;
  });

  app.post('/', async (request, reply) => {
    // CREATE
    const createTransactionSchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    });

    const { amount, title, type } = createTransactionSchema.parse(request.body);

    const transaction = await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
    });

    return reply.status(201).send(transaction);
  });
}
