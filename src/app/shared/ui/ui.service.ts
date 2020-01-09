import { Injectable, ViewContainerRef } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Page, Color } from "tns-core-modules/ui/page/page";

@Injectable({ providedIn: 'root'})
export class UIService {
    private _drawerState = new BehaviorSubject<void>(null);
    private _rootVCRef: ViewContainerRef;
    constructor(private page: Page) {}

    get drawerState() {
        return this._drawerState.asObservable();
    }


    toggleDrawer() {
        this._drawerState.next(null);
    }

    setStatusBarBackground(isStatusBarMainColor: boolean) {
        const color = isStatusBarMainColor ? new Color("#C54040") : new Color("#F96A1F");
        this.page.androidStatusBarBackground = color;
    }

    // setRootVCRef(vcRef: ViewContainerRef) {
    //     this._rootVCRef = vcRef;
    // }

    // getRootVCRef() {
    //     return this._rootVCRef;
    // }
}
