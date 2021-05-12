import axios from 'axios';

import {baseApiURL} from '../config/api.config';
import ISchoolboy from "../interfaces/ISchoolboy";

export async function getSchoolboys(): Promise<{
    Items: Array<ISchoolboy>;
    Quantity: number;
}> {
    try {
        const r =  await axios.get(`${baseApiURL}/schoolboys`);
        return r.data;
    } catch (err) {
        return Promise.reject(err.message);
    }
}
