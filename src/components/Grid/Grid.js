import styled from "styled-components";

export const GridDiv = styled.div`
  margin: 40px auto;
  padding: 0;
  width: ${(props) => props.cols * 50}px;
  height: ${(props) => props.cols * 50}px;;
  display: grid;
  grid-template-columns: repeat(${(props) => props.cols}, 50px);
  }
`;

export const Cell = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid black;
  background-color: ${(props) =>
    props.grid[props.row][props.col] ? "black" : "white"};
`;
