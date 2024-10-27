import { request } from "@/js/axios";
import User from "@/types/objects/users";

async function getUsers({ page, pageSize }: { page?: number, pageSize?: number }) {
    const response = await request.user.getAll({ page, pageSize });
    return response.data;
}

function getUser(id: any) {
    return async () => {
        const response = await request.user.getById(id);
        return response.data;
    }
}
function updateUser(id: any) {
    return async (user: User) => {
        const response = await request.user.update(id, user);
        return response.data;
    }
}
export { getUser, getUsers, updateUser };

