import { EmploymentRateDataset } from './employmentRateDataset';
import { PopulationDataset } from "./populationDataset";

export interface MunicipalityData {
    population: PopulationDataset;
    employmentRate: EmploymentRateDataset;
}