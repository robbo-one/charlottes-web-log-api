exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('Comments').del()
    .then(() => {
      // Inserts seed entries
      return knex('Comments').insert([
        {
          id: 1,
          postId: 123,
          datePosted: new Date(Date.now()),
          comment: 'Great blog'
        },
        {
          id: 2,
          postId: 123,
          datePosted: new Date(Date.now()),
          comment: 'Really Great blog'
        },
        {
          id: 3,
          postId: 125,
          datePosted: new Date(Date.now()),
          comment: 'Extremely great blog'
        }
      ])
    })
}
