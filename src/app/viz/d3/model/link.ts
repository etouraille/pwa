import { Node } from './';

// Implementing SimulationLinkDatum interface into our custom Link class
export class Link implements d3.SimulationLinkDatum<Node> {
    // Optional - defining optional implementation properties - required for relevant typing assistance
    index?: number;
    style: any;

    // Must - defining enforced implementation properties
    source: Node;
    target: Node;

    constructor(source, target, style) {
        this.source = source;
        this.target = target;
        this.style = style;
    }
}
