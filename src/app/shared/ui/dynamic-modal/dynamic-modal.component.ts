import { Component, OnInit, OnDestroy } from '@angular/core';
import { UIService } from '../ui.service';
import { Subscription } from 'rxjs';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';

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
        private activeRoute: ActivatedRoute,) {}

    ngOnInit() {

      this.modalCurrentViewSub = this.uiService.modalCurrentView
          .subscribe(modalView => {
              this.modalCurrentViewMode = modalView;
              }
          );
      if(this.modalCurrentViewMode === "forgot") {
          this.routerExt.navigate(
              [{outlets: {sharedModal: ["forgot-password"]}}],
               {relativeTo: this.activeRoute}
          );
      }
    }

    ngOnDestroy() {
      if(this.modalCurrentViewSub) {
          this.modalCurrentViewSub.unsubscribe();
      }
    }

  }
