import { Criteria } from "./types";

// find a node in tree and returns that node
export function searchNode(
  tree: Criteria[] | Criteria | any,
  nodesProp: any,
  searchProp: string,
  nodeIdValue: string
): Criteria | null {
  let i,
    f = null; // iterator, found node
  if (Array.isArray(tree)) {
    for (i = 0; i < tree.length; i++) {
      f = searchNode(tree[i], nodesProp, searchProp, nodeIdValue);
      if (f) {
        return f;
      }
    }
  } else if (typeof tree === "object") {
    if (tree[searchProp] && tree[searchProp] === nodeIdValue) {
      return tree;
    }
  }
  if (tree[nodesProp] && tree[nodesProp].length > 0) {
    return searchNode(tree[nodesProp], nodesProp, searchProp, nodeIdValue);
  } else {
    return null;
  }
}
/*
[
    {
      "name": "ISO Standards",
      "description": "ISO",
      "weight": 50,
      "node_id": "0001",
      "children": [
        {
          "name": "ISO Org Standards",
          "description": "ISO",
          "weight": 100,
          "node_id": "0002",
          "children": [
            {
              "name": "ISO company Standards",
              "description": "ISO",
              "weight": 100,
              "node_id": "0003",
              "children": null
            }
          ]
        }
      ]
    },
    {
      "name": "GDPR Standards",
      "description": "GDPR",
      "weight": 50,
      "node_id": "0004",
      "children": [
        {
          "name": "GDPR Org Standards",
          "description": "GDPR",
          "weight": 100,
          "node_id": "0005",
          "children": [
            {
              "name": "GDPR company Standards",
              "description": "ISO",
              "weight": 100,
              "node_id": "0006",
              "children": null
            }
          ]
        }
      ]
    }
  ]
*/
// validate tree nodes is any node has children sum of weight = 100
export function validateNodes(tree: Criteria[]) {
  const result: boolean[] = [];
  const MAX_LIMIT = 100;
  const validateConfiguration = (tree: Criteria[]) => {
    if (Array.isArray(tree)) {
      let weight = 0;
      tree.forEach((parentNode) => {
        if (parentNode.children) {
          const nodes = parentNode.children;
          let w = 0;
          for (const node of nodes) {
            w = w + node.weight;
          }
          if (w < MAX_LIMIT || w > MAX_LIMIT) {
            result.push(false);
          } else if (w === MAX_LIMIT) {
            result.push(true);
          }
          validateConfiguration(parentNode.children);
        }
        weight = weight + parentNode.weight;
      });
      if (weight < MAX_LIMIT || weight > MAX_LIMIT) {
        result.push(false);
      } else if (weight === MAX_LIMIT) {
        result.push(true);
      }
    }
  };
  validateConfiguration(tree);
  if (result.length > 0) {
    return result.every((i) => i);
  }
  return false;
}
