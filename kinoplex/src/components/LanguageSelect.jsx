import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styledComponent from 'styled-components';
import { styled } from '@mui/material/styles';

import { useDispatch, useSelector } from 'react-redux';
import { selectLanguage } from '../store/features/languageSlice';


export default function LanguageSelect() {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme);
  const language = useSelector(state => state.language);

  const handleChange = (event) => {
    dispatch(selectLanguage(event.target.value))
  };

  const StyledSelect = styled(Select)(() => ({
    '& .MuiSelect-select': {
      padding: "2px 6px",
    },
    '& .MuiSelect-outlined':{
      color: theme.selectedTheme === "light"? "#FFFFFF" : "#000000"
    }
  }));

  const StyledMenuItem = styled(MenuItem)(() => ({
    backgroundColor: theme.selectedTheme === "light"? "#FFFFFF" : "#000000",
  }));

  return (
    <FormControl sx={{ m: 1 }} >
      <StyledSelect
        value={language.selectedLanguage}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        sx={{
            "& .MuiSvgIcon-root": {
              color: theme.selectedTheme === "light"? "#000000" : "#FFFFFF"
            },
            "& .MuiSelect-outlined":{
              color: theme.selectedTheme === "light"? "#FFFFFF" : "#000000"
            }
        }}
        variant='outlined'
      >
        <StyledMenuItem value={"pt-BR"}>
          <SelectText $light={theme.selectedTheme === "light"}>
            {language.labels.portuguese}
          </SelectText>
        </StyledMenuItem>

        <StyledMenuItem value={"en-US"}>
          <SelectText $light={theme.selectedTheme === "light"}>
            {language.labels.english}
          </SelectText>
        </StyledMenuItem>

      </StyledSelect>
    </FormControl>
  );
}

const SelectText =  styledComponent.span`
  color: ${props => props.$light ? "#000000 !important" : "#FFFFFF !important"};
  font-size: 12px;
  font-weight: 600;
`;
