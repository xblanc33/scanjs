[![Build Status](https://travis-ci.org/xblanc33/scanjs.svg?branch=master)](https://travis-ci.org/xblanc33/scanjs)
[![Known Vulnerabilities](https://snyk.io/test/github/xblanc33/scanjs/badge.svg)](https://snyk.io/test/github/xblanc33/scanjs)
[![Coverage Status](https://coveralls.io/repos/github/xblanc33/scanjs/badge.svg?branch=master)](https://coveralls.io/github/xblanc33/scanjs?branch=master)

# scanjs
ScanJS implements the Strucural Clustering Algorithm designed by Xiaowei Xu, Nurcan Yuruk, Zhidan Feng and Thomas A. J. Schweiger [PDF] (http://www1.se.cuhk.edu.hk/~hcheng/seg5010/slides/p824-xu.pdf)

It provides two JS classes.

* Graph.js : To create a graph
* Scan.js : To build the clustering


# install

npm install scanjs


# documentation

## Graph.js

* var graph = new Graph(); //to create a graph
* graph.addVertice(label); //to add a vertice (labels can be numbers)
* graph.addEdge(label1, label2); //add a non directed edge
* graph.saveCSV(fileName, head, callback); //save graph to CSV. Add labels in first row if head=true
* Graph.loadCSV(fileName, head, callback); //static method to load a graph from a CSV file (callback(err,graph))

## Scan.js

* var scan = new Scan(eps, mu, graph); //eps is the distance, mu is the neighborhood size
* scan.doClustering(); //creates the clusters. Return an object {clustering:[[],[]], hubs:[], outliers:[]}

# example

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
