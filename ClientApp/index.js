const connectedComponentsCount = (graph) => {
    // todo
    let result = 0;
    const vertexs = Object.keys(graph);
    const visited = new Set();
    for(const vertex of vertexs){
        if(!visited.has(vertex)){
            dfs(graph, vertex, visited)
            result++;
        }
    }
    console.log(result)
    return result
};

const dfs = (graph, vertex, visited) => {
    visited.add(vertex);
    for(const neighbor of graph[vertex]){
        console.log(`${vertex}, ${neighbor}`)
        if(!visited.has(neighbor)){
            dfs(graph, neighbor, visited)
        }
    }
}


connectedComponentsCount({
    0: [8, 1, 5],
    1: [0],
    5: [0, 8],
    8: [0, 5],
    2: [3, 4],
    3: [2, 4],
    4: [3, 2]
  }); // -> 2