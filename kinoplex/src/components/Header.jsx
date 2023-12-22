import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ThemeSwitch from './ThemeSwitch';
import LanguageSelect from './LanguageSelect';

export default function Header() {

  const themeStore = useSelector(state => state.theme);

  return (
    <PageHeader $light={themeStore.selectedTheme === "light"}>
      <LanguageSelect />

      <Logo $light={themeStore.selectedTheme === "light"} href="#">
        Kinoplex
      </Logo>

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
  border-bottom: ${props => props.$light ? "1px solid rgba(211,211,211, 0.96)": "1px solid rgba(211,211,211, 0.24)"};
  background-color: ${props => props.$light ? "rgba(255,255,255, 0.5)" : "rgba(0,0,0, 0.5)"};
  backdrop-filter: blur(4px);
`;

const Logo = styled.a`
  margin: 0 12px;
  text-decoration: none;
  font-family: 'Roboto', sans-serif;  /* Substitua 'sans-serif' por uma font fallback adequada se Roboto não estiver disponível */
  font-weight: 500;
  font-size: 22px;
  color: #ff8305;
  filter: ${props => props.$light ? "drop-shadow(0, 0, 0.3rem, #00000070)" : "drop-shadow(0, 0, 0.3rem, #ffffff70)"};
  cursor: pointer;
`;

