import testXML from '../testXML';
// @ts-ignore
import BpmnViewer from 'bpmn-js/lib/NavigatedViewer';
import {
    BPMNShape, Connection, ConnectionPath,
    ElementID,
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

    // One has to establish a connection between the elements after source element has been defined (?)
    establishConnection(connectionParameters: Connection) {
            return `<bpmn:sequenceFlow id="${connectionParameters.id}" sourceRef="${connectionParameters.sourceRef}" targetRef="${connectionParameters.targetRef}" />`
    }

    specifyConnectionPath(connectionPath: ConnectionPath) {
        const arrayOfPoints = connectionPath.wayPointsArray.map((point) => {
            return `<di:waypoint x="${point.x}" y="${point.y}" />`
        })
        return `<bpmndi:BPMNEdge id="${connectionPath.id}" bpmnElement="${connectionPath.bpmnElement}">
                    ${arrayOfPoints.join('')}
                </bpmndi:BPMNEdge>`
    }

    drawRegularShape(shapeParameters: BPMNShape) {
        return `<bpmndi:BPMNShape id="${shapeParameters.id}" bpmnElement="${shapeParameters.bpmnElement}">
                    <dc:Bounds x="${shapeParameters.bounds.x}" y="${shapeParameters.bounds.y}" width="${shapeParameters.bounds.width}" height="${shapeParameters.bounds.height}" />
      </bpmndi:BPMNShape>`

    }
    // No idea how to implement this method
    drawLabel() {

    }

    drawGroup(diagramElement: ElementID) {
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

        return this.drawRegularShape({
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
    // to draw a conditional element shape, use drawRegularShape
    drawConditionElement(diagramElement: ElementID) {
        return `<bpmn:gateway id="${diagramElement.id}">
                </bpmn:gateway>`
    }



    execute(){
        this.bpmnViewer.importXML(this.testXML);
    }
}