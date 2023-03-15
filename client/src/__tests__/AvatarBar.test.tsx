import {  render, screen } from "@testing-library/react";
import AvatarBar from "../components/AvatarBar";
import React from 'react';

it("AvatarBar", () => {
    render(<AvatarBar firstName="Ben" lastName="Dover"/>);
    const firstName = screen.getByText("Ben")
    const lastName = screen.getByText("Dover")
    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
});
