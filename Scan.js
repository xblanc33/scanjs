class Scan {
    constructor(eps, mu, graph) {
        this.eps = eps;
        this.mu = mu;
        this.graph = graph;
    }

    epsNeighborhood(v) {
        return this.graph.neighborhood(v).filter(vertice => {
            return (this.graph.similarity(v, vertice) >= this.eps);
        })
    }

    isCore(v) {
        return this.epsNeighborhood(v).length >= this.mu;
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
    	return this.graph.vertices.some( u => {
    		return this.reach(u,v) && this.reach(u,w);
    	})

    }

    isCluster(cluster) {
    	for (var i = 0; i < this.graph.vertices.length; i++) {
    		for (var j = 0; j < this.graph.vertices.length; j++) {
    			var v = this.graph.vertices[i];
    			var w = this.graph.vertices[j];

    			if ((cluster.indexOf(v) !== -1) && (cluster.indexOf(w) !== -1)) {
    				if (! this.connect(v,w)) {
    					return false;
    				}
    			}

    			if (cluster.indexOf(v) !== -1) {
    				if (this.reach(v,w)) {
    					if (cluster.indexOf(w) === -1 ) {
    						return false;
    					}
    				}
    			}
    		}
    	}
    	return true;
    }
}


module.exports.Scan = Scan;
