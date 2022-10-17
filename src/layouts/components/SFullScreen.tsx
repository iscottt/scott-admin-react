import React, { useState, useEffect } from 'react';
import screenfull from 'screenfull';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { message } from 'antd';

const SFullScreen: React.FC = () => {
  const [fullScreen, setFullScreen] = useState<boolean>(screenfull.isFullscreen);

  useEffect(() => {
    screenfull.on('change', () => {
      if (screenfull.isFullscreen) setFullScreen(true);
      else setFullScreen(false);
      return () => screenfull.off('change', () => {});
    });
  }, []);

  const handleFullScreen = () => {
    if (!screenfull.isEnabled) message.warning('当前您的浏览器不支持全屏 ❌');
    screenfull.toggle();
  };
  return (
    <div className="cursor-pointer text-18px mr-4" onClick={handleFullScreen}>
      {fullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
    </div>
  );
};
export default SFullScreen;
