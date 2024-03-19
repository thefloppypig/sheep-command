import { SheepColourData, SheepColourID } from "./sheepData"
import { deleteIndex, editIndexColour, editIndexName } from "./state/reducer"
import { useAppDispatch } from "./state/store"

export type SheepEntryData = {
    name: string
    colour: SheepColourID
}

export type SheepEntryProps = SheepEntryData & {
    index: number
}

export function SheepEntry(props: SheepEntryProps) {
    const dispatch = useAppDispatch()
    const { colour, name, index } = props
    const colourData = SheepColourData[colour];
    return (
        <div className="sheepEntry">

            <input
                type="text"
                value={name}
                placeholder={colourData.name}
                maxLength={32}
                onInput={(ev) => {
                    dispatch(editIndexName({ index, value: ev.currentTarget.value }))
                }} />

            <select value={colour} style={{ background: colourData.colour }} onChange={(ev) => dispatch(editIndexColour({ index, value: Number(ev.target.value) }))} >
                {Object.entries(SheepColourData).map(([id, colour]) => <option key={id} value={id} style={{ background: colour.colour }}>{`${id} - ${colour.name}`}</option>)}
            </select>
            <button onClick={() => dispatch(deleteIndex(index))}>x</button>
        </div>
    )
}