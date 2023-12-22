import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styledComponent from 'styled-components';
import { styled } from '@mui/material/styles';

import { useDispatch, useSelector } from 'react-redux';
import { selectLanguage } from '../store/features/languageSlice';


export default function LanguageSelect() {
  const dispatch = useDispatch();
  const themeStore = useSelector(state => state.theme);
  const languageStore = useSelector(state => state.language);

  const handleChange = (event) => {
    dispatch(selectLanguage(event.target.value))
  };

  const StyledSelect = styled(Select)(() => ({
    '& .MuiSelect-select': {
      padding: "2px 6px",
      backgroundColor: "#FFFFFF"
    }
  }));

  const StyledMenuItem = styled(MenuItem)(() => ({
    backgroundColor: "#FFFFFF",
  }));

  return (
    <FormControl sx={{ m: 1 }} >
      <StyledSelect
        value={languageStore.selectedLanguage}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        sx={{
            "& .MuiSvgIcon-root": {
              color: "#000000"
            }
        }}
        MenuProps={{
          sx: {
            "&& .Mui-selected": {
              backgroundColor: "#FFFFFF"
            }
          }
        }}
        variant='outlined'
      >
        <StyledMenuItem value={"pt-BR"}>
          <SelectText $light={themeStore.selectedTheme === "light"}>
            {languageStore.labels.portuguese}
          </SelectText>
        </StyledMenuItem>

        <StyledMenuItem value={"en-US"}>
          <SelectText $light={themeStore.selectedTheme === "light"}>
            {languageStore.labels.english}
          </SelectText>
        </StyledMenuItem>

      </StyledSelect>
    </FormControl>
  );
}

const SelectText =  styledComponent.span`
  color: #000000;
  font-size: 12px;
  font-weight: 600;
`;
