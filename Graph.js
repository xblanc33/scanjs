var fs = require('fs');

class Graph {
    constructor() {
        this.vertices = [];
        this.edges = {};
    }

    addVertice(v) {
        if (this.vertices.indexOf(v) === -1) {
            this.vertices.push(v);
            this.edges[v] = [];
        }
    }

    addEdge(v, w) {
    	if ((this.vertices.indexOf(v) !== -1) && (this.vertices.indexOf(w) !== -1)) {
    		if (this.edges[v].indexOf(w) === -1) {
    			this.edges[v].push(w);
    		}
    		if (this.edges[w].indexOf(v) === -1) {
    			this.edges[w].push(v);
    		}
    	}
    }

    neighborhood(v) {
    	return this.edges[v].concat([v]);
    }

    similarity(v, w) {
    	var vNeighbor = this.neighborhood(v);
    	var wNeighbor = this.neighborhood(w);
    	var vInterw = vNeighbor.filter( vertice => {return (wNeighbor.indexOf(vertice) !== -1);});
    	return vInterw.length / Math.sqrt(vNeighbor.length * wNeighbor.length);
    }

    saveCSV(fileName, head) {


    }

    loadCSV(fileName, head) {

    }
}

module.exports.Graph = Graph;