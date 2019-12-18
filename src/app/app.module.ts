import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import { FlashcardSelectDeckComponent } from './flashcard/flashcard-select-deck/flashcard-select-deck.component';
import { ActionBarComponent } from './shared/ui/action-bar/action-bar.component';
import { FlashcardTabsComponent } from './flashcard/flashcard-tabs/flashcard-tabs.component';
import { FlashcardSelectDeckMenuComponent } from './flashcard/flashcard-select-deck-menu/flashcard-select-deck-menu.component';
import { FlashcardDeckSettingsComponent } from './flashcard/flashcard-deck-settings/flashcard-deck-settings.component';
import { CreateDeckTypeComponent } from './flashcard/create-deck-type/create-deck-type.component';
import { AuthComponent } from './auth/auth.component';

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptUISideDrawerModule,
    ],
    declarations: [
        AppComponent,
        ItemsComponent,
        ItemDetailComponent,
        FlashcardSelectDeckComponent,
        ActionBarComponent,
        FlashcardTabsComponent,
        FlashcardSelectDeckMenuComponent,
        FlashcardDeckSettingsComponent,
        CreateDeckTypeComponent,
        AuthComponent,
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
