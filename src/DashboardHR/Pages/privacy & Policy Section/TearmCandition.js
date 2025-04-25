import React from 'react'
import { baseUrl } from '../../../Api/BaseUrl';
import { useEffect, useState } from 'react';
import axios from "axios";

export default function TearmCandition() {
    const [rows, setRows] = useState([]);

    const getdataList = () => {
        axios
            .get(`${baseUrl}/get__admin_term_condition`)
            .then((response) => {
                console.log(response.data.Details);
                setRows(response.data.Details);


            })
            .catch((error) => {
                console.log(error);

            });
    };

    useEffect(() => {
        getdataList();
    }, []);
    return (
        <>
            {/*Detail of clicked job [English]*/}
            <div className="container emp-profile">
                <form method="post">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="profile-head">
                                <h5>
                                    {" "}
                                    Term & Condition Section
                                </h5>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a
                                            className="nav-link active"
                                            id="home-tab"
                                            data-toggle="tab"
                                            href="#home"
                                            role="tab"
                                            aria-controls="home"
                                            aria-selected="true"
                                        >

                                            Term & Condition Section
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="tab-content profile-tab" id="myTabContent">
                                <div
                                    className="tab-pane fade show active"
                                    id="home"
                                    role="tabpanel"
                                    aria-labelledby="home-tab"
                                >
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Heading</label>
                                        </div>
                                        <div className="col-md-6">
                                            {rows.Heading ? <p>{rows.Heading}</p> : <p>_</p>}
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Description</label>
                                        </div>
                                        <div className="col-md-6">
                                            {rows.Description ? (
                                                <p>{rows.Description}</p>
                                            ) : (
                                                <p>_</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>createdAte</label>
                                        </div>
                                        <div className="col-md-6">
                                            {rows.createdAt ? (
                                                <p>{rows.createdAt}</p>
                                            ) : (
                                                <p>_</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>updatedAt</label>
                                        </div>
                                        <div className="col-md-6">
                                            {rows.updatedAt ? (
                                                <p>{rows.updatedAt}</p>
                                            ) : (
                                                <p>_</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div>

        </>
        
    )
}
