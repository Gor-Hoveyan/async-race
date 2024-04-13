import { HandleEngineType } from "../utils/types";

async function handleEngine({ id, status }: HandleEngineType) {
    try {
        const data = await fetch(`http://localhost:3000/engine/id=${id}/status=${status}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await data.json();
    } catch (e) {
        console.log(e);
    }
}

async function handleDrive(id: number) {
    try {
        const data = await fetch(`http://localhost:3000/engine/id=${id}/status=drive`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await data.json();
    } catch (e) {
        console.log(e);
    }
}

export const carApi = { handleEngine, handleDrive }