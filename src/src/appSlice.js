import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    isCardFormShown: false,
    category: "",
    isMapShown: false,
    userLat: "",
    userLng: "",
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
    },
    showMap: (state) => {
      state.isMapShown = true;
    },
    hideMap: (state) => {
      state.isMapShown = false;
    },
    setUserLat: (state, action) => {
      state.userLat = action.payload;
    },
    setUserLng: (state, action) => {
      state.userLng = action.payload;
    },
  },
})

export const { showCardForm, hideCardForm, setCategory, showMap, hideMap, setUserLat, setUserLng } = appSlice.actions

export default appSlice.reducer