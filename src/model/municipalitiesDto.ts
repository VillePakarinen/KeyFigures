export interface Variable {
  code: string;
  text: string;
  values: string[];
  valueTexts: string[];
}

export interface MunicipalitiesDto {
  title: string;
  variables: Variable[];
}

export class Municipality {
  constructor(public id: string, public name: string, public code: string) {}

  getYear() {
    return this.code.replace(/[^0-9]/g, "");
  }
}
