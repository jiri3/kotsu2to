declare interface IClassNames {
  [className: string]: string
}
declare module "*.css" {
  const classNames: IClassNames
  export = classNames
}
declare const __PATH_PREFIX__: string
