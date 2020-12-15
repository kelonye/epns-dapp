import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import {
  ThemeProvider as MuiThemeProvider,
  makeStyles,
} from '@material-ui/core/styles';
import { CssBaseline, Paper } from '@material-ui/core';
import { createHashHistory } from 'history';
import { useTheme, useMuiTheme } from 'contexts/theme';

import Header from 'components/Header';
import SubHeader from 'components/SubHeader';

import Channels from './Channels';
import CreateChannel from './CreateChannel';
import Feedbox from './Feedbox';

const history = createHashHistory();

const useStyles = makeStyles(theme => ({
  container: {
    width: '960px',
    margin: '0 auto',
    padding: '140px 0 30px',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      padding: '130px 0 10px',
      width: 'auto',
    },
  },
  content: {
    margin: '20px 15px',
    [theme.breakpoints.down('sm')]: {
      margin: '20px 5px',
    },
  },
  footer: {
    padding: '20px 0 20px',
    fontSize: 10,
  },
}));

export default function App() {
  const classes = useStyles();
  const { isDark } = useTheme();
  const muiTheme = useMuiTheme();

  React.useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains(isDark ? 'light' : 'dark')) {
      root.classList.remove(isDark ? 'light' : 'dark');
      root.classList.add(isDark ? 'dark' : 'light');
    }
  }, [isDark]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Router {...{ history }}>
        <div className={classes.container}>
          <Header />
          <SubHeader />
          <Paper className={classes.content}>
            <Switch>
              <Route path={'/:create-channel'} component={CreateChannel} />
              <Route path={'/:feedbox'} component={Feedbox} />
              <Route path={'/'} component={Channels} />
            </Switch>
          </Paper>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}
