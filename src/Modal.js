import "./Modal.css";
import { useRef, useEffect, useState } from "react";

export function Modal({ closeModal }) {
  const modalRef = useRef();
  const [form, setForm] = useState({
    username: "",
    email: "",
    dob: null,
    phoneNo: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  };

  const HandleSubmit = (event) => {
    event.preventDefault();
    if (
      form.username === "" ||
      form.phoneNo === "" ||
      form.dob === null ||
      form.email === ""
    ) {
      return;
    }

    if (!form.email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return;
    }

    if (!/^\d{10}$/.test(form.phoneNo)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    const currentDate = new Date().toISOString().split("T")[0];
    if (form.dob > currentDate) {
      alert("Invalid date of birth. Please enter a valid date.");
      return;
    }

    setForm({
      username: "",
      email: "",
      dob: null,
      phoneNo: "",
    });

    closeModal(); // Close the modal only if all validations pass
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log(modalRef.current, event.target);
      if (modalRef.current && modalRef.current === event.target) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal, modalRef]);

  return (
    <div>
      <div className="modal">
        <div className="overlay" ref={modalRef}>
          <div className="modal-content">
            <form onSubmit={HandleSubmit}>
              <h3>Fill Details</h3>
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email Address:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone Number:</label>
                <input
                  type="text"
                  className="form-control"
                  id="phoneNo"
                  value={form.phoneNo}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Date of Birth:</label>
                <input
                  type="date"
                  className="form-control"
                  id="dob"
                  value={form.dob || ""}
                  onChange={(e) => setForm({ ...form, dob: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="submit-button btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
