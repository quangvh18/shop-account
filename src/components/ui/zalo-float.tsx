import React, { useState } from "react";
import { useLocation } from "react-router-dom";

interface FloatingZaloProps {
	zaloUrl: string;
}

const FloatingZalo: React.FC<FloatingZaloProps> = ({ zaloUrl }) => {
	const location = useLocation();
	const [isHovered, setIsHovered] = useState(false);

	// Hide on admin pages
	if (location.pathname.startsWith('/admin')) {
		return null;
	}

	return (
		<div className="fixed bottom-4 right-4 z-50 group">
			{/* Tooltip */}
			<div className={`absolute bottom-full right-0 mb-3 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
				<div className="bg-slate-900 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-xl whitespace-nowrap">
					💬 Chat với chúng tôi!
					<div className="absolute -bottom-1 right-4 w-2 h-2 bg-slate-900 rotate-45"></div>
				</div>
			</div>

			{/* Main button */}
			<a
				href={zaloUrl}
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Liên hệ Zalo"
				className="zalo-floating-btn"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{/* Outer glow rings */}
				<span className="zalo-ring zalo-ring-1"></span>
				<span className="zalo-ring zalo-ring-2"></span>
				<span className="zalo-ring zalo-ring-3"></span>

				{/* Button inner */}
				<span className="zalo-inner">
					<img
						src="https://cdn.divineshop.vn/static/9a3807bd0aeb1523d5088f182f8b69b6.svg"
						alt="Zalo"
						className="h-7 w-7 relative z-10"
					/>
				</span>

				{/* Shine effect */}
				<span className="zalo-shine"></span>
			</a>

			{/* Notification badge */}
			<span className="absolute -top-1 -right-1 flex h-5 w-5">
				<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
				<span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 items-center justify-center text-[10px] text-white font-bold">1</span>
			</span>
		</div>
	);
};

export default FloatingZalo; 