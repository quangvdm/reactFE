import Input, { HeadTailConfig, InputProps } from "@/components/Input";
import React from "react";
type InputHeadIconProps = InputProps & {
  head: React.ReactNode;
  tail?: React.ReactNode;
  config?: HeadTailConfig
}
function InputHeadIcon(props: Readonly<InputHeadIconProps>) {
  return <Input {...props} />;
}

export default InputHeadIcon;
