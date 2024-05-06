// index.d.ts file
declare module '*.png?as=webp';
declare module '*.scss';
declare module '*.svg' {
  const content: any;
  export default content;
}
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.css';
