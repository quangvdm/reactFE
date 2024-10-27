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
import { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { FiDelete, FiEdit, FiPlus, FiTrash } from "react-icons/fi";
import { Image } from "primereact/image";
import CategoryDialog from "./UserEditModal";
import { useToast } from "react-toastify";
import { Toast } from "primereact/toast";
import axios from "axios";
import { error } from "console";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import UserDialog from "./UserEditModal";

const UserManager = () => {
  const toast = useRef<Toast>(null);
  const [accounts, setAccounts] = useState([]);
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [selectedAccount, setSelectedAccount] = useState<any | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        "https://giveandtake.starci.net/api/v1/accounts?page=1&pageSize=1000",
      );
      const data = await response.json();
      setAccounts(data.items);
    };
    fetchUsers();
  }, []);

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={getValue(rowData.isActive)}
        severity={getSeverity(rowData.isActive)}
      />
    );
  };

  const premiumBodyTemplate = (rowData) => {
    return (
      <Tag
        value={getValue(rowData.isPremium)}
        severity={getSeverity(rowData.isPremium)}
      />
    );
  };

  const getSeverity = (value) => {
    switch (value) {
      case true:
        return "success";
      case false:
        return "danger";
    }
  };

  const getValue = (value) => {
    switch (value) {
      case true:
        return "Active";
      case false:
        return "Inactive";
    }
  };

  const onEditClick = (account: any) => {
    setSelectedAccount({ ...account });
    setIsEdit(true);
    setDialogVisible(true);
  };

  const onCreateClick = () => {
    setSelectedAccount({
      accounttId: 0,
      roleId: 0,
      fullName: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      point: 0,
      avatarUrl: "",
      isActive: true,
      isPremium: false,
      premiumUnti: null,
    }); // Default empty category for creation
    setIsEdit(false);
    setDialogVisible(true);
  };

  const handleAccountChange = (updatedAccount: any) => {
    setSelectedAccount(updatedAccount);
  };

  const saveAccount = async () => {
    if (selectedAccount) {
      if (isEdit) {
        // Update existing category

        const response = await axios
          .put(
            `https://giveandtake.starci.net/api/v1/accounts/${selectedAccount.accountId}`,
            selectedAccount,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            },
          )
          .then((res) => {
            const updateAccounts = accounts.map((account) => {
              if (account.accountId === selectedAccount.accountId) {
                return selectedAccount;
              }
              return account;
            });
            setAccounts(updateAccounts);
            toast.current?.show({
              severity: "success",
              summary: "Success",
              detail: "Account updated",
              life: 3000,
            });
          })
          .catch((err) => {
            console.log(err);
            toast.current?.show({
              severity: "error",
              summary: "Error",
              detail: "Failed to update acccount",
              life: 3000,
            });
          });
      } else {
        // Add new category
        setSelectedAccount({ ...selectedAccount, accountId: 0 });
        const response = await axios
          .post(
            "https://giveandtake.starci.net/api/v1/accounts",
            selectedAccount,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            },
          )
          .then((res) => {
            setAccounts([...accounts, selectedAccount]);
            toast.current?.show({
              severity: "success",
              summary: "Success",
              detail: "Account saved",
              life: 3000,
            });
          })
          .catch((err) => {
            console.log(err);
            toast.current?.show({
              severity: "error",
              summary: "Error",
              detail: `${err.message}`,
              life: 3000,
            });
          });
      }
      setDialogVisible(false);
    }
  };

  const deleteAccount = async (accountId: string) => {
    try {
      await axios.delete(
        `https://giveandtake.starci.net/api/v1/accounts/${accountId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setAccounts(accounts.filter((acc) => acc.accountId !== accountId));
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Account deleted",
        life: 3000,
      });
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "This Accounts have related to something",
        life: 3000,
      });
    }
  };

  const confirmDelete = (accountId: string) => {
    confirmDialog({
      message: "Are you sure you want to delete this account?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => deleteAccount(accountId), // Call delete function on accept
    });
  };

  return (
    <DefaultLayout>
      <ConfirmDialog />
      <Toast ref={toast} />
      <div className="mb-4">
        <Button
          label="Create New Category"
          icon={<FiPlus />}
          outlined
          onClick={onCreateClick}
          className="p-button-primary"
        />
      </div>

      <div>
        <DataTable
          value={accounts}
          paginator
          rows={5}
          dataKey="accountId"
          showGridlines={true}
          emptyMessage="No accounts found"
        >
          <Column
            field="accountId"
            header="ID"
            style={{ width: "1rem" }}
          ></Column>
          <Column
            field="fullName"
            body={(rowData) => {
              return <span className="font-bold">{rowData.fullName}</span>;
            }}
            header="Full Name"
          ></Column>
          <Column field="email" header="Email"></Column>
          <Column field="phone" header="Phone"></Column>
          <Column field="address" header="Address"></Column>
          <Column field="point" header="Point"></Column>
          <Column
            field="isActive"
            header="Status"
            body={statusBodyTemplate}
          ></Column>
          <Column
            field="isPremium"
            header="Premium"
            body={premiumBodyTemplate}
          ></Column>
          <Column
            field="avatarUrl"
            header="Avatar"
            body={(rowData) => {
              return (
                <Image
                  src={rowData.avatarUrl}
                  alt={rowData.fullName}
                  width="100"
                  height="100"
                />
              );
            }}
          ></Column>
          <Column
            header="Action"
            field="accountId"
            body={(rowData) => {
              return (
                <>
                  <div className="flex flex-row">
                    <FiEdit
                      className="mr-2 cursor-pointer text-2xl text-blue-500"
                      onClick={() => onEditClick(rowData)}
                    />
                    <FiTrash
                      className="text-red-500 cursor-pointer text-2xl"
                      onClick={() => confirmDelete(rowData.accountId)}
                    />
                  </div>
                </>
              );
            }}
          ></Column>
        </DataTable>
        <UserDialog
          visible={dialogVisible}
          onHide={() => setDialogVisible(false)}
          account={selectedAccount}
          onAccountChange={handleAccountChange}
          onSave={saveAccount}
          isEdit={isEdit}
        />
      </div>
    </DefaultLayout>
  );
};

export default UserManager;
