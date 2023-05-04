import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists('deal_item', (table) => {
    table.text('item_code').primary();
    table.integer('times_removed').notNullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('deal_item');
}

