"use client";
import { getUser, updateUser } from "@/app/analyze-system/action";
import Input from "@/components/Input";
import TextArea from "@/components/Input/TextArea";
import SubmitButton from "@/components/SubmitButton";
import { debounce } from "@/js/utils";
import User from "@/types/objects/users";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { MdEmail, MdPhone } from "react-icons/md";
import { toast } from "react-toastify";

const tempPlaceholder = "Loading...";

function UserEditForm({ userId }: Readonly<{ userId?: number | null }>) {
  const { data, error, isPending, mutate } = useMutation<User>({
    mutationKey: ["user"],
    mutationFn: getUser(userId),
  });
  const updateMutation = useMutation({
    mutationFn: updateUser(userId),
    mutationKey: ["user"],
    onSuccess: () => {
      setChanged(false);
      toast.success("Update successfully");
      // Disable key users and userId
    },
    onError: () => {
      toast.error("Update failed!");
    },
  });

  const [user, setUser] = useState<User | any>(null);
  const [changed, setChanged] = useState<boolean>(false);

  useEffect(() => {
    debounce(mutate, 300)();
  }, [userId]);

  useEffect(() => {
    if (data) {
      setUser(data);
      setChanged(true);
    }
  }, [data]);
  const handleDataChange = (e: React.ChangeEvent<any>) => {
    setUser((prev: User) => ({ ...prev, [e.target.name]: e.target.value }));
    setChanged(true);
  };

  function handleSubmit(e: any) {
    e.preventDefault();
    updateMutation.mutate(user);
  }

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Edit Profile</h3>
      </div>
      <form action="#" onSubmit={handleSubmit}>
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full">
              <Input
                name="fullName"
                label="Full Name"
                disabled={isPending}
                placeholder={
                  isPending ? tempPlaceholder : "Enter your full name"
                }
                data={user}
                onChange={handleDataChange}
              />
            </div>
          </div>
          <div className="mb-4.5">
            {/* <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Email <span className="text-meta-1">*</span>
                        </label>
                        <input
                            type="email"
                            disabled
                            placeholder={isPending ? tempPlaceholder : "Enter your email address"}

                            value={user?.email}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition 
                                dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary
                                focus:border-primary active:border-primary      
                                "
                        /> */}
            <Input
              name="email"
              label="Email"
              tail={<MdEmail className="text-lg" />}
              disabled={true}
              placeholder={
                isPending ? tempPlaceholder : "Enter your email address"
              }
              data={user}
              onChange={handleDataChange}
            />
          </div>
          <div className="mb-4.5">
            <Input
              name="phone"
              tail={<MdPhone className="text-lg" />}
              placeholder={
                isPending ? tempPlaceholder : "Enter your Phone address"
              }
              disabled={true}
              label="Phone"
              data={user}
              onChange={handleDataChange}
            />
          </div>

          <div className="mb-6">
            <TextArea
              name="address"
              data={user}
              label="Address"
              invalid={user?.address.length > 1000}
              disabled={isPending}
              className="max-h-[200px]"
              placeholder={isPending ? tempPlaceholder : "(min length 1000)"}
              onChange={handleDataChange}
            />
          </div>

          <SubmitButton
            className="my-2 w-full rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            loading={isPending || updateMutation.isPending}
            content="Save"
          />
        </div>
      </form>
    </div>
  );
}

export default UserEditForm;
