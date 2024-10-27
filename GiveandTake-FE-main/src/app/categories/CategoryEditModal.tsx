import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import { InputTextarea } from "primereact/inputtextarea";

interface CategoryDialogProps {
  visible: boolean;
  onHide: () => void;
  category: any | null;
  onCategoryChange: (updatedCategory: any) => void;
  onSave: () => void;
  isEdit: boolean; // Flag to check if it is an edit operation
}

const CategoryDialog: React.FC<CategoryDialogProps> = ({
  visible,
  onHide,
  category,
  onCategoryChange,
  onSave,
  isEdit,
}) => {
  return (
    <Dialog
      header={isEdit ? "Edit Category" : "Create Category"} // Dynamic dialog title
      visible={visible}
      onHide={onHide}
      footer={
        <div>
          <Button
            label="Cancel"
            icon="pi pi-times"
            onClick={onHide}
            className="p-button-text"
          />
          <Button label="Save" icon="pi pi-check" onClick={onSave} />
        </div>
      }
    >
      {category && (
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="categoryName">Category Name</label>
            <InputText
              id="categoryName"
              value={category.categoryName}
              onChange={(e) =>
                onCategoryChange({ ...category, categoryName: e.target.value })
              }
            />
          </div>

          <div className="p-field">
            <label htmlFor="description">Description</label>
            <InputTextarea
              id="description"
              value={category.description}
              onChange={(e) =>
                onCategoryChange({ ...category, description: e.target.value })
              }
            />
          </div>

          <div className="p-field">
            <label htmlFor="image">Image</label>
            <InputText
              id="image"
              value={category.imageUrl.toString()}
              onChange={(e) =>
                onCategoryChange({
                  ...category,
                  imageUrl: e.target.value,
                })
              }
            />
          </div>

          <div className="p-field">
            <label htmlFor="point">Point</label>
            <InputText
              id="point"
              value={category.point.toString()}
              onChange={(e) =>
                onCategoryChange({
                  ...category,
                  point: parseInt(e.target.value, 10),
                })
              }
            />
          </div>

          <div className="p-field">
            <label htmlFor="status">Active</label>
            <InputSwitch
              id="status"
              checked={category.status === "1"} // Checked when active
              onChange={(e) =>
                onCategoryChange({
                  ...category,
                  status: e.value ? "1" : "0", // Set "1" for active, "0" for inactive
                })
              }
            />
          </div>
        </div>
      )}
    </Dialog>
  );
};

export default CategoryDialog;
