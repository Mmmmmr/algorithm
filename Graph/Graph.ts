class Graph<T> {
  private verteces: T[] = [];

  private adjList: Map<T, T[]> = new Map();

  addVertex(vertex: T) {
    this.verteces.push(vertex);
    this.adjList.set(vertex, []);
  }

  addEdge(v1: T, v2: T) {
    this.adjList.get(v1)?.push(v2);
    this.adjList.get(v2)?.push(v2);
  }

  traverse() {
    console.log("Graph: ");
    this.verteces.forEach((vertex) => {
      const edge = this.adjList.get(vertex);
      console.log(`${vertex} -> ${edge?.join(" ")}`);
    });
  }

  bfs() {
    if (this.verteces.length === 0) return;

    const queue: T[] = [];
    queue.push(this.verteces[0]);

    const visited = new Set<T>();
    visited.add(this.verteces[0]);

    while (queue.length) {
      const vertex = queue.shift()!;
      console.log(vertex);
      const neighbors = this.adjList.get(vertex);
      if (!neighbors) continue;
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
  }

  dfs() {
    if (this.verteces.length === 0) return;
    const stack: T[] = [];
    stack.push(this.verteces[0]);

    const visited = new Set<T>();
    visited.add(this.verteces[0]);

    while (stack.length) {
      const vertex = stack.pop()!;
      console.log(vertex);
      const neighbors = this.adjList.get(vertex);
      if (!neighbors) continue;
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          stack.push(neighbor);
        }
      }
    }
  }
}

const graph = new Graph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");
graph.addVertex("G");
graph.addVertex("H");
graph.addVertex("I");

graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("A", "D");
graph.addEdge("C", "D");
graph.addEdge("C", "G");
graph.addEdge("D", "G");
graph.addEdge("D", "H");
graph.addEdge("B", "E");
graph.addEdge("B", "F");
graph.addEdge("E", "I");

graph.traverse();

graph.dfs();

export default Graph;
