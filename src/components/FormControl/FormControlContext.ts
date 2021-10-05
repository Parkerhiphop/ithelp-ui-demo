
import { createContext } from 'react';
import { Severity } from '../../system/typings';

export interface FormControlContextProps {
  disabled: boolean;
  fullWidth: boolean;
  required: boolean;
  severity?: Severity;
}

export const FormControlContext = createContext<FormControlContextProps | undefined>(undefined);
