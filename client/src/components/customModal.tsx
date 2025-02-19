import { X } from "lucide-react";
import React from "react";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	header: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, header }) => {
	if (!isOpen) return null;

	return (
		<div>
			<div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
				<div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
					<div className="flex justify-between items-center p-1 ">
						<div>
							<h2 className="text-gray-600 text-xl">{header}</h2>
						</div>
						<button
							className="text-gray-600 rounded-full  p-1 hover:bg-gray-100"
							onClick={onClose}
						>
							<X />
						</button>
					</div>
					<div className="bg-white p-3 rounded-sm">{children}</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
