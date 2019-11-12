import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class ProductDetailsService {

  constructor(private db: AngularFireDatabase, private _http: HttpClient) { }

  inCartProductList: AngularFireList<any>;
  

  //firebase code for getting in db
  getInProductList() {
    this.inCartProductList = this.db.list('inCartProductList');
    return this.inCartProductList.snapshotChanges();
    
    
  }


  //firebase code for inserting in db
  insertInProductList(product,seller,inCartProduct) {
    console.log("incoming product 1 is : ",product);
    console.log("incoming product 2 is : ",inCartProduct);
    
    this.inCartProductList.push({
      productBrandName: inCartProduct.productBrandName,
      productDescription: inCartProduct.productDescription,
      productId: inCartProduct.productId,
      productImage: inCartProduct.productImage,
      productName: inCartProduct.productName,
      productPrice:inCartProduct.productPrice,
      productQuantityIncart:inCartProduct.productQuantityIncart,
      inCartTotal:inCartProduct.inCartTotal,
      userEmail:inCartProduct.userEmail,
    });
    console.log("incoming product 3 is : ",seller);
  }

  //firebase code for deleting in db
  deleteIncartProduct($key:string){
    this.inCartProductList.remove($key);

  }

  //firebase code for updating
  updateIncartProduct(inCartProduct){
    this.inCartProductList.update(inCartProduct.$key,{

      productBrandName: inCartProduct.productBrandName,
      productDescription: inCartProduct.productDescription,
      productId: inCartProduct.productId,
      productImage: inCartProduct.productImage,
      productName: inCartProduct.productName,
      productPrice:inCartProduct.productPrice,
      productQuantityIncart:inCartProduct.productQuantityIncart,
      inCartTotal:inCartProduct.inCartTotal,


    });
  }

  // temporary jason-server methods
  getProductInfo(): Observable<any> {
    return this._http.get<any>("http://localhost:3000/posts/Kitty%20Cat");
  }

  addProductToCart(product): Observable<any> {
    console.log(product, 'from service');

    return this._http.post<any>("http://localhost:3000/cart/", product);
  }

  addProductToWishlist(product): Observable<any> {
    return this._http.post<any>("http://localhost:3000/wishlist/", product);
  }
  //////////////////////////////////////////////////////////////////////////
}
