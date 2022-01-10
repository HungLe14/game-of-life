import { useEffect, useState } from "react";
import "./App.css";
import { Cell, GridDiv } from "./components/Grid/Grid";

const cols = 50;
const rows = 50;

const positions = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const createGrid = () => {
  const grid = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(Math.floor(Math.random() * 2));
    }
    grid.push(row);
  }
  return grid;
};

function App() {
  const [grid, setGrid] = useState();
  const [isRunning, setIsRunning] = useState(false);
  // console.log(grid);

  useEffect(() => {
    setGrid(createGrid());
  }, []);

  const getNeighbours = () => {
    setGrid((prevGrid) => {
      const nextGrid = prevGrid.map((row, i) => {
        return row.map((cell, j) => {
          let count = 0;
          positions.forEach((position) => {
            const x = i + position[0];
            const y = j + position[1];
            if (x >= 0 && x < rows && y >= 0 && y < cols) {
              count += prevGrid[x][y];
            }
          });
          if (count < 2 || count > 3) {
            return 0;
          }
          if (count === 3) {
            return 1;
          }
          return prevGrid[i][j];
        });
      });
      return nextGrid;
    });
  };

  const resetAll = () => {
    setGrid(createGrid());
    setIsRunning(false);
  };

  useEffect(() => {
    if (isRunning) {
      const generating = setInterval(() => {
        getNeighbours();
      }, 100);
      return () => {
        clearInterval(generating);
      };
    }
  }, [isRunning]);

  return (
    <div className="App">
      <button
        onClick={() => {
          setIsRunning(true);
        }}
      >
        Start
      </button>
      <button
        onClick={() => {
          setIsRunning(false);
        }}
      >
        Stop
      </button>
      <button onClick={resetAll}>Reset</button>
      <GridDiv cols={cols}>
        {grid &&
          grid.map((row, i) => {
            return row.map((col, k) => {
              return <Cell grid={grid} row={i} col={k}></Cell>;
            });
          })}
      </GridDiv>
    </div>
  );
}

export default App;
