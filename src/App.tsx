import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BpmnPainter,
  BpmnPainterProps
} from './BpmnPaint/BpmnPainter';

import {
  Element,
  StandAloneConnection,
} from './BpmnPaint/types';

function App() {

  const commonVerticalShift = 1250;
  const elements: Element[] = [
      {
        type:'startEvent',
        id: 'startEvent1',
        shapeParameters: {
          type: 'BPMNShape',
          id: 'startEvent1Shape',
          position: {
            x: 732,
            y: 1502 - commonVerticalShift,
          },
          width: 36,
          height: 36
        },
        connection: {
          connectWith: 'endEvent1',
          connectionMileStonesCoordinates: [
            {
              x: 750,
              y: 1538 - commonVerticalShift,
            },
            {
              x: 950,
              y: 1702 - commonVerticalShift,
            }
          ]
        },
        belongsToGroup: 'testGroup',
      },
      {
        type: 'endEvent',
        id: 'endEvent1',
        shapeParameters: {
          type: 'BPMNShape',
          id: 'endEvent1Shape',
          position: {
            x: 932,
            y: 1702 - commonVerticalShift,
          },
          width: 36,
          height: 36,
        },
        belongsToGroup: 'testGroup',
      },
      {
        type: 'task',
        id: 'task1',
        name: 'TASK_FORCE141',
        shapeParameters: {
          type: 'BPMNShape',
          id: 'task1Shape',
          position: {
            x: 1032,
            y: 2102 - commonVerticalShift,
          },
          width: 100,
          height: 100,
        },
        belongsToGroup: 'anotherTestGroup'
      },
    {
      type: 'task',
      id: 'task2',
      name: 'TASK-FORCE141',
      shapeParameters: {
        type: 'BPMNShape',
        id: 'task2Shape',
        position: {
          x: 1182,
          y: 2102 - commonVerticalShift,
        },
        width: 100,
        height: 100,
      },
      belongsToGroup: 'anotherTestGroup',
      background_color: '#123123',
      border_color: "yellow",
    },
    {
      type: 'callActivity',
      id: 'callActivity1',
      name: 'Test Call Activity',
      shapeParameters: {
        type: 'BPMNShape',
        id: 'callActivity1Shape',
        cell: {
          i: 1,
          j: 2,
        },
        width: 100,
        height: 100,
      },
      background_color: "black",
      border_color: "white",
      connection: {
        connectWith: 'testGroup',
        connectionMileStonesCells: [
          {
            i: 1,
            j: 2.4,
          },
          {
            i: 3,
            j: 2.4,
          },
          {
            i: 5.4,
            j: 2.4,
          }
        ]
      }
    },

  ];

  const extraConnections :StandAloneConnection[] = [
    {
      from: 'testGroup',
      to: 'anotherTestGroup',
      connectionMileStonesCoordinates: [
          {
            x: 850,
            y: 1902 - commonVerticalShift,
          },
          {
            x: 1032,
            y: 2002 - commonVerticalShift,
          }
      ]
    }
  ]

  const props : BpmnPainterProps = {
    containerId: '#bpmnCanvas',
    modules: undefined,
    bpmnViewer: undefined,
  }
  useEffect(() => {
    const bp = new BpmnPainter(props);
    bp.loadAndProcessDiagramContent(elements);
    bp.installStandAloneConnections(extraConnections);
    bp.execute();
  }, [])
  return (
    <div id={'bpmnCanvas'} className="App">

    </div>
  );
}

export default App;
