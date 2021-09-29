import {all, takeLatest} from "redux-saga/effects";
import getPobUrlSaga from "./sagas/GetPobUrlSaga";
import {GetPobUrlActions} from "./reducers/GetPobUrlReducer";
import savePobUrlSaga from "./sagas/SavePobUrlSaga";
import {SavePobUrlActions} from "./reducers/SavePobUrlReducer";

export default function* hostingSaga() {
    yield all([
        takeLatest(GetPobUrlActions.startSaga.type, getPobUrlSaga),
        takeLatest(SavePobUrlActions.startSaga.type, savePobUrlSaga)
    ]);
}