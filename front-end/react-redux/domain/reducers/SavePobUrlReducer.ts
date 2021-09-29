import {createActionCreators, ImmerReducer} from "immer-reducer";
import {ErrorState, StoreState} from "../../../../storeState";
import {getHostingState} from "../selectors/HostingSelector";
import {getSucceededMaybe} from "../../../../models/Maybe";

export default class SavePobUrlReducer extends ImmerReducer<StoreState> {

    startSaga() {
    }

    request() {
        const hostingState = getHostingState(this.draftState);

        hostingState.isSaving = true;
    }

    comlete() {
        const hostingState = getHostingState(this.draftState);

        hostingState.pobUrlFromServerMaybe = getSucceededMaybe(hostingState.pobUrl);

        hostingState.isSaving = false;
    }

    fail(error: string) {
        this.draftState.errors.push(new ErrorState(error));

        const hostingState = getHostingState(this.draftState);

        hostingState.isSaving = false;

        alert('Could not save. If problem persists, please contact support https://t.me/pumpolymp_support');
    }
}

export const SavePobUrlActions = createActionCreators(SavePobUrlReducer);
