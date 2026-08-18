import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CreateIdeaInput, Idea } from "./types";

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
    addIdea: (state, action:PayloadAction<Idea>) => {
      state.list.push(action.payload);
    },
    addIdeaRequested:(state, action:PayloadAction<CreateIdeaInput>) => {
     state.error = null;
     state.status = "loading";
    },
    fetchIdeasRequested: (state) => {
      state.error = null
      state.status = "loading"
    },
    setIdeas: (state, action) => {
      state.list = action.payload
      state.status = "succeeded"
    },
    setIdeasError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.status = "failed"
    },
    deleteideaRequested: (state, action:PayloadAction<string>) => {
      state.error = null
      state.status = "loading"
    },
    deleteIdeaSucceded: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(idea => idea._id !== action.payload)
      state.status = 'succeeded'
    },
    deleteIdeaFailed: (
      state,
      action: PayloadAction<string>
    ) => {
      state.error = action.payload;
      state.status = "failed";
    },
  }
})

export const { addIdea,addIdeaRequested,  fetchIdeasRequested, setIdeas, setIdeasError, deleteIdeaFailed, deleteIdeaSucceded,deleteideaRequested } = ideasSlice.actions;

export default ideasSlice.reducer;
