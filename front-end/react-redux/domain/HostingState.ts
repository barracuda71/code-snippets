import {Maybe} from "../../../models/Maybe";

export default interface HostingState {
    pobUrlFromServerMaybe: Maybe<string>;
    pobUrl: string;
    isSaving: boolean;
}