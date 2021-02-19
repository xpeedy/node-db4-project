
exports.up = function(knex) {
  return knex.schema
  .createTable("recipes", table => {
      table.increments("recipe_id")
      table.string("recipe_name",128).notNullable()
  })
  .createTable("ingredients",table => {
      table.increments()
      table.string("ingredients_name",128).notNullable()
  })
  .createTable("steps",table => {
      table.increments()
      table.text("steps",128).notNullable()
      table.integer("instruction_step").unsigned().notNullable()
      table.integer("recipe_id")
      .unsigned()
      .notNullable()
      .references("recipe_id")
      .inTable("recipes")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
    })
    .createTable("recipe_ingredients",table => {
      table.increments("recipe_ingredients_id")
      table.integer('recipe_id')
      .unsigned()
      .references('id').inTable('recipes')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
      table.integer('ingredient_id')
      .unsigned()
      .notNullable()
      .references('id').inTable('ingredients')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
      table.float('ingredient_qty')
      .unsigned()
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("recipe_ingredients")
    .dropTableIfExists("steps")
    .dropTableIfExists("ingredients")
    .dropTableIfExists("recipes")
};
