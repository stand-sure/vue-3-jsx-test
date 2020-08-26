import { NodeShape } from "./types";

type PredicateShape = (
    this: void,
    element: NodeShape,
    index?: number,
    array?: NodeShape[]
) => boolean;

type FindShape = (
    parentNode: NodeShape,
    predicate: PredicateShape
) => NodeShape | undefined;

/**
 * Finds a child.
 * This is a convenience function to encapsulate the typeScript boilerplate...
 *
 * @param {NodeShape} parentNode - the parent node
 * @param {PredicateShape} predicate - the find predicate
 * @return {NodeShape | undefined}
 */
const findChild: FindShape = (
    parentNode: NodeShape,
    predicate: PredicateShape
): NodeShape | undefined => {
    const children = parentNode.children;

    if (!Array.isArray(children)) {
        return undefined;
    }

    const found = ((children as any) as NodeShape[]).find(predicate);

    return found;
};

/**
 * Finds a child by class (exact match)
 *
 * @param {NodeShape} parentNode
 * @param {string} className
 * @return {NodeShape | undefined}
 */
const findChildByClass = (
    parentNode: NodeShape,
    className: string
): NodeShape | undefined => {
    const predicate = (el: NodeShape) =>
        (el.props as { class?: string })?.class === className;

    return findChild(parentNode, predicate);
};

/**
 * Finds a child by prop names
 * (all props with the given names must have a value other than undefined)
 *
 * @param {NodeShape} parentNode
 * @param {string[]} names
 * @return {*}  {(NodeShape | undefined)}
 */
const findChildByPropNames = (
    parentNode: NodeShape,
    names: string[]
): NodeShape | undefined => {
    return findChild(parentNode, (n) =>
        names.every((name) => typeof n.props?.[name] !== "undefined")
    );
};

/**
 * Finds a child by "type" [Vue VNode-specific]
 *
 * @param {NodeShape} parentNode
 * @param {string} type
 * @return {*}  {(NodeShape | undefined)}
 */
const findChildByType = (
    parentNode: NodeShape,
    type: string
): NodeShape | undefined => {
    if (type === "text") {
        return findChild(
            parentNode,
            (n) =>
                typeof n.type === "symbol" &&
                n.type.toString() === "Symbol(Text)" &&
                typeof n.children === "string"
        );
    }

    return findChild(parentNode, (n) => n.type === type);
};

export { findChild, findChildByClass, findChildByPropNames, findChildByType };
