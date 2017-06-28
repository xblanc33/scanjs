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
        var vInterw = vNeighbor.filter(vertice => {
            return (wNeighbor.indexOf(vertice) !== -1); });
        return vInterw.length / Math.sqrt(vNeighbor.length * wNeighbor.length);
    }

    saveCSV(fileName, head, callback) {
        var csv = "";
        if (head) {
            csv = csv + this.vertices.join(',') + '\r\n';
        }
        for (var i = 0; i < this.vertices.length; i++) {
            var row="";
            for (var j = 0; j < this.vertices.length; j++) {
                var v = this.vertices[i];
                var w = this.vertices[j];

                if (j > 0) {
                    row = row + ',';
                }
                if (this.edges[v].indexOf(w) !== -1 ) {
                    row = row + '1';
                } else {
                    row = row + '0';
                }
            }
            csv = csv + row + '\r\n';
        }
        fs.writeFile(fileName, csv, callback);
    }

    static loadCSV(fileName, head, callback) {
        fs.readFile(fileName, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                var graph = new Graph();
                var allTextLines = data.split(/\r\n|\n/);
                var entries = allTextLines[0].split(',');
                for (var i = 0; i < entries.length; i++) {
                    if (head) {
                        graph.addVertice(entries[i]);
                    } else {
                        graph.addVertice(i);
                    }
                }

                

            }
        })

    }
}

module.exports.Graph = Graph;
