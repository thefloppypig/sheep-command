import { State, initialState } from "./reducer";

export const storageKey = "thefloppypig.sheepspawn"
export const storageKeySeperator = ":"

export function storageKeyForProfile(profileKey: string) {
    return storageKey + storageKeySeperator + profileKey;
}

function allSavedKeys(): string[] {
    const keys: string[] = [];
    for (let index = 0; index < localStorage.length; index++) {
        const element = localStorage.key(index);
        if (element) keys.push(element);
    }
    return keys;
}

export function allSavedProfileKeys() {
    const profileKeys = allSavedKeys().filter((v) => v.startsWith(storageKey)).map((v) => v.split(storageKeySeperator, 2)[1]);
    return profileKeys;
}

export function saveLastActiveProfile(profileKey: string) {
    localStorage.setItem(`${storageKey}.lastactive`, profileKey);
}
export function getLastActiveProfile() {
    return localStorage.getItem(`${storageKey}.lastactive`);
}

export function deleteProfileFromStorage(profileKey: string) {
    if (window.confirm(`Do you really want to delete ${profileKey}?`)) {
        localStorage.removeItem(storageKeyForProfile(profileKey));
    }
}

export function getSavedState(profileKey: string) {
    try {
        const localSetting = localStorage.getItem(storageKeyForProfile(profileKey));
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
    if (state.activeProfile) {
        try {
            localStorage.setItem(storageKeyForProfile(state.activeProfile), JSON.stringify(state));
        } catch (error) {
            console.warn("Could not save settings", error);
        }
    }
    else {
        console.warn("No active profile, can't save");
    }
}
