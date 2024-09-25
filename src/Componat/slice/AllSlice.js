import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    user: localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")) :[],
    BuyItem: localStorage.getItem("BuyItem")? JSON.parse(localStorage.getItem("BuyItem")) :[],
  },
  reducers: {
    userUidLogin:(state , action) => {
        state.user = [action.payload]
        localStorage.setItem("user" , JSON.stringify(state.user))
    },
    userLogout:(state , action)=>{
      console.log(action.payload);
      state.user.splice(action.payload)
      localStorage.setItem("user" , JSON.stringify(state.user))
    },
    userBuyItem:(state , action) => {
      state.BuyItem = [action.payload]
      localStorage.setItem("BuyItem" , JSON.stringify(state.BuyItem))
    },
    BuyItemDelete:(state , action)=>{
      state.BuyItem.splice(action.payload)
      localStorage.setItem("BuyItem" , JSON.stringify(state.BuyItem))
    },
  },
})

// Action creators are generated for each case reducer function
export const { userUidLogin , userLogout , userBuyItem , BuyItemDelete} = counterSlice.actions

export default counterSlice.reducer