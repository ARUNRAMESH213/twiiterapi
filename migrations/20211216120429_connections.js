
exports.up = function(knex) {
  
    return knex.schema.createTable("connection",(t)=>{
        t.increments();
        t.integer("user_id")
        .unsigned()
        .notNullable()
        .references("users.id")
        .onDelete("CASCADE");
        t.integer("connect_id").notnullable()
        t.unique("users.id","connect_id");
    })

    
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("connection")
  
};
