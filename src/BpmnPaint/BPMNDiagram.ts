// import {BPMNEdge, BPMNShape, DiagramDefinition} from "./types";

export class BPMNDiagram {

    xml: String;
    id: String | undefined;

    constructor(diagramDefinition : any){
        this.id = diagramDefinition.id;
        this.xml = '';
        // const strArray = diagramDefinition.elements.map((element : BPMNShape | BPMNEdge) => {
        //     return
        // });
    }
    getXML(){
        return this.xml;
    }
}