import { request } from "@/js/axios";

export const getRewards = async () => {
    const response = await request.reward.getAll();
    return response.data;
}