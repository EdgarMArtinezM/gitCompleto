import knex from "knex";
const server=knex({
    client:         'mysql',
    connection:{
        host:       'localhost',
        port:       8889,
        user:       'root',
        password:   'root',
        database:   'products'
    }
})

export default server;