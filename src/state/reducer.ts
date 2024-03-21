import { createAction, createReducer } from "@reduxjs/toolkit";
import { SheepEntryData } from "../view/SheepEntry";
import { sheepColourData, SheepColourID } from "../sheep/sheepData";
import { SpawnCommandOptions, defaultSpawnCommandOptions } from "../sheep/spawnCommands";
import { deleteProfileFromStorage, saveState } from "./save";

export const defaultSheepList: SheepEntryData[] = sheepColourData.list.map((col, i) => { return { name: "", colourId: i } })

export const initialState = {
    activeProfile: "",
    options: defaultSpawnCommandOptions as SpawnCommandOptions,
    sheepList: [] as SheepEntryData[],
}

export type State = typeof initialState

export type SheepEdit<T> = { index: number, value: T }
export type OptionEdit<T extends keyof SpawnCommandOptions> = { option: T, value: SpawnCommandOptions[T] }

export const loadState = createAction<State>("loadState");
export const resetSheepList = createAction("resetSheepList");
export const addNewToSheepList = createAction("addNewToSheepList");
export const setSheepListToDefault = createAction("setSheepListToDefault");
export const deleteIndex = createAction<number>("deleteIndex");
export const editIndexName = createAction<SheepEdit<string>>("editIndexName");
export const editIndexColour = createAction<SheepEdit<SheepColourID>>("editIndexColour");
export const setOption = createAction<OptionEdit<keyof SpawnCommandOptions>>("setOption");
export const saveNewActiveProfile = createAction("saveNewActiveProfile");
export const deleteProfileState = createAction("deleteProfile");

export const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(resetSheepList, (state, action) => {
            state.sheepList.length = 0;
        })
        .addCase(loadState, (state, action) => {
            Object.assign(state, action.payload);
        })
        .addCase(setSheepListToDefault, (state, action) => {
            state.sheepList = [...defaultSheepList];
        })
        .addCase(addNewToSheepList, (state, action) => {
            state.sheepList.push({ name: "", colourId: 0 });
        })
        .addCase(deleteIndex, (state, action) => {
            state.sheepList.splice(action.payload, 1);
        })
        .addCase(editIndexName, (state, action) => {
            const { value, index } = action.payload;
            state.sheepList[index].name = value;
        })
        .addCase(editIndexColour, (state, action) => {
            const { value, index } = action.payload;
            state.sheepList[index].colourId = value;
        })
        .addCase(setOption, (state, action) => {
            const { value, option } = action.payload;
            // @ts-ignore
            state.options[option] = value;
        })
        .addCase(saveNewActiveProfile, (state, action) => {
            const newName = window.prompt("new profile name:", "default");
            if (newName) {
                state.activeProfile = newName;
                saveState(state);
            }
        })
        .addCase(deleteProfileState, (state, action) => {
            deleteProfileFromStorage(state.activeProfile);
            state.activeProfile = "";
        })
})