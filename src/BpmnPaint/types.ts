/**
 * @interface Point
 * @property x defines a diagram element position along horizontal direction (from left to right)
 * @property y defines a diagram element position along vertical direction (from up to down)
 */
export interface Point {
    x: number,
    y: number,
}


/**
 * @interface Cell
 * use this interface to set up a diagram element position roughly.
 * i, j values are allowed to be a floating point numbers
 * @property i is a cell horizontal index (from left to right the screen),
 * its value is positive, integer and less than 25, but can be outside this range
 * @property j is a cell vertical index (from up to down the screen),
 * its values is positive, integer and less than 25, but can be outside this range
 */
export interface Cell {
    i: number,
    j: number,
}

/**
 * @interface Shape
 * @property type defines element shape type, specify 'BPMNShape' by default (until possible module extensions)
 * @property id  a unique shape identifier
 * @property position puts an element shape in a certain diagram place
 * @property width sets an element shape width (along horizontal direction)
 * @property height sets an element shape height (along vertical direction)
 */
interface Shape {
    type: string,
    id: string,
    position?: Point,
    cell?: Cell,
    width: number,
    height: number,
}

/**
 * @interface Connection
 * @property connectWith  an element id to pave a connection to
 * @property connectionMileStonesCoordinates  an array of connection start, end and intermediate points
 * in (x, y) terms
 * @property connectionMileStonesCells an array of connection start, end and intermediate points
 * in (i, j) terms
 * One must use one property, connectionMileStonesCoordinates or connectionMileStonesCells only,
 * DO NOT leave both properties vacant and DO NOT declare them simultaneously!
 */
interface Connection {
    connectWith: string,
    connectionMileStonesCoordinates?: Array<Point>,
    connectionMileStonesCells?: Array<Cell>,
}

/**
 * @interface Element
 * @property type  an element type (task, endEvent, startEvent, etc.)
 * @property id  a unique element identifier
 * @property name a diagram element caption or inner text
 * @property shapeParameters describes a diagram element sizes and position
 * @property connection tells whether a certain element has to be connected with another one or not
 * @property belongsToGroup a group unique identifier to put a certain element in
 * @property background_color defines element color, strictly recommended to use hex string values!
 * dark green, for instance, '#123123', pure white '#ffffff'
 * @property border_color defines an element border color and element text color
 */
export interface Element {
    type: string,
    id: string,
    name?: string,
    background_color?: string,
    border_color?:  string,
    shapeParameters: Shape,
    connection?: Connection,
    belongsToGroup?: string,
}

/**
 * @interface StandAloneConnection
 * intended to be used to implement connections kind of
 * group to  group, element to group, group to element, element to element, including extra connections
 * @property from connection start element identifier
 * @property to connection end element identifier
 * @property connectionMileStonesCoordinates  an array of connection start, end and intermediate points
 * in (x, y) terms
 * @property connectionMileStonesCells an array of connection start, end and intermediate points
 * in (i, j) terms
 * One must use one property, connectionMileStonesCoordinates or connectionMileStonesCells only,
 * DO NOT leave both properties vacant and DO NOT declare them simultaneously!
 */
export interface StandAloneConnection {
    from: string,
    to: string,
    connectionMileStonesCoordinates?: Array<Point>,
    connectionMileStonesCells?: Array<Cell>,
}
