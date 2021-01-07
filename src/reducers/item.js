import { Map, List } from 'immutable';
// import { ROOT_ID } from '../config/constants';
import {
  SET_ITEM_SUCCESS,
  DELETE_ITEM_SUCCESS,
  CLEAR_ITEM_SUCCESS,
  GET_ITEM_SUCCESS,
  MOVE_ITEM_SUCCESS,
  COPY_ITEM_SUCCESS,
  GET_CHILDREN_SUCCESS,
  FLAG_GETTING_ITEM,
  FLAG_CREATING_ITEM,
  FLAG_GETTING_OWN_ITEMS,
  FLAG_DELETING_ITEM,
  FLAG_GETTING_CHILDREN,
} from '../types/item';
// import { getItemById, getParentsIdsFromPath } from '../utils/item';

const DEFAULT_ITEM = Map({
  parents: [],
  children: [],
});

const INITIAL_STATE = Map({
  item: DEFAULT_ITEM,
  root: List(), // items
  activity: Map({
    [FLAG_GETTING_ITEM]: [],
    [FLAG_CREATING_ITEM]: [],
    [FLAG_GETTING_OWN_ITEMS]: [],
    [FLAG_DELETING_ITEM]: [],
    [FLAG_GETTING_CHILDREN]: [],
  }),
});

// const saveItemInItems = (items, fetchedItems) => {
//   let newItems = items;
//   for (const item of fetchedItems) {
//     const idx = newItems.findIndex(({ id }) => item.id === id);
//     // update existing element
//     if (idx >= 0) {
//       // merge manually children
//       const newChildren = item.children
//         ? item.children
//         : newItems.get(idx).children;
//       // merge manually parents
//       const newParents = item.parents
//         ? item.parents
//         : newItems.get(idx).parents;
//       newItems = newItems.set(idx, {
//         ...item,
//         children: newChildren,
//         parents: newParents,
//       });
//     } else {
//       // add new elem
//       newItems = newItems.push(item);
//     }
//   }
//   return newItems;
// };

// const removeItemInItems = (items, id) => {
//   let newItems = items;
//   const item = getItemById(items, id);

//   // remove item with id and all its children
//   newItems = items.filter(
//     ({ id: thisId, parents = [], path }) =>
//       id !== thisId &&
//       !parents.includes(id) &&
//       !getParentsIdsFromPath(path).includes(id),
//   );

//   // remove in direct parent's children
//   const parentIds = getParentsIdsFromPath(item.path);
//   if (parentIds.length > 1) {
//     const directParentId = parentIds[parentIds.length - 2]; // get most direct parent
//     const directParent = getItemById(newItems, directParentId);
//     if (directParent) {
//       directParent.children = directParent.children?.filter(
//         (child) => child !== id,
//       );
//     }
//   }
//   return newItems;
// };

// const addChildInItem = ({ items, id, to }) => {
//   const newItems = items;
//   const toIdx = newItems.findIndex(({ id: thisId }) => thisId === to);
//   return newItems.updateIn([toIdx, 'children'], (children) => {
//     if (children) {
//       children.push(id);
//       return children;
//     }
//     return null;
//   }); // update only if was fetched once
// };

// const addItemInItems = (items, { to, item: newItem }) => {
//   // add new item in items
//   let newItems = items.push(newItem);

//   // update to's children if not root
//   if (to !== ROOT_ID) {
//     newItems = addChildInItem({ items: newItems, id: newItem.id, to });
//   }

//   return newItems;
// };

// const updateRootItems = (items) => {
//   const rootItems = items.filter(({ path }) => !path.includes('.'));
//   return rootItems;
// };

// const updateState = (state) => {
//   const items = state.get('items');

//   // update root: own, shared, etc..
//   let newState = state.setIn(['root'], updateRootItems(items));

//   // update current item if exists
//   const currentId = newState.getIn(['item', 'id']);
//   if (currentId) {
//     newState = newState.set('item', Map(getItemById(items, currentId)));
//   }
//   return newState;
// };

// const dirtyItemAndChildren = (items, ids) => {
//   let newItems = items;

//   if (!ids?.length) {
//     return items;
//   }

//   const indexes = ids.map((id) =>
//     newItems.findIndex(({ id: thisId }) => thisId === id),
//   );
//   for (const idx of indexes) {
//     newItems = newItems.setIn([idx, 'dirty'], true);
//     newItems = dirtyItemAndChildren(
//       newItems,
//       newItems.getIn([idx, 'children']),
//     );
//   }
//   return newItems;
// };

// // because the move operation moves all the subtree,
// // we need to invalidate the destination to fetch the tree
// // and children again
// const moveItemInItems = (items, { id, from, to }) => {
//   let newItems = items;
//   // invalidate children and destination
//   newItems = dirtyItemAndChildren(newItems, [id, to]);
//   // remove item
//   newItems = newItems.filter(({ id: thisId }) => thisId !== id);

//   // remove in from
//   const fromIdx = newItems.findIndex(({ id: thisId }) => thisId === from);
//   if (fromIdx >= 0) {
//     newItems = newItems.updateIn([fromIdx, 'children'], (children) =>
//       children ? children.filter((childId) => childId !== id) : children,
//     );
//   }

//   return newItems;
// };

const updateActivity = (payload) => (activity) => {
  if (payload) {
    return [...activity, payload];
  }
  return activity.slice(1);
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case FLAG_GETTING_ITEM:
    case FLAG_CREATING_ITEM:
    case FLAG_GETTING_OWN_ITEMS:
    case FLAG_DELETING_ITEM:
    case FLAG_GETTING_CHILDREN:
      return state.updateIn(['activity', type], updateActivity(payload));
    case CLEAR_ITEM_SUCCESS:
      return state.setIn(['item'], DEFAULT_ITEM);
    case GET_ITEM_SUCCESS: {
      return state;
    }
    case SET_ITEM_SUCCESS:
      return state.setIn(['item'], Map(payload));
    case DELETE_ITEM_SUCCESS: {
      return state;
    }
    case MOVE_ITEM_SUCCESS: {
      return state;
    }
    case COPY_ITEM_SUCCESS: {
      return state;
    }
    case GET_CHILDREN_SUCCESS: {
      return state;
    }
    default:
      return state;
  }
};
