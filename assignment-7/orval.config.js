module.exports = {
  'bookstore-file': {
    input: 'https://develop-api.bookstore.dwarvesf.com/swagger/doc.json',
    output: {
      mode: 'tags-split',
      target: 'src/generated/bookstore.ts',
      schemas: 'src/generated/model',
      client: 'swr',
      mock: true,
      override: {
        mutator: {
          path: 'src/services/custom-instance.ts',
          name: 'customInstance',
        },
      },
    },
  },
}
