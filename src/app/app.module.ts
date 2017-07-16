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
         MdCardModule, } from '@angular/material';

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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
//
