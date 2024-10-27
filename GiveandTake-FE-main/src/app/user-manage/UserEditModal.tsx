import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";

interface UserDialogProps {
  visible: boolean;
  onHide: () => void;
  account: any | null;
  onAccountChange: (updatedAccount: any) => void;
  onSave: () => void;
  isEdit: boolean; // Flag to check if it is an edit operation
}

const UserDialog: React.FC<UserDialogProps> = ({
  visible,
  onHide,
  account,
  onAccountChange,
  onSave,
  isEdit,
}) => {
  const roleOptions = [
    { label: "Admin", value: 1 },
    { label: "Staff", value: 2 },
    { label: "User", value: 3 },
  ];

  return (
    <Dialog
      header={isEdit ? "Edit Account" : "Create Account"} // Dynamic dialog title
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
      {account && (
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="roleId">Role</label>
            <Dropdown
              id="roleId"
              value={account.roleId}
              options={roleOptions}
              onChange={(e) => {
                console.log(e);
                onAccountChange({ ...account, roleId: e.value });
              }}
              placeholder="Select Role"
            />
          </div>

          <div className="p-field">
            <label htmlFor="fullName">Full Name</label>
            <InputText
              id="fullName"
              value={account.fullName}
              onChange={(e) =>
                onAccountChange({ ...account, fullName: e.target.value })
              }
            />
          </div>

          <div className="p-field">
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              value={account.email}
              onChange={(e) =>
                onAccountChange({ ...account, email: e.target.value })
              }
            />
          </div>

          <div className="p-field">
            <label htmlFor="password">Password</label>
            <InputText
              id="password"
              type="password"
              value={account.password}
              onChange={(e) =>
                onAccountChange({ ...account, password: e.target.value })
              }
            />
          </div>

          <div className="p-field">
            <label htmlFor="phone">Phone</label>
            <InputText
              id="phone"
              value={account.phone}
              onChange={(e) =>
                onAccountChange({ ...account, phone: e.target.value })
              }
            />
          </div>

          <div className="p-field">
            <label htmlFor="address">Address</label>
            <InputTextarea
              id="address"
              value={account.address}
              onChange={(e) =>
                onAccountChange({ ...account, address: e.target.value })
              }
              rows={3}
            />
          </div>

          <div className="p-field">
            <label htmlFor="point">Point</label>
            <InputText
              id="point"
              type="number"
              value={account.point.toString()}
              onChange={(e) =>
                onAccountChange({
                  ...account,
                  point: parseInt(e.target.value, 10),
                })
              }
            />
          </div>

          <div className="p-field">
            <label htmlFor="avatarUrl">Avatar URL</label>
            <InputText
              id="avatarUrl"
              value={account.avatarUrl}
              onChange={(e) =>
                onAccountChange({ ...account, avatarUrl: e.target.value })
              }
            />
          </div>

          <div className="p-field">
            <label htmlFor="isActive">Is Active</label>
            <InputSwitch
              id="isActive"
              checked={account.isActive}
              onChange={(e) =>
                onAccountChange({ ...account, isActive: e.value })
              }
            />
          </div>

          <div className="p-field">
            <label htmlFor="isPremium">Is Premium</label>
            <InputSwitch
              id="isPremium"
              checked={account.isPremium}
              onChange={(e) =>
                onAccountChange({ ...account, isPremium: e.value })
              }
            />
          </div>

          <div className="p-field">
            <label htmlFor="premiumUntil">Premium Until</label>
            <Calendar
              id="premiumUntil"
              value={account.premiumUntil}
              onChange={(e) =>
                onAccountChange({ ...account, premiumUntil: e.value })
              }
              dateFormat="dd/mm/yy"
              showIcon
            />
          </div>
        </div>
      )}
    </Dialog>
  );
};

export default UserDialog;
