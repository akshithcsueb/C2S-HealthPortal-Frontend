import AddPatient from "../features/dashboard/AddPatient";
import PatientTable from "../features/dashboard/PatientTable";
import Row from "../ui/Row";
import SearchPatient from "../features/dashboard/SearchPatient";
import { useState } from "react";

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Row type="horizontal">
        <SearchPatient setSearchTerm={setSearchTerm} />
        <AddPatient />
      </Row>

      <Row>
        <PatientTable searchTerm={searchTerm} />
      </Row>
    </>
  );
}

export default Dashboard;
