import IRate from "../../interfaces/IRate";

export const types = {
    SET_RATE: 'rate/SET_RATE',
};
const init:Array<IRate> = [];

export default function rateReducer(state= init, action: { type: any; payload: Array<IRate>; }) {
    const { type, payload } = action;
    if (type === types.SET_RATE) {
        return payload;
    }
    return state;
}

export const actions = {
    setRate: (items:Array<IRate>) => ({ type: types.SET_RATE, payload: items }),
};
