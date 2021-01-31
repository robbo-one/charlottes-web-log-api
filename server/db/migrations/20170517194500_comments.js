exports.up = (knex) => {
  return knex.schema.createTable('Comments', (table) => {
    table.increments().primary()
    table.integer('postId').references('Posts.id')
    table.date('datePosted')
    table.string('comment')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('Comments')
}
