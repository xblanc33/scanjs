[![Build Status](https://travis-ci.org/xblanc33/scanjs.svg?branch=master)](https://travis-ci.org/xblanc33/scanjs)

# scanjs
ScanJS implements the Strucural Clustering Algorithm designed by Xiaowei Xu, Nurcan Yuruk, Zhidan Feng and Thomas A. J. Schweiger [PDF] (https://www.cise.ufl.edu/~cis4930fa07dm/project/Scan.pdf)

It provides two JS classes.

* Graph.js : To create a graph
* Scan.js : To build the clustering


# install

npm install scanjs


# use (index.js)

~~~~
Graph = require('scanjs').Graph;
Scan = require('scanjs').Scan;

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
~~~~

See test for examples (where the example Graph of the Paper is provided)
