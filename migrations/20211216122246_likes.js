exports.up = function (knex) {
  return knex.schema.createTable("likes", (t) => {
    t.integer("user_id")
      .unsigned()
      .notNullable()
      .references("users.id")
      .onDelete("CASCADE");
    t.integer("tweet_id")
      .unsigned()
      .notNullable()
      .references("tweets.id")
      .onDelete("CASCADE");
    t.timestamps();
    t.unique(["user_id","tweet_id"]);
    

  });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("likes")
};
