import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MenuService {
    //true büyük menü, false küçük menü.

    isMax = new BehaviorSubject<boolean>(false);
    isMax$ = this.isMax.asObservable();

    toggleMenuSize(size: boolean): void {
        this.isMax.next(size);
    }
}
