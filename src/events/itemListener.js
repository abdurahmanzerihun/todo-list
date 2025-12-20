import { createItem } from '../logic/items';

export function setupItemListeners(){
const itemForm=document.getElementById('item-form');
itemForm.addEventListener('submit', (e) => {
 e.preventDefault();
    const itemInput=document.getElementById('item-input')
    const value = itemInput.value; // string;
    createItem(value);
    itemInput.value = '';
});
}