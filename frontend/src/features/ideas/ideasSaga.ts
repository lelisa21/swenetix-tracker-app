import axios, { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects"; // saga effets
import { Idea } from "./types";
import { fetchIdeasSuccess } from "./ideasSlice";

const API_URL = "/api/ideas";

// API Helpers
const fetchIdeasAPI = () =>   axios.get<Idea[]>(API_URL);
const addIdeaAPI = (newIdea: {title:string, description:string}) => axios.post<Idea>(API_URL, newIdea);

function* workerSagaFunction() {
  yield "demo function";
}

function*workFetchIdeas():Generator<unknown, void, AxiosResponse<Idea[]>>{
  try {
    const response = yield call(fetchIdeasAPI);
    yield put(fetchIdeasSuccess(response.data))
  } catch (error) {
    
  }
}
export function* ideasSaga() {
  // yield takeLatest(payload_type, worker_function);
  yield takeLatest("ideas/fetchIdeasRequest", workFetchIdeas)


}
