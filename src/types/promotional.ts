export interface Promotional {
    id: number,
    titre: string,
    description: string | null,
    urlImage: string,
    link: string | null,
    isActivate: boolean,
    dateCreate: Date,
    dateUpdate: Date
}