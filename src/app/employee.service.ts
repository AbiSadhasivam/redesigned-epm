import { Injectable } from '@angular/core';
import * as EmployeeInterface from './interface/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employee: Array<EmployeeInterface.Employee>;

  constructor() {
    this.employee = [{
      id: 0,
      name: 'Suganth',
      shiftList: []
    }, {
      id: 1,
      name: 'Suriya',
      shiftList: []
    }];
  }

  updateShiftList(dateList) {
    this.employee.forEach((employee) => {
      let tempArray = [];
      dateList.forEach((date) =>{
        //Get the details from database and update shiftcount based on the existing data
        let shiftCount = employee.shiftList.reduce((acc, currShift) => {
          if(currShift.date === date.key) {
            return currShift.count;
          }

          return 0;
        }, 0);
  
        tempArray.push({
          date: date.key,
          count: shiftCount
        });
      });

      employee.shiftList = tempArray;
    });


    return this.employee;
  }
}
