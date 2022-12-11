import { Helmet } from 'react-helmet-async';

import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Box } from '@mui/material';

import {
  AppWidgetSummary,
} from '../sections/@dashboard/app';

import account from '../_mock/account';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Home | ABK </title>
      </Helmet>

      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            {/* value after */}
            <AppWidgetSummary title="Saldo" total={account.balance} color="info" icon={'mdi:cash'} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummary title="Realizar Depósito" icon={'mdi:instant-deposit'} />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummary title="Realizar Saque" color="info" icon={'uil:money-withdrawal'} />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummary title="Solicitar Empréstimo" color="warning" icon={'fluent:building-bank-toolbox-24-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummary title="Sair" color="error" icon={'fluent:arrow-exit-20-filled'} />
          </Grid>

        </Grid>
      </Container>
    </>
  );
}
