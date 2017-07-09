/**
 * Root Reducer
 */

 import { combineReducers } from 'redux';
 import { items, itemsHasErrored, itemsAreLoading } from './TodoList/TodoList.js';

 export default combineReducers({
   items,
   itemsHasErrored,
   itemsAreLoading
 });
