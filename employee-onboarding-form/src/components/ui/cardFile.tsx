import styled from "styled-components";
interface ColorProps {
  color?: string;
  theme: {
    colors: Record<string, string>;
    fontSize: Record<string, string>;
  };
}

interface DimensionProps {
  height?: string;
  width?: string;
  bottom?: string;
  top?: string;
  right?: string;
  padding?: string;
  margin?: string;
}

interface FontProps {
  fontFamily?: string;
  fontSize?: string;
}

interface LayoutProps {
  start?: boolean;
  position?: string;
  textAlign?: string;
  overflow?: string;
  background?: string;
  justifycontent?: string;
  display?: string;
  txtalign?: string;
  cursor?: string;
  hovercolor?: string;
  bdColor?: string;
  bdcolor?: string;
  bdFontSize?: string;
}


type CardProps = ColorProps & DimensionProps;
type CardHeaderProps = CardProps & FontProps;
type CardBodyProps = CardProps & FontProps & { background?: string };
type CardHeaderButtonProps = CardProps & LayoutProps & FontProps & { button?: string };
type ModalCardProps = CardProps & LayoutProps & FontProps;
type InfoCardProps = CardProps & LayoutProps;


export const Card = styled.div<CardProps>`
  border-radius: 4px;
  overflow: scroll;
  position: relative;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  background: ${({ color, theme }) =>
    !!color ? theme.colors[color] : theme.colors.cardContent};
  padding: 10px;
  width: 100%;
  height: ${({ height }) => (height ? height : "auto")};
`;

export const CardHeader = styled.div<CardHeaderProps>`
  padding-bottom: ${({ bottom }) => (bottom ? bottom : "0")};
`;

export const CardBody = styled.div<CardBodyProps>`
  background: ${({ background, theme }) => 
    background ? theme.colors[background] : theme.colors.cardContent};
  color: ${({ theme }) => theme.colors.cardContentFont};
  
  & textarea {
    width: 100% !important;
    padding: 1rem;
  }
`;

export const CardHeaderButton = styled.div<CardHeaderButtonProps>`
  display: flex;
  justify-content: ${({ start }) => (start ? 'flex-start' : 'flex-end')};
  align-items: ${({ bottom }) => (!!bottom ? 'flex-end' : 'flex-start')};
  width: 100%;
  height: ${({ bottom }) => (!!bottom ? '100%' : 'auto')};
  margin-right: ${({ right }) => (right ? right : 0)};
  margin-top: ${({ top }) => (top ? top : 0)}; 
  padding:  ${({ padding }) => (padding ? padding : '0')};
  
  & > button  {  
    margin-right: ${({ start }) => (start ? '5px' : '0')};
    margin-left: ${({ start }) => (start ? '0' : '5px')};
  }

`;

export const ModalCard = styled(Card)<ModalCardProps>`
  height: ${({ height }) => (height ? height : "100%")};  
  margin: ${({ margin }) => (margin ? margin : 0)};
  padding: ${({ padding }) => (padding ? padding : 0)}; 

`;

export const InfoCard = styled(Card)<InfoCardProps>`
  height: ${({ height }) => (height ? height : "100%")}; 
  overflow:  ${({ overflow }) => (overflow ? overflow : "scroll")};
  background: ${({ background, theme }) => 
    (background ? theme.colors[background] : theme.colors.infoCard)};
  margin-top: ${({ top }) => (top ? top : 0)};
  position: ${({ position }) => (position ? position : "initial")};
  
  & section {
    text-align: ${({ textAlign }) => (textAlign ? textAlign : "center")};
    flex: 1;
  }
`;

export const InfoTitle = styled(Card)<CardProps & LayoutProps>` 
  border-radius: 0;  
  padding: 0.4rem 1rem;
  background: ${({ background, theme }) => 
    (background ? theme.colors[background] : theme.colors.infoCardTitle)};
  color: ${({ theme }) => theme.colors.infoCardTitleFont};
  margin-top: ${({ top }) => (top ? top : 0)};
  position: ${({ position }) => (position ? position : "center")}; 
`;

export const InfoSubTitle = styled(Card)<CardProps & LayoutProps>` 
  border-radius: 0;
  padding: 0.4rem 1rem;
  background: ${({ background, theme }) => 
    (background ? theme.colors[background] : theme.colors.infoCardSubTitle)};
  color: ${({ theme }) => theme.colors.infoCardSubTitleFont};
  margin-top: ${({ top }) => (top ? top : 0)};
  position: ${({ position }) => (position ? position : "center")}; 
  height: 100%;
`;

export const ShadowCard = styled(Card)<CardProps & LayoutProps>` 
  padding:  ${({ padding }) => (padding ? padding : '10px')};
  margin-top: ${({ top }) => (top ? top : 0)};
  background: ${({ background, theme }) => 
    (background ? theme.colors[background] : theme.colors.cardContent)}; 
  box-shadow: 0px 0px 12px 0px #888888;  
`;





