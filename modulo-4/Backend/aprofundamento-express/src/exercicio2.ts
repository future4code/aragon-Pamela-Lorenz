import exp from "constants"

export type Afazer = {
    userId: string,
    id: number,
    description: string,
    completed: boolean
}

export const afazeres: Afazer[] = [
    {
        userId: "u1",
        id: 1,
        description: "Fazer os exercicios do dia.",
        completed: false
    },
    {
        userId: "u2",
        id: 2,
        description: "Lavar a louça.",
        completed: false
    },
    {
        userId: "u3",
        id: 3,
        description: "Almoçar.",
        completed: true
    },
    {
        userId: "u4",
        id: 4,
        description: "Buscar a criança na escolinha.",
        completed: false
    },
    {
        userId: "u5",
        id: 5,
        description: "Jantar.",
        completed: false
    }
]

