// Internal.
import { RatingConfigurationBuilder } from ".";
import { Criteria } from "./types";

const node: Criteria = {
  name: "ISO Standards",
  description: "ISO",
  weight: 50,
  node_id: "0000",
  parent_node_id: null,
  children: null,
};
const node_1: Criteria = {
  name: "ISO Standards",
  description: "ISO",
  weight: 10,
  node_id: "0001",
  parent_node_id: null,
  children: null,
};
const node_2: Criteria = {
  name: "ISO Standards",
  description: "ISO",
  weight: 40,
  node_id: "0002",
  parent_node_id: null,
  children: null,
};

const node_3: Criteria = {
  name: "ISO Standards",
  description: "ISO",
  weight: 100,
  node_id: "0003",
  parent_node_id: "0000",
  children: null,
};

const node_4: Criteria = {
  name: "ISO Standards",
  description: "ISO",
  weight: 100,
  node_id: "0004",
  parent_node_id: "0003",
  children: null,
};

const node_5: Criteria = {
  name: "ISO Standards",
  description: "ISO",
  weight: 100,
  node_id: "0005",
  parent_node_id: "0004",
  children: null,
};
// Code.
describe("RatingConfigurationBuilder methods", () => {
  let builderObj: RatingConfigurationBuilder;
  beforeEach(() => {
    builderObj = RatingConfigurationBuilder.getInstance();
    builderObj.resetNodes();
  });
  it(`validate config builder validateConfiguration happy path`, () => {
    builderObj.addCriteriaNode(node, null);
    builderObj.addCriteriaNode(node_1, null);
    builderObj.addCriteriaNode(node_2, null);
    const isValid = builderObj.validateConfiguration();
    expect(isValid).toBe(true);
  });

  it(`validate config builder validateConfiguration un-happy path`, () => {
    builderObj.addCriteriaNode(node, null);
    const copyNode = { ...node_1 };
    copyNode.weight = 80;
    builderObj.addCriteriaNode(copyNode, null);
    builderObj.addCriteriaNode(node_2, null);
    const isValid = builderObj.validateConfiguration();
    expect(isValid).toBe(false);
  });
  it(`validate config builder validateConfiguration with nested payload (un-happy path)`, () => {
    builderObj.addCriteriaNode(node, null);
    const copyNode = { ...node_1 };
    copyNode.children = [
      {
        name: "ISO Standards",
        description: "ISO",
        weight: 50,
        node_id: "0002",
        children: null,
      },
    ];
    builderObj.addCriteriaNode(copyNode, null);
    builderObj.addCriteriaNode(node_2, null);
    const isValid = builderObj.validateConfiguration();
    expect(isValid).toBe(false);
  });
  it(`validate config builder validateConfiguration with nested payload (happy path)`, () => {
    builderObj.addCriteriaNode(node, null);
    const copyNode = { ...node_1 };
    copyNode.children = [
      {
        name: "ISO Standards",
        description: "ISO",
        weight: 50,
        node_id: "0002",
        children: null,
      },
      {
        name: "ISO Standards",
        description: "ISO",
        weight: 50,
        node_id: "0002",
        children: null,
      },
    ];
    builderObj.addCriteriaNode(copyNode, null);
    builderObj.addCriteriaNode(node_2, null);
    const isValid = builderObj.validateConfiguration();
    expect(isValid).toBe(true);
  });
});

describe("RatingConfigurationBuilder add node methods", () => {
  let builderObj: RatingConfigurationBuilder;
  beforeEach(() => {
    builderObj = RatingConfigurationBuilder.getInstance();
    builderObj.resetNodes();
  });
  it(`validate config builder add and remove node methods`, () => {
    builderObj.addCriteriaNode(node, null);
    builderObj.addCriteriaNode(node_1, null);
    builderObj.addCriteriaNode(node_2, null);
    builderObj.addCriteriaNode(node_3, "0000");
    builderObj.addCriteriaNode(node_4, "0003");
    builderObj.addCriteriaNode(node_5, "0004");
    const nodeTree = builderObj.printCriteriaNodes();
    expect(nodeTree).toEqual([
      {
        name: "ISO Standards",
        description: "ISO",
        weight: 50,
        node_id: "0000",
        parent_node_id: null,
        children: [
          {
            name: "ISO Standards",
            description: "ISO",
            weight: 100,
            node_id: "0003",
            parent_node_id: "0000",
            children: [
              {
                name: "ISO Standards",
                description: "ISO",
                weight: 100,
                node_id: "0004",
                parent_node_id: "0003",
                children: [
                  {
                    name: "ISO Standards",
                    description: "ISO",
                    weight: 100,
                    node_id: "0005",
                    parent_node_id: "0004",
                    children: null,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "ISO Standards",
        description: "ISO",
        weight: 10,
        node_id: "0001",
        parent_node_id: null,
        children: null,
      },
      {
        name: "ISO Standards",
        description: "ISO",
        weight: 40,
        node_id: "0002",
        parent_node_id: null,
        children: null,
      },
    ]);
    const isValid = builderObj.validateConfiguration();
    expect(isValid).toBe(true);
  });

  it(`validate config builder remove node methods`, () => {
    builderObj.resetNodes();
    builderObj.addCriteriaNode(node, null);
    builderObj.addCriteriaNode(node_1, null);
    builderObj.addCriteriaNode(node_2, null);
    builderObj.removeCriteriaNode(node_1);
    builderObj.updateCriteriaNode(node_2.node_id!, { weight: 50 });
    builderObj.addCriteriaNode(node_3, "0000");
    builderObj.addCriteriaNode(node_4, "0003");
    builderObj.addCriteriaNode(node_5, "0004");
    const nodeTree = builderObj.printCriteriaNodes();
    expect(nodeTree).toEqual([
      {
        name: "ISO Standards",
        description: "ISO",
        weight: 50,
        node_id: "0000",
        parent_node_id: null,
        children: [
          {
            name: "ISO Standards",
            description: "ISO",
            weight: 100,
            node_id: "0003",
            parent_node_id: "0000",
            children: [
              {
                name: "ISO Standards",
                description: "ISO",
                weight: 100,
                node_id: "0004",
                parent_node_id: "0003",
                children: [
                  {
                    name: "ISO Standards",
                    description: "ISO",
                    weight: 100,
                    node_id: "0005",
                    parent_node_id: "0004",
                    children: null,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "ISO Standards",
        description: "ISO",
        weight: 50,
        node_id: "0002",
        parent_node_id: null,
        children: null,
      },
    ]);
    const isValid = builderObj.validateConfiguration();
    expect(isValid).toBe(true);
  });
});
