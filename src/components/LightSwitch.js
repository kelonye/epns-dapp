import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import LightIcon from '@material-ui/icons/Brightness1';
import DarkIcon from '@material-ui/icons/Brightness2';
import { useTheme } from 'contexts/theme';

export default function() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Tooltip title="Toggle light/dark theme">
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        aria-label="Toggle light/dark theme"
      >
        {isDark ? <LightIcon /> : <DarkIcon />}
      </IconButton>
    </Tooltip>
  );
}
