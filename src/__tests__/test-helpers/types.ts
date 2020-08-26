import { VNode, RendererNode, RendererElement } from "vue";

export type NodeShape = JSX.Element & VNode<RendererNode, RendererElement>;