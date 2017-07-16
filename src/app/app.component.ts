import { Component,
         OnInit } from '@angular/core';
import { FormsModule,
         ReactiveFormsModule,
         FormControl,
         FormArray,
         Validators } from '@angular/forms';
import {MdButtonModule,
        MdCheckboxModule,
        MdInputModule,
        MdCardModule } from '@angular/material';
import {Tenant} from './tenant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //list of all tenants
  private tenants : Tenant[];
  private count : number;

  ngOnInit() {
    this.count = 1;
    this.tenants = [new Tenant(), new Tenant()];
    console.log(this.tenants);
  }

  addTenant() {
    this.tenants.push(new Tenant());
    ++this.count;
  }

  removeTenant() {
    this.tenants.splice(this.count, 1);
    --this.count;
  }

  onKeyUp() {
    console.log(JSON.stringify(this.tenants));
  }

}
