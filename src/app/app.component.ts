import { Component, ViewChild, ChangeDetectorRef, OnInit, AfterViewInit, OnDestroy } from "@angular/core";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Subscription } from "rxjs";
import { UIService } from "./shared/ui/ui.service";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild(RadSideDrawerComponent, { static: false}) drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;
    private drawerSub: Subscription;

    constructor(
        private changeDetectionRef: ChangeDetectorRef,
        private uiService: UIService,
        private router: RouterExtensions
        ) {}

    ngOnInit() {
        this.drawerSub =  this.uiService.drawerState.subscribe(() => {
            if (this.drawer) {
                this.drawer.toggleDrawerState();
            }
        });
    }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this.changeDetectionRef.detectChanges();
    }

    logout() {
        this.router.navigate(['/auth'], { clearHistory: true});
        this.drawer.toggleDrawerState();
    }

    ngOnDestroy() {
        if (this.drawerSub) {
            this.drawerSub.unsubscribe();
        }
    }
}
