import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists('cart', table => {
    table.uuid('id').notNullable().primary();
    table.jsonb('data')
    table.string('checkout_date')
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.hasTable('cart').then(exists => {
    if(exists) {
      return knex.schema.dropTable('cart');
    }
  })
}

