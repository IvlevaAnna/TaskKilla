import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    isCardFormShown: false,
    category: ""
  },
  reducers: {
    showCardForm: (state) => {
      state.isCardFormShown = true;
    },
    hideCardForm: (state) => {
        state.isCardFormShown = false;
    },
    setCategory: (state, action) => {
        state.category = action.payload;
    }
  },
})

export const { showCardForm, hideCardForm, setCategory } = appSlice.actions

export default appSlice.reducer