import { useNavigate } from "react-router-dom";
import { CommonButton } from "../../components";
import DynamicViewTitle from "../../components/common/DynamicViewTitle";
import Modal from "../../components/common/Modal";
import AddCampusForm from "../../components/admin/Campus/AddCampusForm";
import { useEffect, useState } from "react";
import CampusTable from "../../components/admin/Campus/CampusTable";
import apis from "../../config/api";
import { useMutation } from "@tanstack/react-query";

const Campus = () => {
  const [isOpen, open] = useState(false);
  const [campuses, setCampuses] = useState([]);

  const { mutate: fetchAllCampuses, isPending: fetchingCampuses } = useMutation(
    {
      mutationFn: () => apis.getCampuses(),
      onSuccess: ({ data }) => {
        console.log(data, "campuses data");
        if (data?.status) {
          setCampuses(data?.data);
        } else {
          toast.error("Failed to load campuses");
        }
      },
      onError: (error) => {
        toast.error(error?.message || "Error fetching campuses");
      },
    }
  );

  const openModal = () => {
    open(true);
  };

  const closeModal = () => {
    open(false);
  };

  useEffect(() => {
    fetchAllCampuses();
  }, []);

  return (
    <div className="w-full">
      <DynamicViewTitle
        title={"Campus"}
        description={"View All Details Campus "}
      >
        <div className="flex justify-end">
          <CommonButton onClick={() => openModal()} variant="primary" size="md">
            Add Campus
          </CommonButton>
        </div>
      </DynamicViewTitle>

      <CampusTable fetchingCampuses={fetchingCampuses} data={campuses} />

      {isOpen && (
        <Modal onClose={closeModal} heading="Add Campus">
          <AddCampusForm fetchAllCampuses={fetchAllCampuses} closeModal={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default Campus;
