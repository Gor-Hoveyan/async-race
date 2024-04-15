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