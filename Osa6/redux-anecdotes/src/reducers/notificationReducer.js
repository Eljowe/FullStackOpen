import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    notificationtext: "",
    time: "",
}

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotification(state, action) {
            if (state.time !== "") {
                clearTimeout(state.time)
            }
            state.notificationtext = action.content.notificationtext
            state.time = action.payload.time
        },
        clearNotification() {
            return initialState
        }
    }
})

export const { addNotification, clearNotification } = notificationSlice.actions;

export const showNotification = (notificationtext) => {
    return (dispatch) => {
        const time = setTimeout(() => {
            dispatch(clearNotification());
          }, 3000);
        const notification = { notificationtext, time };
        dispatch(addNotification(notification));
    }
}


export default notificationSlice.reducer;