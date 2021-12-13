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
    priority: ''
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
    setPriority: (state, action) => {
      state.priority = action.payload;
    },
  },
})

export const { showCardForm, hideCardForm, setCategory, showMap, hideMap, setUserLat, setUserLng, setTaskList, setDateFilter, setUserAddress, setPriority } = appSlice.actions

export default appSlice.reducer