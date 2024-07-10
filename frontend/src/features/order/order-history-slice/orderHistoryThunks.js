import { createAsyncThunk } from "@reduxjs/toolkit";
import OrderClient from "../../../api/ordersApis";
import { handleResponse } from "../../../utils/helpers";

export const fetchUserOrders = createAsyncThunk(
  "orderHistory/fetchUserOrders",
  async (userID, { rejectWithValue }) => {
    const orderClient = new OrderClient();
    try {
      const response = await orderClient.currentUserOrders(userID);
      const handledResponse = handleResponse(response);
      if (handledResponse?.errorMessage) {
        return rejectWithValue(handledResponse?.errorMessage);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deliverOrder = createAsyncThunk(
  "orderHistory/deliverOrder",
  async ({ orderID, formattedDate }, { rejectWithValue }) => {
    const orderClient = new OrderClient();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await orderClient.deliverOrder(
        orderID,
        formattedDate,
        config
      );
      const handledResponse = handleResponse(response);
      if (handledResponse?.errorMessage) {
        return rejectWithValue(handledResponse?.errorMessage);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
