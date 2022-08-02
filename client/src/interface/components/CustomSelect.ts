import { SelectProps } from 'antd';

export interface CustomSelectOptionProps {
  value: string;
  label: string;
}

export interface CustomSelectProps extends SelectProps {
  options: CustomSelectOptionProps[];
}
