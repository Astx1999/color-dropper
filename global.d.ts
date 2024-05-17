declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare global {
  interface Window {
    EyeDropper?: any;
  }
}