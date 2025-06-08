import { ConfigProvider, theme } from 'antd';
import rus from 'antd/locale/ru_Ru';
import dayjs from 'dayjs';
import { ReactNode } from 'react';

dayjs.locale('ru');
export const AntProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ConfigProvider
      locale={rus}
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorBgLayout: '#141414',
          colorBgSolid: '#fff',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
