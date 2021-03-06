import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FlashcardSelectDeckComponent } from './flashcard/flashcard-select-deck/flashcard-select-deck.component';
import { ActionBarComponent } from './shared/ui/action-bar/action-bar.component';
import { FlashcardTabsComponent } from './flashcard/flashcard-tabs/flashcard-tabs.component';
import { FlashcardSelectDeckMenuComponent } from './flashcard/flashcard-select-deck-menu/flashcard-select-deck-menu.component';
import { FlashcardDeckSettingsComponent } from './flashcard/flashcard-deck-settings/flashcard-deck-settings.component';
import { CreateDeckTypeComponent } from './flashcard/create-deck-type/create-deck-type.component';
import { AuthComponent } from './auth/auth.component';
import { FlashcardEditDeckMenuComponent } from './flashcard/flashcard-edit-deck-menu/flashcard-edit-deck-menu.component';
import { FlashcardCardsComponent } from './flashcard/flashcard-cards/flashcard-cards.component';
import { Label } from "tns-core-modules/ui/label/label";
import { FlashcardEditDeckButtonsComponent } from './flashcard/flashcard-edit-deck-buttons/flashcard-edit-deck-buttons.component';
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { FlashcardDeckViewerComponent } from './flashcard/flashcard-deck-viewer/flashcard-deck-viewer.component';
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { DynamicModalComponent } from './shared/ui/dynamic-modal/dynamic-modal.component';
import { ForgotPasswordModalViewComponent } from './shared/ui/forgot-password-modal-view/forgot-password-modal-view.component';
import { ModalDialogService } from "nativescript-angular/modal-dialog";


// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";


@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptUISideDrawerModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        NativeScriptHttpClientModule
    ],
    declarations: [
        AppComponent,
        FlashcardSelectDeckComponent,
        ActionBarComponent,
        FlashcardTabsComponent,
        FlashcardSelectDeckMenuComponent,
        FlashcardDeckSettingsComponent,
        CreateDeckTypeComponent,
        AuthComponent,
        FlashcardEditDeckMenuComponent,
        FlashcardCardsComponent,
        FlashcardEditDeckButtonsComponent,
        FlashcardDeckViewerComponent,
        DynamicModalComponent,
        ForgotPasswordModalViewComponent,
    ],
    providers: [Label, ModalDialogService],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [
        DynamicModalComponent,
        ForgotPasswordModalViewComponent
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
