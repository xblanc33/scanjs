var assert = require('assert');
var Graph = require('../Graph.js').Graph;

describe('Graph', function() {
    describe('#constructor()', function() {
        it('should create an empty Graph', function() {
        	var graph = new Graph();
            assert.equal(0, graph.vertices.length);
            //assert.equal({},graph.edges)
        });
    });

    describe('#addVertice()', function() {
        it('it should add the vertice', function() {
        	var graph = new Graph();
        	graph.addVertice('v1');
            assert.equal(1, graph.vertices.length);
            assert.equal('v1', graph.vertices[0]);
        });

        it('it should add the two vertices', function() {
        	var graph = new Graph();
        	graph.addVertice('v1');
        	graph.addVertice('v2');
            assert.equal(2, graph.vertices.length);
            assert.equal('v1', graph.vertices[0]);
            assert.equal('v2', graph.vertices[1]);
        });

        it('it should not add the vertice twice', function() {
        	var graph = new Graph();
        	graph.addVertice('v1');
        	graph.addVertice('v1');
            assert.equal(1, graph.vertices.length);
            assert.equal('v1', graph.vertices[0]);
        });
    });


    describe('#addEdge()', function() {
        it('it should add the edge', function() {
        	var graph = new Graph();
        	graph.addVertice('v1');
        	graph.addVertice('v2');
        	graph.addEdge('v1','v2');
            assert.equal('v2', graph.edges['v1'][0]);
            assert.equal('v1', graph.edges['v2'][0]);
        });
    });


    describe('#neighborhood()', function() {
        it('it should return two nodes as neighborhood (included itself', function() {
        	var graph = new Graph();
        	graph.addVertice('v1');
        	graph.addVertice('v2');
        	graph.addEdge('v1','v2');
            assert.equal('v2', graph.neighborhood('v1')[0]);
            assert.equal('v1', graph.neighborhood('v1')[1]);
        });
    });
});
