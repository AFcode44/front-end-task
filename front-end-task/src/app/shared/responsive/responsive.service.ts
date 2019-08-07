import { Injectable } from '@angular/core';
import { Subject, Observable, ReplaySubject } from 'rxjs';
import { ResponsiveEnum } from './responsive.enum';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
    private isMobile = new ReplaySubject<ResponsiveEnum>();

    public constructor() {
        this.checkWidth(window.innerWidth);
    }

    public get getMobileStatus(): Observable<ResponsiveEnum> {
        return this.isMobile.asObservable();
    }

    public checkWidth(width: number) {
        if (width < 768) {
            this.isMobile.next(ResponsiveEnum.MOBILE);
        } else if (width >= 768 && width <= 992) {
            this.isMobile.next(ResponsiveEnum.TABLET);
        } else {
            this.isMobile.next(ResponsiveEnum.DESKTOP);
        }
    }

}
