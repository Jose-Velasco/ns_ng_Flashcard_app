import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { UIService } from '../ui.service';

import { isAndroid } from "tns-core-modules/platform";
import { RouterExtensions } from 'nativescript-angular/router';
import { Page, Color } from 'tns-core-modules/ui/page/page';

declare var android: any;

@Component({
  selector: 'ns-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css']
})
export class ActionBarComponent implements OnInit {
    @Input() title = "Flash Cards";
    @Input() isMainStatusBarColor = true;
    @Input() hasMenu = true;
    @Input() showBackButton = true;

  constructor(
      private uiService: UIService,
      private router: RouterExtensions,
      private page: Page,
      private changeDetectionRef: ChangeDetectorRef) { }

  ngOnInit() {

  }

  get android() {
    return isAndroid;
    }

    get canGoBack() {
        return this.router.canGoBack() && this.showBackButton;

    }

    onGoBack() {
        this.isMainStatusBarColor = true;
        this.setAndroidStatusBarColor();
        this.router.backToPreviousPage();
    }

    // used to color the back button black
    onLoadedActionBar() {
        if (isAndroid) {
            // const colorBar = this.isMainStatusBarColor ? "#C54040" : "#F96A1F";
            // const statusBar = new Color(colorBar);
            // this.page.androidStatusBarBackground = statusBar;
            this.setAndroidStatusBarColor();
            const androidToolbar = this.page.actionBar.nativeView;
            const backButton = androidToolbar.getNavigationIcon();
            let color = '#000000';
            if (this.hasMenu) {
                color = '#ffffff'
            }
                if (backButton) {
                    backButton.setColorFilter(android.graphics.Color.parseColor(color), (<any>android.graphics).PorterDuff.Mode.SRC_ATOP);
                }
        }
    }

    setAndroidStatusBarColor() {
        const colorBar = this.isMainStatusBarColor ? "#C54040" : "#F96A1F";
        const statusBar = new Color(colorBar);
        this.page.androidStatusBarBackground = statusBar;
    }

  onToggleMenu() {
      this.uiService.toggleDrawer();
  }
}
