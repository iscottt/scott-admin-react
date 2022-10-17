import { useRef, useState } from 'react';
import { useEffect } from 'react';

/**
 * 绘制图形验证码
 * @param width - 图形宽度
 * @param height - 图形高度
 */
export default function useImageVerify(width = 120, height = 40) {
  const domRef = useRef<HTMLCanvasElement>(null);
  const [imgCode, setImageCode] = useState();
  // 获取code
  const getImgCode = () => {
    setImageCode(draw(domRef.current as HTMLCanvasElement, width, height) as any);
  };
  // 监听dom初始化之后调用渲染验证码图形
  useEffect(() => {
    if (domRef?.current) {
      getImgCode();
    }
  }, []);

  return [domRef, imgCode, getImgCode];
}

/**
 * 获取随机数
 * @param min 最小值
 * @param max 最大值
 * @returns
 */
function randomNum(min: number, max: number) {
  const num = Math.floor(Math.random() * (max - min) + min);
  return num;
}

/**
 * 获取随机颜色
 * @param min
 * @param max
 * @returns
 */
function randomColor(min: number, max: number) {
  const r = randomNum(min, max);
  const g = randomNum(min, max);
  const b = randomNum(min, max);
  return `rgb(${r},${g},${b})`;
}

/**
 * 绘制图形
 * @param dom
 * @param width
 * @param height
 * @returns
 */
function draw(dom: HTMLCanvasElement, width: number, height: number) {
  let imgCode = '';
  const NUMBER_STRING = '0123456789';
  const ctx = dom.getContext('2d');
  if (!ctx) return imgCode;

  ctx.fillStyle = randomColor(180, 230);
  ctx.fillRect(0, 0, width, height);
  for (let i = 0; i < 4; i += 1) {
    const text = NUMBER_STRING[randomNum(0, NUMBER_STRING.length)];
    imgCode += text;
    const fontSize = randomNum(18, 41);
    const deg = randomNum(-30, 30);
    ctx.font = `${fontSize}px Simhei`;
    ctx.textBaseline = 'top';
    ctx.fillStyle = randomColor(80, 150);
    ctx.save();
    ctx.translate(30 * i + 18, 15);
    ctx.rotate((deg * Math.PI) / 180);
    ctx.fillText(text, -15 + 5, -15);
    ctx.restore();
  }
  for (let i = 0; i < 5; i += 1) {
    ctx.beginPath();
    ctx.moveTo(randomNum(0, width), randomNum(0, height));
    ctx.lineTo(randomNum(0, width), randomNum(0, height));
    ctx.strokeStyle = randomColor(180, 230);
    ctx.closePath();
    ctx.stroke();
  }
  for (let i = 0; i < 41; i += 1) {
    ctx.beginPath();
    ctx.arc(randomNum(0, width), randomNum(0, height), 1, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = randomColor(150, 200);
    ctx.fill();
  }
  return imgCode;
}
