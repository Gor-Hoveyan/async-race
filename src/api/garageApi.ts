import { CreateCarParams, UpdateCarParams } from "../utils/types";

async function getAllCars() {
    try {
        const data = await fetch(`http://localhost:3000/garage`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await data.json();
    } catch (e) {
        console.log(e);
    }
}

async function getSevenCars(page: number) {
    try {
        const data = await fetch(`http://localhost:3000/garage?_page=${page}&_limit=7`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await data.json();
    } catch(e) {
        console.log(e);
    }   
}

async function getOneCar(id: number) {
    try {
        const data = await fetch(`http://localhost:3000/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await data.json();
    } catch(e) {
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
        const data = await fetch(`http://localhost:3000/garage${id}`, {
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

export const garageApi = { getAllCars, createCar, deleteCar, getSevenCars, getOneCar, updateCar };