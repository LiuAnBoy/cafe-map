import { FC } from 'react';
import { Select } from 'antd';

import {
  CustomSelectProps,
  CustomSelectOptionProps,
} from '../../interface/components/CustomSelect';

const { Option } = Select;

const CustomSelect: FC<CustomSelectProps> = ({ options, ...props }) => {
  return (
    <Select defaultValue={options[0].value} size="large" {...props}>
      {options.map((option: CustomSelectOptionProps) => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
};

export default CustomSelect;
