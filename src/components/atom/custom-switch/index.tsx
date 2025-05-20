import Switch, { SwitchProps } from '@mui/material/Switch';
import { FormControlLabel, FormControlLabelProps } from '@mui/material';

interface CustomSwitchProps {
  switchProps: SwitchProps;
  controllerProps: Omit<FormControlLabelProps, 'control'>;
}

export default function CustomSwitch({ switchProps, controllerProps }: CustomSwitchProps) {
  return <FormControlLabel control={<Switch {...switchProps} />} {...controllerProps} />;
}
