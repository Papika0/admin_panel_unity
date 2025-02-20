import { log } from "console";
import * as fabric from "fabric";
import _ from "lodash";

interface Link {
  source: number;
  target: number | null;
  type: string;
}


type FamilyMember = {
  id: number;
  first_name: string;
  cl_gender_id: number;
};
const findPersonById = (
  persons: FamilyMember[],
  id: number | null
): FamilyMember | undefined => {
  return _.find(persons, (person) => person.id === id);
};

const findGreatGrandParent = (links: Link[]): number[][] => {
  const greatGrandParents: Set<string> = new Set();
  const parentChildMap: Map<number, number[]> = new Map();
  const spouseMap: Map<number, number> = new Map();

  // Populate the parent-child map and spouse map
  _.forEach(links, (link) => {
    if (link.type === "parent" && link.target !== null) {
      if (!parentChildMap.has(link.source)) {
        parentChildMap.set(link.source, []);
      }
      parentChildMap.get(link.source)!.push(link.target);
    } else if (link.type === "spouse" && link.target !== null) {
      spouseMap.set(link.source, link.target);
      spouseMap.set(link.target, link.source);
    }
  });

  // Find great-grandparents
  parentChildMap.forEach((children, parent) => {
    _.forEach(children, (child) => {
      const potentialGrandchildren = new Set<number>();

      // Add children of the child
      if (parentChildMap.has(child)) {
        _.forEach(parentChildMap.get(child), (grandchild) =>
          potentialGrandchildren.add(grandchild)
        );
      }

      // Add children of the child's spouse
      if (spouseMap.has(child)) {
        const spouse = spouseMap.get(child)!;

        if (parentChildMap.has(spouse)) {
          _.forEach(parentChildMap.get(spouse), (grandchild) =>
            potentialGrandchildren.add(grandchild)
          );
        }
      }
      // Check if there are any great-grandchildren
      potentialGrandchildren.forEach((grandchild) => {
        if (
          parentChildMap.has(grandchild) ||
          (spouseMap.has(grandchild) &&
            parentChildMap.has(spouseMap.get(grandchild)!))
        ) {
          const greatGrandParentGroup: number[] = [parent];
          // Find the spouse of the great-grandparent
          if (spouseMap.has(parent)) {
            greatGrandParentGroup.push(spouseMap.get(parent)!);
          }
          // Add the group to the set as a string to ensure uniqueness
          greatGrandParents.add(JSON.stringify(greatGrandParentGroup));
        }
      });
    });
  });

  // Convert the set of unique great-grandparent groups back to an array using lodash
  return _.map(Array.from(greatGrandParents), (group) => JSON.parse(group));
};

const findGrandParent = (links: Link[], greatGrandParent: number[][]): number[][] => {
  const allMembers = new Set<number>();
  const membersWithParents = new Set<number>();
  const spouseMap = new Map<number, number>();

  links.forEach((link) => {
    if (link.type !== "unconnected") {
      if (link.source !== null) {
        allMembers.add(link.source);
      }
      if (link.target !== null) {
        allMembers.add(link.target);
      }
      if (link.type === "parent" && link.target !== null) {
        membersWithParents.add(link.target);
      }
      if (
        link.type === "spouse" &&
        link.source !== null &&
        link.target !== null
      ) {
        spouseMap.set(link.source, link.target);
        spouseMap.set(link.target, link.source);
      }
    }
  });

  const membersWithNoParents = [...allMembers].filter(
    (member) => !membersWithParents.has(member)
  );

  const groupedMembers: number[][] = [];
  const visited = new Set<number>();

  // Flatten the greatGrandParent array
  const flatGreatGrandParents = greatGrandParent.flat();

  membersWithNoParents.forEach((member) => {
    if (!visited.has(member) && !flatGreatGrandParents.includes(member)) {
      const group = [member];
      visited.add(member);

      const spouse = spouseMap.get(member);
      if (spouse !== undefined && !visited.has(spouse)) {
        group.push(spouse);
        visited.add(spouse);
      }

      groupedMembers.push(group);
    }
  });

  return groupedMembers;
};

const findChildren = (links: Link[], rootMembers: number[][]): number[][] => {
  const childrenMap: { [key: number]: number[] } = {};
  const spouseMap: { [key: number]: number } = {};

  // Populate childrenMap and spouseMap
  links.forEach((link) => {
    if (link.type === "parent") {
      if (link.target !== null) {
        if (!childrenMap[link.source]) {
          childrenMap[link.source] = [];
        }
        childrenMap[link.source].push(link.target);
      }
    }
    if (
      link.type === "spouse" &&
      link.source !== null &&
      link.target !== null
    ) {
      spouseMap[link.source] = link.target;
      spouseMap[link.target] = link.source;
    }
  });

  const result: number[][] = [];

  // Group children according to rootMembers
  rootMembers.forEach((parentGroup) => {
    parentGroup.forEach((parent) => {
      if (childrenMap[parent]) {
        childrenMap[parent].forEach((child) => {
          const group: number[] = [child];
          if (spouseMap[child] !== undefined) {
            group.push(spouseMap[child]);
          }
          // Sort the group to avoid duplicates with rotated elements
          group.sort((a, b) => a - b);
          result.push(group);
        });
      }
    });
  });

  // Remove duplicate groups using lodash
  const uniqueResult = _.uniqWith(result, _.isEqual);

  return uniqueResult;
};


