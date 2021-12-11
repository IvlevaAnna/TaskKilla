import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    isCardFormShown: false,
    category: "",
    isMapShown: false,
    userLat: "",
    userLng: "",
    taskList: [],
    dateFilter: null,
    userAddress: "",
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
    setTaskList: (state, action) => {
      state.taskList = action.payload;
    },
    setDateFilter: (state, action) => {
      state.dateFilter = action.payload;
    },
    setUserAddress: (state, action) => {
      state.userAddress = action.payload;
    },
  },
})

export const { showCardForm, hideCardForm, setCategory, showMap, hideMap, setUserLat, setUserLng, setTaskList, setDateFilter, setUserAddress } = appSlice.actions

export default appSlice.reducer