import { connect } from 'react-redux';
import { spawnCommands } from '../sheep/spawnCommands';
import { State, addNewToSheepList, resetSheepList, setOption, setSheepListToDefault } from '../state/reducer';
import { AppDispatch } from '../state/store';
import './App.css';
import SaveLoad from './SaveLoad';
import { SheepEntry } from './SheepEntry';

function App(props: AppProp) {
  const { dispatch, state } = props;
  const { sheepList, options } = state;
  const { x, y, z, baby, invulnerable, nametagAlwaysVisible } = options;

  const commandList = spawnCommands(sheepList, options)

  return (
    <div className="App">
      <SaveLoad />
      <hr />
      <div className='options'>
        <div>
          <span>x:<input className='coord' type="number" value={x} onChange={(ev) => dispatch(setOption({ option: "x", value: Number(ev.target.value) }))} /></span>
          <span>y:<input className='coord' type="number" value={y} onChange={(ev) => dispatch(setOption({ option: "y", value: Number(ev.target.value) }))} /></span>
          <span>z:<input className='coord' type="number" value={z} onChange={(ev) => dispatch(setOption({ option: "z", value: Number(ev.target.value) }))} /></span>
        </div>
        <span>invulnerable:<input className='coord' type="checkbox" checked={invulnerable} onChange={(ev) => dispatch(setOption({ option: "invulnerable", value: ev.target.checked }))} /></span>
        <span>baby:<input className='coord' type="checkbox" checked={baby} onChange={(ev) => dispatch(setOption({ option: "baby", value: ev.target.checked }))} /></span>
        <span>nametagAlwaysVisible:<input className='coord' type="checkbox" checked={nametagAlwaysVisible} onChange={(ev) => dispatch(setOption({ option: "nametagAlwaysVisible", value: ev.target.checked }))} /></span>
      </div>
      <hr />
      <div className="main">
        <div className='list'>
          <button onClick={() => dispatch(addNewToSheepList())}>+</button>
          <button onClick={() => dispatch(resetSheepList())}>x</button>
          <button onClick={() => dispatch(setSheepListToDefault())}>Default sheep</button>
          <br />
          <br />
          {sheepList.map((sheepData, index) => {
            return <SheepEntry key={index} index={index} name={sheepData.name} colourId={sheepData.colourId} options={options}></SheepEntry>
          })}
        </div>
        <div className='output'>
          <button onClick={() => navigator.clipboard.writeText(commandList.join("\n"))}>Copy</button>
          <div className='command'>
            {commandList.map((command, i) => <div style={{ background: i % 2 ? "inherit" : "#bbbbbb" }} key={i}>{command}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

type AppProp = ReturnType<typeof mapState> & { dispatch: AppDispatch };

export function mapState(state: State) {
  return {
    state
  }
}

export default connect(mapState)(App);