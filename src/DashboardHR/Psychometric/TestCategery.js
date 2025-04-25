import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Swal from "sweetalert2";
import { baseUrl } from "../../Api/BaseUrl";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import MenuItem from '@mui/material/MenuItem';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function TestCategory() {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedImage, setSelectedImage] = useState(null);
    const [currencies3, setCurrencies3] = useState([]);
    const [file, setFile] = useState(null); // State to handle file input
    const [inputData, setInputData] = useState({
        question: "",
        category_id: "",
        correctAnswerIndex: "",
        options_first: " ",
        options_Second: " ",
        options_three: " ",
        options_four: " "
    });
    const [blogErr, setBlogErr] = useState({
        question: false,
        category_id: false,
        correctAnswerIndex: false,
        options_first: false,
        options_Second: false,
        options_three: false,
        options_four: false


    });
    const submitInputdata = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    };
    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };
    useEffect(() => {

        axios.get(`${baseUrl}getAll_psychometric_Category`)
            .then((response) => {
                setCurrencies3(response.data.Category);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);



    // Handle file input changes
    const submitAllData = () => {
        setBlogErr({
            question: false,
            category_id: false,
            correctAnswerIndex: false,
            options_first: false,
            options_Second: false,
            options_three: false,
            options_four: false
        });
    
        // Validation
        if (!inputData.question) setBlogErr((prev) => ({ ...prev, question: true }));
        if (!inputData.category_id) setBlogErr((prev) => ({ ...prev, category_id: true }));
        if (!inputData.correctAnswerIndex) setBlogErr((prev) => ({ ...prev, correctAnswerIndex: true }));
        if (!inputData.options_first) setBlogErr((prev) => ({ ...prev, options_first: true }));
        if (!inputData.options_Second) setBlogErr((prev) => ({ ...prev, options_Second: true }));
        if (!inputData.options_three) setBlogErr((prev) => ({ ...prev, options_three: true }));
        if (!inputData.options_four) setBlogErr((prev) => ({ ...prev, options_four: true }));
    
        if (!inputData.question || !inputData.category_id || !inputData.correctAnswerIndex || !inputData.options_first || !inputData.options_Second || !inputData.options_three || !inputData.options_four || !selectedImage) return;
    
        // Prepare form data for the API call
        const formData = new FormData();
        formData.append("category_id", inputData.category_id);
        formData.append("question", inputData.question);
        formData.append("correctAnswerIndex", inputData.correctAnswerIndex);
    
        // Convert options array to JSON string
        const optionsArray = JSON.stringify([
            inputData.options_first,
            inputData.options_Second,
            inputData.options_three,
            inputData.options_four
        ]);
    
        formData.append("options", optionsArray);
        formData.append("file", selectedImage);
    
        console.log(
            inputData.category_id,
            inputData.question,
            inputData.correctAnswerIndex,
            optionsArray,
            selectedImage
        );
    
        axios.post(`${baseUrl}psychometric_test/${localStorage.getItem("empId")}`, formData)
            .then((response) => {
                Swal.fire("Success", "Psychometric test added successfully!", "success");
                navigate("/admin/Psychometric"); // Assuming you navigate after successful submission
            })
            .catch((error) => {
                console.log(error);
                Swal.fire("Error", `${error?.response?.data?.message}`, "error");
            });
    };
    
    return (
        <div className="container">
            <div className="header-div">
                <span>
                    <i className="fas fa-users"></i>
                </span>
                <span>Add New Test</span>
            </div>
            <div className="row row-style">
                {/* Category */}
                <div className="col-6 my-3">
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Category"
                        value={inputData.category_id}
                        onChange={submitInputdata}
                        name="category_id"
                        size="normal"
                    >
                        {currencies3.map((option) => (
                            <MenuItem key={option.category_id} value={option.category_id}>
                                {option.category_name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <span style={{ color: "red" }}>
                        {blogErr.category_id && "*Please select a category"}
                    </span>
                </div>

                {/* Question */}
                <div className="col-6">
                    <TextField
                        className="mb-1 mt-3 w-100"
                        id="outlined-multiline-static"
                        label="Question"
                        rows={4.5}
                        type="text"
                        name="question"
                        value={inputData.question}
                        onChange={submitInputdata}
                        size="normal"
                    />
                    <span style={{ color: "red" }}>
                        {blogErr.question && "*Please enter a question"}
                    </span>
                </div>

                {/* Correct Answer Index */}
                <div className="col-6">
                    <TextField
                        className="mb-1 mt-3 w-100"
                        id="outlined-multiline-static"
                        label="Correct Answer Index"
                        rows={4.5}
                        type="number"
                        name="correctAnswerIndex"
                        value={inputData.correctAnswerIndex}
                        onChange={submitInputdata}
                        size="normal"
                    />
                    <span style={{ color: "red" }}>
                        {blogErr.correctAnswerIndex && "*Please enter the correct answer index"}
                    </span>
                </div>
                {/* Correct Answer Index */}
                <div className="col-6">
                    <TextField
                        className="mb-1 mt-3 w-100"
                        id="outlined-multiline-static"
                        label="Options One"
                        rows={4.5}
                        type="text"
                        name="options_first"
                        value={inputData.options_first}
                        onChange={submitInputdata}
                        size="normal"
                    />
                    <span style={{ color: "red" }}>
                        {blogErr.options_first && "*Please enter the correct answer index"}
                    </span>
                </div>
                {/* Correct Answer Index */}
                <div className="col-6">
                    <TextField
                        className="mb-1 mt-3 w-100"
                        id="outlined-multiline-static"
                        label="Options Two"
                        rows={4.5}
                        type="text"
                        name="options_Second"
                        value={inputData.options_Second}
                        onChange={submitInputdata}
                        size="normal"
                    />
                    <span style={{ color: "red" }}>
                        {blogErr.options_Second && "*Please enter the correct answer index"}
                    </span>
                </div>
                {/* Correct Answer Index */}
                <div className="col-6">
                    <TextField
                        className="mb-1 mt-3 w-100"
                        id="outlined-multiline-static"
                        label="Options Three"
                        rows={4.5}
                        type="text"
                        name="options_three"
                        value={inputData.options_three}
                        onChange={submitInputdata}
                        size="normal"
                    />
                    <span style={{ color: "red" }}>
                        {blogErr.options_three && "*Please enter the correct answer index"}
                    </span>
                </div>
                {/* Correct Answer Index */}
                <div className="col-6">
                    <TextField
                        className="mb-1 mt-3 w-100"
                        id="outlined-multiline-static"
                        label="Options Four"
                        rows={4.5}
                        type="text"
                        name="options_four"
                        value={inputData.options_four}
                        onChange={submitInputdata}
                        size="normal"
                    />
                    <span style={{ color: "red" }}>
                        {blogErr.options_four && "*Please enter the correct answer index"}
                    </span>
                </div>

                <div className="col-6  justify-content-center">
                    <h6 className=" mb-0">Upload Image</h6>
                    <TextField
                        type="file"
                        //   label="Upload"
                        className="mb-1  w-100"
                        accept="image/*"
                        onChange={handleFileSelect}
                    />
                    {selectedImage && (
                        <div className="image-preview">
                            <img
                                src={URL.createObjectURL(selectedImage)}
                                alt="Selected"
                                style={{ height: "100px" }}
                            />
                        </div>
                    )}
                    <span style={{ color: "red" }}>
                        {blogErr && !selectedImage ? "*Please upload your image" : ""}
                    </span>
                </div>
                {/* Options */}


                {/* File Upload */}


                {/* Submit Button */}
                <div className="col-12 d-flex justify-content-center mt-2">
                    <button
                        type="button"
                        className="global_button mb-3"
                        style={{ borderRadius: "5px" }}
                        onClick={submitAllData}
                    >
                        Submit
                        <ArrowRightAltIcon />
                    </button>
                </div>
            </div>
        </div>
    );
}
