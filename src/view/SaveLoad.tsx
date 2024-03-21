import { connect } from "react-redux";
import { loadState, initialState, State, saveNewActiveProfile, deleteProfileState } from "../state/reducer";
import { allSavedProfileKeys, getSavedState, saveState } from "../state/save";
import { AppDispatch } from "../state/store";

function SaveLoad(props: SaveLoadProp) {
    const { dispatch, state } = props;

    const cachedProfileList = allSavedProfileKeys();

    const loadProfile = async (key: string) => dispatch(loadState(await getSavedState(key)));

    return (
        <div className="saveload">
            <div>Active Profile:
                <select
                    value={state.activeProfile}
                    onChange={(ev) => loadProfile(ev.target.value)}
                >
                    <option key={""} value={""}>{"  "}</option>
                    {cachedProfileList.map((profileKey) => {
                        return <option key={profileKey} value={profileKey}>{profileKey}</option>
                    })}
                </select>
                <button onClick={() => dispatch(saveNewActiveProfile())}>Save as new</button>
                <button onClick={() => dispatch(deleteProfileState())}>Delete Current profile</button>
            </div>
            <div>
                <button onClick={() => loadProfile(state.activeProfile)}>Reload</button>
                <button onClick={() => saveState(state)}>Save</button>
                <button onClick={() => dispatch(loadState(initialState))}>Clear</button>
            </div>
        </div>
    )
}

type SaveLoadProp = ReturnType<typeof mapState> & { dispatch: AppDispatch };

export function mapState(state: State) {
    return {
        state
    }
}

export default connect(mapState)(SaveLoad);