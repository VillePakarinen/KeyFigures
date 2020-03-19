import axios from "axios";

import { RegionalZone } from "../model/regionalZone";
import { Municipality, MunicipalitiesDto } from "../model/municipalitiesDto";
import { KeyFigure, KeyFiguresDto } from "../model/keyFigureDto";

export class KeyFigureService {
  async getRegionalZones(): Promise<RegionalZone[]> {
    return axios
      .get<RegionalZone[]>("https://pxnet2.stat.fi/PXWeb/api/v1/fi/Kuntien_avainluvut/")
      .then(response =>
        response.data.sort((a, b) => {
          return +b.id - +a.id;
        })
      );
  }

  async getMunicipalities(regionalId: string): Promise<Municipality[]> {
    return axios
      .get<MunicipalitiesDto>(
        `https://pxnet2.stat.fi/PXWeb/api/v1/fi/Kuntien_avainluvut/${regionalId}/kuntien_avainluvut_${regionalId}_viimeisin.px`,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      )
      .then(response => {
        const municipalities = response.data.variables[0];

        if (municipalities.values.length !== municipalities.valueTexts.length) {
          throw new Error("bad respone from the server.");
        }

        return municipalities.values.map((id, index) => {
          return new Municipality(id, municipalities.valueTexts[index], municipalities.code);
        });
      });
  }

  async getMuncipalityKeyFigures(muncipality: Municipality): Promise<KeyFigure[]> {
    return axios
      .post<KeyFiguresDto>(
        `https://pxnet2.stat.fi/PXWeb/api/v1/fi/Kuntien_avainluvut/${muncipality.getYear()}/kuntien_avainluvut_${muncipality.getYear()}_viimeisin.px`,
        {
          query: [
            {
              code: muncipality.code,
              selection: {
                filter: "item",
                values: [muncipality.id]
              }
            }
          ],
          response: { format: "json-stat" }
        }
      )
      .then(response => {
        return Object.entries(response.data.dataset.dimension.Tiedot.category.label).map(
          ([key, valueText], index): KeyFigure => {
            return new KeyFigure(
              key,
              response.data.dataset.dimension.Tiedot.category.index[key],
              valueText,
              response.data.dataset.value[index]
            );
          }
        );
      });
  }
}
