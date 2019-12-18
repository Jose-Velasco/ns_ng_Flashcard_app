import { Component, OnInit, Input } from '@angular/core';
import { UIService } from '../ui.service';

import { isAndroid } from "tns-core-modules/platform";

declare var android: any;

@Component({
  selector: 'ns-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css']
})
export class ActionBarComponent implements OnInit {
    @Input() title = "Flash Cards";
    @Input() isAuthScreen = false;

  constructor(private uiService: UIService) { }

  ngOnInit() {
  }

  get android() {
    return isAndroid;
}

  onToggleMenu() {
      this.uiService.toggleDrawer();
  }
}
