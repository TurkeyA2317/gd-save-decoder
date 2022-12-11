import { GDRawSave, GDSaveEvents, GDSavePlayer, GDSaveStats } from "./models";

export default class GDSave{
    player: GDSavePlayer;
    events: GDSaveEvents;
    stats: GDSaveStats

    constructor(raw: GDRawSave){
        this.player = {
            playerID: raw.playerID,
            accountID: raw.accountID,
            udid: raw.playerUDID,
            username: raw.username,
            iconKit: {
                cube: raw.playerFrame,
                ship: raw.playerShip,
                ball: raw.playerBall,
                bird: raw.playerBird,
                dart: raw.playerDart,
                robot: raw.playerRobot,
                spider: raw.playerSpider,
                color1: raw.playerColor,
                color2: raw.playerColor2,
                deathEffect: raw.playerDeathEffect
            }
        };

        this.events = {
            bootups: raw.bootups,
            clickedEditor: raw.clickedEditor,
            clickedIconKit: raw.clickedIconKit,
            clickedName: raw.clickedName,
            clickedPractice: raw.clickedPractice,
            hasRatedGame: raw.hasRatedGame,
            showedEditorGuide: raw.showedEditorGuide,
            showedLowDetailDialog: raw.showedLowDetailDialog,
            showedRateStarDialog: raw.showedRateStarDialog
        };

        this.stats = {
            attempts: raw.stats.attempts,
            coins: raw.stats.coins,
            completed: {
                dailies: raw.stats.completedDailies,
                mapPacks: raw.stats.mapPacks,
                official: raw.stats.officialLevelsCompleted,
                online: raw.stats.onlineLevelsCompleted
            },
            demons: raw.stats.demons,
            diamonds: raw.stats.diamonds,
            jumps: raw.stats.jumps,
            levels: {
                liked: raw.stats.likedLevels,
                rated: raw.stats.ratedLevels
            },
            orbs: raw.stats.orbs,
            destroyedPlayers: raw.stats.destroyedPlayers,
            shards: {
                fire: raw.stats.fireShards,
                ice: raw.stats.iceShards,
                lava: raw.stats.lavaShards,
                poison: raw.stats.poisonShards,
                shadow: raw.stats.shadowShards
            },
            stars: raw.stats.stars,
            totalOrbs: raw.stats.totalOrbs
        };
    }
}