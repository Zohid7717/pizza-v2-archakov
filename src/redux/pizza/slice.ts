
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pizza, PizzaSliseState, Status } from './types';
import { fetchPizzas } from './asyncActions';


const initialState: PizzaSliseState = {
  items: [],
  status: Status.LOADING
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    }
  },
  // если используете typeScript
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    })
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.items = [];
      state.status = Status.ERROR;
    })
  }
  // если не используете typeScript
  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = 'loading';
  //     state.items = [];
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload;
  //     state.status = 'success';
  //   },
  //   [fetchPizzas.rejected]: (state, action) => {
  //     state.items = [];
  //     state.status = 'error';
  //   }
  // }
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer