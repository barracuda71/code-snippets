import {StoreState} from "../../../../storeState";
import {getSettingsState} from "../../SettingsSelector";
import HostingState from "../HostingState";
import {$} from "../../../../../types/nullable";
import {createSelector} from "reselect";

export const getHostingState = (state: StoreState): HostingState => {
    return getSettingsState(state).hostingState;
}

export const getPobUrlFromServerMaybe = (state: StoreState) => {
    return getHostingState(state).pobUrlFromServerMaybe;
}

export const getPobUrlFromServer = (state: StoreState): $<string> => {
    return getPobUrlFromServerMaybe(state).data;
}

export const getPobUrl = (state: StoreState) => {
    return getHostingState(state).pobUrl;
}

export const getIsSaving = (state: StoreState) => {
    return getHostingState(state).isSaving;
};

export const getIsSaveDisabled = createSelector(
    getIsSaving,
    getPobUrl,
    getPobUrlFromServer,
    (isSaving, pobUrl, pobUrlFromServer) => {

        return isSaving || pobUrl === pobUrlFromServer || !pobUrl.includes('https://');
    });

export const getIsCancelDisabled = createSelector(
    getIsSaving,
    getPobUrl,
    getPobUrlFromServer,
    (isSaving, pobUrl, pobUrlFromServer) => {

        return isSaving || pobUrl === pobUrlFromServer;
    });

export const getIsResetToLocalhostDisabled = createSelector(
    getIsSaving,
    getPobUrlFromServer,
    (isSaving, pobUrlFromServer) => {

        return isSaving || pobUrlFromServer === 'https://localhost:5005';
    });

export const getBotApiUrl = createSelector(
    getPobUrlFromServer,
        pobUrlFromServer => {

        return `${pobUrlFromServer}/api`;
    });
