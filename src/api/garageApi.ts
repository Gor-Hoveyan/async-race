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

export const garageApi = { getAllCars, getOneCar };