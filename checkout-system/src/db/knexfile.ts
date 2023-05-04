import type { Knex } from "knex";
import path from 'node:path';

// Update with your config settings.

const config: Knex.Config = {
  client: 'pg',
  connection: 'postgresql://postgres:password@read_model_db:5433',
  searchPath: ['knex', 'public'],
  migrations: {
    extension: 'ts',
    tableName: 'cart_migrations',
    directory: path.join(__dirname, 'migrations')
  }
};

export default config;
