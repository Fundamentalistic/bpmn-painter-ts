import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {BpmnPainter, BpmnPainterProps} from './BpmnPaint/BpmnPainter';

function App() {
  const props : BpmnPainterProps = {
    containerId: '#bpmnCanvas',
    modules: undefined,
    bpmnViewer: undefined,
  }
  useEffect(() => {
    const bp = new BpmnPainter(props);
    bp.execute();
  }, [])
  return (
    <div id={'bpmnCanvas'} className="App">

    </div>
  );
}

export default App;
