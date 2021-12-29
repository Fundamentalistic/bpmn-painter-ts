export type Bounds = {
    x: Number,
    y: Number,
    width: Number | undefined,
    height: Number | undefined,
};

export type BPMNShape = {
    id: String,
    bpmnElement: String,
    type: String,
    bounds: Bounds,
};

export type BPMNPlane = {
    id: String,
    bpmnElement: String,
    type: String,
    bpmnElements: Array<BPMNShape | BPMNEdge>
}

export type Waypoint = {
    x: Number,
    y: Number
}

export type StartEvent = {
    id: String,
    outgoing: String
};

export type EndEvent = {
    id: String,
    incoming: String[]
};

export type BPMNEdge = {
    id: String,
    bpmnElement: String,
    type: String,
    waypoints: Array<Waypoint>
};

export type DiagramDefinition = {
    id: String | undefined,
    elements: Array<BPMNShape | BPMNEdge>
};

export type BPMNDiagram = {
    id: String,
    plane: BPMNPlane
};

export type BPMNProcess = {
    id: String,
    executable: Boolean,
    versionTag: String,
    bpmnElements: Array<StartEvent | EndEvent | BPMNShape>

}

export type Definitions = {
    process: BPMNProcess,
    diagram: BPMNDiagram
};