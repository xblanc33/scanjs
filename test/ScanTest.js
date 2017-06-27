
var assert = require('assert');
var Graph = require('../Graph.js').Graph;
var Scan = require('../Scan.js').Scan;

function initGraph() {
	var graph = new Graph();
	graph.addVertice('a');
	graph.addVertice('b');
	graph.addVertice('c');
	graph.addEdge('a','b');
	graph.addEdge('a','c');
	return graph;
}

describe('Scan', function() {
    describe('#epsNeighborhood()', function() {
        it('should include a, b and c', function() {
        	var graph = initGraph();
        	var scan = new Scan(0.5, 2, graph);
        	var neighB = scan.epsNeighborhood('a')
            assert.equal(3 , neighB.length);
            assert.notEqual(-1 , neighB.indexOf('a'));
            assert.notEqual(-1 , neighB.indexOf('b'));
            assert.notEqual(-1 , neighB.indexOf('c'));
        });

        it('should include only a', function() {
        	var graph = initGraph();
        	var scan = new Scan(0.9, 2, graph);
        	var neighB = scan.epsNeighborhood('a')
            assert.equal(1 , neighB.length);
            assert.notEqual(-1 , neighB.indexOf('a'));
            assert.equal(-1 , neighB.indexOf('b'));
            assert.equal(-1 , neighB.indexOf('c'));
        });
    });


    describe('#isCore()', function() {
        it('should state that a is core', function() {
        	var graph = initGraph();
        	var scan = new Scan(0.5, 3, graph);
            assert.equal(true, scan.isCore('a'));
        });

        it('should state that a is not core', function() {
        	var graph = initGraph();
        	var scan = new Scan(0.9, 2, graph);
        	assert.equal(false, scan.isCore('a'));
        });
    });

    describe('#dirReach()', function() {
        it('should state that a directly reach b', function() {
        	var graph = initGraph();
        	var scan = new Scan(0.5, 3, graph);
            assert.equal(true, scan.dirReach('a','b'));
        });

        it('should state that c does not directly reach b', function() {
        	var graph = initGraph();
        	var scan = new Scan(0.5, 3, graph);
            assert.equal(false, scan.dirReach('c','b'));
        });
    });


    describe('#reach()', function() {
        it('should state that a reach b', function() {
        	var graph = initGraph();
        	var scan = new Scan(0.5, 3, graph);
            assert.equal(true, scan.reach('a','b'));
        });

        it('should state that a does not reach b', function() {
        	var graph = initGraph();
        	graph.addVertice('d');
        	var scan = new Scan(0.5, 3, graph);
            assert.equal(false, scan.reach('a','d'));
        });

        it('should state that a does not reach d', function() {
        	var graph = initGraph();
        	graph.addVertice('d');
        	graph.addEdge('b','d');
        	var scan = new Scan(0.9, 3, graph);
            assert.equal(false, scan.reach('a','d'));
        });

        it('should state that a reach d', function() {
        	var graph = initGraph();
        	graph.addVertice('d');
        	graph.addEdge('b','d');
        	var scan = new Scan(0.5, 3, graph);
            assert.equal(true, scan.reach('a','d'));
        });
    });


    describe('#connect()', function() {
        it('should state that b is connected to c', function() {
        	var graph = initGraph();
        	var scan = new Scan(0.5, 3, graph);
            assert.equal(true, scan.connect('b','c'));
        });

        it('should state that b is connected to d', function() {
        	var graph = initGraph();
        	graph.addVertice('d');
        	var scan = new Scan(0.5, 3, graph);
            assert.equal(false, scan.connect('b','d'));
        });
    });

     describe('#isCluster()', function() {
        it('should state that a,b,c is a cluster', function() {
        	var graph = initGraph();
        	var scan = new Scan(0.5, 3, graph);
            assert.equal(true, scan.isCluster(['a','b','c']));
        });
        it('should state that a,b is not a cluster', function() {
        	var graph = initGraph();
        	var scan = new Scan(0.5, 3, graph);
            assert.equal(false, scan.isCluster(['a','b']));
        });
    });
});