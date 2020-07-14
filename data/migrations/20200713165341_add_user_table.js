exports.up = function (knex) {
  return knex.schema
    .createTable("user", (table) => {
      table.increments();
      table.string("username").unique().notNullable();
      table.string("email").notNullable();
      table.text("password").notNullable();
    })
    .alterTable("post", (table) => {
      table.integer("user_id").unsigned();
      table
        .foreign("user_id")
        .references("id")
        .inTable("user")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .alterTable("post", (table) => {
      table.dropColumn("user_id");
    })
    .dropTableIfExists("user");
};
