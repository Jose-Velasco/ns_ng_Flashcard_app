import { Component, OnInit, ElementRef, ViewChild, OnDestroy, ViewContainerRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TextField } from 'tns-core-modules/ui/text-field';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';
import { DynamicModalComponent } from '../shared/ui/dynamic-modal/dynamic-modal.component';
import { UIService } from '../shared/ui/ui.service';
import { backgroundColorProperty } from 'tns-core-modules/ui/page/page';

@Component({
  selector: 'ns-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
    isLoading = false;
    isLogin = true;
    form: FormGroup;
    emailControlIsValid = true;
    passwordControlIsValid = true;
    basicAutoLoginSub: Subscription;
    @ViewChild('passwordEl', {static: false}) passwordEl: ElementRef<TextField>;
    @ViewChild('emailEl', {static: false}) emailEl: ElementRef<TextField>;

  constructor(
      private router: RouterExtensions,
      private authService: AuthService,
      private modalDialog: ModalDialogService,
      private vcRef: ViewContainerRef,
      private uiService: UIService) { }


  ngOnInit() {
      this.form = new FormGroup({
          email: new FormControl(null, {
              updateOn: "blur",
              validators: [Validators.required,
                Validators.email]
          }),
          password: new FormControl(null, {
              updateOn: "blur",
              validators: [ Validators.required,
                Validators.minLength(6)]
          })
      });

      this.basicAutoLoginSub = this.authService.user
        .subscribe(currentUser => {
            if (!currentUser || !currentUser.token) {
                this.authService.autoLogin();
            }
            if ( currentUser && currentUser.isAuth ) {
                this.router.navigate(['tabs'], {clearHistory: true});
            }
        });

    this.form.get('email').statusChanges.subscribe( status => {
        this.emailControlIsValid = status === 'VALID';
    });

    this.form.get('password').statusChanges.subscribe( status => {
        this.passwordControlIsValid = status === 'VALID';
    });
  }

  onSubmit() {
    this.emailEl.nativeElement.focus();
    this.passwordEl.nativeElement.focus();
    this.passwordEl.nativeElement.dismissSoftInput();
      if (!this.form.valid) {
          return
      }
      const email = this.form.get("email").value;
      const password = this.form.get("password").value;
      this.form.reset();
      this.emailControlIsValid = true;
      this.passwordControlIsValid = true;
      this.isLoading = true;
      if (this.isLogin) {
          this.authService.login(email, password).subscribe(resData => {
            this.isLoading = false;
              this.router.navigate(['tabs'], {clearHistory: true});
          }, err => {
              console.log(err);
              this.isLoading = false;
          });

      } else {
          this.authService.signUp(email, password).subscribe(resData => {
            this.isLoading = false;
            this.isLogin = true;
          }, err => {
              console.log(err);
              this.isLoading = false;
          });
      }
  }

  onDone(): void {
    this.emailEl.nativeElement.focus();
    this.passwordEl.nativeElement.focus();
    this.passwordEl.nativeElement.dismissSoftInput();
  }

  onSwitch() {
    this.isLogin = !this.isLogin;
  }

  onForgotPassword() {
    const modalViewMode = "forgot";
    this.uiService.setModalCurrentView(modalViewMode);
    // this creates a modal based on which component is place as an argument
    // uses the view container ref of the app.component if it fails then
    // it uses the current vcREf
    // data is passed useing context key
    this.modalDialog.showModal(DynamicModalComponent, {
        fullscreen: false,
        viewContainerRef: this.uiService.getRootVCRef()
            ? this.uiService.getRootVCRef()
            : this.vcRef,
        context: { modalType: "forgot"},
        animated: true,
    });
  }

  ngOnDestroy() {
      this.basicAutoLoginSub.unsubscribe();
  }

}
