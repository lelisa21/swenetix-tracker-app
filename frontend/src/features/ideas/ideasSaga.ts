import axios, { AxiosResponse } from "axios";
import { call, put, SagaReturnType, takeLatest } from "redux-saga/effects"; // saga effets
import { Idea } from "./types";
import { addIdeaRequested, addIdeaSuccess, fetchIdeasFailure, fetchIdeasRequested, fetchIdeasSuccess } from "./ideasSlice";
import { PayloadAction } from "@reduxjs/toolkit";

const API_URL = "/api/ideas";

// API Helpers
const fetchIdeasAPI = () =>   axios.get<Idea[]>(API_URL);
const addIdeaAPI = (newIdea: {title:string, description:string}) => axios.post<Idea>(API_URL, newIdea);

function* workerSagaFunction() {
  yield "demo function";
}

function*workFetchIdeas():Generator<unknown, void, SagaReturnType<typeof fetchIdeasAPI>>{
  try {
    const response = yield call(fetchIdeasAPI);
    yield put(fetchIdeasSuccess(response.data))
  } catch (error) {
    if(axios.isAxiosError(error)) {
    yield put(
      fetchIdeasFailure(
        error.response?.data?.message ?? "Failed to Fetch Ideas"
      )
    )
  } else {
    yield put(fetchIdeasFailure("Something went wrong"))
  }
  }
}

function* workAddIdea(action: PayloadAction<{title:string, description:string}>):Generator<unknown, void, SagaReturnType<typeof addIdeaAPI>> {
 try {
  const response = yield call(addIdeaAPI, action.payload)
  yield put(addIdeaSuccess(response.data))
 } catch (error) {
  if(axios.isAxiosError(error)) {
    yield put(
      fetchIdeasFailure(
        error.response?.data?.message ?? "Failed to add idea"
      )
    )
  } else {
    yield put(fetchIdeasFailure("Something went wrong"))
  }

  }
}
export function* ideasSaga() {
  // yield takeLatest(payload_type, worker_function);
  yield takeLatest(fetchIdeasRequested.type, workFetchIdeas)
  yield takeLatest(addIdeaRequested.type, workAddIdea)
}
