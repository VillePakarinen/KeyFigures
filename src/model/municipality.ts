export class Municipality {
  constructor(
    public id: string,
    public name: string,
    public code: string,
    public pxIndex: number
  ) { }

  getYear() {
    return this.code.replace(/[^0-9]/g, "");
  }
}
