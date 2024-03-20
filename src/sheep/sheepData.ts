
export type SheepColour = {
    name: string
    colour: string
    nickname?: string
}

export enum SheepColourID {
    White,
    Orange,
    Magenta,
    LightBlue,
    Yellow,
    Lime,
    Pink,
    DarkGray,
    LightGray,
    Cyan,
    Purple,
    DarkBlue,
    Brown,
    Green,
    Red,
    Black,
}

export class SheepColourData {
    public readonly map: Record<string, SheepColour> = {
        [SheepColourID.White]: { name: "White", colour: "#FFFFFF" },
        [SheepColourID.Orange]: { name: "Orange", colour: "#FFA500" },
        [SheepColourID.Magenta]: { name: "Magenta", colour: "#FF00FF" },
        [SheepColourID.LightBlue]: { name: "LightBlue", nickname: "Aqua", colour: "#ADD8E6" },
        [SheepColourID.Yellow]: { name: "Yellow", colour: "#FFFF00" },
        [SheepColourID.Lime]: { name: "Lime", colour: "#00FF00" },
        [SheepColourID.Pink]: { name: "Pink", colour: "#FFC0CB" },
        [SheepColourID.DarkGray]: { name: "DarkGray", nickname: "Grey", colour: "#A9A9A9" },
        [SheepColourID.LightGray]: { name: "LightGray", nickname: "Silver", colour: "#D3D3D3" },
        [SheepColourID.Cyan]: { name: "Cyan", colour: "#00FFFF" },
        [SheepColourID.Purple]: { name: "Purple", colour: "#800080" },
        [SheepColourID.DarkBlue]: { name: "DarkBlue", nickname: "Blue", colour: "#00008B" },
        [SheepColourID.Brown]: { name: "Brown", colour: "#A52A2A" },
        [SheepColourID.Green]: { name: "Green", colour: "#008000" },
        [SheepColourID.Red]: { name: "Red", colour: "#FF0000" },
        [SheepColourID.Black]: { name: "Black", colour: "#000000" },
    }
    public readonly list: SheepColour[];

    constructor() {
        this.list = Object.values(this.map);
    }

    getDisplayName(id: SheepColourID) {
        return this.map[id].nickname || this.map[id].name
    }
}

export const sheepColourData = new SheepColourData()

