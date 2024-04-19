import { CreateCarParams, HandleEngineType, UpdateCarParams } from "../utils/types";

async function handleEngine({ id, status }: HandleEngineType) {
    try {
        const data = await fetch(`http://localhost:3000/engine?id=${id}&status=${status}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return await data.json();
    } catch (e) {
        console.log(e);
    }
}

async function handleDrive(id: number) {
    try {
        const data = await fetch(`http://localhost:3000/engine?id=${id}&status=drive`, {
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

async function createCar({ name, color }: CreateCarParams) {
    try {
        const data = await fetch(`http://localhost:3000/garage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, color })
        });
        return await data.json();
    } catch (e) {
        console.log(e);
    }
}

async function deleteCar(id: number) {
    try {
        await fetch(`http://localhost:3000/garage/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
    } catch (e) {
        console.log(e);
    }
}

async function updateCar({ name, color, id }: UpdateCarParams) {
    try {
        const data = await fetch(`http://localhost:3000/garage/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, color })
        });
        return await data.json();
    } catch (e) {
        console.log(e);
    }
}

export const carApi = { handleEngine, handleDrive, createCar, deleteCar, updateCar }