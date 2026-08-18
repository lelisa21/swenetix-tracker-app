import axios, { AxiosResponse } from "axios";
import { call, put, SagaReturnType, takeEvery, takeLatest } from "redux-saga/effects"; // saga effets
import { CreateIdeaInput, Idea } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";
import { addIdea, addIdeaRequested, deleteIdeaFailed, deleteideaRequested, deleteIdeaSucceded, fetchIdeasRequested, setIdeas, setIdeasError } from "./ideasSlice";
import { getIdeas , deleteideas} from "./ideasApi";

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
const addIdeaAPI = (newIdea: { title: string, description: string }) => axios.post<Idea>(API_URL, newIdea);

function* fetchIdeasWorker(): Generator {
  try {
    const ideas = yield call(getIdeas)
    yield put(setIdeas(ideas))
  } catch (error) {
    yield put(setIdeasError(getErrorMessage(error)))
  }
}

function* workAddIdea(action: PayloadAction<CreateIdeaInput>): Generator<unknown, void, SagaReturnType<typeof addIdeaAPI>> {
  try {
    const response = yield call(addIdeaAPI, action.payload)
    yield put(addIdea(response.data))
  } catch (error) {
    yield put(setIdeasError(getErrorMessage(error)))
  }
}

function*deleteIdeasWork(action:PayloadAction<string>):Generator {
  try {
  yield call(deleteideas, action.payload);
  yield put(deleteIdeaSucceded(action.payload))
  } catch (error) {
    yield put(deleteIdeaFailed(getErrorMessage(error)))
  }

}

export function* ideasSaga() {
  // yield takeLatest(payload_type, worker_function);
  yield takeEvery(fetchIdeasRequested.type, fetchIdeasWorker)
  yield takeEvery(addIdeaRequested.type, workAddIdea)
  yield takeLatest(deleteideaRequested.type, deleteIdeasWork)
}
