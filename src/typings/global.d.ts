declare type Nullable<T> = T | null
declare type Recordable<T = any> = Record<string, T>
declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>
declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}
