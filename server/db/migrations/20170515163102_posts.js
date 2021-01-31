exports.up = (knex) => {
  return knex.schema.createTable('Posts', (table) => {
    table.increments().primary()
    table.string('title')
    table.date('dateCreated')
    table.integer('commentCount').defaultsTo(0)
    table.string('paragraphs')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('Posts')
}
