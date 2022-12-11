import { GDRawSave, GDSaveEvents, GDSavePlayer } from "./models";

export default class GDSave{
    player: GDSavePlayer;
    events: GDSaveEvents;

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
    }
}