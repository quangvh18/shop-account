import { supabase } from "@/lib/supabase";

export const getStoredRef = (): string | null => {
	return localStorage.getItem("affiliate_ref");
};

export const setStoredRef = (ref: string) => {
	localStorage.setItem("affiliate_ref", ref);
};

export type Collaborator = {
	ref: string;
	display_name: string;
	email: string;
	phone: string;
};

export const fetchCollaboratorByRef = async (ref: string): Promise<Collaborator | null> => {
	const { data } = await supabase
		.from("collaborators")
		.select("ref, display_name, email, phone")
		.eq("ref", ref)
		.maybeSingle();
	return (data as any) || null;
};

