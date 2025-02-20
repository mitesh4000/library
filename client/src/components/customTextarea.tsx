interface CustomTextAreaProps {
	id: string;
	name: string;
	rows: number;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
	label?: string;
	className?: string;
	error?: string | null;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
	id,
	name,
	rows,
	value,
	onChange,
	onBlur,
	label,
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
			<textarea
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
				id={id}
				name={name}
				rows={rows}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
			></textarea>
		</div>
	);
};

export default CustomTextArea;
