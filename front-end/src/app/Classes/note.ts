export class Note {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  static parse(standaloneJsonData): Note {
    const id = standaloneJsonData['id'];
    const name = standaloneJsonData['name'];
    return new Note(id, name);
  }
}
