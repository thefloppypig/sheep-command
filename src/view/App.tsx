import { connect } from 'react-redux';
import { OutputMode, spawnCommands, spawnJson } from '../sheep/spawnCommands';
import { State, addNewToSheepList, resetSheepList, setOption, setSheepListToDefault } from '../state/reducer';
import { AppDispatch } from '../state/store';
import './App.css';
import SaveLoad from './SaveLoad';
import { SheepEntry } from './SheepEntry';

function App(props: AppProp) {
  const { dispatch, state } = props;
  const { sheepList, options } = state;
  const { x, y, z, baby, invulnerable, nametagAlwaysVisible, commandOutput } = options;

  const commandList = commandOutput === OutputMode.Command ? spawnCommands(sheepList, options) : spawnJson(sheepList, options)

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
      <span>commandOutput:<input className='coord' type="checkbox" checked={commandOutput === OutputMode.Command} onChange={(ev) => dispatch(setOption({ option: "commandOutput", value: ev.target.checked ? OutputMode.Command : OutputMode.JSON }))} /></span>
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
        <pre>
          <div className='output'>
            <button onClick={() => navigator.clipboard.writeText(commandList.join("\n"))}>Copy</button>
            <button onClick={() => exportAsFile(commandList.join("\n"), `${state.activeProfile || `sheep${commandList.length}`}.${commandOutput === OutputMode.Command ? "mcfunction" : "json"}`, "text/html")}>Export</button>
            <div className='command'>
              {commandList.map((command, i) => <div style={{ background: i % 2 ? "inherit" : "#bbbbbb" }} key={i}>{command}</div>)}
            </div>
          </div>
        </pre>
      </div>
    </div>
  );
}

function exportAsFile(data: string, filename: string, type: string) {
  var file = new Blob([data], {type: type});
  // @ts-ignore
  if (window.navigator.msSaveOrOpenBlob) window.navigator.msSaveOrOpenBlob(file, filename);
  else { // Others
      var a = document.createElement("a"),
              url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function() {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);  
      }, 0); 
  }
}

type AppProp = ReturnType<typeof mapState> & { dispatch: AppDispatch };

export function mapState(state: State) {
  return {
    state
  }
}

export default connect(mapState)(App);