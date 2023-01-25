import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    notificationtext: "",
    time: "",
}

const notificationSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
    addNotification(state, action) {
        if (state.time !== "") {
            clearTimeout(state.time);
        }
        state.message = action.payload.notificationtext;
        state.time = action.payload.timeoutID;
    },
    clearNotification() {
        return initialState;
    },
  },
})

export const { addNotification, clearNotification } = notificationSlice.actions;

export const showNotification = (notificationtext, time) => {
    return async (dispatch) => {
        const timeoutID = setTimeout(() => {
          dispatch(clearNotification());
        }, time * 1000);
        const notification = { notificationtext, timeoutID };
        dispatch(addNotification(notification, time));
      };
}


export default notificationSlice.reducer;