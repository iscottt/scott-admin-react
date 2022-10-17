import React, { useState, useEffect, useRef } from 'react';
import useImageVerify from '@/hooks/useImageVerify';

interface ImageVerifyProps {
  code: string;
  codeChange: (code: string) => void;
}

const component: React.FC<ImageVerifyProps> = ({ code, codeChange }) => {
  const [domRef, imgCode, setImgCode, getImgCode] = useImageVerify();
  useEffect(() => {
    codeChange(imgCode as unknown as string);
  }, [imgCode]);
  return (
    <div>
      <canvas ref={domRef as any} width="120" height="40" className="cursor-pointer" onClick={getImgCode as any}></canvas>
    </div>
  );
};
export default component;
