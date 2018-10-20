const insert = (bst, data) => {
  const node = {data, left: null, right: null};
  if (bst.root) {
    let current = bst;
    let parent;
    while (true) {
      parent = current;
      if (data < current.data) {
        current = current.left;
        if (current === null) {
          parent.left = node;
          break;
        }
      } else {
        current = current.right;
        if (current === null) {
          parent.right = node;
          break;
        }
      }
    }
  } else {
    bst.data = node.data;
    bst.left = null;
    bst.right = null;
    bst.root = true;
  }
};

const getMin = (bst) => {
  let current = bst;
  while (current.left !== null) {
    current = current.left;
  }
  return current;
};

const getMax = (bst) => {
  let current = bst;
  while (current.right !== null) {
    current = current.right;
  }
  return current;
};

const find = (bst, data) => {
  let current = bst;
  while (current.data !== data) {
    if (data < current.data) {
      current = current.left;
    } else {
      current = current.right;
    }
    if (current === null) {
      return null;
    }
  }
  return current;
};

let bst = {};

insert(bst, 4);
insert(bst, 2);
insert(bst, 6);
insert(bst, 1);
insert(bst, 3);
insert(bst, 5);
insert(bst, 7);

const pp = x => { console.log(JSON.stringify(x, null, 2)) };

pp(bst);
pp(getMin(bst));
pp(getMax(bst));
pp(find(bst, 3));
pp(find(bst, 20));
