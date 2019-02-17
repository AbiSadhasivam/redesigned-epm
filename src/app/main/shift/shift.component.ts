import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from 'src/app/employee.service';
import * as EmployeeInterface from '../../interface/employee';

@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.css']
})
export class ShiftComponent implements OnInit {
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  defaultHeaders: Array<{}>;
  tableHeader: Array<{}>;
  employee: Array<EmployeeInterface.Employee>;
  @ViewChild('datePicker') datePicker: ElementRef;

  constructor(calendar: NgbCalendar, public employeeService: EmployeeService) {
    this.fromDate = calendar.getToday();
    this.toDate = null;
    this.defaultHeaders = [{
      key: 'id',
      display: 'S.No'
    }, {
      key: 'name',
      display: 'Employee Name'
    }];
    this.tableHeader = this.updateTableHeader(this.fromDate, this.toDate);
    this.employee = this.employeeService.employee;
  }

  ngOnInit() {
    this.datePicker.nativeElement.value = this.toDateFormat(this.fromDate);
  }

  addDays(currDate, daysToBeAdded) {
    let date = new Date(currDate.valueOf());

    date.setDate(date.getDate() + daysToBeAdded);

    return date;
  }

  getDates(startDate, endDate) {
    let dates = [];
    let currentDate = startDate;

    if(!endDate) {
      dates.push(currentDate);
    } else {
      while (currentDate <= endDate) {
        dates.push(currentDate);
        currentDate = this.addDays(currentDate, 1);
      }
    }

    return dates;
  }

  updateTableHeader(fromDate: NgbDateStruct, toDate: NgbDateStruct): Array<{}> {
    let dates = this.getDates(this.getDateObj(fromDate),
      this.getDateObj(toDate));
    
    dates = dates.map(function(date) {
      let display = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
      
      return {
        key: date.toDateString(),
        display: display
      }
    });

    this.tableHeader = [];
    this.tableHeader.push.apply(this.tableHeader, this.defaultHeaders);
    this.tableHeader.push.apply(this.tableHeader, dates);

    this.employeeService.updateShiftList(dates);

    return this.tableHeader;
  }

  getDateObj(dateInfo) {
    if (!dateInfo) {
      return null;
    }
    return new Date(dateInfo.year, dateInfo.month - 1, dateInfo.day);
  }

  toDateFormat(dateInfo) {
    return dateInfo ? this.getDateObj(dateInfo).toDateString() : null;
  }

  onDateSelection(date: NgbDate) {
    let element = this.datePicker.nativeElement;

    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      element.value = this.toDateFormat(this.fromDate);
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      element.value = this.toDateFormat(this.fromDate) + ' to ' +
        this.toDateFormat(this.toDate);
    } else {
      this.toDate = null;
      this.fromDate = date;
      element.value = this.toDateFormat(this.fromDate);
    }
    
    this.updateTableHeader(this.fromDate, this.toDate);
  }

  isHovered(date: NgbDate) {
    return this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) ||
      date.equals(this.toDate) ||
      this.isInside(date) ||
      this.isHovered(date);
  }

}
