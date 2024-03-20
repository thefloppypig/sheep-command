import { State, initialState } from "./reducer";

export const storageKey = "thefloppypig.sheepspawn"

export async function getSavedState(): Promise<State> {
    try {
        const localSetting = localStorage.getItem(storageKey);
        if (localSetting) {
            const parsed = JSON.parse(localSetting);
            return { ...initialState, ...parsed };
        }
        else return initialState;
    } catch (error) {
        return initialState;
    }
}

export async function saveState(state: State) {
    try {
        localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (error) {
        console.warn("Could not save settings", error);
    }
}
