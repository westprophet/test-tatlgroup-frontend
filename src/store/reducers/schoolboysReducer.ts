import ISchoolboy from "../../interfaces/ISchoolboy";

export const types = {
    SET_SCHOOLBOYS: 'schoolboys/SET_SCHOOLBOYS',
};
const init:Array<ISchoolboy> = [];

export default function schoolboysReducer(state= init, action: { type: any; payload: Array<ISchoolboy>; }) {
    const { type, payload } = action;
    if (type === types.SET_SCHOOLBOYS) {
        return payload;
    }
    return state;
}

export const actions = {
    setSchoolboys: (items:Array<ISchoolboy>) => ({ type: types.SET_SCHOOLBOYS, payload: items }),
};
