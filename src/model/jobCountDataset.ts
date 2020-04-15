
export interface JobCountData {
    year: string,
    jobCount: number | null
}
export class JobCountDataset {
    constructor(
        public zoneId: string,
        public zoneName: string,
        public jobCountData: JobCountData[]
    ) { }

    getLatestData(): JobCountData | null {
        try {
            return this.jobCountData.reduce((max, curr) => (curr.year > max.year ? curr : max))
        } catch (error) {
            console.error(error)
            return null
        }
    }
}
