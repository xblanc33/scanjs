
var assert = require('assert');
var Graph = require('../Graph.js').Graph;
var Scan = require('../Scan.js').Scan;

function createSimpleGraph() {
	var graph = new Graph();
	graph.addVertice('a');
	graph.addVertice('b');
	graph.addVertice('c');
	graph.addEdge('a','b');
	graph.addEdge('a','c');
	return graph;
}

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

describe('Scan', function() {
    describe('#epsNeighborhood()', function() {
        it('should include a, b and c', function() {
        	var graph = createSimpleGraph();
        	var scan = new Scan(0.5, 2, graph);
        	var neighB = scan.epsNeighborhood('a')
            assert.equal(3 , neighB.length);
            assert.notEqual(-1 , neighB.indexOf('a'));
            assert.notEqual(-1 , neighB.indexOf('b'));
            assert.notEqual(-1 , neighB.indexOf('c'));
        });

        it('should include only a', function() {
        	var graph = createSimpleGraph();
        	var scan = new Scan(0.9, 2, graph);
        	var neighB = scan.epsNeighborhood('a')
            assert.equal(1 , neighB.length);
            assert.notEqual(-1 , neighB.indexOf('a'));
            assert.equal(-1 , neighB.indexOf('b'));
            assert.equal(-1 , neighB.indexOf('c'));
        });

        it('should include only a', function() {
        	var graph = createSimpleGraph();
        	var scan = new Scan(0.9, 2, graph);
        	var neighB = scan.epsNeighborhood('a')
            assert.equal(1 , neighB.length);
            assert.notEqual(-1 , neighB.indexOf('a'));
            assert.equal(-1 , neighB.indexOf('b'));
            assert.equal(-1 , neighB.indexOf('c'));
        });

        it('should state that 5 eps-neighborhood is [0,1,2,3,4,5]', function() {
        	var graph = createSIGKDDGraph();
        	var scan = new Scan(0.6, 6, graph);
        	var neigh5 = scan.epsNeighborhood(5);
            assert.equal(6 , neigh5.length);
            assert.notEqual(-1 , neigh5.indexOf(0));
            assert.notEqual(-1 , neigh5.indexOf(1));
            assert.notEqual(-1 , neigh5.indexOf(2));
            assert.notEqual(-1 , neigh5.indexOf(3));
            assert.notEqual(-1 , neigh5.indexOf(4));
            assert.notEqual(-1 , neigh5.indexOf(5));
            assert.equal(-1 , neigh5.indexOf(6));
        });

        it('should state that 12 eps-neighborhood is [7,8,9,10,11,12]', function() {
        	var graph = createSIGKDDGraph();
        	var scan = new Scan(0.6, 6, graph);
        	var neigh12 = scan.epsNeighborhood(12);
            assert.equal(6 , neigh12.length);
            assert.notEqual(-1 , neigh12.indexOf(7));
            assert.notEqual(-1 , neigh12.indexOf(8));
            assert.notEqual(-1 , neigh12.indexOf(9));
            assert.notEqual(-1 , neigh12.indexOf(10));
            assert.notEqual(-1 , neigh12.indexOf(11));
            assert.notEqual(-1 , neigh12.indexOf(12));
            assert.equal(-1 , neigh12.indexOf(6));
        });


    });


    describe('#isCore()', function() {
        it('should state that a is core', function() {
        	var graph = createSimpleGraph();
        	var scan = new Scan(0.5, 3, graph);
            assert.equal(true, scan.isCore('a'));
        });

        it('should state that a is not core', function() {
        	var graph = createSimpleGraph();
        	var scan = new Scan(0.9, 2, graph);
        	assert.equal(false, scan.isCore('a'));
        });

        it('should state that 5 is core', function() {
        	var graph = createSIGKDDGraph();
        	var scan = new Scan(0.6, 6, graph);
        	assert.equal(true, scan.isCore(5));
        });

        it('should state that 6 is not core', function() {
        	var graph = createSIGKDDGraph();
        	var scan = new Scan(0.6, 6, graph);
        	assert.equal(false, scan.isCore(6));
        });
    });

    describe('#dirReach()', function() {
        it('should state that a directly reach b', function() {
        	var graph = createSimpleGraph();
        	var scan = new Scan(0.5, 3, graph);
            assert.equal(true, scan.dirReach('a','b'));
        });

        it('should state that c does not directly reach b', function() {
        	var graph = createSimpleGraph();
        	var scan = new Scan(0.5, 3, graph);
            assert.equal(false, scan.dirReach('c','b'));
        });

        it('should state that 5 directly reach 4', function() {
        	var graph = createSIGKDDGraph();
        	var scan = new Scan(0.6, 6, graph);
            assert.equal(true, scan.dirReach(5,4));
        });

        it('should state that 5 does not directly reach 6', function() {
        	var graph = createSIGKDDGraph();
        	var scan = new Scan(0.6, 6, graph);
            assert.equal(false, scan.dirReach(5,6));
        });
    });


    describe('#reach()', function() {
        it('should state that a reach b', function() {
        	var graph = createSimpleGraph();
        	var scan = new Scan(0.5, 3, graph);
            assert.equal(true, scan.reach('a','b'));
        });

        it('should state that a does not reach b', function() {
        	var graph = createSimpleGraph();
        	graph.addVertice('d');
        	var scan = new Scan(0.5, 3, graph);
            assert.equal(false, scan.reach('a','d'));
        });

        it('should state that a does not reach d', function() {
        	var graph = createSimpleGraph();
        	graph.addVertice('d');
        	graph.addEdge('b','d');
        	var scan = new Scan(0.9, 3, graph);
            assert.equal(false, scan.reach('a','d'));
        });

        it('should state that a reach d', function() {
        	var graph = createSimpleGraph();
        	graph.addVertice('d');
        	graph.addEdge('b','d');
        	var scan = new Scan(0.5, 3, graph);
            assert.equal(true, scan.reach('a','d'));
        });

        it('should state that 5 reach 4', function() {
        	var graph = createSIGKDDGraph();
        	var scan = new Scan(0.6, 6, graph);
            assert.equal(true, scan.reach(5,4));
        });

        it('should state that 5 does not reach 6', function() {
        	var graph = createSIGKDDGraph();
        	var scan = new Scan(0.6, 6, graph);
            assert.equal(false, scan.reach(5,6));
        });
    });


    describe('#connect()', function() {
        it('should state that b is connected to c', function() {
        	var graph = createSimpleGraph();
        	var scan = new Scan(0.5, 3, graph);
            assert.equal(true, scan.connect('b','c'));
        });

        it('should state that b is connected to d', function() {
        	var graph = createSimpleGraph();
        	graph.addVertice('d');
        	var scan = new Scan(0.5, 3, graph);
            assert.equal(false, scan.connect('b','d'));
        });

        it('should state that 3 is connected to 1', function() {
        	var graph = createSIGKDDGraph();
        	var scan = new Scan(0.6, 6, graph);
            assert.equal(true, scan.connect(3,1));
        });

        it('should state that 6 is not connected to 1', function() {
        	var graph = createSIGKDDGraph();
        	var scan = new Scan(0.6, 6, graph);
            assert.equal(false, scan.connect(6,1));
        });

        it('should state that 6 is not connected to 5', function() {
        	var graph = createSIGKDDGraph();
        	var scan = new Scan(0.6, 6, graph);
            assert.equal(false, scan.connect(6,5));
        });
    });

    describe('#isCluster()', function() {
        it('should state that a,b,c is a cluster', function() {
        	var graph = createSimpleGraph();
        	var scan = new Scan(0.5, 3, graph);
            assert.equal(true, scan.isCluster(['a','b','c']));
        });
        it('should state that a,b is not a cluster', function() {
        	var graph = createSimpleGraph();
        	var scan = new Scan(0.5, 3, graph);
            assert.equal(false, scan.isCluster(['a','b']));
        });
        it('should state that [0,1,2,3,4,5] is a cluster', function() {
        	var graph = createSIGKDDGraph();
        	var scan = new Scan(0.6, 6, graph);
            assert.equal(true, scan.isCluster([0,1,2,3,4,5]));
        });
        it('should state that [7,8,9,10,11,12] is a cluster', function() {
        	var graph = createSIGKDDGraph();
        	var scan = new Scan(0.6, 6, graph);
            assert.equal(true, scan.isCluster([7,8,9,10,11,12]));
        });
    });

    describe('#isClustering()', function() {
        it('should state that [[a,b,c]] is a clustering', function() {
        	var graph = createSimpleGraph();
        	var scan = new Scan(0.5, 3, graph);
            assert.equal(true, scan.isClustering([['a','b','c']]));
        });
        it('should state that [[a,b],[c]] is not a cluster', function() {
        	var graph = createSimpleGraph();
        	var scan = new Scan(0.5, 3, graph);
            assert.equal(false, scan.isClustering([['a','b'],['c']]));
        });
        it('should be of with the SIGKDD clustering', function() {
        	var graph = createSIGKDDGraph();
        	var scan = new Scan(0.6, 6, graph);
        	var clustering = [[0,1,2,3,4,5],[7,8,9,10,11,12]];
        	assert.equal(true,scan.isClustering(clustering));

        });
    });


    describe('#isHub()', function() {
        it('should state that 6 is a hub', function() {
        	var graph = createSIGKDDGraph();
        	var scan = new Scan(0.6, 6, graph);
            assert.equal(true, scan.isHub(6, [[0,1,2,3,4,5],[7,8,9,10,11,12]]));
        });

        it('should state that 13 is not a hub', function() {
        	var graph = createSIGKDDGraph();
        	var scan = new Scan(0.6, 6, graph);
            assert.equal(false, scan.isHub(13, [[0,1,2,3,4,5],[7,8,9,10,11,12]]));
        });
    });

    describe('#isOutlier()', function() {
        it('should state that 13 is Outlier', function() {
        	var graph = createSIGKDDGraph();
        	var scan = new Scan(0.6, 6, graph);
            assert.equal(true, scan.isOutlier(13, [[0,1,2,3,4,5],[7,8,9,10,11,12]]));
        });
    });

    describe('#doClustering()', function() {
        it('should return [[0,1,2,3,4,5],[7,8,9,10,11,12]] as a clustering, [6] as hub and [13] as outlier', function() {
        	var graph = createSIGKDDGraph();
        	var scan = new Scan(0.6, 6, graph);
        	var result = scan.doClustering();
            assert.equal(true, scan.isClustering(result.clustering));
            result.hubs.forEach(hub => {
            	assert.equal(true, scan.isHub(hub, result.clustering));
            });
            result.outliers.forEach(outlier => {
            	assert.equal(true, scan.isOutlier(outlier, result.clustering));
            });
        });
    });
});