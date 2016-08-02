module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/brew_development',
    seeds: {
      directory: './seeds'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }
}
