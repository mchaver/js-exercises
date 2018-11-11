const assert = require('assert');

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

function reverseTree(root) {
  const rootCopy = JSON.parse(JSON.stringify(root));
  const nodes = [rootCopy];
  for (const node of nodes) {
    const tmp = node.left;
    node.left = node.right;
    node.right = tmp;
    if (node.left) {
      nodes.push(node.left);
    }
    if (node.right) {
      nodes.push(node.right);
    }
  }
  return rootCopy;
};

function compareTrees(tree1, tree2) {
  if ((tree1 !== null && tree2 === null) || (tree1 === null && tree2 !== null))  {
    return false;
  }
    
  if (tree1 === null && tree2 === null) {
    return true;
  }

  if (tree1.val === tree2.val) {
    return compareTrees(tree1.left, tree2.left) && compareTrees(tree1.right, tree2.right);
  }

  return false;
};

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
  if (!root) return true;

  if (root.left === null && root.right === null) {
    return true;
  }

  if ((root.left === null && root.right !== null) || (root.left !== null && root.right === null)) {
    return false
  }

  const mirroredLeftSide = reverseTree(root.left);
  return compareTrees(mirroredLeftSide, root.right);
};

// right side is mirrored
/*
    1
   / \
  2   2
 / \ / \
3  4 4  3
*/

const r1 = new TreeNode(1);
r1.left = new TreeNode(2);
r1.left.left = new TreeNode(3);
r1.left.right = new TreeNode(4);

r1.right = new TreeNode(2);
r1.right.left = new TreeNode(4);
r1.right.right = new TreeNode(3);

assert(isSymmetric(r1) === true, 'isSymmetric(r1) should be true, but it isn\'t.');

// left side is not mirrored
/*
    1
   / \
  2   2
   \   \
   3    3
*/
const r2 = new TreeNode(1);
r2.left = new TreeNode(2);
r2.left.right = new TreeNode(3);

r2.right = new TreeNode(2);
r2.right.right = new TreeNode(3);

assert(isSymmetric(r2) === false, 'isSymmetric(r2) should be false, but it isn\'t.');

assert(isSymmetric(null) === true, 'is it so');
