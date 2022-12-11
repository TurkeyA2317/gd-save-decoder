/**
 * A weakly typed representation of the parsed Save file.
 * Contains everything, but is messy.
 */
export interface GDRawSave {
    valueKeeper: any,
    unlockValueKeeper: any,
    customObjects: any,
    bgVolume: number,
    sfxVolume: number,
    playerUDID: string,
    playerName: string,
    playerID: number,
    playerFrame: number,
    playerShip: number,
    playerBall: number,
    playerBird: number,
    playerDart: number,
    playerRobot: number,
    playerSpider: number,
    playerColor: number,
    playerColor2: number,
    playerStreak: number,
    playerDeathEffect: number,
    achievements: any,
    officialLevels: any,
    onlineLevels: any,
    timelyLevels: any,
    dailyID: number,
    weeklyID: number,
    gauntlets: any,
    recentlyPlayed: any,
    reportedLevels: any,
    likes: any,
    ratedLevels: any,
    ratedDemons: any,
    followedAccounts: any,
    enabledSearchFilters: any,
    levelFolders: any,
    createdLevelFolders: any,
    stats: any,
    completedLevels: any,
    userCoins: any,
    bronzeUserCoins: any,
    mapPackStars: any,
    shopPurchases: any,
    levelProgress: any,
    levelStars: any,
    officialLevelProgress: any,
    dailyProgress: any,
    dailyStars: any,
    gauntletProgress: any,
    dailyProgress2: any,
    dailyRewards: any,
    gdWorldRewards: any,
    weeklyRewards: any,
    quests: any,
    queuedQuests: any,
    questRewards: any,
    treasureRoomRewards: any,
    totalDemonKeys: number,
    rewards: any,
    songInfo: any,
    songPriority: number,
    username: string,
    accountID: number,
    keybinds: any,
    keybinds2: any,
    showSongMarkers: boolean,
    showProgressBar: boolean,
    clickedIconKit: boolean,
    clickedEditor: boolean,
    clickedName: boolean,
    clickedPractice: boolean,
    showedEditorGuide: boolean,
    showedRateStarDialog: boolean,
    showedLowDetailDialog: boolean,
    bootups: number,
    hasRatedGame: boolean,
    binaryVersion: number,
    resolution: number
}

export interface GDSavePlayerIconKit{
    cube: number,
    ship: number,
    ball: number,
    bird: number,
    dart: number,
    robot: number,
    spider: number,

    color1: number,
    color2: number,

    deathEffect: number
}

export interface GDSavePlayer{
    username: string,
    /** ID of registered player */
    accountID?: number,
    /** Every Player gets a PlayerID, green and yellow players */
    playerID: number,
    udid: string,

    iconKit: GDSavePlayerIconKit
}

export interface GDSaveEvents {
    /** If Player clicked rate on Google Play / iTunes */
    hasRatedGame: boolean,
    clickedEditor: boolean,
    clickedIconKit: boolean,
    clickedPractice: boolean,
    /** In-Game determines if "What's your name?" is shown */
    clickedName: boolean,

    bootups: number,

    showedEditorGuide: boolean,
    showedLowDetailDialog: boolean,
    showedRateStarDialog: boolean
}

export interface GDSaveStats {
    attempts: number,
    jumps: number,
    coins: number,
    stars: number,
    demons: number,
    diamonds: number,
    levels: {
        rated: number,
        liked: number
    },
    completed: {
        dailies: number,
        official: number,
        online: number,
        mapPacks: number
    },
    shards: {
        fire: number,
        lava: number,
        ice: number,
        poison: number,
        shadow: number
    },
    orbs: number,
    totalOrbs: number,
    destroyedPlayers: number
}