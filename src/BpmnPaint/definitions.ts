import {
    BPMNEdge,
    BPMNPlane,
    BPMNShape
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
    return `<bpmndi:BPMNEdge id="Flow_0bi6nmz_di" bpmnElement="Flow_To_Has_DICH3_Current_DQ_Brand">
                <di:waypoint x="860" y="216" />
                <di:waypoint x="1000" y="216" />
            </bpmndi:BPMNEdge>`;
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
