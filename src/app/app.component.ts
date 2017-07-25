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

  public tenants : Tenant[];
  public formArray : FormArray;
  public count : number;
  public output : string[];
  public submitted : boolean;
  public total : number;
  public ave : number;
  public mailLink : string;
  public inkRipple : boolean;

  constructor(public snackBar: MdSnackBar) {
    this.count = 1;
    this.output = [];
    this.total = 0;
    this.ave = 0;
    this.mailLink = "";
    this.inkRipple = false;
  }

  ngOnInit() {
    this.submitted = false;
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
      if (!tenant.name ||
          isNaN(tenant.paid)) {
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

    //Increment to account for zero index
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
    this.setMailTo();
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

  setMailTo() : void {
    this.mailLink = String("mailto:?subject=Bills%20for%20the%20month%20of%20" +
      this.getMonth() + "&body=");
    this.mailLink += String("Total expenses: $" + this.total + '%0D%0A');
    this.mailLink += String("Per person cost: $" + this.ave + '%0D%0A%0D%0A');
    for (let line of this.output) {
      this.mailLink += String(line + '%0D%0A');
    }
    this.mailLink = this.mailLink.replace(/ /g, '%20');
    this.mailLink = this.mailLink.replace(/\$/g, '%24');
    console.log(this.mailLink);
    this.submitted = true;
  }

  openSnackbar() : void {
    this.snackBar.open("Copied to clipboard!", "Close", {
      duration: 2000,
    });
  }

  public githubLogoPath = "https://assets-cdn.github.com/favicon.ico";
  public githubLink = "https://github.com/ReticulatedSpline/Utilities-Balancer-3"
}
