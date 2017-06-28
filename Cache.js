class Cache {
    constructor(graph, eps, mu) {
        this.graph = graph;
        this.eps = eps;
        this.mu = mu;
        this.similarityCache = this.computeSimilarityCache();
        this.epsNeighborhoodCache = this.computeEpsNeighborhood();
        this.isCoreCache = this.computeIsCoreCache();
    }

    computeSimilarityCache() {
        var cache = [];
        for (var i = 0; i < this.graph.vertices.length; i++) {
            var row = [];
            for (var j = 0; j < this.graph.vertices.length; j++) {
                if (i === j) {
                    row.push(1);
                } else {
                    if (i > j) {
                        row.push(cache[j][i]);
                    } else {
                        var v = this.graph.vertices[i];
                        var w = this.graph.vertices[j];
                        row.push(this.graph.similarity(v, w));
                    }
                }
            }
            cache.push(row);
        }
        return cache;
    }

    computeEpsNeighborhood() {
        var cache = {};
        for (var i = 0; i < this.graph.vertices.length; i++) {
        	var v = this.graph.vertices[i];
            var neighborhood = [];
            for (var j = 0; j < this.similarityCache[i].length; j++) {
                if (this.similarityCache[i][j] >= this.eps) {
                	var w = this.graph.vertices[j];
                    if (this.graph.neighborhood(v).indexOf(w) !== -1) {
                        neighborhood.push(w)
                    }
                }
            }
            cache[v] = neighborhood;
        }
        return cache;
    }

    computeIsCoreCache() {
        var cache = {};
        for (var i = 0; i < this.graph.vertices.length; i++) {
            if (this.epsNeighborhood(this.graph.vertices[i]).length >= this.mu) {
                cache[this.graph.vertices[i]] = true;
            } else {
                cache[this.graph.vertices[i]] = false;
            }
        }
        return cache;
    }

    epsNeighborhood(v) {
        return this.epsNeighborhoodCache[v];
    }

    isCore(v) {
        return this.isCoreCache[v];
    }
}

module.exports.Cache = Cache;
