import * as Knex from "knex";

exports.up = function (knex: Knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("telephone").notNullable();
    table.string("password").notNullable();
    table.string("avatar");
    table.boolean("active").defaultTo(false);
    table.string("role").defaultTo("admin");
  })
}

exports.down = function (knex: Knex) {
  return knex.schema.dropTable("users");
}
