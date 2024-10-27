import Input, { InputProps } from "@/components/Input";

type InputLabelProps = InputProps & { label: string }
function InputLabel(props: Readonly<InputLabelProps>) {
    return <Input {...props} />;
}

export default InputLabel;
