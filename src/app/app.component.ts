import { Component, ViewChild, ChangeDetectorRef, OnInit, AfterViewInit, OnDestroy } from "@angular/core";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Subscription } from "rxjs";
import { UIService } from "./shared/ui/ui.service";
import { AuthService } from "./auth/auth.service";
import { take } from "rxjs/operators";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
    userEmail = "Email not available.";

    @ViewChild(RadSideDrawerComponent, { static: false}) drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;
    private drawerSub: Subscription;

    constructor(
        private changeDetectionRef: ChangeDetectorRef,
        private uiService: UIService,
        private authSerivce: AuthService
        ) {}

    ngOnInit() {
        this.drawerSub =  this.uiService.drawerState.subscribe(() => {
            if (this.drawer) {
                this.setUserProfileEmail();
                this.drawer.toggleDrawerState();
            }
        });
    }

    setUserProfileEmail() {
        this.authSerivce.user.pipe(take(1))
            .subscribe(currentUser => {
                if (this.userEmail !== currentUser.userEmail || currentUser.isAuth) {
                    this.userEmail = currentUser.userEmail;
                }
            });
    }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this.changeDetectionRef.detectChanges();
    }

    logout() {
        this.userEmail = "Email not available.";
        this.drawer.toggleDrawerState();
        this.authSerivce.logout();
    }

    ngOnDestroy() {
        if (this.drawerSub) {
            this.drawerSub.unsubscribe();
        }
    }
}
