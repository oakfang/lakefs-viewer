/// <reference types="react-scripts" />
import { Theme as MuiTheme } from "config";

declare module "@emotion/styled" {
  export interface Theme extends MuiTheme {}
}

declare module "@emotion/react" {
  export interface Theme extends MuiTheme {}
}
