import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import axios from "axios";

import {
  ProductProps,
  IServerToDoDataProduct,
} from "../../../Types/ProductProps";

function mapStock(X: boolean){
  switch (X) {
      case true:
        return 1;
      case false:
        return 0;
      default:
        return 0;
    }
}



export const fetchItems = createAsyncThunk("productitems/fetchItems", async () => {
  
  console.log("ceva2")
  const response = await axios.get<IServerToDoDataProduct[]>(
    "http://localhost:5000/products"
  );
  //console.log("acic",response.data)  
  const items = response.data.map((x) => {
     
    return {
      id: x.id,
      denumire: x.denumire.toString(),
      descriere: x.descriere.toString(),
      pret: x.pret,
      url_image : x.url_image.toString(),
      stoc:mapStock(x.stoc)
    };
    
  });
  
  //console.log("pls",items)  
  return { productitems: items };
});

export interface ProductById {
  id: number;
}

export const getproductbyId = createAsyncThunk("productitems/getproductbyId", async (dataRequest:ProductById) => {
  const response = await axios.post<IServerToDoDataProduct>(
    "http://localhost:5000/getproductbyid", dataRequest
  );

    const product = {  id: response.data.id,denumire: response.data.denumire.toString(),descriere: response.data.descriere.toString(), pret: response.data.pret,url_image : response.data.url_image.toString(),stoc:mapStock(response.data.stoc)}
    console.log("produs cautat,",product)
    return { product_: product };
});




enum RequestState {
  NotStarted,
  Requested,
  RequestSucceded,
  RequestFailed,
}


export interface appStateType {
  productitems: ProductProps[];
  product_: ProductProps;
  status: RequestState;
}
const initialState: appStateType = {
  productitems: [],
  product_:{id: -1,denumire: "",descriere: "", pret: -1,url_image : "",stoc:0},
  status: RequestState.NotStarted,
  // error, if properly done
};


export const productSlice = createSlice({
  name:"productlist",
  initialState:initialState,
  reducers:{

    getInitialDownload: (state) => {
      state.productitems = [];
    },
  },
  extraReducers:(builder) => {
      builder
      .addCase(fetchItems.pending, (state) => {
        state.status = RequestState.Requested;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = RequestState.RequestSucceded;
        state.productitems = action.payload.productitems;
      })

      .addCase(getproductbyId.pending, (state) => {
        state.status = RequestState.Requested;
      })
      .addCase(getproductbyId.fulfilled, (state, action) => {
        state.status = RequestState.RequestSucceded;
        state.product_ = action.payload.product_;
      })
      ;
  }

})


export const getProductSelector = (state:RootState) => state.productlist;



export default productSlice.reducer;
