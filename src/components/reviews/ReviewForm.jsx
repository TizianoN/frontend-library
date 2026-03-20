import axios from "axios";
import { useState } from "react";
import { useLoaderContext } from "../../contexts/LoaderContext";
import { useNotificationContext } from "../../contexts/NotificationContext";

const formInitialData = {
  name: "",
  text: "",
  vote: "",
};

const invalidFieldsInitialData = {
  name: {
    isInvalid: false,
    reason: "",
  },
  text: {
    isInvalid: false,
    reason: "",
  },
  vote: {
    isInvalid: false,
    reason: "",
  },
};

export default function ReviewForm({ bookId, afterFormSubmit }) {
  const [formData, setFormData] = useState(formInitialData);
  const [invalidFields, setInvalidFields] = useState(invalidFieldsInitialData);
  const { startLoading, endLoading } = useLoaderContext();
  const { showNotification } = useNotificationContext();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showNotification("I campi del form non sono validi", "warning");
      console.log("Form non valido");

      return;
    }

    console.log("Form valido");

    storeBook();
    setFormData(formInitialData);
  };

  const storeBook = () => {
    startLoading();
    axios
      .post(`http://localhost:3000/books/${bookId}/review`, formData)
      .then((res) => {
        showNotification("Review successfully created", "success");
        afterFormSubmit();
      })
      .catch((err) => {
        showNotification(err.message, "danger");
        endLoading();
      })
      .finally(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
  };

  const validateForm = () => {
    const newInvalidFields = structuredClone(invalidFieldsInitialData);

    if (!formData.name) {
      newInvalidFields.name.isInvalid = true;
      newInvalidFields.name.reason = "Name cannot be empty";
    }

    if (!formData.text) {
      newInvalidFields.text.isInvalid = true;
      newInvalidFields.text.reason = "Text cannot be empty";
    }

    if (formData.vote > 5 || formData.vote < 1) {
      newInvalidFields.vote.isInvalid = true;
      newInvalidFields.vote.reason = "Vote must be a value between 1 and 5";
    }

    setInvalidFields(newInvalidFields);

    return !(newInvalidFields.name.isInvalid || newInvalidFields.text.isInvalid || newInvalidFields.vote.isInvalid);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>Add review</h3>
      </div>
      <form className="card-body" onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input
            value={formData.name}
            onChange={handleInputChange}
            name="name"
            //
            className={"form-control" + (invalidFields.name.isInvalid ? " is-invalid" : "")}
            type="text"
            id="name"
          />
          <div id="validationServerUsernameFeedback" class="invalid-feedback">
            {invalidFields.name.reason}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="text">
            Text
          </label>
          <textarea
            value={formData.text}
            onChange={handleInputChange}
            name="text"
            //
            className={"form-control" + (invalidFields.text.isInvalid ? " is-invalid" : "")}
            type="text"
            id="text"
          />
          <div id="validationServerUsernameFeedback" class="invalid-feedback">
            {invalidFields.text.reason}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="vote">
            Vote
          </label>
          <input
            value={formData.vote}
            onChange={handleInputChange}
            name="vote"
            //
            className={"form-control" + (invalidFields.vote.isInvalid ? " is-invalid" : "")}
            id="vote"
            type="number"
          />
          <div id="validationServerUsernameFeedback" class="invalid-feedback">
            {invalidFields.vote.reason}
          </div>
        </div>

        <button className="btn btn-success">Send review</button>
      </form>
    </div>
  );
}
