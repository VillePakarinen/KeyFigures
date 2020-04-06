import React, { useState } from "react";
import { useIntl } from "react-intl";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles, Theme, createStyles, NativeSelect, Button } from "@material-ui/core";

import { Municipality } from "../../model/municipalitiesDto";
import Wrapper from "../wrapper/Wrapper";

interface Props {
  municipalities: Municipality[];
  isLoading: boolean;
  onSubmit: (primaryMunicipality?: Municipality, secondaryMunicipality?: Municipality) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    formControlContainer: {
      flexDirection: "column",
      margin: "16px 24px",
    },
    formInputContainer: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "baseline",
      margin: "8px 0",
    },
    formLabel: {
      minWidth: 200,
      textAlign: "start",
    },
    formControl: {
      margin: theme.spacing(1),
      display: "flex",
      minWidth: 300,
      flexGrow: 1,
    },
  })
);

const FormHeader: React.FC<Props> = ({ municipalities, onSubmit, isLoading }) => {
  const classes = useStyles();
  const intl = useIntl();

  const [primaryMunicipality, setPrimaryMunicipality] = useState<Municipality>();
  const [secondaryMunicipality, setSecondaryMunicipality] = useState<Municipality>();

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(primaryMunicipality, secondaryMunicipality);
  };

  return (
    <section className={classes.root}>
      <form onSubmit={formSubmitHandler}>
        <Wrapper>
          <div className={classes.formInputContainer}>
            <label className={classes.formLabel} id="primaySelectLabel" htmlFor="primaryZoneSelect">
              Valitse ensisijainen kunta
            </label>
            <FormControl className={classes.formControl}>
              <NativeSelect
                name="primaryMunicipality"
                id="primaryMunicipality"
                value={primaryMunicipality ? primaryMunicipality.id : ""}
                onChange={(event) => {
                  setPrimaryMunicipality(
                    municipalities.find((municipality) => municipality.id === event.target.value)
                  );
                }}
              >
                <option value="" disabled>
                  {intl.formatMessage({
                    id: "primary-region",
                    defaultMessage: "Ensisijainen alue",
                  })}
                </option>
                {municipalities.map((municipality) => {
                  return (
                    <option
                      key={municipality.id}
                      value={municipality.id}
                      disabled={municipality.id === secondaryMunicipality?.id}
                    >
                      {municipality.name}
                    </option>
                  );
                })}
              </NativeSelect>
            </FormControl>
          </div>
          <div className={classes.formInputContainer}>
            <label
              className={classes.formLabel}
              id="secondary-select-label"
              htmlFor="secondary-zone-select"
            >
              Valitse vertailtava kunta
            </label>
            <FormControl className={classes.formControl}>
              <NativeSelect
                id="secondary-zone-select"
                name="secondary-municipality"
                onChange={(event) => {
                  setSecondaryMunicipality(
                    municipalities.find((municipality) => municipality.id === event.target.value)
                  );
                }}
                value={secondaryMunicipality ? secondaryMunicipality.id : ""}
              >
                <option value="" disabled>
                  {intl.formatMessage({
                    id: "secondary-region",
                    defaultMessage: "Valitse vertailtava alue",
                  })}
                </option>
                {municipalities.map((municipality) => {
                  return (
                    <option
                      key={municipality.id}
                      value={municipality.id}
                      disabled={municipality.id === primaryMunicipality?.id}
                    >
                      {municipality.name}
                    </option>
                  );
                })}
              </NativeSelect>
            </FormControl>
          </div>
          <div style={{ alignSelf: "start", display: "flex" }}>
            <Button
              disabled={isLoading}
              size="large"
              type="submit"
              variant="contained"
              color="primary"
              style={{ borderRadius: "24px" }}
            >
              Näytä kunnan luvut
            </Button>
          </div>
        </Wrapper>
      </form>
    </section>
  );
};

export default React.memo(FormHeader);
