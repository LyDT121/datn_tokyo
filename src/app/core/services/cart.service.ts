import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {
    let local_storage = JSON.parse(localStorage.getItem('cart') || '[]');
    if (!local_storage) {
      local_storage = [];
    }
  }
  
  public addToCart(item:any) {
    // item.quantity = 1;
    let local_storage:any;
    if (!localStorage.getItem('cart')) {
      local_storage = [item];
    } else {
      local_storage = localStorage.getItem('cart');
      local_storage = JSON.parse(local_storage);
      let ok = true;
      for (let x of local_storage) {
        if (x.id == item.id) {
          x.quantity += 1;
          ok = false;
          break;
        }
      }
      if(ok){
        local_storage.push(item); 
      } 
    }
    localStorage.setItem('cart', JSON.stringify(local_storage));
    location.reload();
  }

  public getItems() {
    if (localStorage.getItem('cart') == null) {
      return [];
    } else {
      return JSON.parse(localStorage.getItem('cart') || '[]');
    }
  }

  public deleteItem(item_id :any) {
    let local_storage = this.getItems().filter((x:any) => x.id != item_id); 
    localStorage.setItem('cart', JSON.stringify(local_storage));
  }

  public addQty(item:any) {
    let local_storage = JSON.parse(localStorage.getItem('cart') || '{}');
    for (let x of local_storage) {
      if (x.item_id == item.item_id) {
        x.quantity = item.quantity;
        break;
      }
    }
    localStorage.setItem('cart', JSON.stringify(local_storage));
  }

  public numberOfItems() {
    let local_storage = JSON.parse(localStorage.getItem('cart') || '{}');
    return local_storage.length;
  }

  public clearCart() {
   localStorage.clear();
  }
}
