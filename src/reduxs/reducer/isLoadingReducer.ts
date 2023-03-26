import { SET_LOADING, ActionProps } from "../types/types";
const initialState = {
    isloading: true,
};


export default (state = initialState, { payload, type }: ActionProps) => {
    switch (type) {
        case SET_LOADING:
            return {
                ...state,
                isloading: payload,
            };
        default:
            return state;
    }
}
