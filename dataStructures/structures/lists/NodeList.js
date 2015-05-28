NodeList.prototype = new List();
NodeList.prototype.constructor = NodeList;
/**
 * NodeList
 * @constructor
 */

function NodeList() {
  //var array=List.apply(this, arguments);

  //if(arguments && arguments.length>0) {c.l('UEUEUEUE, arguments.length', arguments.length); var a; a.push(0)};

  array = NodeList.fromArray([]);

  if(arguments && arguments.length > 0) {
    var args = Array.prototype.slice.call(arguments);

    args.forEach(function(arg) {
      array.addNode(arg);
    });
  }

  return array;
}

NodeList.fromArray = function(array, forceToNode) {
  forceToNode = forceToNode == null ? false : forceToNode;

  var result = List.fromArray(array);
  if(forceToNode) {
    for(var i = 0; i < result.length; i++) {
      result[i] = typeOf(result[i]) == "Node" ? result[i] : (new Node(String(result[i]), String(result[i])));
    }
  }

  var result = List.fromArray(array);
  result.type = "NodeList";
  result.ids = new Object();
  Array(); //????

  //assign methods to array:
  result.deleteNodes = NodeList.prototype.deleteNodes;
  result.addNode = NodeList.prototype.addNode;
  result.addNodes = NodeList.prototype.addNodes;
  result.removeNode = NodeList.prototype.removeNode;
  result.removeNodeAtIndex = NodeList.prototype.removeNodeAtIndex;
  result.getNodeByName = NodeList.prototype.getNodeByName;
  result.getNodeById = NodeList.prototype.getNodeById;
  result.getNodesByIds = NodeList.prototype.getNodesByIds;
  result.getNewId = NodeList.prototype.getNewId;
  result.normalizeWeights = NodeList.prototype.normalizeWeights;
  result.getWeights = NodeList.prototype.getWeights;
  result.getIds = NodeList.prototype.getIds;
  result.getDegrees = NodeList.prototype.getDegrees;
  result.getPolygon = NodeList.prototype.getPolygon;

  result._push = Array.prototype.push;
  result.push = function(a) {
    c.l('with nodeList, use addNode instead of push');
    var k;
    k.push(a)
  };

  //overriden
  result.getWithoutRepetitions = NodeList.prototype.getWithoutRepetitions;
  result.clone = NodeList.prototype.clone;

  return result;
}

NodeList.prototype.removeNodes = function() {
  for(var i = 0; i < this.length; i++) {
    this.ids[this[i].id] = null;
    this.removeElement(this[i]);
  }
}

NodeList.prototype.addNode = function(node) {
  this.ids[node.id] = node;
  this._push(node);
}

NodeList.prototype.addNodes = function(nodes) {
  var i;
  for(i = 0; nodes[i] != null; i++) {
    this.addNode(nodes[i]);
  }
}

NodeList.prototype.removeNode = function(node) {
  this.ids[node.id] = null;
  this.removeElement(node);
}

NodeList.prototype.removeNodeAtIndex = function(index) {
  this.ids[this[index].id] = null;
  this.splice(index, 1);
}

/**
 * works under the assumption that weights are >=0
 */
NodeList.prototype.normalizeWeights = function() {
  var i;
  var max = -9999999;
  for(i = 0; this[i] != null; i++) {
    max = Math.max(this[i].weight, max);
  }
  for(i = 0; this[i] != null; i++) {
    this[i].weight /= max;
  }
}


/**
 * very unefficient method, use getNodeWithId when possible
 */
NodeList.prototype.getNodeByName = function(name) {
  var i;
  for(i = 0; i < this.length; i++) {
    if(this[i].name == name) {
      return this[i];
    }
  }
  return null;
}

/**
 * return a node from its id
 * @param  {String} id
 * @return {Node}
 * tags:search
 */
NodeList.prototype.getNodeById = function(id) {
  return this.ids[id];
}

NodeList.prototype.getNodesByIds = function(ids) {
  newNodelist = new NodeList();
  var node;
  for(var i = 0; ids[i] != null; i++) {
    node = this.ids[ids[i]];
    if(node != null) newNodelist[i] = node;
  }
  return newNodelist;
}

/**
 * return a list of weights
 * @return {NumberList}
 * tags:
 */
NodeList.prototype.getWeights = function() {
  var numberList = new NumberList();
  for(var i = 0; this[i] != null; i++) {
    numberList[i] = this[i].weight;
  }
  return numberList;
}

/**
 * get ids from nodes
 * @return {StringList}
 * tags:
 */
NodeList.prototype.getIds = function() {
  var list = new StringList();
  for(var i = 0; this[i] != null; i++) {
    list[i] = this[i].id;
  }
  return list;
}

NodeList.prototype.getDegrees = function() {
  var numberList = new NumberList();
  for(var i = 0; this[i] != null; i++) {
    numberList[i] = this[i].nodeList.length;
  }
  return numberList;
}


NodeList.prototype.getPolygon = function() {
  var polygon = new Polygon();
  for(var i = 0; this[i] != null; i++) {
    polygon[i] = new Point(this[i].x + cX, this[i].y + cY);
  }
  return polygon;
}

NodeList.prototype.getNewId = function() {
  var n = this.length + 1;
  for(var i = 0; i < n; i++) {
    if(this.getNodeById(String(i)) == null) return String(i);
  }
}

NodeList.prototype.clone = function() {
  var newNodeList = new NodeList();
  this.forEach(function(node) {
    newNodeList.addNode(node);
  });
  newNodeList.name = this.name;
  return newNodeList;
}


//methods overriden
NodeList.prototype.getWithoutRepetitions = function() {
  newList = new NodeList();
  newList.name = this.name;
  for(i = 0; this[i] != null; i++) {
    if(newList.getNodeById(this[i].id) == null) newList.addNode(this[i]);
  }
  return newList;
}