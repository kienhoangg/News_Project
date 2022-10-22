import { createSlice } from "@reduxjs/toolkit";

const initialHome = {
    view: 0
}

const home = createSlice({
    name: 'photos',
    initialState: initialHome,
    reducers: {
        addView: (state, action) => {
            // const newPhoto = action.payload;
            state.view = state.view + action.payload;
        },
        updateView: (state, action) => {
            state.view = action.payload;
        }
    }
});

const { reducer, actions } = home;
export const { addView, updateView } = actions;
export default reducer;