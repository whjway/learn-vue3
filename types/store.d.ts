// config
declare type State = {
  config: Config;
};
declare type Config = {
  platform: Platform;
  collection: Collection;
  airdrop: AirDrop;
};
declare type Platform = {
  market: Item[];
  given: Item[];
  uplink: Item[];
};
declare type Collection = {
  date: Item[];
  platform: Item[];
  model: Item[];
};
declare type AirDrop = {
  month: Item[];
  platform: Item[];
  requirement: Item[];
};
declare type Item = {
  text: string;
  value: string;
};

declare type ModelMap = {
  [propName: string]: string;
};
