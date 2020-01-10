import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { FlashcardDeck } from '../flashcard/flashcardDeck.model';
import { FlashcardService } from '../flashcard/flashcard.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TextField } from 'tns-core-modules/ui/text-field';
import { AuthService } from './auth.service';

@Component({
  selector: 'ns-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    isLogin = true;
    form: FormGroup;
    emailControlIsValid = true;
    passwordControlIsValid = true;
    @ViewChild('passwordEl', {static: false}) passwordEl: ElementRef<TextField>;
    @ViewChild('emailEl', {static: false}) emailEl: ElementRef<TextField>;

  constructor(
      private router: RouterExtensions,
      private flashcardService: FlashcardService,
      private authService: AuthService) { }

  staticflashardData = [
    new FlashcardDeck("first ever deck!!!", [
        {instruction: "transolate in English", question: "あ",answer: "A"},
        {instruction: "transolate in Japanese", question: "A",answer: "あ"},
        {instruction: "transolate in English", question: "ア",answer: "A"},
        {instruction: "transolate in English", question: "漢字",answer: "Kanji "},
        {instruction: "transolate漢字 in漢字 English", question: "漢字漢字漢字漢字漢漢漢漢字字字字",answer: "KanjiKanjiKanjiKanjiKanjiKanjiKanjiKanji"},
    ]),
    new FlashcardDeck("Another onw!!!", [
        {instruction: "3333333onw!", question: "this is answer",answer: "A*****"},
        {instruction: "Another onw! in Another onw!", question: "A",answer: "あ"},
        {instruction: "Another onw! in Another onw!", question: "ア",answer: "A"},
        {instruction: "Another onw!", question: "xdxdxd",answer: "Kanji "},
        {instruction: "tAnother onw!", question: "xdxd字",answer: "second card dexck"},
    ]),
    new FlashcardDeck("this is deiffent", [
        {instruction: "do this !", question: "this is answer",answer: "A*****"},
        {instruction: "Another onw! in Another onw!", question: "A",answer: "あ"},
        {instruction: "Another onw! in Another onw!", question: "ア",answer: "A"},
        {instruction: "Another onw!", question: "xdxdxd",answer: "Kanji "},
        {instruction: "tAnother onw!", question: "xdxd字",answer: "second card dexck"},
    ]),
    new FlashcardDeck("A12333333", [
        {instruction: "not this doe!", question: "this is answer",answer: "A*****"},
        {instruction: "Another onw! in Another onw!", question: "A",answer: "あ"},
        {instruction: "Another onw! in Another onw!", question: "ア",answer: "A"},
        {instruction: "Another onw!", question: "xdxdxd",answer: "Kanji "},
        {instruction: "tAnother onw!", question: "xdxd字",answer: "second card dexck"},
    ]),
    ];


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
      if (this.isLogin) {
          this.authService.login(email, password);
          this.router.navigate(['tabs'], {clearHistory: true});
      }
  }

  onLogin() {
      this.flashcardService.setFlascardDesks(this.staticflashardData);
    this.router.navigate(['tabs'], {clearHistory: true});
  }

  onSwitch() {
    this.isLogin = !this.isLogin;
  }

}
