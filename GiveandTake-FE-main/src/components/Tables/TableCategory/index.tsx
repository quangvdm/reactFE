'use client'
import Loader from "@/components/Tables/TableCategory/TableCategoryLoader";
import Category from "@/types/objects/category";
import { UseQueryResult } from "@tanstack/react-query";
import React from "react";
import { BiDownload } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { TbTrash } from "react-icons/tb";


function TableCategory({ request }: React.PropsWithoutRef<{
    request: UseQueryResult<Category[], Error>
}>) {
    const { data, isPending, error } = request;

    return (<div className={` rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 `}>
        <div className="max-w-full overflow-x-auto">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                Categories
            </h4>
            <table className="w-full table-auto">
                <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                        <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                            Category
                        </th>
                        <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white ">
                            {/* Description */}
                        </th>
                        <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                            Status
                        </th>
                        <th className="px-4 py-4 font-medium text-black dark:text-white">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {!isPending ? data?.map((category, key) => (
                        <tr key={category.categoryId}>
                            <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                <h5 className="font-medium text-black dark:text-white">
                                    {category.categoryName}
                                </h5>
                                <p className="text-sm line-clamp-1 max-w-100">{category.description}</p>
                            </td>
                            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark max-w-[200px]">
                                <p className=" line-clamp-2">
                                    {/* {category.description} */}
                                </p>
                            </td>
                            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark ">
                                <p
                                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${category.status === "1"
                                        ? "bg-success text-success"
                                        : category.status === "Unpaid"
                                            ? "bg-danger text-danger"
                                            : "bg-warning text-warning"
                                        }`}
                                >
                                    {category.status}
                                </p>
                            </td>
                            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                <div className="flex items-center space-x-3.5">
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
                            </td>
                        </tr>
                    )) :
                        <Loader />
                    }
                </tbody>
            </table>
        </div>
    </div>);
}

export default TableCategory;
