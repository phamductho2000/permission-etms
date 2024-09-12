import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const CustomFooter: React.FC = () => {
  return (
    <footer
      style={{
          position: 'fixed',
          bottom: 0,
          textAlign: 'center',
          backgroundColor: '#001529',
          color: '#f1f1f1',
          fontWeight: 600,
          width: '100%',
          padding: 10
      }}
    >
        <div>© Hệ thống Kho cơ sở dữ liệu</div>
    </footer>
  );
};

export default CustomFooter;
