import {
    Action,
    applyMiddleware,
    combineReducers,
    createStore,
    ThunkAction,
  } from "@reduxjs/toolkit";
  import { composeWithDevTools } from "redux-devtools-extension";
  import thunk from "redux-thunk";
  import productSlice from "../features/Slice/productItems/productlistSlice";
import registerSlice from "../features/Slice/registerItems/registerSlice";
  import userSlice from "../features/Slice/userItems/userSlice";
  
  const combinedStore = combineReducers({
    productlist: productSlice,
    user: userSlice,
    register: registerSlice
  });
  
  export const store = createStore(
    combinedStore,
    composeWithDevTools(applyMiddleware(thunk))
  );
  
  export type AppDispatch = typeof store.dispatch;
  export type RootState = ReturnType<typeof store.getState>;
  export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
  >;
  