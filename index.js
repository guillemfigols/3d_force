
function getGraphDataSets() {
    const loadData = function(Graph) {
        Graph
            .cooldownTicks(200)
            .nodeLabel('id')
            .nodeAutoColorBy('group')
            .forceEngine('d3')
            .graphData(data)
            .enableNodeDrag(false)
        };
    


    return loadData
}

let it = 0;
const Graph = ForceGraph3D()
	(document.getElementById("3d-graph"))
    .onEngineTick( () => {
        if (it == 0) {
            console.log(Graph.graphData().nodes)
        }
        it++;
    }
        
    )

let curDataSetIdx;
const dataSets = getGraphDataSets();

let toggleData;
(toggleData = function() {
	curDataSetIdx = curDataSetIdx === undefined ? 0 : (curDataSetIdx+2)%dataSets.length;
	const dataSet = dataSets[curDataSetIdx];

	Graph.resetProps(); // Wipe current state
	dataSets(Graph); // Load data set
})();