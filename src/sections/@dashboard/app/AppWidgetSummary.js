// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function AppWidgetSummary({ title, icon, total = 'default', color = 'primary', sx, ...other }) {
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: total === 'default' ? 'center' : 'left',
        pl: total !== 'default' && 5,
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      { total === 'default' ? (
        <>        
          <StyledIcon
            sx={{
              color: (theme) => theme.palette[color].dark,
              backgroundImage: (theme) =>
                `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
                  theme.palette[color].dark,
                  0.24
                )} 100%)`,
            }}
          >
            <Iconify icon={icon} width={35} height={35} />
          </StyledIcon>
    
          <Typography variant="h4" sx={{ opacity: 0.72 }}>
            {title}
          </Typography>
        </>
      ) : (
        <>
          <Typography component="h2" variant="subtitle1" sx={{ mb: 1 }}>
            {title}
          </Typography>
          <Typography component="h1" variant="h3" sx={{ opacity: 0.72 }}>
            {fCurrency(total)}
          </Typography>
        </>
      )}

    </Card>
  );
}
