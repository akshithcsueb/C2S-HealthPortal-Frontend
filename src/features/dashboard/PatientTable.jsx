/* eslint-disable react/prop-types */
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { usePatients } from "./usePatients";
import PatientRow from "./PatientRow";

function PatientsTable({ searchTerm }) {
  const { isLoading, patients } = usePatients();
  console.log("In Patients Table", patients);

  if (isLoading) return <Spinner />;
  if (!patients.length) return <Empty resourceName="patients" />; // Here cabin

  // const filteredPatients = searchTerm
  //   ? patients.filter(
  //       (patient) => patient.name.toLowerCase() === searchTerm.toLowerCase()
  //     )
  //   : patients;

  const filteredPatients = searchTerm
    ? patients.filter(
        (patient) =>
          patient.id.toString().toLowerCase() === searchTerm.toLowerCase()
      )
    : patients;

  return (
    <Menus>
      <Table columns="1fr 1fr 1fr 1.8fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Patient ID</div>
          <div>Name</div>
          <div>Email ID</div>
          <div>Medical Condition</div>
        </Table.Header>

        <Table.Body
          data={filteredPatients}
          render={(patient) => (
            <PatientRow patient={patient} key={patient.id} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default PatientsTable;
