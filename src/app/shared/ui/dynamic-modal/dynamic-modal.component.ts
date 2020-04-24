import { Component, OnInit, OnDestroy } from '@angular/core';
import { UIService } from '../ui.service';
import { Subscription } from 'rxjs';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { Page, Color } from 'tns-core-modules/ui/page/page';
import { FlexboxLayout } from "tns-core-modules/ui/layouts/flexbox-layout";

declare var android: any;

@Component({
  selector: 'ns-dynamic-modal',
  templateUrl: './dynamic-modal.component.html',
  styleUrls: ['./dynamic-modal.component.css',]
})
export class DynamicModalComponent implements OnInit, OnDestroy {
  modalCurrentViewMode: string;
  modalCurrentViewSub: Subscription;

  constructor(
      private uiService: UIService,
      private routerExt: RouterExtensions,
      private activeRoute: ActivatedRoute,
      private router: Router,
      private page: Page) {


      }

  ngOnInit() {
    // this.page.on("loaded", (args) => {
    //     (<Page>args.object).backgroundColor = new Color("#FFC0CB");
    // })
    this.modalCurrentViewSub = this.uiService.modalCurrentView
        .subscribe(modalView => {
            this.modalCurrentViewMode = modalView;
            }
        );
    // if(this.modalCurrentViewMode === "forgot") {
    //     this.routerExt.navigate(
    //         [{outlets: {sharedModal: ["forgot-password"]}}],
    //          {relativeTo: this.activeRoute}
    //     );
    // }
  }

  layoutLoaded(args) {
    var layout:FlexboxLayout = <FlexboxLayout>args.object;
    layout.backgroundColor = new Color("#a20c99");
  }


  ngOnDestroy() {
    if(this.modalCurrentViewSub) {
        this.modalCurrentViewSub.unsubscribe();
    }
  }

}
