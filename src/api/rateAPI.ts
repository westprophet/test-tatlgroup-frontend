import axios from 'axios';

import {baseApiURL} from '../config/api.config';
import IRate from "../interfaces/IRate";

// Получение всех пропусков
export async function getRate(schoolboy_id=null): Promise<{
    Items: Array<IRate>;
    Quantity: number;
}> {
    try {
        const r =  await axios.get(`${baseApiURL}/rate`,{
            params: {
                SchoolboyId: schoolboy_id
            },
        });
        return r.data;
    } catch (err) {
        return Promise.reject(err.message);
    }
}

//Удаление пропуска по ученику
//Сервер должен возвращать статус
export async function unRate(schoolboy_id: string, column_id: string): Promise<number> {
    try {
       const res =  await axios.post(`${baseApiURL}/UnRate`,{
            SchoolboyId: schoolboy_id,
            ColumnId: column_id
        });
       return res.status;
    } catch (err) {
        return Promise.reject(err.message);
    }
}


//Выставление пропуска по ученику
//Сервер должен возвращать статус
export async function addRate(schoolboy_id:string, column_id: string): Promise<number> {
    try {
        const res = await axios.post(`${baseApiURL}/rate`,{
            SchoolboyId: schoolboy_id,
            ColumnId: column_id,
            Title: 'H'
        });
        return res.status;
    } catch (err) {
        return Promise.reject(err.message);
    }
}
