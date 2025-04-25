
import React from 'react'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Protected(props) {
    const navigate = useNavigate();
  const { Component } = props;
  useEffect(() => {
    let login = localStorage.getItem("empId");
    if (!login) {
      navigate("/Signin");
    }
    
  });
  return (
    <Component />
  )
}
