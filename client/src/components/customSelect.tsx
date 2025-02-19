import React from "react";

interface SelectProps {
	id: string;
	options: { value: string; label: string }[];
	value: string;
	onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	error?: boolean; // Optional prop to indicate if there's an error
}

const CustomSelect: React.FC<SelectProps> = ({
	id,
	options,
	value,
	onChange,
	error,
}) => {
	return (
		<div className="relative w-full">
			<select
				value={value}
				id={id}
				onChange={onChange}
				className={`
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
			>
				{options.map(option => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			{error && (
				<p className="text-red-500 text-sm mt-1">This field is required.</p>
			)}
		</div>
	);
};

export default CustomSelect;
