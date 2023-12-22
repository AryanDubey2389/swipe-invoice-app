import { createSlice } from "@reduxjs/toolkit";
import convertCurrency from "../utils/currencyConverter";

const invoicesSlice = createSlice({
  name: "invoices",
  initialState: [],
  reducers: {
    addInvoice: (state, action) => {
      state.push(action.payload);
    },
    deleteInvoice: (state, action) => {
      const targetId = action.payload;
      return state.filter((invoice) => invoice.id !== targetId);
    },
    updateInvoice: (state, action) => {
      const index = state.findIndex((invoice) => {
        return invoice.id == action.payload.id;
      });
      if (index !== -1) {
        return [
          ...state.slice(0, index),
          action.payload.updatedInvoice,
          ...state.slice(index + 1),
        ];
      }
      return state;
    },
    updateInvoicesByProduct: (state, action) => {
      const { productId, diff, prodCurr } = action.payload;
      state.forEach((invoice) => {
        const index = invoice?.items.findIndex(
          (item) => parseInt(item.itemId) === parseInt(productId),
        );
        if (index !== -1) {
          invoice.total = String(
            (parseFloat(invoice.total) + convertCurrency(parseFloat(diff),prodCurr,invoice.currency)).toFixed(2),
          );
        }
      });
    },
    updateInvoicesOnProductDelete: (state, action) => {
      const { productId, priceDiff } = action.payload;
      state.forEach((invoice) => {
        const index = invoice?.items.findIndex(
          (item) => parseInt(item.itemId) === parseInt(productId)
        );
    
        if (index !== -1) {
          const item = invoice.items[index];
              invoice.total = String(
            (parseFloat(invoice.total) - parseFloat(priceDiff * item.itemQuantity)).toFixed(2)
          );
          invoice.items.splice(index, 1);
        }
      });
    },
  },
});

export const {
  addInvoice,
  deleteInvoice,
  updateInvoice,
  updateInvoicesByProduct,
  updateInvoicesOnProductDelete,
} = invoicesSlice.actions;

export const selectInvoiceList = (state) => state.invoices;

const invoicesReducer = invoicesSlice.reducer;

export default invoicesReducer;
