import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';


const CustomTextField = ({ field, form, label, startAdornment, endAdornment, type, showPassword, handleClickShowPassword, handleMouseDownPassword, ...props }) => (
    <TextField
        {...field}
        {...props}
        type={type}
        label={label}
        fullWidth
        error={form.touched[field.name] && !!form.errors[field.name]}
        helperText={form.touched[field.name] && form.errors[field.name]}
        InputProps={{
            startAdornment: startAdornment && (
                <InputAdornment position="start">
                    {startAdornment}
                </InputAdornment>
            ),
            endAdornment: endAdornment && (
                <InputAdornment position="end">
                    {endAdornment}
                </InputAdornment>
            )
        }}
    />
);

export default CustomTextField;
