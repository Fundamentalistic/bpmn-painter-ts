import testXML from '../testXML';
// @ts-ignore
import BpmnViewer from 'bpmn-js/lib/NavigatedViewer';
import {
    GroupWrapper,
    GroupWrapperShape,

} from './types'
import {webcrypto} from "crypto";

/**
 * The Global Doctrine is: NO SHAPES WITHIN PROCESS SECTION!!!
 * Process section defines a diagram elements list
 * Diagram section defines a diagram elements sizes, styles, etc.
 */
export type BpmnPainterProps = {
    containerId: string,
    modules: Array<Object> | undefined,
    bpmnViewer: BpmnViewer
}

export class BpmnPainter {

    testXML: string; // Just for development
    bpmnViewer: BpmnViewer
    // coordinateSystem = {
    //     stepX: 1400 / 12,
    //     stepY: 120
    // }
    constructor(props: BpmnPainterProps) {
        this.testXML = testXML(); // Must be deleted on production
        console.log(props.containerId);
        this.bpmnViewer = new BpmnViewer({
            container: props.containerId
        });
    }

    createShape(
        shapeId: string,
        x : number,
        y : number,
        bpmnElement?: string,
        width : number = 100,
        height : number = 100,

    ){
        if(!bpmnElement){
            bpmnElement = Math.random().toString(36).substring(2);
        }
        return `<bpmndi:BPMNShape id="${shapeId}" bpmnElement="${bpmnElement}">
                <dc:Bounds x="${x}" y="${y}" width="${width}" height="${height}" />
            </bpmndi:BPMNShape>`;
    }
    // No idea how to implement this method
    drawLabel() {

    }

    drawGroup(diagramElement: GroupWrapper) {
        return `<bpmn:group id="${diagramElement.id}"/>`
    }

    drawGroupShape(wrapperParameters: GroupWrapperShape) {
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

        return `<bpmndi:BPMNShape id="${wrapperParameters.id}" bpmnElement="${wrapperParameters.bpmnElement}">
                    <dc:Bounds x="${GroupShapeX}" y="${GroupShapeY}" width="${GroupShapeWidth}" height="${GroupShapeHeight}" />
                </bpmndi:BPMNShape>`
    }

    drawConditionElement() {

    }

    execute(){
        this.bpmnViewer.importXML(this.testXML);
    }
}