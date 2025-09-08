import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Invite = () => {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const ref = params.get("ref");
		if (ref) {
			localStorage.setItem("affiliate_ref", ref);
		}
		navigate("/", { replace: true });
	}, [location.search, navigate]);

	return null;
};

export default Invite;

