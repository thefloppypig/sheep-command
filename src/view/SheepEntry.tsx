import { sheepColourData, SheepColourID } from "../sheep/sheepData"
import { SpawnCommandOptions } from "../sheep/spawnCommands"
import { deleteIndex, editIndexColour, editIndexName } from "../state/reducer"
import { useAppDispatch } from "../state/store"

export type SheepEntryData = {
    name: string
    colourId: SheepColourID
}

export type SheepEntryProps = SheepEntryData & {
    index: number
    options: SpawnCommandOptions
}

export function SheepEntry(props: SheepEntryProps) {
    const dispatch = useAppDispatch()
    const { colourId, name, index } = props
    const colourData = sheepColourData.list[colourId];
    return (
        <div className="sheepEntry">

            <input
                type="text"
                value={name}
                placeholder={sheepColourData.getDisplayName(colourId)}
                maxLength={32}
                onInput={(ev) => {
                    dispatch(editIndexName({ index, value: ev.currentTarget.value }))
                }} />

            <select value={colourId} style={{ background: colourData.colour }} onChange={(ev) => dispatch(editIndexColour({ index, value: Number(ev.target.value) }))} >
                {Object.entries(sheepColourData.map).map(([id, colour]) => <option key={id} value={id} style={{ background: colour.colour }}>{`${id} - ${colour.name}`}</option>)}
            </select>
            <button onClick={() => dispatch(deleteIndex(index))}>x</button>
        </div>
    )
}