
interface Index {
    [key: string]: number;
}

interface Label {
    [key: string]: string;
}

interface Category {
    index: Index;
    label: Label;
}

interface Tiedot {
    label: string;
}

interface Index3 {

}

interface Label3 {

}

interface Category3 {
    index: Index3;
    label: Label3;
}

interface Year {
    label: string;
    category: Category3;
}

interface Role {
    time: string[];
}

interface Dimension {
    Tiedot: Tiedot;
    Vuosi: Year;
    id: string[];
    size: number[];
    role: Role;
}

interface Dataset {
    dimension: Dimension;
    label: string;
    source: string;
    updated: Date;
    value: number[];
}

export interface PopulationDto {
    dataset: Dataset;
}

interface PopulationData {
    year: string,
    population: number
}
export class PopulationDataset {
    constructor(
        public zoneId: string,
        public zoneName: string,
        public populationData: PopulationData[]
    ) {

    }
}


