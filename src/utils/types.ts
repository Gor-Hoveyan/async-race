export type CarType = {
    name: string,
    color: string
    id: number
};

export type CreateCarParams = {
    name: string,
    color: string
}

export type UpdateCarParams = {
    name: string,
    color: string,
    id: number
}

export type HandleEngineType = {
    id: number,
    status: 'started' | 'stopped'
}

export type EngineParams = {
    velocity: number,
    distance: number,
    id: number,
    started: boolean
}

export type HandleDriveResponse = {
    success: boolean
}

export type GetWinnersParams = {
    _page: number,
    _limit: number,
    _sort: 'id' | 'wins' | 'time',
    _order?: 'ASC' | 'DESC'
}

export type CreateWinnerParams = {
    id: number,
    wins: number,
    time: number
}

export type WinnerData = {
    id: number,
    wins: number,
    time: number
}

export type GarageWinnerData = {
    id: number,
    time: number,
    name: string,
}

export type UpdateWinnerData = {
    wins: number,
    time: number,
    id: number
}