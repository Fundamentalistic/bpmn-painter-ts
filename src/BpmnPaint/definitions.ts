
import {
    Cell,
    Element,
    Point,
    StandAloneConnection,
} from './types';
export const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>`;
export const startXMLDefinitions = `<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:camunda="http://camunda.org/schema/1.0/bpmn" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="Definitions_166kp7m" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="4.0.0">`;
export const endXMLDefinitions = `</bpmn:definitions>`;
export const mainProcessStart = `<bpmn:process id="Process_Test_Strategy" isExecutable="true" camunda:versionTag="20211201-142">`;
export const mainProcessEnd = `</bpmn:process>`;
export const mainDiagramStart = `<bpmndi:BPMNDiagram id="BPMNDiagram_1">`;
export const mainDiagramEnd = `</bpmndi:BPMNDiagram>`;
export const mainPlainStart = `<bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_Test_Strategy">`;
export const mainPlainEnd = `</bpmndi:BPMNPlane>`;

const xOffset = 100;
const yOffset = 100;

const CellPointConvertor = (cell :Cell) :Point => {
    const stepX = 1400 / 12;
    const stepY = 120;
    return {
        x: cell.i * stepX,
        y: cell.j * stepY,
    }
}

export function inputDataParser(
    data: Array<Element>,
    processContent: Array<string>,
    diagramContent: Array<string>,
    groups: Map<string, Array<Point>>,
) :void {

    let positionObject :Point;
    data.forEach((element) => {

        positionObject = element.shapeParameters?.cell
            ? CellPointConvertor(element.shapeParameters.cell)
            : element.shapeParameters.position!;

        processContent.push(
            `<bpmn:${element.type} id="${element.id}" name="${element?.name ? element.name: ""}"/>`
        );

        diagramContent.push(
            `<bpmndi:${element.shapeParameters.type} id="${element.shapeParameters.id}" bpmnElement="${element.id}" color:background-color="${element?.background_color ? element.background_color : 'white'}"  color:border-color="${element?.border_color ? element.border_color : 'black'}">
                <dc:Bounds x="${positionObject.x}" y="${positionObject.y}" width="${element.shapeParameters.width}" height="${element.shapeParameters.height}" />
            </bpmndi:${element.shapeParameters.type}>`
        );

        if (element?.connection) {
            processContent.push(
                `<bpmn:sequenceFlow id="from${element.id}to${element.connection.connectWith}" sourceRef="${element.id}" targetRef="${element.connection.connectWith}" />`
            );
            diagramContent.push(
              `<bpmndi:BPMNEdge id="from${element.id}to${element.connection.connectWith}_di" bpmnElement="from${element.id}to${element.connection.connectWith}">
                    ${
                        element.connection.connectionMileStonesCoordinates
                            ? element.connection.connectionMileStonesCoordinates.map((point) => {
                                return `<di:waypoint x="${point.x}" y="${point.y}" />`
                            }).join('') 
                            :  element.connection.connectionMileStonesCells!.map((cell) => {
                                const tempObj = CellPointConvertor(cell);
                                return `<di:waypoint x="${tempObj.x}" y="${tempObj.y}" />`
                            })
                    }
               </bpmndi:BPMNEdge>
              `
            );

        }

        if (element?.belongsToGroup) {
            // first position designates group minimal coordinates, second position designates group maximal coordinates
            // that you can check out in the code below
            if (!groups.has(element.belongsToGroup)) {
                processContent.push(
                    `<bpmn:group id="${element.belongsToGroup}" />`
                );                                 // minimal X and Y                 maximal X and Y are initialized here
                groups.set(
                    element.belongsToGroup,
                    [positionObject, positionObject]);
            } else {

                const [currentMinCoordinates, currentMaxCoordinates]: Point[] = groups.get(element.belongsToGroup)!;
                groups.set(
                    element.belongsToGroup,
                    [
                        {
                            x: Math.min(currentMinCoordinates.x, positionObject.x),
                            y: Math.min(currentMinCoordinates.y, positionObject.y),
                        },
                        {
                            x: Math.max(currentMaxCoordinates.x, positionObject.x),
                            y: Math.max(currentMaxCoordinates.y, positionObject.y),
                        }
                    ]
                );

            }

        }
    });
}

export function groupContainersOrchestrator(
    diagramContent: Array<string>,
    groups: Map<string, Array<Point>>,
) :void {

    let GroupShapeX: number;
    let GroupShapeY: number;
    let GroupShapeWidth: number;
    let GroupShapeHeight: number;

    groups.forEach((value, key) => {

        GroupShapeX = value[0].x - xOffset;
        GroupShapeY = value[0].y - yOffset;
        GroupShapeWidth = value[1].x - GroupShapeX +  2 * xOffset;
        GroupShapeHeight = value[1].y - GroupShapeY + 2 * yOffset;

        diagramContent.push(
            `<bpmndi:BPMNShape id="${key}_di" bpmnElement="${key}">
                <dc:Bounds x="${GroupShapeX}" y="${GroupShapeY}" width="${GroupShapeWidth}" height="${GroupShapeHeight}" />
            </bpmndi:BPMNShape>`
        );
    })
}

export function standAloneConnectionsInstaller(
    standAloneConnections: Array<StandAloneConnection>,
    processContent: Array<string>,
    diagramContent: Array<string>,
) :void {
    standAloneConnections.forEach((connection) => {
        processContent.push(
            `<bpmn:sequenceFlow id="from${connection.from}to${connection.to}StandAlone" sourceRef="${connection.from}" targetRef="${connection.to}" />`
        );
        diagramContent.push(
            `<bpmndi:BPMNEdge id="from${connection.from}to${connection.to}_diStandAlone" bpmnElement="from${connection.from}to${connection.to}StandAlone">
                    ${
                        connection.connectionMileStonesCoordinates 
                            ? connection.connectionMileStonesCoordinates.map((point) => {
                                    return `<di:waypoint x="${point.x}" y="${point.y}" />`
                            }).join('') 
                            : connection.connectionMileStonesCells!.map((cell) => {
                                    const tempObj = CellPointConvertor(cell);
                                return `<di:waypoint x="${tempObj.x}" y="${tempObj.y}" />`
                            })
                    }
               </bpmndi:BPMNEdge>
              `
        );
    })
}