const nodeWidth = 100;
const nodeHeight = 50;

const drawNode = (
  node: FamilyMember,
  x: number,
  y: number,
  canvas: fabric.Canvas,
  type: string | number
) => {
  const rect = new fabric.Rect({
    left: x,
    top: y,
    fill: node.cl_gender_id === 1 ? "lightblue" : "pink",
    width: nodeWidth,
    height: nodeHeight,
    stroke: "black",
    selectable: false,
    evented: false,
  });
  const t = node.first_name + " " + type + " " + node?.age?.age;
  const text = new fabric.IText(t, {
    left: x + nodeWidth / 2,
    top: y + nodeHeight / 2,
    originX: "center",
    originY: "center",
    fontSize: 14,
    fill: "black",
    selectable: false,
    evented: false,
  });

  const group = new fabric.Group([rect, text], {
    left: x,
    top: y,
    selectable: false,
    evented: false,
  });

  canvas.add(group);
};

function drawLineWithInscription(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  inscription: string,
  canvas: fabric.Canvas
): void {
  // Calculate midpoint for the inscription
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2 - 10;

  // Draw the horizontalLine
  const horizontalLine = new fabric.Line([startX, startY, endX, endY], {
    fill: "black",
    stroke: "black",
    strokeWidth: 2,
    strokeDashArray: [5, 5],
    selectable: false,
    evented: false,
  });

  // Calculate the center of the first rectangle
  const firstRectCenterX = startX;
  const firstRectCenterY = startY - nodeHeight / 2;

  // Calculate the center of the second rectangle
  const secondRectCenterX = endX;
  const secondRectCenterY = endY - nodeHeight / 2;

  // Create the first vertical line
  const firstVerticalLine = new fabric.Line(
    [firstRectCenterX, firstRectCenterY, startX, startY],
    {
      fill: "black",
      stroke: "black",
      strokeWidth: 2,
      strokeDashArray: [5, 5],
      selectable: false,
      evented: false,
    }
  );

  // Create the second vertical line
  const secondVerticalLine = new fabric.Line(
    [secondRectCenterX, secondRectCenterY, endX, endY],
    {
      fill: "black",
      stroke: "black",
      strokeWidth: 2,
      strokeDashArray: [5, 5],
      selectable: false,
      evented: false,
    }
  );

  // Create the inscription text
  const text = new fabric.IText(inscription, {
    left: midX,
    top: midY,
    fontSize: 14,
    fill: "black",
    originX: "center",
    originY: "center",
    selectable: false,
    evented: false,
  });

  // Group all elements together
  const group = new fabric.Group(
    [horizontalLine, firstVerticalLine, secondVerticalLine, text],
    {
      left: startX,
      top: startY,
      selectable: false,
      evented: false,
    }
  );

  // Add the group to the canvas
  canvas.add(group);
}

export const drawFamilyTrees = (
  links: Link[],
  members: FamilyMember[],
  canvas: fabric.Canvas
) => {

  const greatGrandParent = findGreatGrandParent(links);
  const totalWidth = greatGrandParent.length * (nodeWidth + nodeHeight);
  let rootX = (canvas.getWidth() - totalWidth) / 3;
  let rootY = 50;

  drawGroup(greatGrandParent, members, canvas, rootX, rootY);

  const grandParent = findGrandParent(links, greatGrandParent);

  // totalWidth = grandParent.length * (nodeWidth + nodeHeight);
  rootX = (canvas.getWidth() - totalWidth) / 3;
  rootY += nodeHeight * 3;

  drawGroup(grandParent, members, canvas, rootX, rootY);

  rootX = (canvas.getWidth() - totalWidth) / 3;
  rootY += nodeHeight * 3;

  const parent = findChildren(links, grandParent);
  parent.sort((a, b) => a.length - b.length);

  drawGroup(parent, members, canvas, rootX, rootY);

  rootX = (canvas.getWidth() - totalWidth) / 3;
  rootY += nodeHeight * 3;

  const children = findChildren(links, parent);
  children.sort((a, b) => a.length - b.length);

  drawGroup(children, members, canvas, rootX, rootY);
};

const drawGroup = (
  groups: number[][],
  members: FamilyMember[],
  canvas: fabric.Canvas,
  rootX: number,
  rootY: number
) => {
  let firstPersonPosition = { x: 0, y: 0 };
  let secondPersonPosition = { x: 0, y: 0 };

  groups.forEach((group) => {
    group.forEach((element, index) => {
      const member = findPersonById(members, element);
      if (index == 0) {
        firstPersonPosition = {
          x: rootX + nodeHeight,
          y: rootY + nodeHeight + 5,
        };
      } else if (index == 1) {
        secondPersonPosition = {
          x: rootX + nodeHeight,
          y: rootY + nodeHeight + 5,
        };
      }
      if (member) {
        drawNode(member, rootX, rootY, canvas, element);
        rootX += nodeHeight + nodeWidth;
      }
    });

    if (group.length === 2) {
      drawLineWithInscription(
        firstPersonPosition.x,
        firstPersonPosition.y,
        secondPersonPosition.x,
        firstPersonPosition.y,
        "Spouse",
        canvas
      );
    }
  });
};
