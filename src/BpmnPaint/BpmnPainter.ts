import testXML from '../testXML';
// @ts-ignore
import BpmnViewer from 'bpmn-js/lib/NavigatedViewer';
import {
    EndEvent,
    BPMNShape,
    Connection,
    ConnectionPath,
    ElementID,
    GroupWrapperShape,
    BPMNDiagram,
    Definitions,
    BPMNProcess,
    OrdinaryTask,

} from './types'
import {webcrypto} from "crypto";
import {
    endEvent,
    endXMLDefinition,
    provideDefinitions,
    startXMLDefinitions,
    xmlHeader,
    bpmnShape,
    connect,
    ConnectionRoad,
    GroupShape,
    Task,
    ConditionElement,
} from "./definitions";

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
    bpmnViewer: BpmnViewer;
    mainProcessXML: string;
    mainDefinitionsXML: string;
    mainProcess: BPMNProcess | undefined;
    mainDefinitions: string[];
    bpmnDiagram: BPMNDiagram | undefined;
    processContent: string[] = []; // мысль: собрать отдельно процесс, затем диаграмму
    diagramContent: string[] = []; // но входящие данные должны быть устроены так, чтобы в одном месте всегда
                                    // были параметры как для секции процесса, так и диаграммы


    constructor(props: BpmnPainterProps) {
        this.testXML = testXML(); // Must be deleted on production
        console.log(props.containerId);
        this.bpmnViewer = new BpmnViewer({
            container: props.containerId
        });
        this.mainProcessXML = '';
        this.mainDefinitionsXML = '';
        this.mainProcess = undefined;
        this.bpmnDiagram = undefined;
        this.mainDefinitions = [];
    }

    establishConnection(connectionParameters: Connection) {
            return connect(connectionParameters);
    }

    specifyConnectionPath(connectionPath: ConnectionPath) {
        return ConnectionRoad(connectionPath);
    }

    drawRegularShape(shapeParameters: BPMNShape) {
        return bpmnShape(shapeParameters);

    }
    // No idea how to implement this method
    drawLabel() {

    }

    drawGroup(diagramElement: ElementID) {
        return `<bpmn:group id="${diagramElement.id}"/>`
    }

    drawGroupShape(wrapperParameters: GroupWrapperShape) {
        return GroupShape(wrapperParameters);
    }
    // to draw a conditional element shape, use drawRegularShape
    drawConditionElement(diagramElement: ElementID) {
        return ConditionElement(diagramElement);
    }

    // to draw an ordinary task shape, use drawRegularShape
    drawOrdinaryTask(taskParams: OrdinaryTask) {
        return Task(taskParams);
    }

    drawEndEvent(eventParams: EndEvent){
        return endEvent(eventParams);
    }

    buildCompleteXML() {


        // const definitions: Definitions = {
        //     id: Math.random().toString(36).substring(2),
        //     process: <BPMNProcess>this.mainProcess,
        //     diagram: <BPMNDiagram>this.bpmnDiagram,
        // }
        // const completeDiagram = String.prototype.concat(
        //     xmlHeader,
        //     provideDefinitions(definitions),
        //     endXMLDefinition
        // );

        // return completeDiagram;
    }

    execute(){
        this.bpmnViewer.importXML(this.testXML);
    }
}