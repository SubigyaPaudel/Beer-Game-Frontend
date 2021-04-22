import { SET_MESSAGE, CLEAR_MESSAGE } from '../constants/userConstants';

const initialState = {};

// Message reducer
export default function (state = initialState, action) {
    const { type, payload } = action;

    // Set message depending on request
    switch (type) {
        case SET_MESSAGE:
            return { message: payload };

        case CLEAR_MESSAGE:
            return { message: '' };

        default:
            return state;
    }
}