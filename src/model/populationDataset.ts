
interface PopulationData {
    year: string,
    population: number | null
}
export class PopulationDataset {
    constructor(
        public zoneId: string,
        public zoneName: string,
        public populationData: PopulationData[]
    ) { }
}
