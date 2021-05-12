import axios from 'axios';

import {baseApiURL} from '../config/api.config';
import IColumn from "../interfaces/IColumn";

export async function getColumns(): Promise<{
    Items: Array<IColumn>;
    Quantity: number;
}> {
    try {
        const r =  await axios.get(`${baseApiURL}/column`);
        return r.data;
    } catch (err) {
        return Promise.reject(err.message);
    }
}
