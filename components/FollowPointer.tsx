import React from "react";
import { motion } from "framer-motion";
import stringColor from "@/lib/stringToColor";

function FollowPointer({
	x,
	y,
	info,
}: {
	x: number;
	y: number;
	info: {
		name: string;
		email: string;
		avatar: string;
	};
}) {
	const color = stringColor(info.email || "1");

	return (
		<motion.div
			className="absolute z-50"
			style={{ top: y, left: x, pointerEvents: "none" }}
			initial={{ scale: 1, opacity: 1 }}
			animate={{ scale: 1, opacity: 1 }}
			exit={{ scale: 0, opacity: 0 }}
		>
			{/* SVG Pointer Icon */}
			<svg
				stroke={color}
				fill={color}
				strokeWidth="1"
				viewBox="0 0 16 16"
				className="h-6 w-6 transform -rotate-[70deg] -translate-x-3"
				height="1em"
				width="1em"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.582 15.467a.5.5 0 0 1-.917-.007L5.57 10.694 0.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
			</svg>

			{/* User's Name Tag */}
			<motion.div
				style={{ backgroundColor: color, color: "#fff" }}
				className="mt-1 px-3 py-1 rounded-full text-sm font-semibold shadow-md"
				initial={{ scale: 0.5, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.5, opacity: 0 }}
			>
				{info?.name || info.email}
			</motion.div>
		</motion.div>
	);
}

export default FollowPointer;
