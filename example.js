Graph = require('./Graph.js').Graph;
Scan = require('./Scan.js').Scan;

var graph = createSIGKDDGraph();
graph.saveCSV('./SIGKDD.csv',true, (err,data) => {

	Graph.loadCSV('./SIGKDD.csv',true, (err, loadGraph) => {
		var scan = new Scan(0.6, 6, loadGraph);
		var structuralClustering = scan.doClustering();

		console.log("clustering is done");
		console.log("Clusters:");
		console.log(structuralClustering.clustering);
		console.log("Hubs:");
		console.log(structuralClustering.hubs);
		console.log("Outliers:");
		console.log(structuralClustering.outliers);
	})

})


function createSIGKDDGraph() {
	var graph = new Graph();
	for (var i = 0; i < 14; i++) {
		graph.addVertice(i);
	}
	
	graph.addEdge(0,1);
	graph.addEdge(0,5);
	graph.addEdge(0,4);
	graph.addEdge(0,6);
	graph.addEdge(1,2);
	graph.addEdge(1,5);
	graph.addEdge(2,3);
	graph.addEdge(2,5);
	graph.addEdge(3,4);
	graph.addEdge(3,5);
	graph.addEdge(3,6);
	graph.addEdge(4,5);
	graph.addEdge(4,6);
	graph.addEdge(6,7);
	graph.addEdge(6,11);
	graph.addEdge(6,10);
	graph.addEdge(7,8);
	graph.addEdge(7,11);
	graph.addEdge(7,12);
	graph.addEdge(8,9);
	graph.addEdge(8,12);
	graph.addEdge(9,10);
	graph.addEdge(9,12);
	graph.addEdge(9,13);
	graph.addEdge(10,11);
	graph.addEdge(10,12);
	graph.addEdge(11,12);

	return graph;
}