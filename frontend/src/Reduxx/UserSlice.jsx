import { createSlice } from "@reduxjs/toolkit";

const jwttokeninStorage=localStorage.getItem("jwttoken");
const rolefromstorage=localStorage.getItem("role");
const initialState={
    loginStatus:!!jwttokeninStorage,
    token:jwttokeninStorage||"",
    role:rolefromstorage||""
}

export const UserSlice=createSlice({
    name:"slicer",
    initialState:initialState,
    reducers:{
        login:(state,action)=>{
            // console.log(action.payload)
            state.token=action.payload.jwt;
            localStorage.setItem("jwttoken",action.payload.jwt);
            localStorage.setItem("role",action.payload.staff)
            state.role=action.payload.staff;
            state.loginStatus=true;
        },
        logout:(state,action)=>{
            localStorage.removeItem("jwttoken");
            state.token="";
            state.loginStatus=false;
            state.role="";
        }
    }

})

export const {login,logout}=UserSlice.actions; 
export default UserSlice.reducer;

