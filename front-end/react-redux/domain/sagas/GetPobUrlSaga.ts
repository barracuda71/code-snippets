import { put, call } from "redux-saga/effects";
import {API} from "../../../../../tools/constants";
import {CommandResult} from "../../../../../types/models/authorization/commandResult";
import axiosInstance from "../../../../../tools/axiosInstance";
import {GetPobUrlActions} from "../reducers/GetPobUrlReducer";
import {SetPobUrlActions} from "../reducers/SetPobUrlReducer";

export default function* getPobUrlSaga() {
    yield put(GetPobUrlActions.request());

    try {
        const response: { data: CommandResult<string> } = yield call(
            axiosInstance.get, `${API}/hosting/getPobUrl`);

        const commandResult = response.data;

        if (commandResult.isSuccessful) {
            yield put(GetPobUrlActions.comlete(commandResult.data));

            yield put(SetPobUrlActions.set(commandResult.data));
        } else {
            yield put(GetPobUrlActions.fail(commandResult.errorMessage));
        }
    } catch (error) {
        yield put(GetPobUrlActions.fail(error));
    }
}
