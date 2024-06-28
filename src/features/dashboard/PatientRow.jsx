/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled from "styled-components";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import CreatePatientForm from "./CreatePatientForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { useDeletePatient } from "./useDeletePatient";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const PatientValue = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

function PatientRow({ patient }) {
  const { isDeleting, deletedPatient } = useDeletePatient();

  const {
    id: patientId,
    name,
    dob,
    gender,
    emailId,
    phoneNo,
    medicalCondition,
    surgicalHistory,
    medication,
    photoUrl,
  } = patient;

  return (
    <Table.Row>
      {/* THIS ONE */}
      <Img src={photoUrl} alt={`${name}'s photo`} />
      <PatientValue>{patientId}</PatientValue>
      <PatientValue>{name}</PatientValue>
      <PatientValue>{emailId}</PatientValue>
      <PatientValue>{medicalCondition}</PatientValue>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={patientId} />

            <Menus.List id={patientId}>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreatePatientForm patientToEdit={patient} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="patients"
                disabled={isDeleting}
                onConfirm={() => deletedPatient(patientId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default PatientRow;
