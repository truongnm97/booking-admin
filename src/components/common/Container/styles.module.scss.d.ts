declare namespace StylesModuleScssNamespace {
  export interface IStylesModuleScss {
    account: string
    collapsed: string
    content: string
    language: string
    'layout-container': string
    logo: string
    sider: string
    'site-layout': string
    'site-layout-background': string
    'site-page-header': string
    trigger: string
  }
}

declare const StylesModuleScssModule: StylesModuleScssNamespace.IStylesModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StylesModuleScssNamespace.IStylesModuleScss
}

export = StylesModuleScssModule
