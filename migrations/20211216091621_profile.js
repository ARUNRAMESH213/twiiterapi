exports.up = function (knex) {
  return knex.schema.createTable("profile", (p) => {
    p.increments();
    p.string("username").notNullable().unique();
    p.string("password").notNullable().unique();
    p.string("name").notNullable();
    p.string("mail_id").notNullable().unique();
    p.string("dob").notNullable();
    p.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("profile");
};
