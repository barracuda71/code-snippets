import { put, call, select } from "redux-saga/effects";
import {API} from "../../../../../tools/constants";
import {BaseCommandResult} from "../../../../../types/models/authorization/commandResult";
import axiosInstance from "../../../../../tools/axiosInstance";
import {SavePobUrlActions} from "../reducers/SavePobUrlReducer";
import {getPobUrl} from "../selectors/HostingSelector";

export default function* savePobUrlSaga() {
    yield put(SavePobUrlActions.request());

    const pobUrl = yield select(getPobUrl);

    try {
        const response: { data: BaseCommandResult } = yield call(
            axiosInstance.post, `${API}/hosting/savePobUrl`, {pobUrl});

        const commandResult = response.data;

        if (commandResult.isSuccessful) {
            yield put(SavePobUrlActions.comlete());

            alert('Saved');
        } else {
            yield put(SavePobUrlActions.fail(commandResult.errorMessage));
        }
    } catch (error) {
        yield put(SavePobUrlActions.fail(error));
    }
}
