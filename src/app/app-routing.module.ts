import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { FlashcardSelectDeckMenuComponent } from "./flashcard/flashcard-select-deck-menu/flashcard-select-deck-menu.component";
import { FlashcardTabsComponent } from "./flashcard/flashcard-tabs/flashcard-tabs.component";
import { FlashcardDeckSettingsComponent } from "./flashcard/flashcard-deck-settings/flashcard-deck-settings.component";
import { CreateDeckTypeComponent } from "./flashcard/create-deck-type/create-deck-type.component";
import { AuthComponent } from "./auth/auth.component";
import { FlashcardEditDeckMenuComponent } from "./flashcard/flashcard-edit-deck-menu/flashcard-edit-deck-menu.component";
import { FlashcardCardsComponent } from "./flashcard/flashcard-cards/flashcard-cards.component";
import { FlashcardDeckViewerComponent } from "./flashcard/flashcard-deck-viewer/flashcard-deck-viewer.component";

const routes: Routes = [
    { path: "tabs", component: FlashcardTabsComponent, children: [
        { path: "select-Deck-Menu", component: FlashcardSelectDeckMenuComponent, outlet: 'selectDeckMenu' },
        { path: "deck-Settings", component: FlashcardDeckSettingsComponent, outlet: 'deckSettings' },
    ] },
    { path: "auth", component: AuthComponent },
    { path: "cards", component: FlashcardCardsComponent },
    { path: "view-flashcards/:id", component: FlashcardDeckViewerComponent },
    { path: "crate-deck-type", component: CreateDeckTypeComponent},
    { path: "edit-deck-menu/:id", component: FlashcardEditDeckMenuComponent },
    // { path: "", redirectTo: "/tabs", pathMatch: "full" },
    { path: "", redirectTo: "auth", pathMatch: "full" },


];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
