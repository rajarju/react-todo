/**
 * Todo List Actions
 */

 export function itemsHasErrored(bool) {
   return {
     type: 'ITEMS_HAS_ERRORED',
     hasErrored: bool
   };
 }


 export function itemsAreLoading(bool) {
   return {
     type : 'ITEMS_ARE_LOADING',
     isLoading: bool
   };
 }


 export function itemsFetchDataSuccess(items) {
   return {
     type : 'ITEMS_FETCH_DATA_SUCCESS',
     items
   }
 }


 export function itemsFetchData(url) {
   return (dispatch) => {
     dispatch(itemsAreLoading(true));

     fetch(url)
     .then((response) => {
       if (!response.ok) {
         throw Error(response.statusText);
       }

       dispatch(itemsAreLoading(false));
       return response;
     })
     .then((response) => response.json())
     .then((items) => dispatch(itemsFetchDataSuccess(items)))
     .catch(() => dispatch(itemsHasErrored(true)));
   }
 }
