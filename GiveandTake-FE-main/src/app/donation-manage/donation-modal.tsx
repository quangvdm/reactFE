"use client";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import { Rating } from "primereact/rating";
import { set } from "date-fns";
import { Tag } from "primereact/tag";
import axios from "axios";
import { toast } from "react-toastify";

const DonationModel = ({ donation, visible, setVisible }) => {
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

  const approvedDonation = async () => {
    await axios
      .put(
        `https://giveandtake.starci.net/api/v1/donations/${donation.donationId}/toggle`,
      )
      .then((response) => {
        console.log(response);
        toast.success("Donation Approved Successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Donation Approved Failed");
      });
    setVisible(false);
  };

  return (
    <div className="card justify-content-center flex">
      <Dialog
        header="Donation Information"
        visible={visible}
        maximizable
        style={{ width: "50vw" }}
        onHide={() => {
          setVisible(false);
        }}
      >
        <div className="p-4">
          <h3 className="text-gray-800 mb-4 text-2xl font-bold">
            {donation.name}
          </h3>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Category:</span>{" "}
            {donation.categoryName}
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Account:</span>{" "}
            {donation.accountName}
          </p>
          <p className="text-gray-600 mb-4">
            <span className="font-semibold">Description:</span>{" "}
            {donation.description}
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Points:</span> {donation.point}
          </p>
          <p className="text-gray-600 mb-4">
            <span className="font-semibold">Status:</span>{" "}
            <Tag
              value={donation.status}
              severity={getSeverity(donation.status)}
            />
          </p>
          <p className="text-gray-600 mb-4">
            <span className="font-semibold">Approved By:</span>{" "}
            {donation.approvedByName}
          </p>

          <div className="mb-6 flex justify-center space-x-4">
            {donation.donationImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="Donation"
                className="h-36 w-36 rounded-lg object-cover shadow-md"
              />
            ))}
          </div>

          <p className="text-gray-600 mb-4">
            <strong className="text-gray-600">Rating: </strong>
            <Rating
              className="text-center"
              value={donation.totalRating}
              cancel={false}
              readOnly
            />
          </p>
        </div>
        <Button
          label="Approved"
          onClick={approvedDonation}
          text
          className="mb-2 me-2 w-1/3 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        ></Button>
        <Button
          label="Cancel"
          onClick={() => {
            setVisible(false);
          }}
          text
          className="mb-2 me-2 w-1/3 rounded-lg bg-yellow-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-yellow-800 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
        ></Button>
      </Dialog>
    </div>
  );
};

export default DonationModel;
