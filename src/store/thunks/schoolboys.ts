import { getSchoolboys } from '../../api/schoolboysAPI';
import { actions } from "../reducers/schoolboysReducer";

export const getSchoolboysThunk = () => async (
    dispatch: (arg0: { type: string; payload: any }) => void
) => {
    getSchoolboys()
        .then((res: any) => {
            if (!res) return 0;
            dispatch(actions.setSchoolboys(res.data.items));
        })
        .catch((e) => {
            console.log(e.message);
        });
};
export default getSchoolboysThunk;
