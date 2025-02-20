interface Link {
  source: number;
  target: number | null;
  type: "parent" | "child" | "spouse" | "unconnected";
}

function createFamilyTreeLinks(data: any[]): Link[] {
  const links: Link[] = [];
  const parentMap: { [key: number]: any[] } = {};

  // Create a map of parent_id to their children
  for (const person of data) {
    if (person.parent_id) {
      if (!parentMap[person.parent_id]) {
        parentMap[person.parent_id] = [];
      }
      parentMap[person.parent_id].push(person);
    }
  }

  function traverse(person: any) {
    if (person.spouse_id) {
      links.push({
        source: person.id,
        target: person.spouse_id,
        type: "spouse",
      });
    }

    if (parentMap[person.id]) {
      for (const child of parentMap[person.id]) {
        links.push({ source: person.id, target: child.id, type: "parent" });
        links.push({ source: child.id, target: person.id, type: "child" });
        traverse(child); // Recursively process children
      }
    }
  }

  for (const person of data) {
    if (person.parent_id === 0) {
      traverse(person);
    }
  }

  // Add links for individuals who are neither a spouse, parent, nor child
  const connectedIds = new Set<number | null>(links.flatMap(link => [link.source, link.target]));
  for (const person of data) {
    if (!connectedIds.has(person.id)) {
      links.push({
        source: person.id,
        target: null,
        type: "unconnected",
      });
    }
  }

  return links;
}

export default createFamilyTreeLinks;