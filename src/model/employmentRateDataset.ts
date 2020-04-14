
export interface EmploymentRateData {
  year: string,
  employmentRate: number | null
}
export class EmploymentRateDataset {
  constructor(
    public zoneId: string,
    public zoneName: string,
    public employmentRateData: EmploymentRateData[]
  ) { }
}
