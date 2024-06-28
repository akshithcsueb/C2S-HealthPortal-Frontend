/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import { useCreatePatient } from "./useCreatePatient";
import { useEditPatient } from "./useEditPatient";
import FileInput from "../../ui/FileInput";

// Function to format date to YYYY-MM-DD
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function CreatePatientForm({ patientToEdit = {}, onCloseModal }) {
  const { isCreating, patientCreated } = useCreatePatient();
  const { isEditing, editedPatient } = useEditPatient();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = patientToEdit;
  console.log("PATIENT TO EDIT OBJECT - ", patientToEdit);
  const isEditSession = Boolean(editId);

  // Format the date value before passing to useForm
  if (editValues.dob) {
    editValues.dob = formatDate(editValues.dob);
  }

  if (editValues.photoUrl) {
    console.log("Heyyyyyyy----", editValues.photoUrl);

    editValues.photoUrl = editValues.photoUrl.split("/");
    editValues.photoUrl = editValues.photoUrl[editValues.photoUrl.length - 1];

    console.log("Heyyyyyyy----", editValues.photoUrl);
  }

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    console.log("Form Data:", data); // Log the form data
    let photoUrl =
      typeof data.photoUrl === "string" ? data.photoUrl : data.photoUrl[0].name;

    // Update the photo URL to match the URL pattern served by your backend
    photoUrl = `/images_upload/${photoUrl}`;
    console.log("Form Data:", photoUrl); // Log the form data

    // const photoUrl = "example.photo"; // This should be replaced with the actual photo URL logic

    if (isEditSession) {
      editedPatient(
        { id: editId, newEditedData: { ...data, photoUrl, id: editId } },
        {
          // eslint-disable-next-line no-unused-vars
          onSuccess: (data) => {
            console.log(data);
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      patientCreated(
        { ...data, photoUrl: photoUrl },
        {
          // eslint-disable-next-line no-unused-vars
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Patient Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="DOB" error={errors?.dob?.message}>
        <Input
          type="date"
          id="dob"
          disabled={isWorking}
          {...register("dob", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Gender" error={errors?.gender?.message}>
        <Input
          type="text"
          id="gender"
          disabled={isWorking}
          {...register("gender", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email ID" error={errors?.emailId?.message}>
        <Input
          type="text"
          id="emailId"
          disabled={isWorking}
          {...register("emailId", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Phone No" error={errors?.phoneNo?.message}>
        <Input
          type="text"
          id="phoneNo"
          disabled={isWorking}
          {...register("phoneNo", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow
        label="Medical Condition"
        error={errors?.medicalCondition?.message}
      >
        <Input
          type="text"
          id="medicalCondition"
          disabled={isWorking}
          {...register("medicalCondition", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        label="Surgical History"
        error={errors?.surgicalHistory?.message}
      >
        <Input
          type="text"
          id="surgicalHistory"
          disabled={isWorking}
          {...register("surgicalHistory", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Medication" error={errors?.medication?.message}>
        <Input
          type="text"
          id="medication"
          disabled={isWorking}
          {...register("medication", { required: "This field is required" })}
        />
      </FormRow>

      {/* Assuming photoUrl is a URL or base64 string */}
      {/* <FormRow label="Image">
        <Input
          type="text"
          id="photoUrl"
          disabled={isWorking}
          {...register("photoUrl", { required: "This field is required" })}
        />
      </FormRow> */}

      <FormRow label="Photo URL" error={errors?.photoUrl?.message}>
        <FileInput
          id="photoUrl"
          accept="image/*"
          // disabled={isWorking}
          {...register("photoUrl", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit patient" : "Create new patient"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreatePatientForm;
