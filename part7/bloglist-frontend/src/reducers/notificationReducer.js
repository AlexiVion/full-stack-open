import { createSlice } from '@reduxjs/toolkit'

let timeoutId = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotificationState(state, action) {
      return action.payload
    },
    clearNotificationState() {
      return null
    }
  }
})

export const { setNotificationState, clearNotificationState } = notificationSlice.actions

export const setNotification = (message, type = 'info', seconds = 5) => {
  return dispatch => {
    if (timeoutId) clearTimeout(timeoutId)
    dispatch(setNotificationState({ message, type }))
    timeoutId = setTimeout(() => {
      dispatch(clearNotificationState())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
