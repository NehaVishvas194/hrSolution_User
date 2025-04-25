import React, { useState, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { baseUrl } from '../../../Api/BaseUrl';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { MyContext } from "../../../MyContext";


const defaultState = {
  name: "",
  phone_no: "",
  email: "",
  profileImage: "",
};

export default function Profile() {
  const uploadedImage = React.useRef(null);
  const { text, setText } = useContext(MyContext)
  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const adminId = localStorage.getItem("empId");
  const navigate = useNavigate();
  const [state, setState] = useState(defaultState);
  const [selectedImage, setSelectedImage] = useState("");
  const [imageError, setImageError] = useState("");

  const adminProfile = () => {
    axios
      .get(`${baseUrl}getEmployeeDetails/${adminId}`)
      .then((response) => {
        console.log(response.data.Details);
        setState((prevData) => ({
          ...prevData,
          name: response.data.Details.name,
          phone_no: response.data.Details.phone_no,
          email: response.data.Details.email,
          profileImage: response.data.Details.profileImage,
        }));
        localStorage.setItem('profileImage', response.data.Details.profileImage)
      })
      .catch((error) => {
        Swal.fire("Error", `${error?.response?.data?.message}`, "error");
      });
  };

  useEffect(() => {
    adminProfile();
  }, []);

  const imageFunction = (event) => {
    const file = event.target.files[0];
    const fileType = file?.type;
    const validImageTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (validImageTypes.includes(fileType)) {
      setSelectedImage(file);
      setState({ ...state, profileImage: file.name });
      setImageError("");
    } else {
      setImageError("Only .jpg, .jpeg, and .png formats are allowed");
    }
  };

  const handleImageUpload = (event) => {
    const [file] = event.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;

      if (current) {
        current.file = file;
        reader.onload = (e) => {
          current.src = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        console.error("uploadedImage.current is null");
      }
    }
  };

  const submitData = (event) => {
    const { name, value } = event.target;
    // if ((name === "phone_no") && value !== "" && !/^\d+$/.test(value)) {
    //   return;
    // }
    if (
      (name === "phone_no" && (value.length > 10 || !/^\d{0,10}$/.test(value)))  
      
    ) {
      return; // Exit the function if the validation fails
    }
    console.log(selectedImage);
    console.log(name, value);
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const submitFormData = () => {
    if (imageError) {
      Swal.fire("Error", imageError, "error");
      return;
    }

    const bodyFormData = new FormData();
    const file = new File([selectedImage], state.profileImage, {
      type: selectedImage.type,
    });

    bodyFormData.append("name", state.name);
    bodyFormData.append("phone_no", state.phone_no);
    bodyFormData.append("email", state.email);
    bodyFormData.append("profileImage", selectedImage);

    axios
      .put(`${baseUrl}updateEmp/${adminId}`, bodyFormData)
      .then((response) => {
        if (response.status === 200) {
          setText(response.data.data.profileImage)
          console.log(response);
          Swal.fire(
            "Profile update successfully!",
            "You clicked the button!",
            "success"
          );

          localStorage.setItem("Email", response.data.data.email);
          console.log(response.data.data.name)
          localStorage.setItem("name", response.data.data.name);
          // navigate("/admin", { state: { dataValue: state } });

        }


      })
      .catch((error) => {
        Swal.fire("Error", `${error?.response?.data?.message}`, "error");
        setError({
          errors: error,
          isError: true,
        });
      });
  };

  return (
    <>
      <div className="bg-white m-0 p-0">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                ref={uploadedImage}
                alt="not found"
                className="rounded-circle mt-5"
                width="150px"
                height="150px"
                src={`https://sisccltd.com/hrsolutions/${state.profileImage}`}
              />
              <div style={{ marginStart: "10px" }}>
                <input
                  style={{ margin: "5px 0px 0px 50px" }}
                  className="mb-2 w-100 hidden"
                  type="file"
                  name="profileImage"
                  onChange={(event) => {
                    imageFunction(event);
                    handleImageUpload(event);
                  }}
                />
              </div>
              {imageError && <span style={{ color: "red" }}>{imageError}</span>}
            </div>
          </div>
          <div className="col-md-9 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right" style={{ color: "#000000" }}>
                  My Profile
                </h4>
              </div>
              <div className="form-outline mb-4">
                <TextField
                  fullWidth
                  label="First Name"
                  id="fullWidth"
                  autoComplete="off"
                  onChange={submitData}
                  name="name"
                  value={state.name}
                    onKeyPress={(e) => {
                            if (e.key.match(/[0-9]/)) {
                              e.preventDefault();
                            }
                          }}
                />
              </div>
              <div className="form-outline mb-4">
                <TextField
                  fullWidth
                  label="Phone no"
                  id="fullWidth"
                  autoComplete="off"
                  onChange={submitData}
                  name="phone_no"
                  value={state.phone_no}
                  pattern="[0-9]*"
                  maxLength="10"
                />
              </div>
              <div className="form-outline mb-4">
                <TextField
                  fullWidth
                  label="Email"
                  id="fullWidth"
                  autoComplete="off"
                  onChange={submitData}
                  name="email"
                  value={state.email}
                />
              </div>
              <div className="mt-3 text-center">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={submitFormData}
                >
                  Update
                  <ArrowRightAltIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
