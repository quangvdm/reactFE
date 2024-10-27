"use client"
import { useEffect, useRef } from "react";

function useRealTimeMessaging() {
    const signalR = require("@microsoft/signalr");

    let ref = useRef<any>()
    useEffect(() => {
        if (!ref.current) {
            ref.current = new signalR.HubConnectionBuilder()
                .withUrl(`${process.env.NEXT_PUBLIC_API_URL}/chat`,)
                .build();
            const connection = ref.current;
            connection.start();
        }
    }, [])
    const sendMessage = (userId: any, message: string) => {
        ref.current.invoke("send", userId, message)
    }
    return [ref.current, sendMessage];
}

export default useRealTimeMessaging;
