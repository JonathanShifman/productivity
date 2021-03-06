export class FinancialEvent {
  id: number;
  name: string;
  date: Date;
  sum: number;
  currency: string;

  constructor(id: number, name: string, date: Date, sum: number, currency: string) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.sum = sum;
    this.currency = currency;
  }

  static parse(standaloneJsonData): FinancialEvent {
    const id = standaloneJsonData['id'];
    const name = standaloneJsonData['name'];
    const date = new Date(standaloneJsonData['date']);
    const sum = standaloneJsonData['sum'];
    const currency = standaloneJsonData['currency'];
    return new FinancialEvent(id, name, date, sum, currency);
  }

  getCalendarFormatEvent() {
    return {
      id: this.id,
      title: this.name,
      start: this.date,
      allDay: true
    };
  }
}
