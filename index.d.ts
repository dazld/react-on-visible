import React, { Component } from "react";
interface IOnVisibleProps {
    className?: string;
    style?: React.StyleHTMLAttributes<HTMLDivElement>
    visibleClassName?: string;
    children?: React.ReactNode,
    percent?: number,
    onChange?: (visible: boolean) => void,
    bounce?: boolean;
}
declare class OnVisible extends Component<IOnVisibleProps>{}
export default OnVisible;

export function setDefaultProps(props :IOnVisibleProps) : void;
