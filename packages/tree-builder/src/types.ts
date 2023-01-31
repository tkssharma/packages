export interface Criteria {
  name: string;
  node_id?: string;
  weight: number;
  description: string;
  parent_node_id?: string | null;
  children: Criteria[] | null;
}

export class NodeNotFoundException extends Error {
  constructor(message: string) {
    super(message);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, NodeNotFoundException.prototype);
  }
}
export class InvalidCriteriaNodes extends Error {
  constructor(message: string) {
    super(message);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, InvalidCriteriaNodes.prototype);
  }
}
