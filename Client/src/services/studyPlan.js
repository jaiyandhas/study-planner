import api from "./axios";

const emitPlansChanged = () => {
	if (typeof window !== "undefined") {
		window.dispatchEvent(new Event("plans-changed"));
	}
};

export const createPlan = async (data) => {
	const res = await api.post("/studyplan", data);
	emitPlansChanged();
	return res.data;
};

export const getPlans = async () => {
	const { data } = await api.get("/studyplan");
	return Array.isArray(data?.plan) ? data.plan : [];
};

export const updatePlan = async (id, data) => {
	const res = await api.put(`/studyplan/${id}`, data);
	emitPlansChanged();
	return res.data;
};

export const deletePlan = async (id) => {
	const res = await api.delete(`/studyplan/${id}`);
	emitPlansChanged();
	return res.data;
};