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
