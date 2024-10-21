export type RankType = 'center' | 'ranks';

export type RankItem = {
    name: string,
    count: number
}

export type RankUser = {
    total: number,
    percentageTotal: number,
    typeOfIdeas: {
        id: number,
        name: string,
        percentage: number,
        count: number
    }[]
}
