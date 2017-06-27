
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
        it('should be true', function() {
        	var graph = initGraph();
        	var scan = new Scan(0.5, 3, graph);
            assert.equal(true, scan.isCore('a'));
        });

        it('should be false', function() {
        	var graph = initGraph();
        	var scan = new Scan(0.9, 2, graph);
        	assert.equal(false, scan.isCore('a'));
        });
    });
});