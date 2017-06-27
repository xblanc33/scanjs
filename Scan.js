class Scan {
	constructor(eps, mu, graph) {
		this.eps = eps;
		this.mu = mu;
		this.graph = graph;
	}

	epsNeighborhood(v) {
		return this.graph.neighborhood(v).filter( vertice => {
			return (this.graph.similarity(v,vertice) >= this.eps);
		})
	}

	isCore(v) {
		return this.epsNeighborhood(v).length >= this.mu;
	}
}


module.exports.Scan = Scan;