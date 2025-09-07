import styled from "styled-components";

interface FlexProps {
  row?: boolean;
  md?: number;
  xs?: number;
  sm?: number;
  theme?: {
    grid: number;
    layout: {
      xs: string;
      sm: string;
    };
  };
  justifycenter?: boolean;
  padding?: string;
}

// Default theme values
const defaultTheme = {
  grid: 12,
  layout: {
    xs: "576px",
    sm: "768px"
  }
};

export const Flex = styled.div<FlexProps>((props) => {
  const { 
    row, 
    md, 
    xs, 
    sm, 
    theme = defaultTheme, 
    justifycenter, 
    padding 
  } = props;
  
  const gridRatioMD = (md || sm || xs || theme.grid) / theme.grid;
  const gridRatioSM = (sm || xs || theme.grid) / theme.grid;
  const gridRatioXS = (xs || theme.grid) / theme.grid;
  
  return row
    ? `
      display: flex;
      box-sizing: border-box;
      flex-wrap: wrap;
      width: 100%;
      flex-direction: row;
      ${justifycenter ? 'justify-content: center;' : ''}
    `
    : `
      padding: ${padding ? padding : "10px"};
      box-sizing: border-box;
      flex-basis: ${gridRatioMD * 100}%;
      width: ${gridRatioMD * 100}%;
  
 
    `;
});