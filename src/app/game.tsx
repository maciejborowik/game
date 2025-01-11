"use client";

import React, { useState, useEffect, useCallback } from "react";
import "./globals.css";

const GRID_SIZE = 50;

type Grid = number[][];

const createGrid = (): Grid => {
  return Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => (Math.random() > 0.7 ? 1 : 0))
  );
};

const calculateNextGrid = (grid: Grid): Grid => {
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
  ];

  return grid.map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      let liveNeighbors = 0;

      directions.forEach(([dx, dy]) => {
        const newRow = rowIndex + dx;
        const newCol = colIndex + dy;

        if (
          newRow >= 0 &&
          newRow < GRID_SIZE &&
          newCol >= 0 &&
          newCol < GRID_SIZE &&
          grid[newRow][newCol] === 1
        ) {
          liveNeighbors++;
        }
      });

      if (cell === 1 && (liveNeighbors < 2 || liveNeighbors > 3)) {
        return 0;
      }
      if (cell === 0 && liveNeighbors === 3) {
        return 1;
      }
      return cell;
    })
  );
};

const Game = () => {
  const [grid, setGrid] = useState<Grid>(createGrid);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  const tick = useCallback(() => {
    setGrid((prevGrid) => calculateNextGrid(prevGrid));
  }, []);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(tick, 500);
      return () => clearInterval(interval);
    }
  }, [isRunning, tick]);

  return (
    <div className="Game">
      <h1> Lets play </h1>
      <div className="grid">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              role="gridcell"
              className={`cell ${cell ? "alive" : "dead"}`}
            ></div>
          ))
        )}
      </div>
      <div className="controls">
        <button
          className="button"
          onClick={() => setIsRunning((isRunning) => !isRunning)}
        >
          {isRunning ? "Stop" : "Start"}
        </button>
        <button className="button" onClick={() => setGrid(createGrid())}>
          Reset
        </button>
        <button className="button" onClick={tick}>
          Next Generation
        </button>
      </div>
    </div>
  );
};

export default Game;
