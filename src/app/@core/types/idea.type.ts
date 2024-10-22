export type Idea = {
    id: number,
    userId: number,
    campaignId: number,
    departmentId: number,
    typeOfIdeaId: number,
    title: string,
    idea: string,
    implemented: boolean,
    campaign?: {
        thumbnail: string
    },
    department?: {
        name: string
    },
    typeOfIdea?: {
        name: string
    }
}

export type viewType = 'USER' | 'ADMIN'
