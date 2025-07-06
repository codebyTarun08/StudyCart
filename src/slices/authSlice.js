import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    signupData:null,
    loading:false,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSignupData(state,action){
            state.signupData=action.payload
        },
        setLoading(state,value){
            state.loading=value.payload
        },
        setToken(state, value) {
            state.token = value.payload
        },
    }
});

export const {setToken,setLoading,setSignupData} = authSlice.actions;
export default authSlice.reducer;