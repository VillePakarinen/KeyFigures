import { EmploymentRateDataset } from './../model/employmentRateDataset';
import axios from "axios";

import { RegionalZone } from "../model/regionalZone";
import { MunicipalitiesDto } from "../model/municipalitiesDto";
import { KeyFigureDto } from "../model/keyFigureDto";
import { PopulationDataset } from '../model/populationDataset';
import { MunicipalityData } from "../model/municipalityData";
import { Municipality } from "../model/municipality";
import { IntlShape } from "react-intl";

export class KeyFigureService {

  constructor(private languageService: IntlShape) { }

  async getRegionalZones(): Promise<RegionalZone[]> {
    return axios
      .get<RegionalZone[]>(`https://pxnet2.stat.fi/PXWeb/api/v1/${this.languageService.locale}/Kuntien_avainluvut/`)
      .then(response =>
        response.data.sort((a, b) => {
          return +b.id - +a.id;
        })
      );
  }

  async getMunicipalities(regionalId: string): Promise<Municipality[]> {
    return axios
      .get<MunicipalitiesDto>(
        `https://pxnet2.stat.fi/PXWeb/api/v1/${this.languageService.locale}/Kuntien_avainluvut/${regionalId}/kuntien_avainluvut_${regionalId}_viimeisin.px`,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      )
      .then(response => {
        const municipalities = response.data.variables[0];

        if (municipalities.values.length !== municipalities.valueTexts.length) {
          throw new Error("bad respone from the server.");
        }

        return municipalities.values.map((id, index) => {
          return new Municipality(
            id,
            municipalities.valueTexts[index],
            municipalities.code,
            index + 1 // This value is needed for verti graphics
          );
        });
      });
  }


  async getPopulation(municipality: Municipality) {
    return axios.post<KeyFigureDto>(`https://pxnet2.stat.fi:443/PXWeb/api/v1/${this.languageService.locale}/Kuntien_avainluvut/2020/kuntien_avainluvut_2020_aikasarja.px`,
      {
        query: [
          {
            code: "Alue 2020",
            selection: {
              filter: "item",
              values: [
                municipality.id
              ]
            }
          },
          {
            code: "Tiedot",
            selection: {
              filter: "item",
              values: [
                "M411" // Key for population
              ]
            }
          }
        ],
        response: {
          format: "json-stat"
        }
      })
      .then(response => {
        const populationData = Object.keys(response.data.dataset.dimension.Vuosi.category.index).map((year, index) => {
          return {
            year,
            population: response.data.dataset.value[index]
          }
        })
        return new PopulationDataset(municipality.id, municipality.name, populationData)
      })
  }

  async getEmploymentRate(municipality: Municipality) {
    return axios.post<KeyFigureDto>(`https://pxnet2.stat.fi:443/PXWeb/api/v1/${this.languageService.locale}/Kuntien_avainluvut/2020/kuntien_avainluvut_2020_aikasarja.px`, {
      query: [
        {
          code: "Alue 2020",
          selection: {
            filter: "item",
            values: [
              municipality.id
            ]
          }
        },
        {
          code: "Tiedot",
          selection: {
            filter: "item",
            values: [
              "M140" // Key for employmentrate
            ]
          }
        }
      ],
      response: {
        format: "json-stat"
      }
    })
      .then(response => {
        const employmentRateData = Object.keys(response.data.dataset.dimension.Vuosi.category.index).map((year, index) => {
          return {
            year,
            employmentRate: response.data.dataset.value[index]
          }
        })
          .filter(emplData => emplData.employmentRate !== null)
        return new EmploymentRateDataset(municipality.id, municipality.name, employmentRateData)
      })
  }

  async getMunicipalityData(municipality?: Municipality): Promise<MunicipalityData> {
    if (municipality === undefined) {
      return Promise.reject("Municipality not defined")
    }
    return axios.all<any>([this.getPopulation(municipality), this.getEmploymentRate(municipality)])
      .then(axios.spread((population, employmentRate) => {
        return {
          population: population,
          employmentRate: employmentRate
        }
      }))
  }
}
