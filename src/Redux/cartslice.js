import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosInstance } from "../Api/endpoint"


export const getProducts=createAsyncThunk("/prod",async()=>{
    const res=await axiosInstance.get("/products");
    // console.log(res)
    return res?.data;
})

export const initialState={
    isLoading:false,
    isError:false,
    products:[],
    cart:JSON.parse(localStorage.getItem("cart")) || [],
    totalprice:JSON.parse(localStorage.getItem("total"))||0
}

export const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        addProd:(state,{payload})=>{
            const newProd={
                id:payload.id,
                title:payload.title,
                baseprice:payload.price,
                updatePrice:payload.price,
                title:payload.title,
                category:payload.category,
                image:payload.image,
                quantity:1
            }
            const ind=state.cart.findIndex((prod)=>prod.id==payload.id)
            console.log(ind)
            if(ind==-1){
                state.cart.push(newProd)
            }else{
                state.cart=state.cart.map((prod,index)=>{
                    if(ind==index){
                        prod.quantity+=1
                        prod.updatePrice=prod.baseprice*prod.quantity
                        return prod
                    }
                    return prod
                })
            }
            state.totalprice=state.cart.reduce((accum,prod)=>{
                  return accum+=prod.updatePrice
            },0)
            localStorage.setItem("cart",JSON.stringify(state.cart))
            localStorage.setItem("total",JSON.stringify(state.totalprice))

        },
        incProd:(state,{payload})=>{
            state.cart=state.cart.map((prod)=>{
                if(prod.id==payload){
                    prod.quantity+=1
                    prod.updatePrice=prod.baseprice*prod.quantity
                    return prod
                }
                return prod
            })
            localStorage.setItem("cart",JSON.stringify(state.cart))
            state.totalprice=state.cart.reduce((accum,prod)=>{
                return accum+=prod.updatePrice
          },0)
          localStorage.setItem("total",JSON.stringify(state.totalprice))
        },
        decProd:(state,{payload})=>{
            state.cart=state.cart.map((prod)=>{
                if(prod.id==payload){
                    prod.quantity-=1
                    prod.updatePrice=prod.baseprice*prod.quantity
                    return prod
                }
                return prod
            })
            localStorage.setItem("cart",JSON.stringify(state.cart))
            state.totalprice=state.cart.reduce((accum,prod)=>{
                return accum+=prod.updatePrice
          },0)
          localStorage.setItem("total",JSON.stringify(state.totalprice))
        },
        delProd:(state,{payload})=>{
            state.cart=state.cart.filter((prod)=>{
                return prod.id!==payload
            })
            localStorage.setItem("cart",JSON.stringify(state.cart))
            state.totalprice=state.cart.reduce((accum,prod)=>{
                return accum+=prod.updatePrice
          },0)
          localStorage.setItem("total",JSON.stringify(state.totalprice))
        }

    },
    extraReducers:(builder)=>{
     builder.addCase(getProducts.pending,(state)=>{
        state.isLoading=true
     })
     .addCase(getProducts.fulfilled,(state,{payload})=>{
        state.isLoading=false
        state.products=payload
     })
     .addCase(getProducts.rejected,(state)=>{
        state.isLoading=false
        state.isError=true
     })
    }
})
export const {addProd,incProd,decProd,delProd}=cartSlice.actions

export default cartSlice.reducer