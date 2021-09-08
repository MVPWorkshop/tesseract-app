export enum EHeaderType {
  APP = "APP",
  LANDING = "LANDING"
}

export interface IHeaderProps {
  type?: EHeaderType;
}
