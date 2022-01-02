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
    position: Point,
    width: number,
    height: number,
}

/**
 * @interface Connection
 * @property connectWith  an element id to pave a connection to
 * @property connectionMileStones  an array of connection start, end and intermediate points
 */
interface Connection {
    connectWith: string,
    connectionMileStones: Array<Point>,
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
 */
export interface Element {
    type: string,
    id: string,
    name?: string,
    background_color?: string,
    shapeParameters: Shape,
    connection?: Connection,
    belongsToGroup?: string,
}

/**
 * @interface StandAloneConnection
 * intended to be used to implement connections kind of
 * group to  group, element to group, group to element, element to element
 * @property from connection start element identifier
 * @property to connection end element identifier
 * @property connectionMileStones a certain connection path
 */
export interface StandAloneConnection {
    from: string,
    to: string,
    connectionMileStones: Array<Point>,
}
