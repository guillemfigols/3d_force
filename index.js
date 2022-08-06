
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

const Graph = ForceGraph3D({
    extraRenderers: [new THREE.CSS2DRenderer()]
})
(document.getElementById("3d-graph"))

let curDataSetIdx;
const dataSets = getGraphDataSets();

let toggleData;
(toggleData = function() {
	curDataSetIdx = curDataSetIdx === undefined ? 0 : (curDataSetIdx+2)%dataSets.length;
	const dataSet = dataSets[curDataSetIdx];

	Graph.resetProps(); // Wipe current state
	dataSets(Graph); // Load data set
})();

//  function for the is checked option 

function isChecked() {
    if(document.getElementById("my-checkbox").checked){
        Graph.resetProps();
        Graph.nodeThreeObject(node => {
            const nodeE1 = document.createElement('div');
            nodeE1.textContent = node.id;
            nodeE1.style.color = node.color;
            nodeE1.className = 'node-label';
            return new THREE.CSS2DObject(nodeE1);
        });
        Graph.nodeThreeObjectExtend(true);
        dataSets(Graph);
    }
    else{
        Graph.resetProps();
        dataSets(Graph);
    }
}