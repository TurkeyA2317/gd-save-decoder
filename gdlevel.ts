export interface GDLevelData {
    id: number,
    stars?: number,
    percentage: number
}

export default class GDLevel{
    id: number;
    /** The Stars of a Level rated by RobTop. If null, the Level is not rated */
    stars: number | null;
    percentage: number;

    constructor({id, stars, percentage}: GDLevelData){
        this.id = id;
        this.stars = stars ?? null;
        this.percentage = percentage;
    }

    get isRated(){
        return this.stars !== null;
    }

    get isCompleted(){
        return this.percentage >= 100;
    }
}