export enum DemonType {
    UNKNOWN = 0,
    HARD = 1,
    UNKNOWN_2 = 2,
    EASY = 3,
    MEDIUM = 4,
    INSANE = 5,
    EXTREME = 6
}

export interface GDLevelData {
    id: number,
    stars?: number,
    percentage: number,
    demonType?: number
}

export default class GDLevel{
    id: number;
    /** The Stars of a Level rated by RobTop. If null, the Level is not rated */
    stars: number | null;
    percentage: number;
    /** The Demon Difficulty. This is null if the level isn't Demon or unrated */
    demonType: DemonType | null;

    constructor({id, stars, percentage, demonType}: GDLevelData){
        this.id = id;
        this.stars = stars ?? null;
        this.percentage = percentage;
        this.demonType = demonType ?? null;
    }

    get isDemon(){
        return this.stars === 10;
    }

    get isRated(){
        return this.stars !== null;
    }

    get isCompleted(){
        return this.percentage >= 100;
    }
}