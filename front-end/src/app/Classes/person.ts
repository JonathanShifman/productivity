export class Person {
  id: number;
  name: string;
  date: Date;

  constructor(id: number, name: string, birthday: Date) {
    this.id = id;
    this.name = name;
    this.date = birthday;
  }

  static parse(standaloneJsonData): Person {
    const id = standaloneJsonData['id'];
    const name = standaloneJsonData['name'];
    const date = new Date(standaloneJsonData['date']);
    return new Person(id, name, date);
  }
}
