
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

  getLatestData(): EmploymentRateData | null {
    try {
      return this.employmentRateData.reduce((max, curr) => (curr.year > max.year ? curr : max))
    } catch (error) {
      console.error(error)
      return null
    }
  }
}
