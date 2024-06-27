import { fastify } from "fastify";
import cors from '@fastify/cors'

import { DatabaseMemory } from "./database/database-memory.js";
import { DatabaseSql } from "./database/database-sql.js";

const server = fastify();

await server.register(cors, {
    origin: '*',
    methods: ['GET']
})

// const database = new DatabaseMemory()
const database = new DatabaseSql()

server.get('/titulos', async () => {
    return await database.list()
})

server.post('/titulos', async (req, res) => {
    
    const { nome, estadual, brasileiro, copabrasil, libertadores, mundial } = req.body

    await database.create({
        nome,
        estadual,
        brasileiro,
        copabrasil,
        libertadores,
        mundial
    })

    return res.status(201).send()
})

server.put('/titulos/:id', async (req, res) => {
   const id = req.params.id
   const { nome, estadual, brasileiro, copabrasil, libertadores, mundial, } = req.body

   await database.update(id, {
       nome,
       estadual,
       brasileiro,
       copabrasil,
       libertadores,
       mundial
   })

   return res.status(204).send()
})

server.delete('/titulos/:id', async (req, res) => {
    const id = req.params.id
    await database.delete(id)
    return res.status(200).send()
})

server.listen({
    port: 3333
})