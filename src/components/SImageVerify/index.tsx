import React, { useEffect } from 'react';
import useImageVerify from '@/hooks/useImageVerify';

interface ImageVerifyProps {
  codeChange: (code: string) => void;
}

const SImageVerify: React.FC<ImageVerifyProps> = ({ codeChange }) => {
  const [domRef, imgCode, getImgCode] = useImageVerify();
  useEffect(() => {
    // 把code传递给父组件
    codeChange(imgCode as unknown as string);
  }, [imgCode]);
  return <canvas ref={domRef as any} width="120" height="40" className="cursor-pointer" onClick={getImgCode as any}></canvas>;
};
export default SImageVerify;
