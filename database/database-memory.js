import { randomUUID } from 'node:crypto'

export class DatabaseMemory {
    #titulos = new Map()

    list() {
        return Array.from(this.#titulos.entries())
            .map((tituloArray) => {
                const id = tituloArray[0]
                const data = tituloArray[1]

                return {
                    id,
                    ...data
                }
            })
    }

    create(titulo) {
        const tituloId = randomUUID()

        this.#titulos.set(tituloId, titulo)
    }

    update(id, titulo) {
        this.#titulos.set(id, titulo)
    }

    delete(id) {
        this.#titulos.delete(id)
    }
}