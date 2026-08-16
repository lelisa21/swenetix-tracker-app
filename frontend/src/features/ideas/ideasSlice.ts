import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Idea } from "./types";

export type IdeasStatus = "idle" | "loading" | "succeeded" | "failed";

export interface IdeasState {
  list: Idea[];
  status: IdeasStatus;
  error: string | null;
}

const initialState: IdeasState = {
  list: [],
  status: "idle",
  error: null,
};

const ideasSlice = createSlice({
  name: "ideas",
  initialState,
  reducers: {
    fetchIdeasRequested:(state) =>{
      state.status = "loading"
      state.error = null
    },
     fetchIdeasSuccess:(state, action:PayloadAction<Idea[]>) => {
      state.list = action.payload
      state.status = "succeeded"
    },
     fetchIdeasFailure:(state, action:PayloadAction<string>) =>{
      state.status = "failed"
      state.error = action.payload
    },

    // add Idea action
    addIdeaRequested:(state,  _action: PayloadAction<{title:string, description:string}> ) =>{
    state.status = "loading"
    },

    addIdeaSuccess:(state, action:PayloadAction<Idea>) => {
     state.status = "succeeded"
     state.list.push(action.payload)
    },
    addIdeaFailure:(state, action:PayloadAction<string>) => {
       state.status  = "failed"
       state.error = action.payload
    }

  },
 
});

export const {fetchIdeasRequested,fetchIdeasSuccess, fetchIdeasFailure,
             addIdeaRequested, addIdeaSuccess, addIdeaFailure
 } = ideasSlice.actions;

export default ideasSlice.reducer;
