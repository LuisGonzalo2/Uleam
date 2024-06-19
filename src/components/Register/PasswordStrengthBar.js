import React from 'react';
import { LinearProgress, Box, Typography } from '@material-ui/core';

const PasswordStrengthBar = ({ score, label, color }) => (
    <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
            <LinearProgress variant="determinate" value={score} style={{ backgroundColor: color }} />
        </Box>
        <Box minWidth={35}>
            <Typography variant="body2" color="textSecondary">{label}</Typography>
        </Box>
    </Box>
);

export default PasswordStrengthBar;
