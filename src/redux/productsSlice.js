import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    deleteProduct: (state, action) => {
      const productIdToDelete = action.payload;
      // Remove the product
      const updatedState = state.filter(
        (product) => product.id !== productIdToDelete
      );
      
      return updatedState;
    },
    updateProduct: (state, action) => {
      const index = state.findIndex(
        (product) => product.id === parseInt(action.payload.id)
      );
      if (index !== -1) {
        state[index] = action.payload.updatedProduct;
      }
    },
  },
});

export const { addProduct, deleteProduct, updateProduct } = productsSlice.actions;

export const selectProductList = (state) => state.products;

export default productsSlice.reducer;
