import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ThemeSwitch from './ThemeSwitch';
import LanguageSelect from './LanguageSelect';

export default function Header() {

  const theme = useSelector(state => state.theme);

  return (
    <PageHeader $light={theme.selectedTheme === "light"}>
      <LanguageSelect />

      <Link $light={theme.selectedTheme === "light"} href="#">
        Kinoplex
      </Link>

      <ThemeSwitch />
    </PageHeader>
  );
}

const PageHeader = styled.header`
  position: sticky;
  top: 0; 
  display: flex;
  justify-content: space-between;
  align-items: center ;
  z-index: 999;
  width: 100%;
  padding: 4px 12px;
  border-bottom: ${props => props.$light ? "1px solid #D3D3D3" : "1px solid #D3D3D3"};
  background-color: ${props => props.$light ? "rgba(255,255,255, 0.5)" : "rgba(0,0,0, 0.5)"};
  backdrop-filter: blur(4px);
`;

const Link = styled.a`
  margin: 0 12px;
  text-decoration: none;
  font-family: 'Roboto', sans-serif;  /* Substitua 'sans-serif' por uma font fallback adequada se Roboto não estiver disponível */
  font-weight: 500;
  font-size: 22px;
  color: ${props => props.$light ? "#000000" : "#FFFFFF"};
  filter: ${props => props.$light ? "drop-shadow(0, 0, 0.3rem, #00000070)" : "drop-shadow(0, 0, 0.3rem, #ffffff70)"};
  cursor: pointer;
`;

