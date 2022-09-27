import { createSlice } from "@reduxjs/toolkit";

const initialMenu = {
    isOpen: [],
    opened: true
}

const adminMenu = createSlice({
    name: 'adminMenu',
    initialState: initialMenu,
    reducers: {
        menuOpen: (state, action) => {
            state.isOpen = [action.payload.id];
        },
        setMenu: (state, action) => {
            state.opened = action.payload.opened;
        }
    }
});

const { reducer, actions } = adminMenu;
export const { menuOpen, setMenu } = actions;
export default reducer;