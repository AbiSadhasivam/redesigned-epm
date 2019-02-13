import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.css']
})
export class ShiftComponent implements OnInit {
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  @ViewChild('datePicker') datePicker: ElementRef;

  constructor(calendar: NgbCalendar) {
    this.fromDate = calendar.getToday();
    this.toDate = null;
  }

  ngOnInit() {
    this.datePicker.nativeElement.value = this.toDateFormat(this.fromDate);
  }

  toDateFormat(dateInfo) {
    let retVal = new Date(dateInfo.year, dateInfo.month - 1, dateInfo.day);
    
    return retVal.toDateString();
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
    console.log(this.fromDate, this.toDate);
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
