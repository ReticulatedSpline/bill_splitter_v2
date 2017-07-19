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
        MdSnackBar,
        MdCardModule } from '@angular/material';
import {Tenant} from './tenant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private tenants : Tenant[];
  private formArray : FormArray;
  private count : number;
  private output : string[];
  private submitted : boolean;
  private total : number;
  private ave : number;
  private mailLink : string;

  constructor(public snackBar: MdSnackBar) {
    this.count = 1;
    this.output = [];
    this.total = 0;
    this.ave = 0;
    this.submitted = false;
    this.mailLink = "";
  }

  ngOnInit() {
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
    let temp = 0;
    //numbers only please.
    for (let tenant of this.tenants) {
      tenant.paid = Number(tenant.paid);
    }

    //find total
    for (let tenant of this.tenants) {
      this.total += tenant.paid;
    }

    //+1 cus zero indexed
    this.ave = this.total/(this.count + 1);
    //calculate payment deviations from average
    this.findDevs();
    //while deviations still remain
    let index = 0;
    while (this.getMaxDev().dev !== 0 &&
           this.getMinDev().dev !== 0) {;
      //max dev overpaid most
      //if this tenant overpaid more than the compared tenant underpaid
      if (this.getMaxDev().dev > Math.abs(this.getMinDev().dev)) {
        //underpaying tenant pays up to average cost
        temp =this.getMinDev().dev;
      }
      //else they pay as much as overpaid tenant overpaid
      else temp = this.getMaxDev().dev;
      this.output.push(this.getMinDev().name + " should pay "
                  + this.getMaxDev().name + " $" + Math.abs(temp).toFixed(2) + ' ');

      this.getMaxDev().paid = this.getMaxDev().paid - Math.abs(temp);
      this.getMinDev().paid = this.getMinDev().paid + Math.abs(temp);
      this.findDevs();
    }

    this.ave.toFixed(2);
    this.total.toFixed(2);
    this.mailLink = String("mailto:?subject=Bills%20for%20the%20month%20of%20" +
      this.getMonth() + "&amp;body=");
    for (let line of this.output) {
      this.mailLink += String(line + '%0D%0A');
    }
    this.mailLink = this.mailLink.replace(/ /g, '%20');
    this.mailLink = this.mailLink.replace(/\$/g, '%24');
      this.mailLink = this.mailLink.replace(/\./g, '&#46');
    console.log(this.mailLink);
    this.submitted = true;
  }

  findDevs() : void {
    for (let tenant of this.tenants) {
      tenant.dev = tenant.paid - this.ave;
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

  getMonth() : string {
    var d = new Date();
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    //TODO: Deal with negative outcomes
    var n = month[d.getMonth() - 2];
    return n;
  }

  openSnackbar() {
    this.snackBar.open("Copied to clipboard!", "Close", {
      duration: 2000,
    });
  }
}
