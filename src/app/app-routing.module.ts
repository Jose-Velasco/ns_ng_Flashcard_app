import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { FlashcardSelectDeckMenuComponent } from "./flashcard/flashcard-select-deck-menu/flashcard-select-deck-menu.component";
import { FlashcardTabsComponent } from "./flashcard/flashcard-tabs/flashcard-tabs.component";
import { FlashcardDeckSettingsComponent } from "./flashcard/flashcard-deck-settings/flashcard-deck-settings.component";
import { CreateDeckTypeComponent } from "./flashcard/create-deck-type/create-deck-type.component";
import { AuthComponent } from "./auth/auth.component";

const routes: Routes = [
    { path: "tabs", component: FlashcardTabsComponent, children: [
        { path: "select-Deck-Menu", component: FlashcardSelectDeckMenuComponent, outlet: 'selectDeckMenu' },
        { path: "deck-Settings", component: FlashcardDeckSettingsComponent, outlet: 'deckSettings' },
    ] },
    { path: "auth", component: AuthComponent },
    { path: "crate-deck-type", component: CreateDeckTypeComponent},
    { path: "", redirectTo: "/tabs", pathMatch: "full" },


];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
