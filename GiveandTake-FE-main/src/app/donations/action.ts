import { request } from "@/js/axios";
import { delay } from "@/js/utils";
import Category from "@/types/objects/category";
import Donation from "@/types/objects/donation";

const getCategories: () => Promise<Category[]> = async () => {

    const response = await request.category.getAll();
    await delay(1000);
    return response.data as Category[] || [];
}

const getDonations: () => Promise<Pagination<Donation>> = async () => {
    const response = await request.donation.getAll();
    await delay(1000);
    return response.data;
}
export { getCategories, getDonations };

