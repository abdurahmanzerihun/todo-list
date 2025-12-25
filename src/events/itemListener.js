import { createItem } from '../logic/items';

export function setupItemListeners(){
    const itemDialog=document.getElementById('item-dialog');
    const addItemButton=document.getElementById('add-item-btn');
    addItemButton.addEventListener('click',()=>itemDialog.showModal());
const itemForm=document.getElementById('item-form');
itemForm.addEventListener('submit', (e) => {
 e.preventDefault();
    const itemInput=document.getElementById('item-input')
    createItem(itemInput.value);
    itemInput.value = '';
    itemDialog.close();
});
}