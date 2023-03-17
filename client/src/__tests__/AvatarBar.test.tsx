import {  render, screen } from "@testing-library/react";
import AvatarBar from "../components/AvatarBar";
import '@testing-library/jest-dom';
import React from 'react';

it("AvatarBar", () => {
    render(<AvatarBar firstName="Ben" lastName="Dover"/>);
    const fullName = screen.getByText("Ben Dover")
    expect(fullName).toBeInTheDocument();
});
