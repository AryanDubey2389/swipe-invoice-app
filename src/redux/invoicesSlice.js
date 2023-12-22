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
      console.log('new currency update invoice - ', action.payload.id);
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
    updateInvoiceCurrency: (state, action) => {
      console.log('action - ', action.payload)
      const { itemId, newCurrency } = action.payload;
      console.log('Current state:', state);

      // Iterate through each invoice in the state
      state.forEach((invoice) => {
        // Find the index of the item within the invoice
        console.log('hi there brother')
        // const itemIndex = invoice?.items.findIndex(
        //   (item) => parseInt(item.itemId) == parseInt(itemId)
        // );
        // console.log('itemIndex - ', itemIndex);

        if (true) {
          // If the item is found, update its currency
          // const item = invoice.items[itemIndex];
          // console.log('item in update - ', item);
          // // const newPrice = convertCurrency(
          // //   parseFloat(item.itemPrice),
          // //   item.currency,
          // //   newCurrency
          // );

          // Update the item's currency and price in the invoice
          // invoice.items[itemIndex] = {
          //   ...item,
          //   currency: newCurrency,
          //   itemPrice: newPrice.toFixed(2),
          // };

          // Recalculate the total for the invoice
          // invoice.total = invoice.items.reduce((total, currentItem) => {
          //   const convertedPrice = convertCurrency(
          //     parseFloat(currentItem.itemPrice),
          //     currentItem.currency,
          //     invoice.currency
          //   );
          //   return total + convertedPrice * currentItem.itemQuantity;
          // }, 0).toFixed(2);
        }
      });
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
  updateInvoiceCurrency,
} = invoicesSlice.actions;

export const selectInvoiceList = (state) => state.invoices;

const invoicesReducer = invoicesSlice.reducer;

export default invoicesReducer;
