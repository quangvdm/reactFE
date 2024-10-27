"use client";

import { getUsers } from "@/app/analyze-system/action";
import Input from "@/components/Input";
import TableError from "@/components/Tables/TableUser/error";
import TableUserLoader from "@/components/Tables/TableUser/TableUserLoader";
import { createQueryString } from "@/js/string-utils";
import { debounce } from "@/js/utils";
import User from "@/types/objects/users";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BiBlock,
  BiEdit,
  BiSolidLeftArrow,
  BiSolidRightArrow,
} from "react-icons/bi";
import { FaFilter, FaSearch } from "react-icons/fa";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { MdChatBubble } from "react-icons/md";

function TableUser({
  filter,
  handleEditUser,
  handleBlockUser,
}: Readonly<{
  filter?: () => any;
  handleEditUser: (id: number) => any;
  handleBlockUser: (id: number) => any;
}>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [totalPages, setTotalPage] = useState<number | null>(null);
  const [items, setItems] = useState<User[] | null>(null);
  const { data, isPending, error, mutate } = useMutation<Pagination<User>>({
    mutationKey: ["users", searchParams],
    mutationFn: () => getUsers(pageData),
  });

  const [pageData, setPageData] = useState({
    page: Number(searchParams.get("page") || 1),
    pageSize: Number(searchParams.get("pageSize") || 5),
    search: searchParams.get("search") || "",
  });

  const { page, pageSize, search } = pageData;

  useEffect(() => {
    router.replace(`?${createQueryString(pageData)}`, {
      scroll: true,
    });
    debounce(mutate, 300)();
  }, [mutate, pageData, router]);

  useEffect(() => {
    if (data) {
      setTotalPage(data.totalPages);
      setItems(data.items);
    }
  }, [data]);
  const handlePreviousPage = () => {
    if (page > 1) {
      setPageData((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  };

  const handleNextPage = () => {
    if (data && page < data.totalPages) {
      setPageData((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  return (
    <div
      className={`gap-2 rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5
         xl:pb-1 `}
    >
      <div className="flex items-center">
        <div className="my-3">
          <h4 className="m-0 text-xl font-semibold text-black dark:text-white">
            Users / Donators
          </h4>
        </div>
        <div className="m-2 flex gap-2">
          {filter && (
            <button
              className="cursor-pointer rounded-md p-2 hover:text-primary"
              onClick={filter}
            >
              <FaFilter className="" />
            </button>
          )}
          <button
            className="cursor-pointer rounded-md p-2 hover:text-primary"
            onClick={debounce(mutate, 300)}
          >
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
            placeholder="Search users..."
            className="w-64"
            name="search"
          />
        </div>
        <div className="ml-auto flex gap-2">
          <button
            className="flex h-5 w-5 rounded-sm enabled:hover:text-meta-6 disabled:opacity-50 "
            onClick={handlePreviousPage}
            disabled={page <= 1}
          >
            <BiSolidLeftArrow className="m-auto" />
          </button>
          <div>
            {page} / {totalPages ?? 0}
          </div>
          <button
            className="flex h-5 w-5 rounded-sm enabled:hover:text-meta-6 disabled:opacity-50"
            onClick={handleNextPage}
            disabled={
              totalPages != null && totalPages > 0 && page >= totalPages
            }
          >
            <BiSolidRightArrow className="m-auto" />
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              User
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Contact
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5 ">
            <h5 className="col-span-2 text-sm font-medium uppercase xsm:text-base">
              Address
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Point
            </h5>
          </div>
          <div className=" p-2.5 text-center  xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Actions
            </h5>
          </div>
        </div>

        {items?.map((user, key) => {
          if (
            user.fullName
              .toLowerCase()
              .removeAccents()
              .includes(search.toLowerCase().removeAccents())
          )
            return (
              <div
                className={`grid grid-cols-3 sm:grid-cols-5 ${
                  key === items.length - 1
                    ? ""
                    : "border-b border-stroke dark:border-strokedark"
                }`}
                key={key}
              >
                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  <div className="flex-shrink-0">
                    <Image
                      src={user.avatarUrl}
                      className="aspect-square rounded-full object-cover"
                      alt="UserImg"
                      width={48}
                      height={48}
                    />
                  </div>
                  <p className="hidden text-black dark:text-white sm:block">
                    {user.fullName}
                  </p>
                </div>

                <div className="flex flex-col items-start justify-center overflow-ellipsis p-2.5 xl:p-5">
                  <p className="text-sm text-black dark:text-white">
                    {user.email}
                  </p>
                  <p className="text-black dark:text-white ">{user.phone}</p>
                </div>

                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 ">
                  <p className=" line-clamp-2">{user.address}</p>
                </div>

                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="text-black dark:text-white">{user.point}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <div className="flex gap-3 text-lg">
                    <button
                      className="text-meta-3 transition-colors duration-200 hover:text-opacity-80"
                      onClick={handleEditUser(user.accountId)}
                    >
                      <BiEdit />
                    </button>
                    <button
                      className="text-meta-1 transition-colors duration-200 hover:text-opacity-80"
                      onClick={handleBlockUser(user.accountId)}
                    >
                      <BiBlock />
                    </button>
                    <Link
                      href={`/messages/${user.accountId}`}
                      className="text-meta-2 transition-colors duration-200 hover:text-opacity-80"
                    >
                      <MdChatBubble />
                    </Link>
                  </div>
                </div>
              </div>
            );
        })}
        {isPending && <TableUserLoader count={Math.min(pageSize, 5)} />}
        {error && <TableError error={error}></TableError>}
      </div>
    </div>
  );
}

export default TableUser;
