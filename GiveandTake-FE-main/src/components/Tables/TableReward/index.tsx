"use client"
import { getRewards } from "@/app/rewards/action";
import Input from "@/components/Input";
import TableRewardLoader from "@/components/Tables/TableReward/TableRewardLoader";
import { createQueryString } from "@/js/string-utils";
import { debounce } from "@/js/utils";
import Reward from "@/types/objects/reward";
import { useMutation } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BiDownload } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { TbTrash } from "react-icons/tb";

function TableReward() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const { data, isPending, error, mutate } = useMutation<Reward[]>({
        mutationKey: ["rewards"],
        mutationFn: getRewards
    });
    const [hide, setHide] = useState<Map<number, boolean> | null>(null);
    const [pageData, setPageData] = useState({
        page: Number(searchParams.get('page') || 1),
        pageSize: Number(searchParams.get('pageSize') || 5),
        search: searchParams.get('search') || ''
    });
    const [totalPages, setTotalPage] = useState<number | null>(null);
    const [items, setItems] = useState<Reward[] | null>(null);

    const { page, pageSize, search } = pageData;

    useEffect(() => {
        if (data) {
            // setTotalPage(data.totalPages)
            setItems(data)
        }
    }, [data]);
    useEffect(() => {
        router.replace(`?${createQueryString(pageData)}`, {
            scroll: true
        });
        debounce(mutate, 300)();
    }, [mutate, pageData, router])

    const toggleHide = (id: number) => () => {
        setHide((prev) => {
            const newHide = new Map(prev);
            newHide.set(id, !newHide.get(id));
            return newHide;
        });
    }

    return (
        <div className={"w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"} >
            <div className="flex items-center">
                <div className="px-4 py-6 md:px-6 xl:px-7.5">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        Reward Products
                    </h4>
                </div>
                <div className="flex gap-2">
                    {/* {filter &&
                    <button className="p-2 hover:text-primary cursor-pointer rounded-md" onClick={filter}>
                        <FaFilter className="" />
                    </button>
                } */}
                    <button className="p-2 hover:text-primary cursor-pointer rounded-md" onClick={debounce(mutate, 300)} >
                        <FaArrowRotateLeft className="" />
                    </button>
                    <Input
                        head={<FaSearch></FaSearch>}
                        config={{ typeHead: "transparent" }}
                        onChange={(e) => {
                            const search = e.target.value;
                            setPageData((prev) => ({ ...prev, search: search.trim() }));
                            debounce(mutate, 300)();
                        }}
                        data={pageData}
                        placeholder="Search users..." className="w-64"
                        name="search"
                    />
                </div>
            </div>
            <div className="grid grid-cols-6 border-t border-stroke px-4 text-black dark:text-white  py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                <div className="col-span-3 flex items-center">
                    <p className="font-medium">Product Name</p>
                </div>
                <div className="col-span-1 hidden items-center sm:flex">
                    <p className="font-medium">Quantity</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Point</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Status</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Created/Updated</p>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                    <p className="font-medium ">Actions</p>
                </div>
            </div>

            {!isPending && data?.map((reward) => {
                const coverImage = reward.imageUrl ?? "/images/product/product-missing.png"
                // const userData = hide?.get(reward.rewardId) === true ? "******" : reward.account?.email;
                return (
                    <div
                        className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                        key={reward.rewardId}
                    >
                        <div className="col-span-3 flex items-center">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center flex-1">
                                <Image
                                    src={coverImage}
                                    width={60}
                                    height={60}
                                    alt={reward.rewardName}
                                    className="text-xs rounded-md aspect-square object-cover" />
                                <div>
                                    <p className="text-sm text-black dark:text-white">
                                        {reward.rewardName}
                                    </p>
                                    <p className="text-xs line-clamp-1 max-w-75">
                                        {reward.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 hidden items-center sm:flex">
                            <p className="text-sm text-black dark:text-white">
                                {reward.quantity}
                            </p>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <p className="text-sm text-black dark:text-white">{reward.point}</p>
                        </div>
                        <div className="col-span-1 flex items-center" onClick={toggleHide(reward.rewardId)}>
                            <p className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${reward.status === "Active"
                                ? "bg-success text-success"
                                : reward.status === "Inactive"
                                    ? "bg-danger text-danger"
                                    : "bg-warning text-warning"
                                }`}>
                                {reward.status}
                            </p>
                        </div>
                        <div className="col-span-1  items-center text-xs gap-2">
                            <div className="">{formatDistanceToNow(reward.createdDate)} ago</div>
                            ─
                            <div className="">{formatDistanceToNow(reward.updatedDate)} ago</div>
                        </div>
                        <div className="flex items-center justify-center space-x-3.5">
                            <button className="hover:text-primary">
                                <BsEye />
                            </button>
                            <button className="hover:text-primary">
                                <TbTrash />
                            </button>
                            <button className="hover:text-primary">
                                <BiDownload />
                            </button>
                        </div>
                    </div>
                );
            })}
            {isPending && <TableRewardLoader count={pageSize} />}
        </div >
    );
}

export default TableReward;
