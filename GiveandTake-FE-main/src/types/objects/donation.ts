import User from "@/types/objects/users";
import Category from "./category";

type Donation = {
    donationId: number;
    name: string;
    description: string;
    point: number;
    createdAt: string;
    updatedAt: string;
    totalRating: number;
    status: string;
    donationImages: never[];
    // ---------No render----------
    approvedBy: number; //id
    accountId: number; //id
    categoryId: number; //id
    category?: Category;
    account?: User;
}
export default Donation;