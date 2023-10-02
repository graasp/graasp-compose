import { useNavigate } from 'react-router';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box, Button, Stack, Typography } from '@mui/material';

import { useBuilderTranslation } from '@/config/i18n';
import { HOME_PATH } from '@/config/paths';

import { BUILDER } from '../langs/constants';

const FallbackComponent = (): JSX.Element => {
  const navigate = useNavigate();
  const { t: translateBuilder } = useBuilderTranslation();

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ width: 1, height: '100vh' }}
    >
      <Box sx={{ ml: 4 }}>
        <Typography variant="h1">
          {translateBuilder(BUILDER.FALLBACK_TITLE)}
        </Typography>
        <Typography>{translateBuilder(BUILDER.FALLBACK_TEXT)}</Typography>
        <Button
          sx={{ mt: 3 }}
          variant="contained"
          onClick={() => navigate(HOME_PATH)}
        >
          {translateBuilder(BUILDER.FALLBACK_BACK_TO_HOME)}
        </Button>
      </Box>
      <Box>
        <ErrorOutlineIcon style={{ fontSize: '25em', color: '#5050d2' }} />
      </Box>
    </Stack>
  );
};

export default FallbackComponent;
