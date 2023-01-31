// Code.

import debug = require("debug");
import { searchNode, validateNodes } from "./helper";
import { Criteria, NodeNotFoundException } from "./types";

/**
 * RatingConfigurationBuilder helps us to build and validate rating configuration payload
 */
const silly = debug("ratings:silly:RatingConfigurationBuilder");

export class RatingConfigurationBuilder {
  private static instance: RatingConfigurationBuilder;
  public LIMIT = 100;
  public criteria: Criteria[] = [];
  public static getInstance(): RatingConfigurationBuilder {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  public validateConfiguration(nodes?: Criteria[]) {
    // you can pass external Criteria nodes also
    silly(`nodes for validation: %j`, JSON.stringify(this.criteria));
    if (nodes && nodes.length > 0) {
      return validateNodes(nodes);
    }
    return validateNodes(this.criteria);
  }

  public addCriteriaNode(passedNode: Criteria, parentNodeId?: string | null) {
    const node = { ...passedNode };
    const findNode = parentNodeId && this.findNodeByNodeId(parentNodeId);
    if (findNode) {
      parentNodeId && (node.parent_node_id = parentNodeId);
      if (!findNode.children) {
        findNode.children = [node];
      } else {
        findNode.children.push(node);
      }
    } else {
      node.parent_node_id = null;
      this.criteria.push(node);
    }
  }
  public removeCriteriaNode(node: Criteria) {
    const { node_id, parent_node_id } = node;

    if (!node_id) {
      throw new Error("node_id can't be passed as null");
    }

    // root node deletion, it will remove whole tree
    if (!parent_node_id) {
      this.criteria = this.criteria.filter((i) => i.node_id !== node_id);
      return;
    }
    // every node will have parent node_id except root nodes in array
    const currentNode = this.findNodeByNodeId(node_id!);
    const parentNode = this.findNodeByNodeId(parent_node_id!);

    if (currentNode && parentNode) {
      const nodeChildren = parentNode.children;
      parentNode.children =
        nodeChildren?.filter((i) => i.node_id !== node_id) || [];
    }
  }
  public updateCriteriaNode(nodeId: string, node: Partial<Criteria>) {
    const findNode = nodeId && this.findNodeByNodeId(nodeId);
    if (findNode) {
      node.name && (findNode.name = node.name);
      node.weight && (findNode.weight = node.weight);
      node.description && (findNode.description = node.description);
    }
  }

  public printCriteriaNodes() {
    silly(`node: %j`, JSON.stringify(this.criteria));
    return this.criteria;
  }
  public resetNodes() {
    this.criteria = [];
  }
  public findNodeByNodeId(nodeId: string) {
    const node = searchNode(this.criteria, "children", "node_id", nodeId);
    silly(`node: %j`, { node });
    if (!node) {
      throw new NodeNotFoundException(`invalid nodeId Provided`);
    }
    return node;
  }
}
