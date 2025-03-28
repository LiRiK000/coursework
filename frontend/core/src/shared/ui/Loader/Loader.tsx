import { Spin } from 'antd';
import { FC } from 'react';

interface LoaderProps {
  fullscreen?: boolean;
  text?: string;
}

export const Loader: FC<LoaderProps> = (props) => {
  return <Spin fullscreen={props.fullscreen}>{props.text}</Spin>;
};
