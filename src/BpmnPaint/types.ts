export type Bounds = {
    x: number,
    y: number,
    width: number,
    height: number,
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
    type: string,
    connectWith: string,
};

export type EndEvent = {
    id: string,
    type: string,
    connectWith: string,
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
    bpmnElements: Array<StartEvent | EndEvent | OrdinaryTask | Connection> // NO SHAPE IN PROCESS!!!

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
 * @type ElementID
 * @property id a unique diagram element id
 * @property type defines which element type to draw
 */
export type ElementID = {
    id: string,
    type: string,
}

/**
 * @type Connection
 * @property id a unique connection identifier, is used to define the connection path
 * @property sourceRef is an element id that is the connection origin
 * @property targetRef is  an element id that is the connection end
 */
export type Connection = {
    type: string,
    id: string,
    sourceRef: string,
    targetRef: string,
}

export type ConnectionPath = {
    id: string,
    bpmnElement: string,
    wayPointsArray: Array<Waypoint>,
}

/**
 * @type OrdinaryTask
 * @property id  a unique task identifier
 * @property name a string to display within ordinary task element
 */
export type OrdinaryTask = {
    type: string,
    id: string,
    name: string,
}