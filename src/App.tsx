import React from 'react';
import './App.css';
import { SheepEntry, SheepEntryData } from './SheepEntry';
import { AppDispatch, useAppDispatch } from './state/store';
import { State, addNewToSheepList, resetSheepList, setSheepListToDefault } from './state/reducer';
import { connect } from 'react-redux';
import { SheepColourData } from './sheepData';

function App(props: AppProp) {
  const { dispatch, sheepList } = props;

  const commandList = spawnCommands(sheepList)

  return (
    <div className="App">
      <div className='input'>
        <button onClick={() => dispatch(addNewToSheepList())}>+</button>
        <button onClick={() => dispatch(resetSheepList())}>x</button>
        <button onClick={() => dispatch(setSheepListToDefault())}>Default sheep</button>
        <br />
        <br />
        {sheepList.map((sheepData, index) => {
          return <SheepEntry key={index} index={index} name={sheepData.name} colour={sheepData.colour}></SheepEntry>
        })}
      </div>
      <div className='output'>
        <button onClick={() => navigator.clipboard.writeText(commandList.join("\n"))}>Copy</button>
        <div className='command'>
          {commandList.map((command, i) => <div key={i}>{command}</div>)}
        </div>
      </div>
    </div>
  );
}

function spawnCommands(input: SheepEntryData[]) {
  let commandList = [];


  for (let index = 0; index < input.length; index++) {
    const entry = input[index];
    commandList.push(spawnCommand(entry))
  }
  return commandList;
}

function spawnCommand(entry: SheepEntryData) {
  return `/summon minecraft:sheep ~ ~1 ~ {Color:${entry.colour},CustomName:'[{"text":"${entry.name || SheepColourData[entry.colour].name}"}]',Invulnerable:1b}\n`
}

type AppProp = ReturnType<typeof mapState> & { dispatch: AppDispatch };

export function mapState(state: State) {
  return state
}

export default connect(mapState)(App);