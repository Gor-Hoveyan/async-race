import { CreateWinnerParams, GetWinnersParams, UpdateWinnerData } from "../utils/types";

async function getWinners({ _page, _limit, _sort, _order }: GetWinnersParams) {
    try {
        if (_order) {
            const data = await fetch(`http://localhost:3000/winners?_page=${_page}&_limit=${_limit}&_sort=${_sort}&_order=${_order}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            return await data.json();
        } else {
            const data = await fetch(`http://localhost:3000/winners?_page=${_page}&_limit=${_limit}&_sort=${_sort}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            return await data.json();
        }

    } catch (e) {
        console.log(e);
    }
}

async function getWinner(id: number) {
    try {
        const data = await fetch(`http://localhost:3000/winners/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return await data.json();
    } catch (e) {
        console.log(e);
    }
}

async function createWinner({ id, wins, time }: CreateWinnerParams) {
    try {
        const data = await fetch(`http://localhost:3000/winners`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id, wins, time})
        });

        return await data.json();
    } catch (e) {
        console.log(e);
    }

}

async function deleteWinner(id: number) {
    try {
        await fetch(`http://localhost:3000/winners/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
    } catch (e) {
        console.log(e);
    }
}

async function updateWinner({id, wins, time}: UpdateWinnerData) {
    try {
        const data = await fetch(`http://localhost:3000/winners/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id, wins, time})
        });

        return await data.json();
    } catch (e) {
        console.log(e);
    }

}

export const winnersApi = { getWinners, getWinner, createWinner, deleteWinner, updateWinner };