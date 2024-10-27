"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { Tag } from "primereact/tag";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { useEffect, useState } from "react";
import DonationModal from "./donation-modal";

const DonationList = () => {
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [visible, setVisible] = useState(false);

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
    );
  };

  const getSeverity = (value) => {
    switch (value) {
      case "Approved":
        return "success";
      case "Pending":
        return "warning";
      case "Hiding":
        return "danger";
      default:
        return "info";
    }
  };

  useEffect(() => {
    const fetchDonations = async () => {
      const response = await fetch(
        "https://giveandtake.starci.net/api/v1/donations?page=1&pageSize=1000000000",
      );
      const data = await response.json();
      setDonations(data.items);
    };
    fetchDonations();
  }, [visible]);

  return (
    <DefaultLayout>
      <div>
        <DataTable
          value={donations}
          paginator
          rows={5}
          dataKey="donationId"
          emptyMessage="No donations found"
          selectionMode="single"
          selection={selectedDonation}
          onSelectionChange={(e) => {
            if (e.value.donationId === selectedDonation?.donationId) {
              setVisible(true);
              return;
            }
            setSelectedDonation(e.value);
            setVisible(true);
          }}
        >
          <Column
            field="donationId"
            header="ID"
            style={{ width: "1rem" }}
          ></Column>
          <Column
            field="name"
            body={(rowData) => {
              return <span className="font-bold">{rowData.name}</span>;
            }}
            header="Name"
          ></Column>
          <Column field="description" header="Description"></Column>
          <Column field="categoryName" header="Category"></Column>
          <Column field="point" header="Point"></Column>
          <Column field="totalRating" header="Rating"></Column>
          <Column field="accountName" header="Created By"></Column>
          <Column field="approvedByName" header="Approved By"></Column>
          <Column
            field="status"
            header="Status"
            body={statusBodyTemplate}
          ></Column>
          <Column
            field="createdAt"
            body={(rowData) => {
              return new Date(rowData.createdAt).toLocaleDateString();
            }}
            header="Created At"
          ></Column>
          <Column
            field="updatedAt"
            body={(rowData) => {
              return new Date(rowData.updatedAt).toLocaleDateString();
            }}
            header="Updated At"
          ></Column>
        </DataTable>
      </div>
      {visible && (
        <DonationModal
          visible={visible}
          setVisible={setVisible}
          donation={selectedDonation}
        />
      )}
    </DefaultLayout>
  );
};

export default DonationList;
