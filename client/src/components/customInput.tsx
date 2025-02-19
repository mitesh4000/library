interface CustomInputProps {
	id: string;
	name: string;
	type: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	label?: string;
	className?: string;
	placeholder?: string;
	error?: string | null;
}

const CustomInput: React.FC<CustomInputProps> = ({
	id,
	name,
	type,
	value,
	onChange,
	onBlur,
	label,
	placeholder,
	className = "",
	error,
}) => {
	return (
		<div className={`relative ${className}`}>
			{label && (
				<label
					htmlFor={id}
					className="block text-xs font-medium text-gray-700 mb-1"
				>
					{label}
				</label>
			)}
			<input
				className={`
  relative w-full 
  ${error ? "bg-red-50" : "bg-gray-100"} 
  ${error ? "border-red-400" : "border-gray-300"} 
  rounded-md 
  border
  border-gray-50
  pl-3 pr-10 py-2 
  text-left cursor-default 
  focus:outline-none 
  focus:ring-1 
  ${error ? "focus:ring-red-500" : "focus:ring-lime-500"}
  ${error ? "focus:border-red-500" : "focus:border-lime-500"} 
  sm:text-sm
`}
				placeholder={placeholder}
				id={id}
				name={name}
				type={type}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
			></input>
			<p className=" text-red-500 text-xs ml-2">{error}</p>
		</div>
	);
};
export default CustomInput;
