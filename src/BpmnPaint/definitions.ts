import {
    BPMNDiagram,
    BPMNEdge,
    BPMNPlane,
    BPMNProcess,
    BPMNShape, Connection, ConnectionPath, Definitions,
    DiagramDefinition,
    ElementID,
    EndEvent,
    GroupWrapperShape,
    OrdinaryTask,
    StartEvent,
} from './types';

export const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>`;
export const startXMLDefinitions = `<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:camunda="http://camunda.org/schema/1.0/bpmn" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="Definitions_166kp7m" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="3.7.1">`;
export const endXMLDefinition = `</bpmn:definitions>`;

export function bpmnShape(shape : BPMNShape){
    return `<bpmndi:BPMNShape id="${shape.id}" bpmnElement="${shape.bpmnElement}">
                <dc:Bounds x="${shape.bounds.x}" y="${shape.bounds.y}" width="${shape.bounds.width}" height="${shape.bounds.height}" />
            </bpmndi:BPMNShape>`;
}

export function bpmnEdge(shape : BPMNEdge){
    let wayPointsArray: string[] = shape.waypoints.map((point)=>{
        return `<di:waypoint x="${point.x}" y="${point.y}" />`
    })

    let resultArray: string[] = Array.prototype.concat(
        [`<bpmndi:BPMNEdge id="${shape.id}" bpmnElement="${shape.bpmnElement}">`],
        wayPointsArray,
        [`</bpmndi:BPMNEdge>`],
    );
    return resultArray.join('');
    // return `<bpmndi:BPMNEdge id="Flow_0bi6nmz_di" bpmnElement="Flow_To_Has_DICH3_Current_DQ_Brand">
    //             <di:waypoint x="860" y="216" />
    //             <di:waypoint x="1000" y="216" />
    //         </bpmndi:BPMNEdge>`;
}

export function bpmnPlane(bpmnPlane : BPMNPlane){
    const elementsString = bpmnPlane.bpmnElements.map((bpmnElement) => {
        if(bpmnElement.type === 'shape'){
            return bpmnShape(<BPMNShape>bpmnElement);
        }else if(bpmnElement.type === 'edge'){
            return bpmnEdge(<BPMNEdge>bpmnElement);
        }
        });
    let stringsArray : string[] = Array.prototype.concat(
            [`<bpmndi:BPMNPlane id="${bpmnPlane.id}" bpmnElement="${bpmnPlane.bpmnElement}">`],
            elementsString,
            [`</bpmndi:BPMNPlane>`]
    );
    return stringsArray.join('');
}

export function diagramDefinition(definition: DiagramDefinition) {
    const elementsArray = definition.elements.map((bpmnElement) => {
        if (bpmnElement.type === 'shape') {
            return bpmnShape(<BPMNShape>bpmnElement);
        }
        if (bpmnElement.type === 'edge') {
            return bpmnEdge(<BPMNEdge>bpmnElement);
        }
    });

    let stringsArray : string[] = Array.prototype.concat(
        [`<bpmndi:DiagramDefinition id="${definition.id}">`],
        elementsArray,
        [`</bpmndi:DiagramDefinition>`],
    );

    return stringsArray.join('');
}

export function bpmnDiagram(diagram: BPMNDiagram) {
    return `<bpmndi:BPMNDiagram id="${diagram.id}">
                ${bpmnPlane(diagram.plane)}
            </bpmndi:BPMNDiagram>`;
}

export function startEvent (event: StartEvent) {
    return `<bpmn:startEvent id="${event.id}"/>`;
}

export function endEvent (event: EndEvent) {
    return `<bpmn:endEvent id="${event.id}"/>`
}

export function bpmnProcess(process: BPMNProcess) {
        let elementsArray = process.bpmnElements.map((element)=>{
            if(element.type === 'startEvent') {
                return startEvent(<StartEvent>element);
            }
            if (element.type === 'endEvent') {
                return endEvent(<EndEvent>element);
            }
        });

        return `<bpmn:process id="${process.id}" isExecutable="${process.executable} camunda:versionTag="${process.versionTag}">
                    ${elementsArray.join('')}
                </bpmn:process>`
}

export function provideDefinitions(definitions: Definitions) {
    return `<bpmn:definitions id="${definitions.id}">
                ${bpmnProcess(definitions.process)}
                ${bpmnDiagram(definitions.diagram)}
            </bpmn:definitions>`
}

export function GroupShape(wrapperParameters: GroupWrapperShape) {
    const xOffset :number = 100;
    const yOffset :number = 100;
    let minX :number = wrapperParameters.elements[0].bounds.x;
    let maxX :number = wrapperParameters.elements[0].bounds.x;
    let minY :number = wrapperParameters.elements[0].bounds.y;
    let maxY :number = wrapperParameters.elements[0].bounds.y;

    wrapperParameters.elements.forEach((shape)=>{
        if (minX > shape.bounds.x) {
            minX = shape.bounds.x;
        }
        if (minY > shape.bounds.y) {
            minY = shape.bounds.y;
        }

        if (maxX < shape.bounds.x) {
            maxX = shape.bounds.x;
        }
        if (maxY < shape.bounds.y) {
            maxY = shape.bounds.y;
        }
    });

    let GroupShapeX: number = minX - xOffset;
    let GroupShapeY: number = minY - yOffset;
    let GroupShapeWidth: number = maxX - minX + 2 * xOffset;
    let GroupShapeHeight: number = maxY - minY + 2 * yOffset;

    return bpmnShape({
        id: wrapperParameters.id,
        type: 'group',
        bpmnElement: wrapperParameters.bpmnElement,
        bounds: {
            x: GroupShapeX,
            y: GroupShapeY,
            width: GroupShapeWidth,
            height: GroupShapeHeight,
        }
    });
}

export function connect(connectionParameters: Connection) {
    return `<bpmn:sequenceFlow id="${connectionParameters.id}" sourceRef="${connectionParameters.sourceRef}" targetRef="${connectionParameters.targetRef}" />`
}

export function ConnectionRoad(connectionPath: ConnectionPath) {
    const arrayOfPoints = connectionPath.wayPointsArray.map((point) => {
        return `<di:waypoint x="${point.x}" y="${point.y}" />`
    })
    return `<bpmndi:BPMNEdge id="${connectionPath.id}" bpmnElement="${connectionPath.bpmnElement}">
                    ${arrayOfPoints.join('')}
                </bpmndi:BPMNEdge>`
}

export function ConditionElement(diagramElement: ElementID) {
    return `<bpmn:gateway id="${diagramElement.id}" />`
}

// to draw an ordinary task shape, use drawRegularShape
export function Task(taskParams: OrdinaryTask) {
    return `<bpmn:task id="${taskParams.id}" name="${taskParams.name}" />`
}






