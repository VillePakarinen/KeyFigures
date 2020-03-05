import React from "react";
import { render } from "@testing-library/react";

import ErrorBoundary from "./ErrorBoundary";

// Trick to remove error from console while running tests
const swallowError = (codeToRun: () => void) => {
  const error = console.error;
  console.error = () => {};

  codeToRun();
  console.error = error;
};

describe("Error boundary", () => {
  it("catches error and displays message", () => {
    //Setup
    const errorMsg = "Oops something went wrong";

    // Create a component that throws an error
    const LocalErrorComponent = () => {
      throw new Error("This should be catched");
    };

    //Act
    swallowError(() => {
      const wrapper = render(
        <ErrorBoundary render={<h1>{errorMsg}</h1>}>
          <LocalErrorComponent />
        </ErrorBoundary>
      );
      const errorContent = wrapper.getByText(errorMsg);

      //Expect
      expect(errorContent.textContent).toEqual(errorMsg);
    });
  });

  it("displays components without errors", () => {
    //Setup
    const errorMsg = "Oops something went wrong";
    const title = "This component should be displayed";

    // Create a component that throws an error
    const LocalComponent = () => {
      return <h1>{title}</h1>;
    };

    //Act
    const wrapper = render(
      <ErrorBoundary render={<h1>{errorMsg}</h1>}>
        <LocalComponent />
      </ErrorBoundary>
    );
    const actualContent = wrapper.queryByText(title);

    //Expect
    expect(actualContent?.textContent).toEqual(title);
  });
});
