var Cache = require('./Cache.js').Cache;

class Scan {
    constructor(eps, mu, graph) {
        this.eps = eps;
        this.mu = mu;
        this.cache = new Cache(graph, eps, mu);
        this.graph = graph;
    }

    epsNeighborhood(v) {
        /*return this.graph.neighborhood(v).filter(vertice => {
            return (this.graph.similarity(v, vertice) >= this.eps);
        })*/
        return this.cache.epsNeighborhood(v);
    }

    isCore(v) {
        //return this.epsNeighborhood(v).length >= this.mu;
        return this.cache.isCore(v);
    }

    dirReach(v, w) {
        return (this.isCore(v) && (this.epsNeighborhood(v).indexOf(w) !== -1));
    }

    reach(v, w) {
        return this.recursiveReach(v, w, []);
    }

    recursiveReach(v, w, visited) {
        var newVisited = visited.concat([v]);
        if (this.dirReach(v, w)) {
            return true;
        } else {
            if (this.isCore(v)) {
                var candidates = this.graph.neighborhood(v);
                var reached = false;
                while (!reached && candidates.length > 0) {
                    var candidate = candidates.shift();
                    if (newVisited.indexOf(candidate) === -1) {
                        reached = this.recursiveReach(candidate, w, newVisited)
                    }
                }
                return reached;
            } else {
                return false;
            }
        }
    }

    connect(v, w) {
        return this.graph.vertices.some(u => {
            return this.reach(u, v) && this.reach(u, w);
        })

    }

    isCluster(cluster) {
        for (var i = 0; i < this.graph.vertices.length; i++) {
            for (var j = 0; j < this.graph.vertices.length; j++) {
                var v = this.graph.vertices[i];
                var w = this.graph.vertices[j];

                if ((cluster.indexOf(v) !== -1) && (cluster.indexOf(w) !== -1)) {
                    if (!this.connect(v, w)) {
                        return false;
                    }
                }

                if (cluster.indexOf(v) !== -1) {
                    if (this.reach(v, w)) {
                        if (cluster.indexOf(w) === -1) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }

    isClustering(clustering) {
        var visited = [];
        for (var i = 0; i < clustering.length; i++) {
            var cluster = clustering[i];
            for (var j = 0; j < cluster.length; j++) {
                if (visited.indexOf(cluster[j]) !== -1) {
                    return false;
                } else {
                    if (this.graph.vertices.indexOf(cluster[j]) === -1) {
                        return false;
                    } else {
                        visited.push(cluster[j]);
                    }
                }
            }
            if (!this.isCluster(cluster)) {
                return false;
            }
        }
        return true;
    }

    isBridge(v, clusterX, clusterY) {
        if (!this.isCluster(clusterX)) {
            return false;
        }
        if (!this.isCluster(clusterY)) {
            return false;
        }
        if (this.graph.vertices.indexOf(v) === -1) {
            return false;
        }
        if (clusterX.indexOf(v) !== -1) {
            return false;
        }
        if (clusterY.indexOf(v) !== -1) {
            return false;
        }
        var neighb = this.graph.neighborhood(v);
        var tox = neighb.some(u => {
            return clusterX.indexOf(u) !== -1
        });
        var toy = neighb.some(u => {
            return clusterY.indexOf(u) !== -1
        });
        return tox && toy;
    }

    isHub(v, clustering) {
        if (!clustering.every(cluster => {
                return cluster.indexOf(v) === -1;
            })) {
            return false;
        }
        for (var i = 0; i < clustering.length; i++) {
            var clusterX = clustering[i];
            for (var j = i+1; j < clustering.length; j++) {
                var clusterY = clustering[j];
                if (this.isBridge(v, clusterX, clusterY)) {
                    return true;
                }
            }
        }
        return false;
    }

    isOutlier(v, clustering) {
        if (!clustering.every(cluster => {
                return cluster.indexOf(v) === -1;
            })) {
            return false;
        }
        for (var i = 0; i < clustering.length; i++) {
            var clusterX = clustering[i];
            for (var j = i+1; j < clustering.length; j++) {
                var clusterY = clustering[j];
                if (this.isBridge(v, clusterX, clusterY)) {
                    return false;
                }
            }
        }
        return true;
    }

    doClustering() {
        var nonMemberVertices = [];
        var classifiedVertices = [];
        var clustering = [];
        var hubs = [];
        var outliers = [];

        this.graph.vertices.forEach(v => {
            if ((classifiedVertices.indexOf(v) === -1) && (this.isCore(v))) {
                var newCluster = [];
                clustering.push(newCluster);
                var queue = this.epsNeighborhood(v);
                while (queue.length > 0) {
                    var y = queue.shift();

                    this.graph.vertices.forEach(x => {
                        if (this.dirReach(y, x)) {
                            if (classifiedVertices.indexOf(x) === -1) {
                                newCluster.push(x);
                                classifiedVertices.push(x);
                                queue.push(x);
                                var nonMbrXID = nonMemberVertices.indexOf(x);
                                if (nonMbrXID !== -1) {
                                    nonMemberVertices.splice(nonMbrXID, 1);
                                }
                            }
                        }
                    });

                }
            } else {
                if (classifiedVertices.indexOf(v) === -1) {
                    nonMemberVertices.push(v);
                }
            }
        });



        nonMemberVertices.forEach(v => {
            if (this.isHub(v, clustering)) {
                hubs.push(v);
            } else {
                outliers.push(v);
            }
        });

        return {
            clustering: clustering,
            hubs: hubs,
            outliers: outliers
        }
    }

    createCache() {

    }
}


module.exports.Scan = Scan;
