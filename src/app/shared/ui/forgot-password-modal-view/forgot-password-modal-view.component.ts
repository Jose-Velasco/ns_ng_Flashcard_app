import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { isAndroid } from "tns-core-modules/platform";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TextField } from 'tns-core-modules/ui/text-field/text-field';
import { Subscription } from 'rxjs';
import { AuthService } from '~/app/auth/auth.service';
import * as applicationModule from "tns-core-modules/application";
import { alert } from 'tns-core-modules/ui/dialogs/dialogs';

declare var android: any;

@Component({
  selector: 'ns-forgot-password-modal-view',
  templateUrl: './forgot-password-modal-view.component.html',
  styleUrls: ['./forgot-password-modal-view.component.css']
})
export class ForgotPasswordModalViewComponent implements OnInit, OnDestroy {
    modalTypeCurrent: string;
    forgotPasswordForm: FormGroup;
    forgotPasswordFromSub: Subscription;
    emailControlIsValid = false;
    isLoading: boolean = false;
    @ViewChild('emailElm', {static: false}) emailElm: ElementRef<TextField>;

    // ModalDialogParams: this is an object that allows you to retrieve the parameters
    // that were passed in through context
    constructor(
      private modalParams: ModalDialogParams,
      private authService: AuthService
      ) {}

    ngOnInit() {
      this.modalTypeCurrent = (this.modalParams.context as {modalType: string}).modalType

      this.forgotPasswordForm = new FormGroup({
          email: new FormControl(null, {
              updateOn: "change",
              validators: [ Validators.required,
                          Validators.email
              ]
          })
      })
      this.forgotPasswordFromSub = this.forgotPasswordForm.get('email').statusChanges.subscribe( status => {
          this.emailControlIsValid = status === "VALID";
      });
    }

    onClose(): void {
      if (isAndroid) {
          let decorView: any = applicationModule.android.startActivity.getWindow().getDecorView()
          decorView.playSoundEffect(android.view.SoundEffectConstants.CLICK);
      }
      this.modalParams.closeCallback();
    }

    onSubmitForm(): void {
      this.isLoading = true
      if(!this.forgotPasswordForm.valid) {
          this.isLoading = false;
          return;
      }
      const userEmail = this.forgotPasswordForm.get("email").value;
      this.forgotPasswordForm.reset();
      if(this.modalTypeCurrent === "forgot") {
          this.authService.resetPassword(userEmail).subscribe(resData => {
              alert(JSON.stringify(resData));
              this.isLoading = false;
          }, err => {
              console.log(err);
          });
          this.modalParams.closeCallback();
      }
    }

    ngOnDestroy() {
      if(this.forgotPasswordFromSub) {
          this.forgotPasswordFromSub.unsubscribe();
      }
    }

  }
