import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    isCardFormShown: false,
    isEditFormShown: false,
    category: "",
    isMapShown: false,
    userLat: "",
    userLng: "",
    taskList: [],
    dateFilter: null,
    userAddress: "",
    priority: '',
    taskID: null,
    taskInfo: {},
    selectedCard: {},
    googleUser: {
    },
    history: {}
  },
  reducers: {
    showCardForm: (state) => {
      state.isCardFormShown = true;
    },
    hideCardForm: (state) => {
      state.isCardFormShown = false;
    },
    showEditForm: (state) => {
      state.isEditFormShown = true;
    },
    hideEditForm: (state) => {
      state.isEditFormShown = false;
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
    setTaskID: (state, action) => {
      state.taskID = action.payload;
    },
    setTaskInfo: (state, action) => {
      state.taskInfo = action.payload;
    },
    setSelectedCard: (state, action) => {
      state.selectedCard = action.payload;
    },
    setHistory: (state, action) => {
      state.history = action.payload;
    },
  },
})

export const {
  showCardForm,
  hideCardForm,
  showEditForm,
  hideEditForm,
  setCategory,
  showMap,
  hideMap,
  setUserLat,
  setUserLng,
  setTaskList,
  setDateFilter,
  setUserAddress,
  setPriority,
  setTaskID,
  setTaskInfo,
  setSelectedCard,
  setHistory,
} = appSlice.actions

export default appSlice.reducer