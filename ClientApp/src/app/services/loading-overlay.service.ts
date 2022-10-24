import { Inject, Injectable, Injector } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class LoadingOverlayService {


    public showing: boolean;

    constructor() {
        this.showing = false;
    }

    public show(): void {
        this.showing = true;
    }

    public hide(): void {
        this.showing = false;
    }

}
