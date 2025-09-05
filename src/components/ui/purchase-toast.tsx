import React, { useEffect, useState } from "react";

interface PurchaseToastProps {
	imageUrl: string;
	message: string;
	price: string;
	autoHideMs?: number;
}

const PurchaseToast: React.FC<PurchaseToastProps> = ({ imageUrl, message, price, autoHideMs = 8000 }) => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		// Show on first render with slight delay for animation
		const t = setTimeout(() => setVisible(true), 600);
		let auto: number | undefined;
		if (autoHideMs > 0) {
			auto = window.setTimeout(() => setVisible(false), autoHideMs);
		}
		return () => {
			clearTimeout(t);
			if (auto) clearTimeout(auto);
		};
	}, [autoHideMs]);

	return (
		<div
			className={`fixed bottom-4 left-4 z-40 max-w-xs sm:max-w-sm w-[320px] bg-white rounded-lg shadow-lg border overflow-hidden transform transition-transform duration-500 ${
				visible ? "translate-x-0" : "-translate-x-full"
			}`}
			role="dialog"
			aria-live="polite"
		>
			<div className="flex items-start">
				<img src={imageUrl} alt="Sản phẩm" className="h-16 w-28 object-cover" />
				<div className="p-3 flex-1">
					<p className="text-sm">{message}</p>
					<p className="font-semibold mt-1">{price}</p>
				</div>
				<button
					className="p-2 text-muted-foreground hover:text-foreground"
					aria-label="Đóng thông báo"
					onClick={() => setVisible(false)}
				>
					×
				</button>
			</div>
		</div>
	);
};

export default PurchaseToast; 