import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';

export default function LoadingPage() {

    const language = useSelector(state => state.language);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
            <p style={{margin: '2px'}}>{language.messages.loading}</p>
        </Box>
    )
}