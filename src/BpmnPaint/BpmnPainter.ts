import testXML from '../testXML';
// @ts-ignore
import BpmnViewer from 'bpmn-js/lib/NavigatedViewer';
import {
    GroupWrapper,
    GroupWrapperShape,

} from './types'

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
    coordinateSystem = {
        stepX: 1400 / 12,
        stepY: 120
    }
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
        let minI:number, minJ:number, maxI:number, maxJ:number;
        wrapperParameters.elements.map((shape)=>{
            if (!minI) {
            }
        });
    }

    drawConditionElement() {

    }

    execute(){
        this.bpmnViewer.importXML(this.testXML);
    }
}