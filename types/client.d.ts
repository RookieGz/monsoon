import "next";
import { NextPage } from "next";
import { AppStore } from "store";
import { themeType } from "utils/theme";

declare global {
  module "*.scss";
}

declare module "next" {
  export interface NextPageContext {
    store: AppStore;
  }
}
