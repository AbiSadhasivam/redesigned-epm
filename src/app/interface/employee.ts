interface Shift {
  date: String,
  count: number
}

export interface Employee {
  id: number,
  name: string,
  shiftList: Array<Shift>
}