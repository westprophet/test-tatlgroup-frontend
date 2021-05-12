import IColumn from "../../interfaces/IColumn";

export const types = {
    SET_COLUMN: 'column/SET_COLUMN',
};
const init:Array<IColumn> = [];

export default function columnsReducer(state= init, action: { type: any; payload: Array<IColumn>; }) {
    const { type, payload } = action;
    if (type === types.SET_COLUMN) {
        return payload;
    }
    return state;
}

export const actions = {
    setRate: (items:Array<IColumn>) => ({ type: types.SET_COLUMN, payload: items }),
};
