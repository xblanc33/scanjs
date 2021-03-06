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
            graph.addEdge('v1', 'v2');
            assert.equal('v2', graph.edges['v1'][0]);
            assert.equal('v1', graph.edges['v2'][0]);
        });
    });


    describe('#neighborhood()', function() {
        it('it should return two nodes as neighborhood (included itself', function() {
            var graph = new Graph();
            graph.addVertice('v1');
            graph.addVertice('v2');
            graph.addEdge('v1', 'v2');
            assert.equal('v2', graph.neighborhood('v1')[0]);
            assert.equal('v1', graph.neighborhood('v1')[1]);
        });
    });

    describe('#similarity()', function() {
        it('it should return 1', function() {
            var graph = new Graph();
            graph.addVertice('v1');
            graph.addVertice('v2');
            graph.addEdge('v1', 'v2');
            assert.equal(1, graph.similarity('v1', 'v2'));
        });

        it('it should return 0', function() {
            var graph = new Graph();
            graph.addVertice('v1');
            graph.addVertice('v2');
            assert.equal(0, graph.similarity('v1', 'v2'));
        });

        it('it should return 2/Math.sqrt(6)', function() {
            var graph = new Graph();
            graph.addVertice('v1');
            graph.addVertice('v2');
            graph.addVertice('v3');
            graph.addEdge('v1', 'v2');
            graph.addEdge('v1', 'v3');
            assert.equal(2 / Math.sqrt(6), graph.similarity('v1', 'v2'));
        });
    });


    describe('#save()', function() {
        it('it should save graph into file', function(done) {
            var graph = new Graph();
            graph.addVertice('v1');
            graph.addVertice('v2');
            graph.addEdge('v1', 'v2');
            graph.saveCSV('./test/test.csv', true, (err, data) => {
                if (!err) {
                    assert(true);
                }
                done();
            })

        });
    });


    describe('#load()', function() {
        it('it should load graph into file', function(done) {
            Graph.loadCSV('./test/test.csv', true, (err, graph) => {
                if (!err) {
                    assert.equal(2, graph.vertices.length);
                    assert.equal('v1', graph.vertices[0]);
                    assert.equal('v2', graph.vertices[1]);
                    assert.equal('v2', graph.edges['v1'][0]);
                    assert.equal('v1', graph.edges['v2'][0]);
                }
                done();
            })

        });
    });
});
