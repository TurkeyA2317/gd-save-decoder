interface KVNumberString {
    [key: number]: string
}

interface GDSavekCEK{
    kCEK: number
}

export interface GDSaveDailyReward extends GDSavekCEK{
    1: number,
    2: number,
    3: any
}

export interface GDSaveAchievements {
    [key: string]: string
}

export interface GDSaveBronzeUserCoins {
    [key: string]: string
}

export interface GDSaveCompletedLevels {
    [key: string]: "0" | "1"
}

export interface GDSaveCreatedLevelFolders extends KVNumberString {}
export interface GDSaveDailyProgress extends KVNumberString {}
export interface GDSaveDailyStars extends KVNumberString {}

export interface GDSaveDailyRewards{
    [key: string]: GDSaveDailyReward
}

export interface GDSaveOnlineLevel extends GDSavekCEK{
    attempts: number,
    id: number,
    jumps: number,
    percentage: number,
    practicePercentage: number,
    manaOrbPercentage?: number,
    stars?: number,

    playable?: boolean,
}

export interface GDSaveOnlineLevelSaved extends GDSaveOnlineLevel{
    accountID: number,
    author: string,
    binaryVersion: number,
    copiedID: number,
    downloads: number,
    extraString: string,
    gameVersion: number,
    length: string,
    levelType: string,
    likes: number,
    name: string,
    objects: number,
    officialSongID: number,
    playerID: number,
    ratingScore1: number,
    ratingScore2: number,
    requestedStars: number,
    savedLevelIndex: number,
    version: number,
    scores: string,
    leaderboardPercentage: number,
    leaderboardValid: boolean
}

export interface GDSaveOnlineLevels {
    [key: number]: GDSaveOnlineLevel | GDSaveOnlineLevelSaved
}

export interface GDSave {
    accountID: number,
    achievements: GDSaveAchievements,
    bgVolume: number
    binaryVersion: number
    bootups: number,
    bronzeUserCoins: GDSaveBronzeUserCoins,
    clickedEditor: boolean
    clickedIconKit: boolean
    clickedName: boolean
    clickedPractice: boolean,
    completedLevels: GDSaveCompletedLevels,
    createdLevelFolders: GDSaveCreatedLevelFolders,
    customObjects: string, //can this be an object when there are some?
    dailyID: string,
    dailyProgress: GDSaveDailyProgress,
    dailyProgress2: GDSaveDailyProgress,
    dailyRewards: GDSaveDailyRewards,
    dailyStars: GDSaveDailyStars,

    onlineLevels: GDSaveOnlineLevels
}