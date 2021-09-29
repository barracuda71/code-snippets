import {createActionCreators, ImmerReducer} from "immer-reducer";
import {getHostingState} from "../selectors/HostingSelector";
import {StoreState} from "../../../../storeState";

export default class SetPobUrlReducer extends ImmerReducer<StoreState> {

    set(pobUrl: string) {
        const hostingState = getHostingState(this.draftState);

        hostingState.pobUrl = pobUrl;
    }
}

export const SetPobUrlActions = createActionCreators(SetPobUrlReducer);
