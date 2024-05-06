import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";


export type FetchPizzasArgs = {
  order: string;
  sortBy: string;
  category: string;
  search: string;
  currentPage: number;
};

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params: FetchPizzasArgs) => {
    const { order, sortBy, category, search, currentPage } = params;
    const { data } = await axios.get(
      `https://657b39e9394ca9e4af140258.mockapi.io/items?page= ${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}&${search}`
    );
    return data;
  }
);


export interface PizzaSliceState {
  items: Pizza[]
  status: "loading..." | "success" | "error";
}



const initialState: PizzaSliceState = {
  items: [],
  status: "loading...",
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading...";
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";
        console.log("ERROR");
        state.items = [];
      });
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
