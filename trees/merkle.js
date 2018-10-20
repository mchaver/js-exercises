const crypto = require('crypto');

// public

const emptyTree = () => {
  const tree = {
    leaves: [],
    levels: [],
    isReady: false,
  };
  return tree;
};

const addLeaf = (tree, value, doHash) => {
  tree.isReady = false;
  if (doHash) value = hashFunction(value);
  tree.leaves.push(_getBuffer(value));
};

const addLeaves = (tree, valuesArray, doHash) => {
  tree.isReady = false;
  valuesArray.forEach((value) => {
    if (doHash) value = hashFunction(value);
    tree.leaves.push(_getBuffer(value));
  });
};

// Returns a leaf at the given index
const getLeaf = (tree, index) => {
  if (index < 0 || index > tree.leaves.length - 1) return null; // index is out of array bounds

  return tree.leaves[index];
}

// Returns the number of leaves added to the tree
const getLeafCount = (tree) => {
  return tree.leaves.length;
}

// Returns the ready state of the tree
const getTreeReadyState = (tree) => {
  return tree.isReady;
}

const makeTree = (tree, doubleHash) => {
  tree.isReady = false;
  var leafCount = tree.leaves.length;
  if (leafCount > 0) { // skip this whole process if there are no leaves added to the tree
    tree.levels = [];
    tree.levels.unshift(tree.leaves);
    while (tree.levels[0].length > 1) {
      tree.levels.unshift(_calculateNextLevel(tree, doubleHash));
    }
  }
  tree.isReady = true;
}

// private

const hashFunction = (value) => {
  return crypto.createHash('sha256').update(value).digest();
};

const _isHex = (value) => {
  const hexRegex = /^[0-9A-Fa-f]{2,}$/;
  return hexRegex.test(value);
}

const _getBuffer = (value) => {
  if (value instanceof Buffer) { // it is already a Buffer
    return value;
  } else if (_isHex(value)) { // conver hex to Buffer
    return Buffer.from(value, 'hex');
  } else { // not Buffer or hex
    throw new Error("Bad hex value - '" + value + "'");
  }
};

// Calculates the next level of node when building the merkle tree
// These values are calcalated off of the current highest level,
// level 0 and will be prepended to the levels array
const _calculateNextLevel = (tree, doubleHash) => {
  var nodes = [];
  var topLevel = tree.levels[0];
  var topLevelCount = topLevel.length;

  for (var x = 0; x < topLevelCount; x += 2) {
    if (x + 1 <= topLevelCount - 1) { // concatenate and hash the pair, add to the next level array, doubleHash if requested
      if (doubleHash) {
        nodes.push(hashFunction(hashFunction(Buffer.concat([topLevel[x], topLevel[x + 1]]))));
      } else {
        nodes.push(hashFunction(Buffer.concat([topLevel[x], topLevel[x + 1]])));
      }
    } else { // this is an odd ending node, promote up to the next level by itself
      nodes.push(topLevel[x]);
    }
  }

  return nodes;
}

// testing

const tree = emptyTree();
addLeaf(tree, 'abc',true);
addLeaves(tree, ['x','y','x'], true);

console.log('trees without levels', tree);

makeTree(tree, false);

console.log('trees with levels', tree);
