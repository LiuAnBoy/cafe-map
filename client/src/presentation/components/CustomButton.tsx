import { FC } from 'react';
import { Button } from 'antd';

import { CustomButtonProps } from '../../interface/components/CustomButton';

const CustomButton: FC<CustomButtonProps> = ({ label, ...props }) => {
  return (
    <Button size="large" {...props}>
      {label}
    </Button>
  );
};

export default CustomButton;
