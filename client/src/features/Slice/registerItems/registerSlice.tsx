import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import axios from "axios";
import { IServerToDoDataRegister, RegisterProps } from "../../../Types/RegisterProps";





export const userRegister = createAsyncThunk("user_current/userRegister", async (dataRequest:RegisterProps) => {
    const response = await axios.post<IServerToDoDataRegister>(
      "http://localhost:5000/register", dataRequest
    );

      const user = { 
        username: response.data.username,
        firstname: response.data.firstname,
         lastname: response.data.lastname,
        email:response.data.email}
  return { user_current: user };
  });




enum RequestState {
  NotStarted,
  Requested,
  RequestSucceded,
  RequestFailed,
}


export interface appStateType {
  user_current: IServerToDoDataRegister;
  status: RequestState;
}
const initialState: appStateType = {
  user_current: {username: "",firstname: "", lastname: "", email:""},
  status: RequestState.NotStarted,
  // error, if properly done
};


export const registerSlice = createSlice({
  name:"register",
  initialState:initialState,
  reducers:{

    getInitialDownload: (state) => {
      state.user_current = {username: "",firstname: "", lastname: "", email:""};
    },
  },
  extraReducers:(builder) => {
      builder
      .addCase(userRegister.pending, (state) => {
        state.status = RequestState.Requested;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.status = RequestState.RequestSucceded;
        state.user_current = action.payload.user_current;
      })
      ;
  }

})


export const getUserSelector = (state:RootState) => state.register;



export default registerSlice.reducer;
