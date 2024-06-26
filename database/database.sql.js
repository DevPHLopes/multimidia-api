import { randomUUID } from 'node:crypto'
import { db } from './sql.js'

export class DatabaseSql {
    async list() {
        const titulos = await db.query`select * from titulos`
        return titulos.recordset
    }

    async create(titulo) {
        const tituloId = randomUUID()

        const { nome, estadual, brasileiro, copabrasil, libertadores, mundial } = titulo

        await db.query`insert into titulos (id, nome, estadual, brasileiro, copabrasil, libertadores, mundial) values
            (${tituloId}, ${nome}, ${estadual}, ${brasileiro}, ${copabrasil}, ${libertadores}, ${mundial})`
    }

    async update(id, titulo) {
        const { nome, estadual, brasileiro, copabrasil, libertadores, mundial } = titulo

        await db.query`update titulos set 
            clube = ${nome}, estadual = ${estadual}, brasileiro = ${brasileiro}, copabrasil = ${copabrasil},
            libertadores = ${libertadores}, mundial = ${mundial}
            where id = ${id}`
    }

    async delete(id) {
        console.log(`delete from titulos where id = '${id}'`)
        await db.query`delete from titulos where id = '${id}'`
    }
}