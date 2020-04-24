import { Injectable, ViewContainerRef } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({ providedIn: 'root'})
export class UIService {
    private _drawerState = new BehaviorSubject<void>(null);
    private _androidStatusBarColor = new Subject<void>();
    private _modalCurrentView = new BehaviorSubject<"forgot" | "message">(null);
    private _rootVCRef: ViewContainerRef;
    constructor() {}

    get drawerState() {
        return this._drawerState.asObservable();
    }

    get androidStatusBarColor() {
        return this._androidStatusBarColor.asObservable();
    }

    get modalCurrentView() {
        return this._modalCurrentView.asObservable();
    }

    setModalCurrentView(modalView: "forgot" | "message"): void {
        this._modalCurrentView.next(modalView);
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

    setRootVCRef(vcRef: ViewContainerRef) {
        this._rootVCRef = vcRef;
    }

    getRootVCRef() {
        return this._rootVCRef;
    }
}
