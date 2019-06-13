import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MenuService {
    //true büyük menü, false küçük menü.

    isMax = new BehaviorSubject<boolean>(false);
    isMax$ = this.isMax.asObservable();
    animationStart = new BehaviorSubject<boolean>(true);
    animationStart$ = this.animationStart.asObservable();

    toggleMenuSize(size: boolean): void {
        this.isMax.next(size);
    }

    emitAnimationStart():void{
        this.animationStart.next(!this.animationStart);
    }
}
