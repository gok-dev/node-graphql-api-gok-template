import * as Knex from "knex";

exports.seed = async function (knex: Knex) {
  return knex("users").del()
    .then(async function () {
      return await knex("users").insert([{
        name: "Admin",
        email: "admin@teste.com",
        telephone: "11900000000",
        password: ""
      }]);
    })
}
