import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    getIsCancelDisabled, getIsResetToLocalhostDisabled,
    getIsSaveDisabled,
    getPobUrl,
    getPobUrlFromServerMaybe
} from "../../../../domain/bot/settings/hosting/selectors/HostingSelector";
import {MaybeStatus} from "../../../../domain/enums/MaybeStatus";
import {SetPobUrlActions} from "../../../../domain/bot/settings/hosting/reducers/SetPobUrlReducer";
import {SavePobUrlActions} from "../../../../domain/bot/settings/hosting/reducers/SavePobUrlReducer";
import {CancelPobUrlChangesActions} from "../../../../domain/bot/settings/hosting/reducers/CancelPobUrlChangesReducer";
import styled from "styled-components";

const Hosting = () => {

    const pobUrlFromServerMaybe = useSelector(getPobUrlFromServerMaybe);
    const pobUrl = useSelector(getPobUrl);
    const isSaveDisabled = useSelector(getIsSaveDisabled);
    const isCancelDisabled = useSelector(getIsCancelDisabled);
    const isResetToLocalhostDisabled = useSelector(getIsResetToLocalhostDisabled);

    const dispatch = useDispatch();

    const setPobUrl = (url: string) => dispatch(SetPobUrlActions.set(url));
    const onSaveClick = () => dispatch(SavePobUrlActions.startSaga());
    const onCancelClick = () => dispatch(CancelPobUrlChangesActions.cancel());

    const Button = styled.button`
      width: 150px;
    `;

    const resetToLocalhost = () => {
        dispatch(SetPobUrlActions.set('https://localhost:5005'));
        onSaveClick();
    };

    if (pobUrlFromServerMaybe.status === MaybeStatus.NotRequested || pobUrlFromServerMaybe.status === MaybeStatus.Requested) {
        return (
            <div className="po_loading"></div>
        );
    }

    return (
        <div style={{width: '50%'}}>
            <div className="form-group">
                <label>Bot hosting URL</label>
                <input type="text"
                       className="form-control"
                       value={pobUrl}
                       onChange={event => setPobUrl(event.target.value)}/>
            </div>

            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    <Button className="btn btn-success"
                            style={{marginRight: '5px'}}
                            disabled={isSaveDisabled}
                            onClick={onSaveClick}>
                        Save
                    </Button>
                    <Button className="btn btn-default"
                            disabled={isCancelDisabled}
                            onClick={onCancelClick}>
                        Cancel
                    </Button>
                </div>
                <Button className="btn btn-default"
                        disabled={isResetToLocalhostDisabled}
                        onClick={resetToLocalhost}>
                    Reset to localhost
                </Button>
            </div>

        </div>
    );
};

export default Hosting;