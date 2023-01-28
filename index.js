// --------------------------------------------------------------------------------------------------------

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
// --------------------------------------------------------------------------------------------------------
const Graph = ForceGraph3D()
(document.getElementById("3d-graph"))


// --------------------------------- FIGURES --------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------


// Generació de colors random -----------------------------------------------------------------------------
function randomInteger(max) {
    return Math.floor(Math.random()*(max + 1));
};

function randomRgbColor() {
    let r = randomInteger(255);
    let g = randomInteger(255);
    let b = randomInteger(255);
    return [r,g,b];
};

function randomHexColor() {
    let [r,g,b] =randomRgbColor();
 
    let hr = r.toString(16).padStart(2, '0');
    let hg = g.toString(16).padStart(2, '0');
    let hb = b.toString(16).padStart(2, '0');
 
    return "#" + hr + hg + hb;
};

// Creació de cubs---------------------------------------
var input_x = document.getElementById("q_x");
input_x.addEventListener("keyup", function(event) {
     if (event.key === "Enter") {
        cor = document.getElementById("q_x").value;
        const coord = cor.split(",");

        const x = parseFloat(coord[0]);
        const y = parseFloat(coord[1]);
        const z = parseFloat(coord[2]);
        const width = parseFloat(coord[3]);
        const height = parseFloat(coord[4]);
        const depth = parseFloat(coord[5]);
        var geometry = new THREE.BoxGeometry( width, height, depth );
        var material = new THREE.MeshPhongMaterial({
            color: randomHexColor(),
            opacity: 0.2,
            transparent: true,
            depthTest: false, // ens soluciona el problema de nodes/links que desapareixien.
        });
        var cube = new THREE.Mesh( geometry, material );
        Graph.scene().add(cube);
        cube.position.set(x,y,z);
     }
 })

// ESFERA -------------------------------------------------------------------------------------

var esfera = document.getElementById("esfera");

esfera.addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
         // L'input serà (radi,x, y,z)
        inputs = document.getElementById("esfera").value;
        const hola = inputs.split(",");
        radi = parseFloat(hola[0]);
        x = parseFloat(hola[1]);
        y = parseFloat(hola[2]);
        z = parseFloat(hola[3]);

        const geometry = new THREE.SphereGeometry(radi);
        const material = new THREE.MeshPhongMaterial( { color: randomHexColor(), opacity:0.2, transparent: true, depthTest: false, } );
        const sphere = new THREE.Mesh( geometry, material );
        Graph.scene().add( sphere );
        sphere.position.set(x,y,z);
    }
})

// --------------------------------------------------------------------------------------------
 // Botó d'eliminar l'ultima figura que s'ha generat.

 const esborra = document.getElementById("esborra");

 esborra.onclick = function(){
    scene.remove(scene.children[scene.children.length-1]);
 };


 const esquerra = document.getElementById("esquerra");
 const amunt = document.getElementById("amunt");
 const avall = document.getElementById("avall");
 const dreta = document.getElementById("dreta");
 esquerra.onclick = function(){
    scene.children[scene.children.length-1].rotateX(3);
 };
 amunt.onclick = function(){
    scene.children[scene.children.length-1].rotateZ(3);
 };
 avall.onclick = function(){
    scene.children[scene.children.length-1].rotateZ(-3);
 };
 dreta.onclick = function(){
    scene.children[scene.children.length-1].rotateX(-3);
 }; 
 // --------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------



// ---------------------------------------- REPRESENTAR NODES --------------------------------------------
// --------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------


let curDataSetIdx;
const dataSets = getGraphDataSets();

let toggleData;
(toggleData = function() {
    Graph.resetProps();
	curDataSetIdx = curDataSetIdx === undefined ? 0 : (curDataSetIdx+2)%dataSets.length;
	const dataSet = dataSets[curDataSetIdx];
	dataSets(Graph); // Load data set
})();

toggleData();
//  function for the is checked option 

function isChecked() {
    if(document.getElementById("my-checkbox").checked){
        Graph.resetProps();
        Graph.nodeThreeObject(node => {
            const sprite = new SpriteText(node.id);
            sprite.material.depthWrite = false;
            sprite.color = node.color;
            sprite.textHeight = 8;
            return sprite;
        });
        dataSets(Graph);
    }
    else{
        Graph.resetProps();
        dataSets(Graph);
    }
}