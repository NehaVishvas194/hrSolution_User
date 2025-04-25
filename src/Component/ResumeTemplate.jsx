import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Context, Bold, Essentials, Italic, Paragraph, ContextWatchdog } from 'ckeditor5';
import { CKEditorContext } from '@ckeditor/ckeditor5-react';
import CategoryIcon from '@mui/icons-material/Category';


const ResumeTemplate = () => {
    const [step, setStep] = useState(1);
    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    return (
        <div>
            <Header />
            <section>
                <div className="container-fluid mt-5">
                    <div className="row mt-5">
                        {step === 1 && (
                            <div className="col-lg-7 mt-5 pt-5 ">
                                
                                 <h5>Resume Heading</h5>
                                 
                                <div className="col-lg-12 col-12">
                                    <div className="form-group">
                                        <div className="profile-pic">
                                            <img
                                                alt="not found"
                                                className="rounded-circle"
                                                height={200}
                                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                            />

                                            <input
                                                id="profile-image-upload"
                                                type="file"
                                                name="image"
                                                // onChange={imageFunction}
                                                className="file-input"
                                            />
                                            <div style={{ color: "#999" }}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-12 d-flex mt-5'>
                                    <div className='col-lg-6 p-2'>
                                        <TextField id="outlined-basic" label="firstName" variant="outlined" />
                                    </div>
                                    <div className='col-lg-6 p-2'>
                                        <TextField id="outlined-basic" label="lastName" variant="outlined" />
                                    </div>
                                </div>
                                <div className='col-lg-12 d-flex'>
                                    <div className='col-lg-6 p-2'>
                                        <TextField id="outlined-basic" label="city" variant="outlined" />
                                    </div>
                                    <div className='col-lg-6 p-2 d-flex'>
                                        <div className='col-lg-6 px-2'>
                                            <TextField id="outlined-basic" label="country" variant="outlined" />
                                        </div>
                                        <div className='col-lg-6'>
                                            <TextField id="outlined-basic" label="zip" variant="outlined" />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-12 d-flex'>
                                    <div className='col-lg-6 p-2'>
                                        <TextField id="outlined-basic" label="phoneNo" variant="outlined" />
                                    </div>
                                    <div className='col-lg-6 p-2'>
                                        <TextField id="outlined-basic" label="userEmail" variant="outlined" />
                                    </div>
                                </div>
                                <div className='col-lg-12 d-flex'>
                                    <div className='col-lg-6 p-2'>

                                    </div>
                                    <div className='col-lg-6 p-2' style={{ "textAlign": "end" }}>
                                        <Button variant="contained" onClick={nextStep}>Next</Button>
                                    </div>
                                </div>
                            </div>

                        )}

                        {step === 2 && (
                            <>

                                <div className="col-lg-7 mt-5 pt-5 ">
                                    <h5>Add details about your work experience</h5>
                                    <div className='col-lg-12 d-flex mt-5'>
                                        <div className='col-lg-6 p-2'>
                                            <TextField id="outlined-basic" label="jobTitle" variant="outlined" />
                                        </div>
                                        <div className='col-lg-6 p-2'>
                                            <TextField id="outlined-basic" label="Employer" variant="outlined" />
                                        </div>
                                    </div>
                                    <div className='col-lg-12 d-flex'>
                                        <div className='col-lg-6 p-2'>
                                            <TextField id="outlined-basic" label="city" variant="outlined" />
                                        </div>
                                        <div className='col-lg-6 p-2'>
                                            <TextField id="outlined-basic" label="country" variant="outlined" />
                                        </div>
                                    </div>
                                    <div className='col-lg-12 d-flex'>
                                        <div className='col-lg-6 p-2'>
                                            <TextField id="outlined-basic" label="startDate" variant="outlined" />
                                        </div>
                                        <div className='col-lg-6 p-2'>
                                            <TextField id="outlined-basic" label="endDate" variant="outlined" />
                                            <div className='col-lg-12 p-2'>
                                                <input type="checkbox" id="vehicle1" name="vehicle1" defaultValue="Bike" />
                                                <label htmlFor="vehicle1"> I currently work here</label>
                                                <br />
                                            </div>

                                        </div>
                                    </div>
                                    <div className='col-lg-12 d-flex'>
                                        <div className='col-lg-6 p-2'>
                                            <Button variant="contained" onClick={prevStep}>Back</Button>
                                        </div>
                                        <div className='col-lg-6 p-2' style={{ "textAlign": "end" }}>
                                            <Button variant="contained" onClick={nextStep}>Next</Button>
                                        </div>

                                    </div>
                                </div></>

                        )}

                        {step === 3 && (
                            <>

                                <div className="col-lg-7 mt-5 pt-5 ">
                                    <h5>Tell us about your education</h5>
                                    <div className='col-lg-12 d-flex mt-5'>
                                        <div className='col-lg-6 p-2'>
                                            <TextField id="outlined-basic" label="schoolName" variant="outlined" />
                                        </div>
                                        <div className='col-lg-6 p-2'>
                                            <TextField id="outlined-basic" label="schoolLocation" variant="outlined" />
                                        </div>
                                    </div>
                                    <div className='col-lg-12 d-flex'>
                                        <div className='col-lg-6 p-2'>
                                            <TextField id="outlined-basic" label="degree" variant="outlined" />
                                        </div>
                                        <div className='col-lg-6 p-2'>
                                            <TextField id="outlined-basic" label="fieldOfStudy" variant="outlined" />
                                        </div>
                                    </div>
                                    <div className='col-lg-12 d-flex'>
                                        <div className='col-lg-6 p-2'>
                                            <TextField id="outlined-basic" label="start_Date" variant="outlined" />
                                        </div>
                                        <div className='col-lg-6 p-2'>
                                            <TextField id="outlined-basic" label="end_Date" variant="outlined" />
                                            <div className='col-lg-12 p-2'>
                                                <input type="checkbox" id="vehicle1" name="vehicle1" defaultValue="Bike" />
                                                <label htmlFor="vehicle1"> I’m still enrolled</label>
                                                <br />
                                            </div>

                                        </div>
                                    </div>
                                    <div className='col-lg-12 d-flex'>
                                        <div className='col-lg-6 p-2'>
                                            <Button variant="contained" onClick={prevStep}>Back</Button>
                                        </div>
                                        <div className='col-lg-6 p-2' style={{ "textAlign": "end" }}>
                                            <Button variant="contained" onClick={nextStep}>Next</Button>
                                        </div>

                                    </div>
                                </div></>

                        )}
                        {step === 4 && (
                            <>

                                <div className="col-lg-7 mt-5 pt-5 ">
                                    <h5>skills</h5>
                                    <div className='col-lg-12 mt-5'>
                                        <CKEditorContext
                                            context={Context}
                                            contextWatchdog={ContextWatchdog}
                                            onChangeInitializedEditors={(editors) => {
                                                console.info(editors.editor1?.instance, editors.editor1?.yourAdditionalData);
                                            }}>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                config={{
                                                    plugins: [Essentials, Bold, Italic, Paragraph],
                                                    toolbar: ['undo', 'redo', '|', 'bold', 'italic'],
                                                }}
                                                data='<p>Add skills</p>'
                                                contextItemMetadata={{
                                                    name: 'editor1',
                                                    yourAdditionalData: 2
                                                }}
                                                onReady={(editor) => {
                                                    // You can store the "editor" and use when it is needed.
                                                    console.log('Editor 1 is ready to use!', editor);
                                                }}
                                            />
                                        </CKEditorContext>
                                    </div>


                                    <div className='col-lg-12 d-flex'>
                                        <div className='col-lg-6 p-2'>
                                            <Button variant="contained" onClick={prevStep}>Back</Button>
                                        </div>
                                        <div className='col-lg-6 p-2' style={{ "textAlign": "end" }}>
                                            <Button variant="contained" onClick={nextStep}>Next</Button>
                                        </div>

                                    </div>
                                </div></>

                        )}
                        {step === 5 && (
                            <div className="col-lg-7 mt-5 pt-5 ">
                                <h5>Certifications</h5>

                                <div className='col-lg-12  mt-5'>
                                    <div className='col-lg-12 p-2'>
                                        <TextField id="outlined-basic" label="title" variant="outlined" />
                                    </div>

                                </div>
                                <div className='col-lg-12 '>
                                    <div className='col-lg-12 p-2'>
                                        <TextField
                                            label="Description"
                                            variant="outlined"
                                            multiline
                                            rows={4} // Adjust the number of rows as needed
                                            fullWidth // Optional: makes the input take the full width of its container
                                        />
                                    </div>

                                </div>

                                <div className='col-lg-12 d-flex'>
                                    <div className='col-lg-6 p-2'>
                                        <Button variant="contained" onClick={prevStep}>Back</Button>
                                    </div>
                                    <div className='col-lg-6 p-2' style={{ "textAlign": "end" }}>
                                        <Button variant="contained" onClick={nextStep}>Next</Button>
                                    </div>

                                </div>
                            </div>

                        )}
                        {step === 6 && (
                            <div className="col-lg-7 mt-5 pt-5 ">
                                <h5>Languages</h5>

                                <div className='col-lg-12 mt-5'>
                                    <CKEditorContext
                                        context={Context}
                                        contextWatchdog={ContextWatchdog}
                                        onChangeInitializedEditors={(editors) => {
                                            console.info(editors.editor1?.instance, editors.editor1?.yourAdditionalData);
                                        }}>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            config={{
                                                plugins: [Essentials, Bold, Italic, Paragraph],
                                                toolbar: ['undo', 'redo', '|', 'bold', 'italic'],
                                            }}
                                            data='<p>Add Languages</p>'
                                            contextItemMetadata={{
                                                name: 'editor1',
                                                yourAdditionalData: 2
                                            }}
                                            onReady={(editor) => {
                                                // You can store the "editor" and use when it is needed.
                                                console.log('Editor 1 is ready to use!', editor);
                                            }}
                                        />
                                    </CKEditorContext>
                                </div>

                                <div className='col-lg-12 d-flex'>
                                    <div className='col-lg-6 p-2'>
                                        <Button variant="contained" onClick={prevStep}>Back</Button>
                                    </div>
                                    <div className='col-lg-6 p-2' style={{ "textAlign": "end" }}>
                                        <Button variant="contained" onClick={nextStep}>Next</Button>
                                    </div>

                                </div>
                            </div>

                        )}
                        {step === 7 && (
                            <div className="col-lg-7 mt-5 pt-5 ">
                                <h5>websites And SocialLinks </h5>


                                <div className='col-lg-12 d-flex mt-5'>
                                    <div className='col-lg-6 p-2'>
                                        <TextField id="outlined-basic" label="linkedIn" variant="outlined" />
                                    </div>
                                    <div className='col-lg-6 p-2'>
                                        <TextField id="outlined-basic" label="github" variant="outlined" />
                                    </div>
                                </div>
                                <div className='col-lg-12 d-flex'>
                                    <div className='col-lg-6 p-2'>
                                        <TextField id="outlined-basic" label="Portfolio" variant="outlined" />
                                    </div>
                                    <div className='col-lg-6 p-2'>
                                        <TextField id="outlined-basic" label="twitter" variant="outlined" />
                                    </div>
                                </div>
                                <div className='col-lg-12 d-flex'>
                                    <div className='col-lg-6 p-2'>
                                        <TextField id="outlined-basic" label="stackOverflow" variant="outlined" />
                                    </div>
                                    <div className='col-lg-6 p-2'>
                                        <TextField id="outlined-basic" label="codepen" variant="outlined" />
                                    </div>
                                </div>


                                <div className='col-lg-12 d-flex'>
                                    <div className='col-lg-6 p-2'>
                                        <Button variant="contained" onClick={prevStep}>Back</Button>
                                    </div>
                                    <div className='col-lg-6 p-2' style={{ "textAlign": "end" }}>
                                        <Button variant="contained" onClick={nextStep}>Next</Button>
                                    </div>

                                </div>
                            </div>

                        )}
                        {step === 8 && (
                            <div className="col-lg-7 mt-5 pt-5 ">
                                <h5>websites And SocialLinks </h5>


                                <div className='col-lg-12 d-flex mt-5'>
                                    <div className='col-lg-6 p-2'>
                                        <TextField id="outlined-basic" label="linkedIn" variant="outlined" />
                                    </div>
                                    <div className='col-lg-6 p-2'>
                                        <TextField id="outlined-basic" label="github" variant="outlined" />
                                    </div>
                                </div>
                                <div className='col-lg-12 d-flex'>
                                    <div className='col-lg-6 p-2'>
                                        <TextField id="outlined-basic" label="Portfolio" variant="outlined" />
                                    </div>
                                    <div className='col-lg-6 p-2'>
                                        <TextField id="outlined-basic" label="twitter" variant="outlined" />
                                    </div>
                                </div>
                                <div className='col-lg-12 d-flex'>
                                    <div className='col-lg-6 p-2'>
                                        <TextField id="outlined-basic" label="stackOverflow" variant="outlined" />
                                    </div>
                                    <div className='col-lg-6 p-2'>
                                        <TextField id="outlined-basic" label="codepen" variant="outlined" />
                                    </div>
                                </div>


                                <div className='col-lg-12 d-flex'>
                                    <div className='col-lg-6 p-2'>
                                        <Button variant="contained" onClick={prevStep}>Back</Button>
                                    </div>
                                    <div className='col-lg-6 p-2' style={{ "textAlign": "end" }}>
                                        <Button variant="contained" onClick={nextStep}>Next</Button>
                                    </div>

                                </div>
                            </div>

                        )}
                        {step === 9 && (
                            <div className="col-lg-7 mt-5 pt-5 ">
                                <h5>Summary</h5>


                                <div className='col-lg-12 mt-5'>
                                    <CKEditorContext
                                        context={Context}
                                        contextWatchdog={ContextWatchdog}
                                        onChangeInitializedEditors={(editors) => {
                                            console.info(editors.editor1?.instance, editors.editor1?.yourAdditionalData);
                                        }}>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            config={{
                                                plugins: [Essentials, Bold, Italic, Paragraph],
                                                toolbar: ['undo', 'redo', '|', 'bold', 'italic'],
                                            }}
                                            data='<p>Add jobTitleSummary</p>'
                                            contextItemMetadata={{
                                                name: 'editor1',
                                                yourAdditionalData: 2
                                            }}
                                            onReady={(editor) => {
                                                // You can store the "editor" and use when it is needed.
                                                console.log('Editor 1 is ready to use!', editor);
                                            }}
                                        />
                                    </CKEditorContext>
                                </div>

                                <div className='col-lg-12 mt-5'>
                                    <CKEditorContext
                                        context={Context}
                                        contextWatchdog={ContextWatchdog}
                                        onChangeInitializedEditors={(editors) => {
                                            console.info(editors.editor1?.instance, editors.editor1?.yourAdditionalData);
                                        }}>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            config={{
                                                plugins: [Essentials, Bold, Italic, Paragraph],
                                                toolbar: ['undo', 'redo', '|', 'bold', 'italic'],
                                            }}
                                            data='<p>Add awardsAndAchievements </p>'
                                            contextItemMetadata={{
                                                name: 'editor1',
                                                yourAdditionalData: 2
                                            }}
                                            onReady={(editor) => {
                                                // You can store the "editor" and use when it is needed.
                                                console.log('Editor 1 is ready to use!', editor);
                                            }}
                                        />
                                    </CKEditorContext>
                                </div>



                                <div className='col-lg-12 d-flex'>
                                    <div className='col-lg-6 p-2'>
                                        <Button variant="contained" onClick={prevStep}>Back</Button>
                                    </div>
                                    <div className='col-lg-6 p-2' style={{ "textAlign": "end" }}>
                                        <Button variant="contained" onClick={nextStep}>Next</Button>
                                    </div>

                                </div>
                            </div>

                        )}




                        <div className="col-lg-5 mt-5" style={{ "borderStyle": "solid" }}>
                            <div className="resumeTempOne">
                                <div className="resumeHeader">
                                    <div><p>New Delhi, India 110034</p></div>
                                    <div><p>+919824303025</p></div>
                                    <div><p>admin@gmail.com</p></div>
                                </div>
                                <div className="resumeContent">
                                    <h1 className="nameHolder">
                                        Miss. Pratima Pathak
                                    </h1>
                                    <div className="summarySec">
                                        <div>
                                            <div style={{ width: '150px' }}>
                                                <h4>Summary</h4>
                                            </div>
                                        </div>

                                        <div>
                                            <p>Organized and self-motivated software engineer graduate with 2+ years combined internship and professional experience. Fluent in .Net C#, SQL, Python, JavaScript, and CSS programming languages. </p>
                                        </div>
                                    </div>
                                    <div className="summarySec">
                                        <div>
                                            <div style={{ width: '150px' }}>
                                                <h4>Skills</h4>
                                            </div>
                                        </div>
                                        <div className='parentSkill'>
                                            <ul>
                                                <li>Cash Registor Operation</li>
                                                <li>POS System Operation</li>
                                                <li>Sales Expertise</li>
                                                <li>Team Work</li>
                                                <li>Cash Registor Operation</li>
                                            </ul>
                                            <ul>
                                                <li> Inventory Management</li>
                                                <li> Accurate money Handling </li>
                                                <li> Inventory Management</li>
                                                <li> Retail Management</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="summarySec">
                                        <div>
                                            <div style={{ width: '150px' }}>
                                                <h4>Experience</h4>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="parantAdress">
                                                <div>
                                                    <p><strong>Retails Sales Associates ZARA</strong> New Delhi,India</p>

                                                </div>
                                                <div className="duration">
                                                    <p>2/07/2023 - </p>
                                                    <p> Current</p>
                                                </div>
                                            </div>
                                            <div className="detailJob">
                                                <p>Increased monthly sales 10% by effectively upselling and cross-selling products to maximize profitability. Prevented store losses by leveraging awareness, attention to detail, and integrity to identify and investigate
                                                    concerns.</p>
                                                <p>Processed payments and maintained accurate drawers to meet financial targets.</p>

                                            </div>
                                            <div className='mainCompany'>
                                                <div className="parantAdress">
                                                    <div>
                                                        <p><strong> BARISTA</strong> New Delhi,India</p>
                                                    </div>
                                                    <div className="duration">
                                                        <p>2/07/2022 - </p>
                                                        <p> 2/07/2022</p>
                                                    </div>
                                                </div>
                                                <div className="detailJob">
                                                    <p>Increased monthly sales 10% by effectively upselling and cross-selling products to maximize profitability. Prevented store losses by leveraging awareness, attention to detail, and integrity to identify..</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="summarySec">
                                        <div>
                                            <div style={{ width: '150px' }}>
                                                <h4>Education And Training</h4>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="parantAdress">
                                                <div>
                                                    <p><strong>B.tech in Electronics And Communication</strong></p>

                                                </div>
                                                <div className="duration">
                                                    <p>2/07/2020 - </p>
                                                    <p> 1/7/2024</p>
                                                </div>
                                            </div>
                                            <div className="detailJob">

                                                <p><strong>Sofcon India pvt. ltd , </strong> Greater Noida, India</p>
                                            </div>

                                        </div>

                                    </div>
                                    <div className="summarySec">
                                        <div>
                                            <div style={{ width: '150px' }}>
                                                <h4>Language</h4>
                                            </div>
                                        </div>
                                        <div>
                                            <p><strong>Hindi : </strong> <span> Native Speakers</span> </p>
                                            <p><strong>English : </strong> <span>Proficient</span> </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </section>
            <Footer />
        </div>
    )
}

export default ResumeTemplate
