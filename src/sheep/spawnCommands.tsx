import { SheepEntryData } from '../view/SheepEntry';
import { sheepColourData } from './sheepData';

export enum OutputMode {
    Command = 0,
    JSON = 1,
}

export const defaultSpawnCommandOptions = {
    x: 0,
    y: 1,
    z: 0,
    invulnerable: true,
    baby: false,
    nametagAlwaysVisible: false,
    commandOutput: OutputMode.JSON,
};

export type SpawnCommandOptions = typeof defaultSpawnCommandOptions;

export function spawnCommands(input: SheepEntryData[], options?: Partial<SpawnCommandOptions>) {
    let commandList = [];
    const spawnOption = { ...defaultSpawnCommandOptions, ...options };

    for (let index = 0; index < input.length; index++) {
        const entry = input[index];
        commandList.push(spawnCommand(entry, spawnOption));
    }
    return commandList;
}

export function spawnJson(input: SheepEntryData[], options?: Partial<SpawnCommandOptions>) {
    const inputProcessed = []
    for (const sheep of input) {
        inputProcessed.push({
            name: sheep.name ? sheep.name : sheepColourData.getDisplayName(sheep.colourId), color: sheep.colourId
        })
    }

    const str = JSON.stringify(inputProcessed, undefined, "    ");
    return [str]
}

function spawnCommand(entry: SheepEntryData, options: SpawnCommandOptions) {
    const { x, y, z, invulnerable, baby, nametagAlwaysVisible } = options;
    const baseCommand = `summon minecraft:sheep ~${x} ~${y} ~${z}`;
    const nbt = [`Color:${entry.colourId}`, `CustomName:'[{"text":"${entry.name || sheepColourData.getDisplayName(entry.colourId)}"}]'`];
    if (invulnerable) nbt.push(`Invulnerable:1b`);
    if (baby) nbt.push(`Age:-2147483648`);
    if (nametagAlwaysVisible) nbt.push(`CustomNameVisible:1b`);
    return `${baseCommand} {${nbt.join(", ")}}`;
}