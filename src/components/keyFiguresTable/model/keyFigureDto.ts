export interface KeyFiguresDto {
  dataset: Dataset;
}

interface Dataset {
  dimension: Dimension;
  label: string;
  source: string;
  updated: string;
  value: number[];
}

interface Dimension {
  Tiedot: Tiedot;
  id: string[];
  size: number[];
  role: Role;
}

interface Role {}

interface Tiedot {
  label: string;
  category: Category;
}

interface Category {
  index: Index;
  label: Label;
}

interface Label {
  [key: string]: string;
}

interface Index {
  [key: string]: number;
}

export class KeyFigure {
  constructor(
    public id: string,
    public pxIndex: number,
    public label: string,
    public value: number
  ) {}
}
