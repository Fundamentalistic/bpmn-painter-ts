import {
    BPMNDiagram,
    BPMNEdge,
    BPMNPlane,
    BPMNProcess,
    BPMNShape, Definitions,
    DiagramDefinition,
    EndEvent, GroupWrapper,
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
    return `<bpmn:startEvent id="${event.id}">
                <bpmn:outgoing>${event.outgoing}</bpmn:outgoing>
            </bpmn:startEvent>`;
}

export function endEvent (event: EndEvent) {
    let endEventIncomingArray = event.incoming.map((incomingConnection) => {
        return `<bpmn:incoming>
                    ${incomingConnection}
                </bpmn:incoming>`
    });

    return `<bpmn:endEvent id="${event.id}">
                ${endEventIncomingArray.join('')}
            </bpmn:endEvent>`
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






