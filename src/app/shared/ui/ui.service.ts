import { Injectable, ViewContainerRef } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({ providedIn: 'root'})
export class UIService {
    private _drawerState = new BehaviorSubject<void>(null);
    private _rootVCRef: ViewContainerRef;
    private _androidStatusBarColor = new Subject<void>();
    constructor() {}

    get drawerState() {
        return this._drawerState.asObservable();
    }

    get androidStatusBarColor() {
        return this._androidStatusBarColor.asObservable();
    }

    toggleDrawer() {
        this._drawerState.next(null);
    }

    // setStatusBarBackground(isStatusBarMainColor: boolean) {
    //     console.log(isStatusBarMainColor);
    //     const color = isStatusBarMainColor ? "#C54040" : "#F96A1F";
    //     console.log(color);
    //     const statusBar = new Color(color)
    //     console.log(statusBar);
    //     this.page.androidStatusBarBackground = statusBar;
    // }

    // setRootVCRef(vcRef: ViewContainerRef) {
    //     this._rootVCRef = vcRef;
    // }

    // getRootVCRef() {
    //     return this._rootVCRef;
    // }
}
