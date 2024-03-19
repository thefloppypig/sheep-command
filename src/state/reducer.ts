import { createAction, createReducer } from "@reduxjs/toolkit";
import { SheepEntryData } from "../SheepEntry";
import { SheepColourData, SheepColourID } from "../sheepData";

const defaultSheepList: SheepEntryData[] = SheepColourData.map((col, i) => { return { name: "", colour: i } })

const initialState = {
    sheepList: [] as SheepEntryData[]
}

export type State = typeof initialState

export type SheepEdit<T> = { index: number, value: T }

export const resetSheepList = createAction("resetSheepList");
export const addNewToSheepList = createAction("addNewToSheepList");
export const setSheepListToDefault = createAction("setSheepListToDefault");
export const deleteIndex = createAction<number>("deleteIndex");
export const editIndexName = createAction<SheepEdit<string>>("editIndexName");
export const editIndexColour = createAction<SheepEdit<SheepColourID>>("editIndexColour");

export const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(resetSheepList, (state, action) => {
            state.sheepList.length = 0;
        })
        .addCase(setSheepListToDefault, (state, action) => {
            state.sheepList = [...defaultSheepList];
        })
        .addCase(addNewToSheepList, (state, action) => {
            state.sheepList.push({ name: "", colour: 0 });
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
            state.sheepList[index].colour = value;
        })
})