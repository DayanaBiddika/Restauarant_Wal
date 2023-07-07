//import createSlice,createAsyncThunk
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
//import axios
import axios from 'axios';
//userLogin export
export const userLogin = createAsyncThunk("login/userLogin",async (userCredObj, { rejectWithValue }) => {
    try {
      //post request
      let res = await axios.post("http://localhost:2828/user-api/login", userCredObj);

      console.log("------",userCredObj)

      
      console.log("--------------res",res)
      console.log("--------------data",res.data)
      if (res.data.message === "success") {
        //save token in session storage
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("role",res.data.user.role)
        //save token in local storage
        localStorage.setItem("userObj",JSON.stringify(res.data.user))
        //local storage save the status
        localStorage.setItem("status","success")
        return res.data;
      } 
      else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      // console.log(“err”, err);
      return rejectWithValue(err);
    }
  }
);

//set default values 

//user obj
let userObj=localStorage.getItem("userObj")
if(!userObj){
  userObj={}
}
else{

  userObj=JSON.parse(userObj)
}

//status
let status=localStorage.getItem("status")
//if status not there
if(!status){
  status="idle"
}


export const loginSlice = createSlice({
    name: "login",
    initialState: {
      userObj: userObj,
      userLoginStatus:false,
      errorMessage: "",
      status: status,
    },
    reducers:{
      //clearState
        clearState:(state)=>{
          //clear the local storage
            localStorage.clear()
            //clear the session storage
            sessionStorage.clear()
            state.userObj={}
            state.userLoginStatus=false
            state.errorMessage=""
            state.status="idle"
        }
    },
    extraReducers: (builder) => {
        builder.addCase(userLogin.pending, (state, action) => {
          state.status = "pending";
        });
        builder.addCase(userLogin.fulfilled, (state, action) => {
          console.log(action)
          state.userObj = action.payload.user;
          state.errorMessage = "";
          state.status = "success";
        });
        builder.addCase(userLogin.rejected, (state, action) => {
          state.errorMessage = action.payload.message;
          state.status = "failed";
        });
      }
})

//export action creators
export const {clearState} = loginSlice.actions;
//export reducer
export default loginSlice.reducer;