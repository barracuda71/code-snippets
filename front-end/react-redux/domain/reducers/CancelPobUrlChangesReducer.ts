import {createActionCreators, ImmerReducer} from "immer-reducer";
import {getHostingState} from "../selectors/HostingSelector";
import {StoreState} from "../../../../storeState";

export default class CancelPobUrlChangesReducer extends ImmerReducer<StoreState> {

    cancel() {
        const hostingState = getHostingState(this.draftState);

        if (hostingState.pobUrlFromServerMaybe.data !== null) {
            hostingState.pobUrl = hostingState.pobUrlFromServerMaybe.data;
        }
    }
}

export const CancelPobUrlChangesActions = createActionCreators(CancelPobUrlChangesReducer);
