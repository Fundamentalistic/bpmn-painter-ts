import testXML from "../testXML";
// @ts-ignore
import BpmnViewer from 'bpmn-js/lib/NavigatedViewer';


export type BpmnPainterProps = {
    containerId: String,
    modules: Array<Object> | undefined,
    bpmnViewer: BpmnViewer
}

export class BpmnPainter {

    testXML: String; // Just for development
    bpmnViewer: BpmnViewer

    constructor(props: BpmnPainterProps) {
        this.testXML = testXML(); // Must be deleted on production
        console.log(props.containerId);
        this.bpmnViewer = new BpmnViewer({
            container: props.containerId
        });
    }

    createShape(
        x : Number,
        y : Number,
        bpmnElement: String | undefined = undefined,
        width : Number = 100,
        height : Number = 100
    ){
        const randomId = Math.random().toString(36).substring(2);
        if(!bpmnElement){
            bpmnElement = Math.random().toString(36).substring(2);
        }
        return `<bpmndi:BPMNShape id="Shape_${randomId}" bpmnElement="${bpmnElement}">
                <dc:Bounds x="${x}" y="${y}" width="${width}" height="${height}" />
            </bpmndi:BPMNShape>`;
    }

    execute(){
        this.bpmnViewer.importXML(this.testXML);
    }
};