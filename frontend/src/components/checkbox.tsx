import { Variants, motion } from "framer-motion";

const boxVariants: Variants = {
	hover: { scale: 1.05, strokeWidth: 30 },
	pressed: { scale: 0.95, strokeWidth: 35 },
	checked: { stroke: "rgb(20 184 166)" },
	unchecked: { stroke: "#ddd" },
};

export const Checkbox = ({
	label,
	isChecked,
	setIsChecked,
	onClick,
}: {
	label: string;
	isChecked: boolean;
	setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
	onClick: () => void;
}) => {
	return (
		<button className="flex gap-x-1 items-center">
			<motion.svg
				initial={false}
				animate={isChecked ? "checked" : "unchecked"}
				whileHover="hover"
				whileTap="pressed"
				width="30"
				height="30"
				viewBox="0 0 440 440"
				onClick={onClick}
			>
				<motion.path
					d="M 72 136 C 72 100.654 100.654 72 136 72 L 304 72 C 339.346 72 368 100.654 368 136 L 368 304 C 368 339.346 339.346 368 304 368 L 136 368 C 100.654 368 72 339.346 72 304 Z"
					fill={isChecked ? "rgb(20 184 166)" : "#fff"}
					strokeWidth="40"
					stroke=""
					variants={boxVariants}
					style={{ originX: 0.5, originY: 0.5 }}
				/>
			</motion.svg>
			<span>{label}</span>
		</button>
	);
};
export default Checkbox;
