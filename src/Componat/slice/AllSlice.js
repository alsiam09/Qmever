import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    user: localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")) :[],
    BuyItem: localStorage.getItem("BuyItem")? JSON.parse(localStorage.getItem("BuyItem")) :[],
    cartItem: localStorage.getItem("cartItem")? JSON.parse(localStorage.getItem("cartItem")) :[],
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
    AddToCart:(state , action) => {
      let FindProduct = state.cartItem.findIndex((item)=> item.id == action.payload.id)
      let FindProductModel = state.cartItem.findIndex((item)=> item.size === action.payload.size)
      let FindProductPCU = state.cartItem.findIndex((item)=> item.PCU === action.payload.PCU)
      console.log(FindProductPCU);

      
      if (FindProduct !== -1 && FindProductModel !== -1  && FindProductPCU !== -1 ) {
          state.cartItem[FindProductModel].ProdectQun += 1
          localStorage.setItem("cartItem" , JSON.stringify(state.cartItem))
      } else {
        state.cartItem = [ ...state.cartItem , action.payload ]
        localStorage.setItem("cartItem" , JSON.stringify(state.cartItem))
      }
    },
    removeCartPro:(state , action) => {
      state.cartItem.splice(action.payload , 1)
      localStorage.setItem("cartItem" , JSON.stringify(state.cartItem))
    },
    qunIncrement:(state , action) =>{
      state.cartItem[action.payload].ProdectQun += 1
      localStorage.setItem("cartItem" , JSON.stringify(state.cartItem))
    },
    qunDecrement:(state , action) =>{
      if (state.cartItem[action.payload ].ProdectQun > 1) {
        state.cartItem[action.payload ].ProdectQun -= 1
        localStorage.setItem("cartItem" , JSON.stringify(state.cartItem))
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { userUidLogin , userLogout , userBuyItem , BuyItemDelete , AddToCart , removeCartPro , qunIncrement , qunDecrement } = counterSlice.actions

export default counterSlice.reducer