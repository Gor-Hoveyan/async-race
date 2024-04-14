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
    velocity: string,
    distance: number,
    id: number
}

export type HandleDriveResponse = {
    success: boolean
}