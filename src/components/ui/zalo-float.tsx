import React from "react";

interface FloatingZaloProps {
	zaloUrl: string;
}

const FloatingZalo: React.FC<FloatingZaloProps> = ({ zaloUrl }) => {
	return (
		<a
			href={zaloUrl}
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Liên hệ Zalo"
			className="fixed bottom-4 right-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#0068FF] shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0068FF]"
		>
			<img 
				src="https://cdn.divineshop.vn/static/9a3807bd0aeb1523d5088f182f8b69b6.svg" 
				alt="Zalo" 
				className="h-7 w-7"
			/>
		</a>
	);
};

export default FloatingZalo; 