import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useLoaderContext } from "../../contexts/LoaderContext";
import { useNotificationContext } from "../../contexts/NotificationContext";

const initialFormData = {
  title: "Il mio libro",
  author: "Me",
  abstract: "Librone scritto da me troppo bello",
  image: null,
};

export default function BookAddPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const { startLoading, endLoading } = useLoaderContext();
  const { showNotification } = useNotificationContext();

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      setFormData({
        ...formData,
        [name]: e.target.files[0],
      });

      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    storeBook();

    console.log(formData);
  };

  const storeBook = () => {
    startLoading();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(`http://localhost:3000/books`, formData, config)
      .then((res) => {
        const { insertId } = res.data;
        showNotification("Book successfully created", "success");
        navigate(`/books/${insertId}`);
      })
      .catch((err) => {
        showNotification(err.message, "danger");
        endLoading();
      });
  };

  return (
    <>
      <h1 className="mb-4">Create book form</h1>

      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="title">
            Title
          </label>
          <input
            value={formData.title}
            onChange={handleInputChange}
            name="title"
            //
            className="form-control"
            type="text"
            id="title"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="author">
            Author
          </label>
          <input
            value={formData.author}
            onChange={handleInputChange}
            name="author"
            //
            className="form-control"
            type="text"
            id="author"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="image">
            Cover image
          </label>
          <input
            onChange={handleInputChange}
            name="image"
            //
            className="form-control"
            type="file"
            id="image"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="abstract">
            Abstract
          </label>
          <textarea
            value={formData.abstract}
            onChange={handleInputChange}
            name="abstract"
            //
            className="form-control"
            type="text"
            id="abstract"
            rows="4"
            required
          />
        </div>

        <button className="btn btn-success">Send book</button>
      </form>
    </>
  );
}
