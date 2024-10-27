"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import CardDataStats from "../CardDataStats";
import ChartOne from "../Charts/ChartOne";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import Home from "@/app/analyze-system/page";
import ChartTransactionUser from "../Charts/ChartTransactionUser";
import {
  RiFeedbackLine,
  RiHeartPulseFill,
  RiQuestionMark,
} from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import DefaultLayout from "../Layouts/DefaultLayout";

const MapOne = dynamic(() => import("@/components/Maps/MapOne"), {
  ssr: false,
});

const ChartThree = dynamic(() => import("@/components/Charts/ChartThree"), {
  ssr: false,
});

const ECommerce: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [feedBacks, setFeedBacks] = useState([]);
  const [requests, setRequests] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [rewardeds, setRewardeds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const responseUser = await fetch(
        "https://giveandtake.starci.net/api/v1/accounts?page=1&pageSize=1000",
      );
      const dataUser = await responseUser.json();
      setUsers(dataUser.items);
      const responseDonations = await fetch(
        "https://giveandtake.starci.net/api/v1/donations?page=1&pageSize=1000000000",
      );
      const dataDonations = await responseDonations.json();
      setDonations(dataDonations.items);

      const responseFeedback = await fetch(
        "https://giveandtake.starci.net/api/v1/feedbacks?page=1&pageSize=1000000000",
      );
      const dataFeedback = await responseFeedback.json();
      setFeedBacks(dataFeedback.items);

      const responseRequest = await fetch(
        "https://giveandtake.starci.net/api/v1/feedbacks?page=1&pageSize=1000000000",
      );
      const dataRequest = await responseRequest.json();
      setRequests(dataRequest.items);

      const responseTransactions = await fetch(
        "https://giveandtake.starci.net/api/v1/transactions",
      );
      const dataTransaction = await responseTransactions.json();
      setTransactions(dataTransaction);
      const responseRewardeds = await fetch(
        "https://giveandtake.starci.net/api/v1/rewardeds",
      );
      const dataRewardeds = await responseRewardeds.json();
      setRewardeds(dataRewardeds);
    };
    fetchData();
  }, []);

  return (
    <>
      <>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <CardDataStats title="Total Users" total={users.length + ""}>
            <FaUsers className="size-5/12 fill-primary text-primary" fill="" />
          </CardDataStats>
          <CardDataStats title="Total Requests" total={requests.length + ""}>
            <RiQuestionMark className="size-5/12 fill-primary text-primary" />
          </CardDataStats>
          <CardDataStats title="Total Feedbacks" total={feedBacks.length + ""}>
            <RiFeedbackLine className="size-5/12 fill-primary text-primary" />
          </CardDataStats>
          <CardDataStats title="Total Donations" total={donations.length + ""}>
            <RiHeartPulseFill className="size-5/12 fill-primary text-primary" />
          </CardDataStats>
        </div>
        <div className="mt-4 lg:mt-7.5"></div>
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <ChartTransactionUser
            rewardeds={rewardeds}
            transactions={transactions}
          />
          {/* <ChartTwo />
            <ChartThree />
            <MapOne />
            <div className="col-span-12 xl:col-span-8">
              <TableOne />
            </div>
            <ChatCard /> */}
        </div>

        {/* <UserEditForm params={params} /> */}
      </>
    </>
  );
};

export default ECommerce;
