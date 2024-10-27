"use client"

import TableDonationLoader from "@/components/Tables/TableDonation/TableDonationLoader";
import Donation from "@/types/objects/donation";
import { UseQueryResult } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BiDownload } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { TbTrash } from "react-icons/tb";


const TableDonation = ({ request }: React.PropsWithoutRef<{
    request: UseQueryResult<Pagination<Donation>>
}>) => {
    const { data, isPending, error } = request;
    const [hide, setHide] = useState<Map<number, boolean> | null>(null);
    useEffect(() => {
        if (data) {
            setHide(new Map(data.items.map((donation) => [donation.donationId, true])));
        }
    }, [data])

    const toggleHide = (id: number) => () => {
        setHide((prev) => {
            const newHide = new Map(prev);
            newHide.set(id, !newHide.get(id));
            return newHide;
        });
    }

    return (
        <div className={" rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"} >
            <div className="px-4 py-6 md:px-6 xl:px-7.5">
                <h4 className="text-xl font-semibold text-black dark:text-white">
                    Donation Products
                </h4>
            </div>

            <div className="grid grid-cols-6 border-t border-stroke px-4 text-black dark:text-white  py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                <div className="col-span-3 flex items-center">
                    <p className="font-medium">Product Name</p>
                </div>
                <div className="col-span-1 hidden items-center sm:flex">
                    <p className="font-medium">Total Rating</p>
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

            {!isPending && data?.items?.map((donation) => {
                const coverImage = donation.donationImages?.[0] ?? "/images/product/product-missing.png"
                // const userData = hide?.get(donation.donationId) === true ? "******" : donation.account?.email;
                return (
                    <div
                        className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                        key={donation.donationId}
                    >
                        <div className="col-span-3 flex items-center">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center flex-1">
                                <Image
                                    src={coverImage}
                                    width={60}
                                    height={60}
                                    alt={donation.name}
                                    className="text-xs rounded-md aspect-square object-cover" />
                                <div>
                                    <p className="text-sm text-black dark:text-white">
                                        {donation.name}
                                    </p>
                                    <p className="text-xs line-clamp-1 max-w-75">
                                        {donation.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 hidden items-center sm:flex">
                            <p className="text-sm text-black dark:text-white">
                                {donation.totalRating}
                            </p>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <p className="text-sm text-black dark:text-white">{donation.point}</p>
                        </div>
                        <div className="col-span-1 flex items-center" onClick={toggleHide(donation.donationId)}>
                            <p className="text-xs text-black dark:text-white line-clamp-1">
                                {donation.status}
                            </p>
                        </div>
                        <div className="col-span-1  items-center text-xs gap-2">
                            <div className="">{formatDistanceToNow(donation.createdAt)} ago</div>
                            ─
                            <div className="">{formatDistanceToNow(donation.updatedAt)} ago</div>
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
            {isPending && <TableDonationLoader />}
        </div >
    );
};

export default TableDonation;
