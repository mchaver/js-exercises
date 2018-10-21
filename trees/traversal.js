// root
//     1
//    / \
//   2   3
//  / \
// 4   5

// three kinds of depth first
// inorder: left, root, right
// 4, 2, 5, 1, 3

// preorder: root, left, right
// 1, 2, 4, 5, 3

// postorder: left, right, root
// 4, 5, 2, 3, 1

// breadth first (level order)
// 1, 2, 3, 4, 5

// root2

const newNode = (data) => {
  const node = {
    data,
    left: null,
    right: null,
  };
  return node;
};

const getInOrder = (root, results) => {
  results = results || [];
  if (root) {
    results.concat(getInOrder(root.left, results));
    results.push(root.data);
    results.concat(getInOrder(root.right, results));
  }
  return results;
};

const getInPreOrder = (root, results) => {
  results = results || [];
  if (root) {
    results.push(root.data);
    results.concat(getInPreOrder(root.left, results));
    results.concat(getInPreOrder(root.right, results));
  }
  return results;
};

const getInPostOrder = (root, results) => {
  results = results || [];
  if (root) {
    results.concat(getInPreOrder(root.left, results));
    results.concat(getInPreOrder(root.right, results));
    results.push(root.data);
  }
  return results;
};

const getBreadthFirst = (tree) => {
  let nodes = [tree];
  let results = [];
  for (const node of nodes) {
    if (node) {
      results.push(node.data);
      if (node.left !== null) {
        nodes.push(node.left);
      }
      if (node.right !== null) {
        nodes.push(node.right);
      }
    }
  }

  return results;
};

// mutate, I don't like this style
const getInOrderMutate = (root, results) => {
  if (root) {
    getInOrder(root.left, results);
    results.push(root.data);
    getInOrder(root.right, results);
  }
};


const root = newNode(1);
root.left = newNode(2);
root.right = newNode(3);
root.left.left = newNode(4);
root.left.right = newNode(5);

const root2 = newNode(1);
root2.left = newNode(2);
root2.right = newNode(3);
root2.right.left = newNode(4);
root2.right.right = newNode(5);
root2.right.right.left = newNode(6);
root2.right.right.right = newNode(7);

console.log(JSON.stringify(root, null, 2));

console.log(getInOrder(root));
console.log(getInOrder(root2));

console.log(getInPreOrder(root));
console.log(getInPreOrder(root2));

console.log(getInPostOrder(root));
console.log(getInPostOrder(root2));

console.log(getBreadthFirst(root));
console.log(getBreadthFirst(root2));
