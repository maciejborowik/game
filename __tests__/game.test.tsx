import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Game from "@/app/game";

describe("Game Component", () => {
  it("renders the Game component with a grid", () => {
    render(<Game />);
    const gridCells = screen.getAllByRole("gridcell");
    expect(gridCells.length).toBe(50 * 50);
  });

  it("toggles simulation when Start/Stop button is clicked", () => {
    render(<Game />);
    const startStopButton = screen.getByText(/Stop/i);
    fireEvent.click(startStopButton);
    expect(screen.getByText(/Start/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Start/i));
    expect(screen.getByText(/Stop/i)).toBeInTheDocument();
  });

  it("resets the grid when Reset button is clicked", () => {
    render(<Game />);
    const resetButton = screen.getByText(/Reset/i);

    const initialGrid = screen
      .getAllByRole("gridcell")
      .map((cell) => (cell.classList.contains("alive") ? 1 : 0));

    fireEvent.click(resetButton);

    const newGrid = screen
      .getAllByRole("gridcell")
      .map((cell) => (cell.classList.contains("alive") ? 1 : 0));

    expect(initialGrid).not.toEqual(newGrid);
  });

  it("advances the grid state when Next Generation button is clicked", () => {
    render(<Game />);
    const nextGenerationButton = screen.getByText(/Next Generation/i);

    const initialGrid = screen
      .getAllByRole("gridcell")
      .map((cell) => (cell.classList.contains("alive") ? 1 : 0));

    fireEvent.click(nextGenerationButton);

    const nextGrid = screen
      .getAllByRole("gridcell")
      .map((cell) => (cell.classList.contains("alive") ? 1 : 0));

    expect(initialGrid).not.toEqual(nextGrid);
  });
});
