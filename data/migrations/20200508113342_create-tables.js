exports.up = function (knex) {
  return knex.schema
    .createTable("post", (table) => {
      table.increments();
      table.string("title").notNullable().index();
      table.text("content").notNullable();
      table.datetime("created_at").defaultTo(knex.fn.now());
    })
    .createTable("comment", (table) => {
      table.increments();
      table.string("display_name").notNullable();
      table.text("body").notNullable();
      table.datetime("created_at").defaultTo(knex.fn.now());
      table.integer("post_id").unsigned();
      table
        .foreign("post_id")
        .references("post.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("comment").dropTableIfExists("post");
};
