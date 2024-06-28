import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreatePatientForm from "./CreatePatientForm";

function AddPatient() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="patient-form">
          <Button>Add new patient</Button>
        </Modal.Open>
        <Modal.Window name="patient-form">
          <CreatePatientForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddPatient;
