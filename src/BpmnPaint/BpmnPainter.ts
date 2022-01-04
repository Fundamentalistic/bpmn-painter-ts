import testXML from '../testXML';
import exportXml from '../xmlInvestigator';
// @ts-ignore
import BpmnViewer from 'bpmn-js/lib/NavigatedViewer';

import {
    webcrypto
} from 'crypto';

import {
    xmlHeader,
    startXMLDefinitions,
    endXMLDefinitions,
    mainProcessStart,
    mainProcessEnd,
    mainDiagramStart,
    mainDiagramEnd,
    mainPlainStart,
    mainPlainEnd,
    inputDataParser,
    groupContainersOrchestrator,
    standAloneConnectionsInstaller,
} from './definitions';

import {
    Element,
    Point,
    StandAloneConnection,
} from './types';


export type BpmnPainterProps = {
    containerId: string,
    modules: Array<Object> | undefined,
    bpmnViewer: BpmnViewer
}

export class BpmnPainter {

    // testXML: string; // Just for development
    bpmnViewer: BpmnViewer;
    mainProcessContent: string[] = [];
    mainDiagramContent: string[] = [];
    groupParameters : Map<string, Array<Point>> = new Map<string, Array<Point>>();
    mainProcessStartTag: string = mainProcessStart;


    constructor(props: BpmnPainterProps) {
        // this.testXML = testXML(); // Must be deleted on production
        // this.testXML = exportXml();
        console.log(props.containerId);
        this.bpmnViewer = new BpmnViewer({
            container: props.containerId
        });
    }

    setUpProcessParameters(isExecutable?: boolean, versionTag?: string) :void {

        if (isExecutable && versionTag) {
            this.mainProcessStartTag = `<bpmn:process id="Process_Test_Strategy" isExecutable="${isExecutable}" camunda:versionTag="${versionTag}">`;
        } else if(versionTag) {
            this.mainProcessStartTag = `<bpmn:process id="Process_Test_Strategy" isExecutable="true" camunda:versionTag="${versionTag}">`;
            return;
        }else if (isExecutable) {
            this.mainProcessStartTag = `<bpmn:process id="Process_Test_Strategy" isExecutable="${isExecutable}" camunda:versionTag="20211201-142">`;
            return;
        }

    }

    loadAndProcessDiagramContent (elementsList: Array<Element>) :void {
        inputDataParser(elementsList, this.mainProcessContent, this.mainDiagramContent, this.groupParameters);
        groupContainersOrchestrator(this.mainDiagramContent, this.groupParameters);
    }

    installStandAloneConnections (standAloneConnections: Array<StandAloneConnection>) :void {
        standAloneConnectionsInstaller(standAloneConnections, this.mainProcessContent, this.mainDiagramContent);
    }
    resultXmlAssembler() :string {
        return `
            ${xmlHeader}
                ${startXMLDefinitions}
                    ${this.mainProcessStartTag}
                        ${this.mainProcessContent.join('')}
                    ${mainProcessEnd}
                    ${mainDiagramStart}
                        ${mainPlainStart}
                            ${this.mainDiagramContent.join('')}
                        ${mainPlainEnd}
                    ${mainDiagramEnd}
                ${endXMLDefinitions}
        `
    }

    // before execution call loadAndProcessDiagramContent with properly formatted input data
    execute(){
        // this.bpmnViewer.importXML(this.testXML);
        this.bpmnViewer.importXML(this.resultXmlAssembler())

    }
}