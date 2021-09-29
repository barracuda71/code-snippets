import {StoreState} from "../../../storeState";
import composeReducers from "../../../../tools/composeReducers";
import GetPobUrlReducer from "./reducers/GetPobUrlReducer";
import SavePobUrlReducer from "./reducers/SavePobUrlReducer";
import SetPobUrlReducer from "./reducers/SetPobUrlReducer";
import CancelPobUrlChangesReducer from "./reducers/CancelPobUrlChangesReducer";
import {createReducerFunction} from "immer-reducer";

const HostingReducer = (initialState: StoreState) => composeReducers<StoreState>(
    createReducerFunction(CancelPobUrlChangesReducer, initialState),
    createReducerFunction(GetPobUrlReducer, initialState),
    createReducerFunction(SavePobUrlReducer, initialState),
    createReducerFunction(SetPobUrlReducer, initialState)
);

export default HostingReducer;