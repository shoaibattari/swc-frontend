import { DynamicTable } from "../../common";
import WhiteContainer from "../../common/WhiteContainer";

const CampusTable = ({ data, fetchingCampuses }) => {
  // Table columns
  const columns = [
    {
      label: "Campus Name",
      accessor: "name",
    },
    {
      label: "Address",
      accessor: "address",
    },
    {
      label: "Contact",
      accessor: "contact",
    },
  ];

  return (
    <WhiteContainer>
      <DynamicTable
        hideSearchBar={true}
        columns={columns}
        data={data?.map((campus) => ({
          id: campus?._id,
          name: campus?.name || "--",
          address: campus?.address || "--",
          contact: campus?.contact || "--",
        }))}
        loading={fetchingCampuses}
      />
    </WhiteContainer>
  );
};

export default CampusTable;
