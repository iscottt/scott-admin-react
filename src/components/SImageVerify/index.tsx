import React, { useEffect, useImperativeHandle } from 'react';
import useImageVerify from '@/hooks/useImageVerify';

interface ImageVerifyProps {
  codeChange: (code: string) => void;
}

const SImageVerify = (props: ImageVerifyProps, ref: React.Ref<unknown> | undefined) => {
  const [domRef, imgCode, getImgCode] = useImageVerify();
  useEffect(() => {
    // 把code传递给父组件
    props.codeChange(imgCode as unknown as string);
  }, [imgCode]);
  useImperativeHandle(ref, () => ({
    refreshCode: () => {
      (getImgCode as any)();
    },
  }));
  return <canvas ref={domRef as any} width="120" height="40" className="cursor-pointer" onClick={getImgCode as any}></canvas>;
};
export default React.forwardRef(SImageVerify);
