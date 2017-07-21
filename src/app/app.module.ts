import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
//for Angular material UI
import { NoopAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule,
         ReactiveFormsModule } from '@angular/forms';
import { MdButtonModule,
         MdCheckboxModule,
         MdInputModule,
         MdSnackBarModule,
         MdCardModule,
         MdTooltipModule} from '@angular/material';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    //Forms
    FormsModule,
    ReactiveFormsModule,
    //Material
    MdButtonModule,
    MdInputModule,
    MdCardModule,
    MdSnackBarModule,
    MdTooltipModule,
    //Clipboard
    ClipboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
//
