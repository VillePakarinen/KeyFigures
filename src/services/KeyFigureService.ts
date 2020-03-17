import axios from "axios";

import { MunicipalitiesDto, Municipality } from "./../components/header/model/municipalitiesDto";
import { RegionalZone } from "./../components/header/model/regionalZone";

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
}
