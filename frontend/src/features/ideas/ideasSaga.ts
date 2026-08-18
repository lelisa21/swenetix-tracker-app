import axios, { AxiosResponse } from "axios";
import { call, put, SagaReturnType, takeEvery, takeLatest } from "redux-saga/effects"; // saga effets
import { Idea } from "./types";
import { addIdeaFailure, addIdeaRequested, addIdeaSuccess, fetchIdeasFailure, fetchIdeasRequested, fetchIdeasSuccess } from "./ideasSlice";
import { PayloadAction } from "@reduxjs/toolkit";

// Error message
function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message ??
      error.message ??
      "Something went wrong"
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong";
}

const API_URL = "/api/ideas";

// API Helpers
const fetchIdeasAPI = () =>   axios.get<Idea[]>(API_URL);
const addIdeaAPI = (newIdea: {title:string, description:string}) => axios.post<Idea>(API_URL, newIdea);


function*workFetchIdeas():Generator<unknown, void, SagaReturnType<typeof fetchIdeasAPI>>{
  try {
    const response = yield call(fetchIdeasAPI);
    yield put(fetchIdeasSuccess(response.data))
  } catch (error) {
    yield put(fetchIdeasFailure(getErrorMessage(error)))
  }
}

function* workAddIdea(action: PayloadAction<{title:string, description:string}>):Generator<unknown, void, SagaReturnType<typeof addIdeaAPI>> {
    console.log("3. ADD WORKER STARTED", action);

 try {
  const response = yield call(addIdeaAPI, action.payload)
  yield put(addIdeaSuccess(response.data))
  console.log("API RESPONSE" , response)
 } catch (error) {
  console.log("5. API ERROR:", error);

  if (axios.isAxiosError(error)) {
    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);
  }

  yield put(
    addIdeaFailure(getErrorMessage(error))
  );
}
}
export function* ideasSaga() {
  // yield takeLatest(payload_type, worker_function);
  yield takeLatest(fetchIdeasRequested.type, workFetchIdeas)
  yield takeEvery(addIdeaRequested.type, workAddIdea)
}
