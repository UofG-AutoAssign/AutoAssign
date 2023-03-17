import { render, screen } from "@testing-library/react";
import LandingButtonLink from "../components/general/LandingButtonLink";
import { MemoryRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import React from "react";

it("LandingButtonLink", () => {
  render(
    <Router>
      <LandingButtonLink
        title="HR Home Page"
        link={"/"}
        initialState="Delete Team"
        btn_color="bg-red-500"
        desc="Hello this is a placeholder text"
      />
    </Router>
  );
  const buttonTitle = screen.getByText("HR Home Page");
  const description = screen.getByText("Hello this is a placeholder text");
  expect(buttonTitle).toBeInTheDocument();
  expect(description).toBeInTheDocument();
});
