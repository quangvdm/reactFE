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
import CategoryDialog from "./CategoryEditModal";
import { useToast } from "react-toastify";
import { Toast } from "primereact/toast";
import axios from "axios";
import { error } from "console";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const Categories = () => {
  const toast = useRef<Toast>(null);
  const [categories, setCategories] = useState([]);
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        "https://giveandtake.starci.net/api/v1/categories",
      );
      const data = await response.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={getValue(rowData.status)}
        severity={getSeverity(rowData.status)}
      />
    );
  };

  const getSeverity = (value) => {
    switch (value) {
      case "1":
        return "success";
      case "0":
        return "danger";
    }
  };

  const getValue = (value) => {
    switch (value) {
      case "1":
        return "Active";
      case "0":
        return "Inactive";
    }
  };

  const onEditClick = (category: any) => {
    setSelectedCategory({ ...category });
    setIsEdit(true);
    setDialogVisible(true);
  };

  const onCreateClick = () => {
    setSelectedCategory({
      categoryId: 0,
      categoryName: "",
      description: "",
      point: 0,
      status: "1",
      imageUrl: "",
    }); // Default empty category for creation
    setIsEdit(false);
    setDialogVisible(true);
  };

  const handleCategoryChange = (updatedCategory: any) => {
    setSelectedCategory(updatedCategory);
  };

  const saveCategory = async () => {
    if (selectedCategory) {
      if (isEdit) {
        // Update existing category

        const response = await axios
          .put(
            `https://giveandtake.starci.net/api/v1/categories/${selectedCategory.categoryId}`,
            selectedCategory,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            },
          )
          .then((res) => {
            const updatedCategories = categories.map((category) => {
              if (category.categoryId === selectedCategory.categoryId) {
                return selectedCategory;
              }
              return category;
            });
            setCategories(updatedCategories);
            toast.current?.show({
              severity: "success",
              summary: "Success",
              detail: "Category updated",
              life: 3000,
            });
          })
          .catch((err) => {
            console.log(err);
            toast.current?.show({
              severity: "error",
              summary: "Error",
              detail: "Failed to update category",
              life: 3000,
            });
          });
      } else {
        // Add new category
        setSelectedCategory({ ...selectedCategory, categoryId: 0 });
        const response = await axios
          .post(
            "https://giveandtake.starci.net/api/v1/categories",
            selectedCategory,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            },
          )
          .then((res) => {
            setCategories([...categories, selectedCategory]);
            toast.current?.show({
              severity: "success",
              summary: "Success",
              detail: "Category saved",
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

  const deleteCategory = async (categoryId: string) => {
    try {
      await axios.delete(
        `https://giveandtake.starci.net/api/v1/categories/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setCategories(categories.filter((cat) => cat.categoryId !== categoryId));
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Category deleted",
        life: 3000,
      });
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail:
          "This categories have donations related to it, Please remove donations about this category first",
        life: 3000,
      });
    }
  };

  const confirmDelete = (categoryId: string) => {
    confirmDialog({
      message: "Are you sure you want to delete this category?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => deleteCategory(categoryId), // Call delete function on accept
    });
  };

  return (
    <>
      <DefaultLayout>
        <>
          <ConfirmDialog />
          <Toast ref={toast} />
          <div className="mb-4 pt-10">
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
              value={categories}
              paginator
              rows={5}
              dataKey="categoryId"
              showGridlines={true}
              emptyMessage="No categories found"
            >
              <Column
                field="categoryId"
                header="ID"
                style={{ width: "1rem" }}
              ></Column>
              <Column
                field="categoryName"
                body={(rowData) => {
                  return (
                    <span className="font-bold">{rowData.categoryName}</span>
                  );
                }}
                header="Name"
              ></Column>
              <Column field="description" header="Description"></Column>
              <Column field="point" header="Point"></Column>
              <Column
                field="status"
                header="Status"
                body={statusBodyTemplate}
              ></Column>
              <Column
                field="imageUrl"
                header="Image"
                body={(rowData) => {
                  return (
                    <Image
                      src={rowData.imageUrl}
                      alt={rowData.categoryName}
                      width="100"
                      height="100"
                    />
                  );
                }}
              ></Column>
              <Column
                header="Action"
                field="categoryId"
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
                          onClick={() => confirmDelete(rowData.categoryId)}
                        />
                      </div>
                    </>
                  );
                }}
              ></Column>
            </DataTable>
            <CategoryDialog
              visible={dialogVisible}
              onHide={() => setDialogVisible(false)}
              category={selectedCategory}
              onCategoryChange={handleCategoryChange}
              onSave={saveCategory}
              isEdit={isEdit}
            />
          </div>
        </>
      </DefaultLayout>
    </>
  );
};

export default Categories;
