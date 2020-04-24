import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { Page } from 'tns-core-modules/ui/page/page';
import { isAndroid } from "tns-core-modules/platform";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TextField } from 'tns-core-modules/ui/text-field/text-field';

@Component({
  selector: 'ns-forgot-password-modal-view',
  templateUrl: './forgot-password-modal-view.component.html',
  styleUrls: ['./forgot-password-modal-view.component.css']
})
export class ForgotPasswordModalViewComponent implements OnInit, OnDestroy {
  modalTypeCurrent: string;
  forgotPasswordForm: FormGroup;
  emailControlIsValid = false;
  @ViewChild('emailEl', {static: false}) emailEl: ElementRef<TextField>;

  // ModalDialogParams: this is an object that allows you to retrieve the parameters
  // that were passed in through context
  constructor(
    private modalParams: ModalDialogParams,
    private page: Page
    ) {}

  ngOnInit() {
    // this.page.backgroundColor = new Color("#00000000");
    // this.page.parentNode.className = "test";
    // if(isAndroid) {
    //     this.page.actionBarHidden = true;
    // }
    this.modalTypeCurrent = (this.modalParams.context as {modalType: string}).modalType

    this.forgotPasswordForm = new FormGroup({
        email: new FormControl(null, {
            updateOn: "blur",
            validators: [Validators.required,
                Validators.email]
        })
    })

    this.forgotPasswordForm.get('email').statusChanges.subscribe( status => {
        this.emailControlIsValid = status === 'VALID';
    });
  }

  onSubmitForm() {
    if(this.modalTypeCurrent === "forgot") {
        this.modalParams.closeCallback();
    }
  }

  ngOnDestroy() {
    console.log("Modal close, current value:", this.modalTypeCurrent);
  }

}
