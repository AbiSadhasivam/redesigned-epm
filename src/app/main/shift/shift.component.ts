import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.css']
})
export class ShiftComponent implements OnInit {
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  tableHeader: Array<String>;
  @ViewChild('datePicker') datePicker: ElementRef;

  constructor(calendar: NgbCalendar) {
    this.fromDate = calendar.getToday();
    this.toDate = null;
    this.tableHeader = ['S.No', 'Employee Name'];
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

  updateTableHeader(fromDate: NgbDateStruct, toDate: NgbDateStruct) {
    let dates = this.getDates(this.getDateObj(fromDate),
      this.getDateObj(toDate));
    
    dates.forEach(function(date) {
      console.log(date);
    });
  }

  getDateObj(dateInfo) {
    if (!dateInfo) {
      return null;
    }
    return new Date(dateInfo.year, dateInfo.month - 1, dateInfo.day);
  }

  toDateFormat(dateInfo) {
    return this.getDateObj(dateInfo).toDateString();
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
