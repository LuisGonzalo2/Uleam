import React from 'react';
import { FormControl, InputLabel, Select, FormHelperText } from '@material-ui/core';

const CustomSelect = ({ field, form, label, children, ...props }) => (
    <FormControl fullWidth error={form.touched[field.name] && !!form.errors[field.name]}>
        <InputLabel>{label}</InputLabel>
        <Select
            {...field}
            {...props}
            label={label}
            fullWidth
            onChange={(e) => form.setFieldValue(field.name, e.target.value)}
        >
            {children}
        </Select>
        {form.touched[field.name] && <FormHelperText>{form.errors[field.name]}</FormHelperText>}
    </FormControl>
);

export default CustomSelect;
