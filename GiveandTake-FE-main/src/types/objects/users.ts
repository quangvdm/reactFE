type User = {
    accountId: number;
    roleId: number;
    fullName: string;
    email: string;
    password?: string;
    phone: string;
    address: string;
    point: number;
    avatarUrl: string;
    isActive: boolean;
}

export default User;