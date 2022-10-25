import { createSlice } from "@reduxjs/toolkit";

const initialHome = {
    view: 0,
    runPost: []
}

const home = createSlice({
    name: 'home',
    initialState: initialHome,
    reducers: {
        addView: (state, action) => {
            // const newPhoto = action.payload;
            state.view = state.view + action.payload;
        },
        updateView: (state, action) => {
            state.view = action.payload;
        },
        updateRunPosts: (state, action) => {
            state.runPost = action.payload;
        }
    }
});

const { reducer, actions } = home;
export const { addView, updateView, updateRunPosts } = actions;
export default reducer;