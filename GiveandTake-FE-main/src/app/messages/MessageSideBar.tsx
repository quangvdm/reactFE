"use client"
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
const userData = [
    {
        id: 1,
        name: "Henry Dholi",
        message: "I came across your profile and...",
        image: "/images/user/user-01.png",
        status: "online", // This can be used to show the green dot for active users
    },
    {
        id: 2,
        name: "Mariya Desoja",
        message: "I like your confidence 💪",
        image: "/images/user/user-02.png",
        status: "online",
    },
    {
        id: 3,
        name: "Robert Jhon",
        message: "Can you share your offer?",
        image: "/images/user/user-03.png",
        status: "online",
    },
    {
        id: 4,
        name: "Cody Fisher",
        message: "I'm waiting for your response!",
        image: "/images/user/user-04.png",
        status: "online",
    },
    {
        id: 5,
        name: "Jenny Wilson",
        message: "I'm waiting for your response!",
        image: "/images/user/user-05.png",
        status: "online",
    },
    {
        id: 6,
        name: "Marcus Siphron",
        message: "Hello, how are you?",
        image: "/images/user/user-06.png",
        status: "online",
    },
];

function MessageSideBar() {
    const params = useParams();
    return <>
        <div className="sticky border-b border-stroke px-6 py-7.5 dark:border-strokedark">
            <h3 className="text-lg font-medium text-black dark:text-white 2xl:text-xl">
                Active Conversations
                <span className="rounded-md border-[.5px] border-stroke bg-gray-2 px-2 py-0.5 text-base font-medium text-black dark:border-strokedark dark:bg-boxdark-2 dark:text-white 2xl:ml-4">
                    7
                </span>
            </h3>
        </div>
        <div className="flex max-h-full flex-col overflow-auto p-5">

            <form className="sticky mb-7">
                <input
                    className="w-full rounded border border-stroke bg-gray-2 py-2.5 pl-5 pr-10 text-sm outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark-2"
                    placeholder="Search..."
                    type="text"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2">
                    <svg
                        fill="none"
                        height="18"
                        viewBox="0 0 18 18"
                        width="18"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            clipRule="evenodd"
                            d="M8.25 3C5.3505 3 3 5.3505 3 8.25C3 11.1495 5.3505 13.5 8.25 13.5C11.1495 13.5 13.5 11.1495 13.5 8.25C13.5 5.3505 11.1495 3 8.25 3ZM1.5 8.25C1.5 4.52208 4.52208 1.5 8.25 1.5C11.9779 1.5 15 4.52208 15 8.25C15 11.9779 11.9779 15 8.25 15C4.52208 15 1.5 11.9779 1.5 8.25Z"
                            fill="#637381"
                            fillRule="evenodd"
                        />
                        <path
                            clipRule="evenodd"
                            d="M11.957 11.958C12.2499 11.6651 12.7247 11.6651 13.0176 11.958L16.2801 15.2205C16.573 15.5133 16.573 15.9882 16.2801 16.2811C15.9872 16.574 15.5124 16.574 15.2195 16.2811L11.957 13.0186C11.6641 12.7257 11.6641 12.2508 11.957 11.958Z"
                            fill="#637381"
                            fillRule="evenodd"
                        />
                    </svg>
                </button>
            </form>

            <div className="no-scrollbar max-h-full space-y-2.5 overflow-auto">
                {userData.map((user) => (
                    <Link
                        href={'/messages/' + user.id.toString()}
                        key={user.id}
                        className={`${user.id === params?.id as any} flex cursor-pointer items-center rounded px-4 py-2 hover:bg-gray-2 dark:hover:bg-strokedark`}
                    >
                        <div className="relative mr-3.5 h-11 w-full max-w-11 rounded-full">
                            <Image
                                alt={user.name}
                                className="h-full w-full object-cover object-center"
                                src={user.image}
                                fill
                            />
                            <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-gray-2 bg-success" />
                        </div>
                        <div className="w-full">
                            <h5 className="text-sm font-medium text-black dark:text-white">
                                {user.name}
                            </h5>
                            <p className="text-sm font-medium">{user.message}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </>;
}

export default MessageSideBar;
