import { knex as setupKnex } from 'knex';

export const knex = setupKnex({
  client: 'sqlite',
  connection: {
    filename: './tmp/app.db',
    flags: ['OPEN_URI', 'OPEN_SHAREDCACHE'],
  },
});
