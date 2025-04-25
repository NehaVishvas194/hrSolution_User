import React from 'react'
import { Link } from 'react-router-dom'
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
import EastIcon from '@mui/icons-material/East';
import { useState } from 'react';
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useLocation } from 'react-router-dom'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Aerospace & Defense',
    'Agriculture',
    'Information Technology',
    'Non-profit & NGO',
    'Real Estate',
    'Resturant & Food Services',
    'Marketing',
    'Finance',
    'others',
];

export default function SignUpNext() {
    const location = useLocation()
    console.log("location.state in SignUpNext component:", location.state);



    const [inputData, setInputData] = useState({
        company_industry: "",
        company_name: "",
        Number_of_emp: "",


    });
    const [blogErr, setBlogErr] = useState(false);

    const [facilitiesName, setfacilitiesName] = React.useState([]);
    const handleChange2 = (event) => {
        const {
            target: { value },
        } = event;

        setfacilitiesName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const submitInputdata = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    };

    const submitAllData = (e) => {
        e.preventDefault()
        // Reset the error state
        setBlogErr({
            company_industry: false,
            company_name: false,
            Number_of_emp: false,
        });

        // Validate the input fields
        if (!inputData.company_industry) {
            setBlogErr((prevState) => ({ ...prevState, company_industry: true }));
        }

        if (!inputData.company_name) {
            setBlogErr((prevState) => ({ ...prevState, company_name: true }));
        }
        if (!inputData.Number_of_emp) {
            setBlogErr((prevState) => ({ ...prevState, Number_of_emp: true }));
        }

        // If any field is empty, stop the submission
        if (!inputData.company_industry || !inputData.company_name || !inputData.Number_of_emp) {
            return;
        }

        // If all fields are filled out, proceed with the form submission

    };
    return (
        <section className="section-paddings">
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-7">
                        <div className="authincation-content">
                            <div className="auth-form">
                                <h4 className="text-center mb-4 text-white">
                                    Sign up your account
                                </h4>
                                <>
                                    {/* Hello world */}
                                    <form onClick={submitAllData}>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <div className="col-12">
                                                        <div className="row">

                                                            <div className="col-12">
                                                                <div className="row">
                                                                    <div className="col-12 d-flex justify-content-center">
                                                                        <TextField
                                                                            className="mb-1 mt-3 w-100"
                                                                            id="outlined-multiline-static"
                                                                            label="aboutHotel"
                                                                            style={{ "backgroundColor": "white" }}
                                                                            rows={4.5}
                                                                            type="text"
                                                                            name="aboutHotel"
                                                                            value={inputData.aboutHotel}
                                                                            onChange={submitInputdata}
                                                                            size="normal"
                                                                        />
                                                                    </div>
                                                                    <span style={{ color: "red" }}>
                                                                        {blogErr && !inputData.aboutHotel
                                                                            ? "*Please Enter Your AboutHotel"
                                                                            : ""}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="row">
                                                                    <div className="col-12 d-flex justify-content-center">
                                                                        <TextField
                                                                            className="mb-1 mt-3 w-100"
                                                                            id="outlined-multiline-static"
                                                                            label="aboutHotel"
                                                                            style={{ "backgroundColor": "white" }}
                                                                            rows={4.5}
                                                                            type="text"
                                                                            name="aboutHotel"
                                                                            value={inputData.aboutHotel}
                                                                            onChange={submitInputdata}
                                                                            size="normal"
                                                                        />
                                                                    </div>
                                                                    <span style={{ color: "red" }}>
                                                                        {blogErr && !inputData.aboutHotel
                                                                            ? "*Please Enter Your AboutHotel"
                                                                            : ""}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 d-flex justify-content-center my-3">
                                                                <FormControl sx={{ width: 650 }}>
                                                                    <InputLabel id="demo-multiple-checkbox-label">Facilities</InputLabel>
                                                                    <Select
                                                                        labelId="demo-multiple-checkbox-label"
                                                                        id="demo-multiple-checkbox"
                                                                        value={facilitiesName}
                                                                        onChange={handleChange2}
                                                                        input={<OutlinedInput label="facilities" />}
                                                                        renderValue={(selected) => selected.join(', ')}
                                                                        MenuProps={MenuProps}
                                                                        style={{ "backgroundColor": "white" }}
                                                                    >
                                                                        {names.map((name) => (
                                                                            <MenuItem key={name} value={name}>
                                                                                <Checkbox checked={facilitiesName.indexOf(name) > -1} />
                                                                                <ListItemText primary={name} />
                                                                            </MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                </FormControl>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-center mt-4">
                                                <button className="b-btn" >
                                                    Next<EastIcon />
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </>
                                <div className="new-account mt-3">
                                    <p className="text-white">
                                        Already have an account?{" "}
                                        <Link to="/Login"><a className="text-white" href="login.html">
                                            Sign in
                                        </a></Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}