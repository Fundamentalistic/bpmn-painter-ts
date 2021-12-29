export type Bounds = {
    x: number,
    y: number,
    width: number | undefined,
    height: number | undefined,
};

export type BPMNShape = {
    id: string,
    bpmnElement: string,
    type: string,
    bounds: Bounds,
};

export type BPMNPlane = {
    id: string,
    bpmnElement: string,
    type: string,
    bpmnElements: Array<BPMNShape | BPMNEdge>
}

export type Waypoint = {
    x: number,
    y: number
}

export type StartEvent = {
    id: string,
    outgoing: string,
    type: string,
};

export type EndEvent = {
    id: string,
    incoming: string[],
    type: string,
};

export type BPMNEdge = {
    id: string,
    bpmnElement: string,
    type: string,
    waypoints: Array<Waypoint>
};

export type DiagramDefinition = {
    id: string | undefined,
    elements: Array<BPMNShape | BPMNEdge>
};

export type BPMNDiagram = {
    id: string,
    plane: BPMNPlane
};

export type BPMNProcess = {
    id: string,
    executable: Boolean,
    versionTag: string,
    // bpmnElements: Array<StartEvent | EndEvent | BPMNShape>
    bpmnElements: Array<StartEvent | EndEvent> // NO SHAPE IN PROCESS!!!

}

export type Definitions = {
    id: string,
    process: BPMNProcess,
    diagram: BPMNDiagram,
};


/**
 * @type GroupWrapperShape
 * @property id a unique shape identifier
 * @property bpmnElement is a string that represents an id of an element to define its size and placement coordinates
 */
export type GroupWrapperShape = {
    id: string,
    bpmnElement: string,
    elements: Array<BPMNShape>
}
/**
 * @type GroupWrapper
 * @property id a unique diagram element id
 */
export type GroupWrapper = {
    id: string
}