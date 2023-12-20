import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function HomePage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useSelector(state => state.theme);
    const language = useSelector(state => state.language);

    return (
        <div>
            <div>{theme.selectedTheme}</div>
            <div>{language.selectedLanguage}</div>
        </div>
    );
}