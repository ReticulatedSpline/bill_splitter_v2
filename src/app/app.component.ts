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
  private formArray : FormArray;
  private count : number;
  private output : string;

  ngOnInit() {
    this.count = 1;
    this.output = '';

    this.tenants = [new Tenant(), new Tenant()];
  }

  addTenant() : void {
    this.tenants.push(new Tenant());
    ++this.count;
  }

  removeTenant() : void {
    this.tenants.splice(this.count, 1);
    --this.count;
  }

  valid() : boolean {
    for (let tenant of this.tenants) {
      if (!tenant.name || !tenant.paid) {
        return false;
      }
    }
    return true;
  }

  submit() : void {

    let total: number = 0;
    //hold payment amounts
    let temp: number = 0;

    //numbers only please.
    for (let tenant of this.tenants) {
      tenant.paid = Number(tenant.paid);
    }

    //find total
    for (let tenant of this.tenants) {
      total += tenant.paid;
    }

    //+1 cus zero indexed
    let ave: number = total/(this.count + 1);
    console.log("Count: " + this.count);
    console.log("Total: " + total);
    console.log("Average: " + ave);
    this.output += "The total utilities cost was $" + total +
    " and the cost per tenant was $" + ave;
    //calculate payment deviations from average
    for (let tenant of this.tenants) {
      tenant.dev = tenant.paid - ave;
    }
    //while deviations still remain
    while (this.getMaxDev().dev !== 0 &&
           this.getMinDev().dev !== 0) {
      console.log("While Looped!");
      //max dev overpaid most
      //if this tenant overpaid more than the compared tenant underpaid
      if (this.getMaxDev().dev > Math.abs(this.getMinDev().dev)) {
        //underpaying tenant pays up to average cost
        temp = this.getMinDev().dev
      }
      //else they pay as much as overpaid tenant overpaid
      else temp = Math.abs(this.getMaxDev().dev)
      console.log(temp);
      this.output += this.getMinDev().name + " should pay "
                  + this.getMaxDev().name + " $" + temp + "\n";

      this.getMaxDev().paid = this.getMaxDev().paid - temp;
      this.getMinDev().paid = this.getMinDev().paid - temp;
    }
  }

  getMaxDev() : Tenant {
    let max = Number.MIN_VALUE;
    let maxTenant = this.tenants[0];
    for (let tenant of this.tenants) {
      if (tenant.dev > max) {
        max = tenant.dev;
        maxTenant = tenant;
      }
    }
    return maxTenant;
  }

  getMinDev() : Tenant {
    let min = Number.MAX_VALUE;
    let minTenant = this.tenants[0];
    for (let tenant of this.tenants) {
      if (tenant.dev < min) {
        min = tenant.dev;
        minTenant = tenant;
      }
    }
    return minTenant;
  }
}
