import {createActionCreators, ImmerReducer} from "immer-reducer";
import {ErrorState, StoreState} from "../../../../storeState";
import {getHostingState} from "../selectors/HostingSelector";
import {getFailedMaybe, getRequestedMaybe, getSucceededMaybe} from "../../../../models/Maybe";

export default class GetPobUrlReducer extends ImmerReducer<StoreState> {

    startSaga() {
    }

    request() {
        const hostingState = getHostingState(this.draftState);

        hostingState.pobUrlFromServerMaybe = getRequestedMaybe();
    }

    comlete(pobUrl: string) {
        const hostingState = getHostingState(this.draftState);

        hostingState.pobUrlFromServerMaybe = getSucceededMaybe(pobUrl);
    }

    fail(error: string) {
        this.draftState.errors.push(new ErrorState(error));

        const hostingState = getHostingState(this.draftState);

        hostingState.pobUrlFromServerMaybe = getFailedMaybe(error);
    }
}

export const GetPobUrlActions = createActionCreators(GetPobUrlReducer);
