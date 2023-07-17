'use strict'

const fp = require('fastify-plugin')

const {
    DATABASE_USERS,
    DATABASE_PASSWORD,
    DATABASE_HOSTS,
    DATABASE_NAMES
} = process.env

module.exports = fp(async function (fastify, opts) {
    fastify.register(require('@fastify/postgres'), {
        connectionString: `postgres://${DATABASE_USERS}:${DATABASE_PASSWORD}@${DATABASE_HOSTS}/${DATABASE_NAMES}`
      })
})
