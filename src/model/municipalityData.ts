import { EmploymentRateDataset } from './employmentRateDataset';
import { PopulationDataset } from "./populationDataset";
import { JobCountDataset } from './jobCountDataset';

export interface MunicipalityData {
    population: PopulationDataset;
    employmentRate: EmploymentRateDataset;
    jobCount: JobCountDataset
}