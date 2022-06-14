import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import axios from "axios";
import { IServerToDoDataUser, UserProps } from "../../../Types/User";







export const fetchItems = createAsyncThunk("user_current/fetchItems", async () => {
  
  console.log("ceva2")
  const response = await axios.get<IServerToDoDataUser>(
    "http://localhost:5000/test"
  );
 
  const user = { username: response.data.username,successLogin: response.data.successLogin}
 
  return { user_current: user };
});

export const userLogin = createAsyncThunk("user_current/userLogin", async (dataRequest:UserProps) => {
    const response = await axios.post<IServerToDoDataUser>(
      "http://localhost:5000/login", dataRequest
    );
      const user = { username: response.data.username,successLogin: response.data.successLogin}
  return { user_current: user };
  });




enum RequestState {
  NotStarted,
  Requested,
  RequestSucceded,
  RequestFailed,
}


export interface appStateType {
  user_current: IServerToDoDataUser;
  status: RequestState;
}
const initialState: appStateType = {
  user_current: {username:"",successLogin:false},
  status: RequestState.NotStarted,
  // error, if properly done
};


export const userSlice = createSlice({
  name:"user",
  initialState:initialState,
  reducers:{

    getInitialDownload: (state) => {
      state.user_current = {username:"",successLogin:false};
    },
  },
  extraReducers:(builder) => {
      builder
      .addCase(userLogin.pending, (state) => {
        state.status = RequestState.Requested;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = RequestState.RequestSucceded;
        state.user_current = action.payload.user_current;
      })
      ;
  }

})


export const getUserSelector = (state:RootState) => state.user;



export default userSlice.reducer;
