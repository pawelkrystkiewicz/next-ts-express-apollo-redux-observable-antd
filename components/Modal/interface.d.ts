import { ReactNode } from "react";

export default interface IProps {
	props:IModalProps;
	children:ReactNode;
};

export interface IModalProps {
  visible:Boolean;
	config:IModalConfig;
	executeOnOK?:Function;
}
export interface IModalConfig {
	title:String!
}
