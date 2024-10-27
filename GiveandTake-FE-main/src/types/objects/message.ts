type Message = {
    id: number;
    name: string;
    content: string;
    // image: string;
    userId: number;
    createDate: string;
    updateDate?: string;
    status?: "hidden";
}
export default Message;