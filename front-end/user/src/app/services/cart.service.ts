import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})

export class CartService {
    cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    total = 0;

    private cartSubject = new Subject<any>();
    private quantitySubject = new Subject<number>();

    private cartObservable = this.cartSubject.asObservable();
    private quantityObservable = this.quantitySubject.asObservable();

    increaseQuantity(product: Product) {
        if (this.cart.find(item => item.id === product.id) === undefined) {
            this.cart = [...this.cart, { id: product.id, name: product.name, description: product.description, price: product.price, categoryName: product.categoryName, quantity: 1 }];
        } else {
            this.cart = this.cart.map(item => {
                if (item.id === product.id) {
                    return { ...item, quantity: item.quantity + 1 }
                } else {
                    return item;
                }
            })
        }
    }

    decreaseQuantity(product: Product) {
        if (this.cart.find(item => item.id === product.id)?.quantity === 1) {
            this.cart = this.cart.filter(item => item.id !== product.id);
        } else {
            this.cart = this.cart.map(item => {
                if (item.id === product.id) {
                    return { ...item, quantity: item.quantity - 1 }
                } else {
                    return item;
                }
            })
        }
    }

    removeFromCart(product: Product) {
        this.cart = this.cart.filter(item => item.id !== product.id);
    }

    getQuantity() {
        let quantity = this.cart.reduce(
            (accumulator, currentValue) => accumulator + currentValue.quantity,
            0,
        );
        localStorage.setItem('quantity', JSON.stringify(quantity));
        return quantity;
    }

    getCartObservable(): Observable<CartItem[]> {
        return this.cartObservable;
    }

    emitEvent() {
        this.total = this.cart.reduce(
            (accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity),
            0,
        );
        this.cartSubject.next({cart: this.cart, total: this.total});
        
        localStorage.setItem('cart', JSON.stringify(this.cart));
        localStorage.setItem('total', JSON.stringify(this.total));
    }
    
    getQuantityObservable(): Observable<number> {
        return this.quantityObservable;
    }

    emitQuantityEvent() {
        const quantity = this.getQuantity();
        this.quantitySubject.next(quantity);
    }

    clear() {
        this.cart = [];
        this.total = 0;
    }
}
