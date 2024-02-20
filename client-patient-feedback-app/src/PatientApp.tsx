import React, { useEffect } from 'react'
import { useState } from "react";
import axios from 'axios';
import './PatientApp.css';

// Define types
type Name = {
  FirstName: string;
  LastName: string;
}

type PatientCaseData = {
  PatientName: Name;
  DoctorName: Name;
  Dignosis: string;
}

const defaultFormData = {
  DoctorRecScore: "",
  ManageDiagosis: "",
  Feeling: "",
  ManageDiagosisComment: "",
};
function PatientApp() {
  const [patientFirstName, setPatientFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  try {
    axios.get<PatientCaseData>('http://0.0.0.0:8080/patientCaseDetails')
      .then((response) => {
        setPatientFirstName(response.data.PatientName.FirstName);
        setDoctorLastName(response.data.DoctorName.LastName);
        setDiagnosis(response.data.Dignosis);
      });

  } catch (err) {
    console.error(err);
  }

  const [formData, setFormData] = useState(defaultFormData);
  const { DoctorRecScore, ManageDiagosis, Feeling, ManageDiagosisComment } = formData;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onManageDiagosis = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    axios.post('http://0.0.0.0:8080/patientFeedback', {
      "DoctorRecScore": Number(formData.DoctorRecScore),
      "ManageDiagosis": formData.ManageDiagosis,
      "Feeling": formData.Feeling,
      "ManageDiagosisComment": formData.ManageDiagosisComment
    }).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });

    setFormData(defaultFormData);
  };


  return (
    <div className="PatientApp">
      <h1>Patient Feedback App</h1>

      <form onSubmit={onSubmit}>
        <label htmlFor="recommendation">{getRecommendText(patientFirstName, doctorLastName)}</label>
        <br />
        <input type="text" id="DoctorRecScore" value={DoctorRecScore} onChange={onChange} />
        <br />
        <br />
        <label htmlFor="explain">{getExplainText(doctorLastName, diagnosis)}</label>
        <br />
        <input type="text" id="ManageDiagosis" value={ManageDiagosis} onChange={onChange} />
        <br />
        <br />
        <label htmlFor="explainComment">Will you like to add a comment?</label>
        <br />
        <input type="text" id="ManageDiagosisComment" value={ManageDiagosisComment} onChange={onChange} />
        <br />
        <br />
        <label htmlFor="feeling">{getFeelingText(diagnosis)}</label>
        <br />
        <input type="text" id="Feeling" value={Feeling} onChange={onChange} />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function getFeedbackReccomendation(score: number, doctorLastName: string): string {
  const fed1 = "On a scale of 1-10, would you recommend Dr " + doctorLastName +
    " to a friend or family member? \nYour answer: " + score;
  return fed1;
}
function getFeedbackExplain(doctorLastName: string, diagnosis: string, manage: string): string {
  const fed2 = "You were diagnosed with " + diagnosis +
    ". Did Dr " + doctorLastName +
    " explain how to manage this diagnosis in a way you could understand?\nYour answer: " + manage;
  return fed2;
}

function getFeedbackFeeling(diagnosis: string, feeling: string): string {
  const fed3 = "How do you feel about being diagnosed with " + diagnosis + " ?\nYour answer: " + feeling;
  return fed3;
}

function getRecommendText(patientFirstName: string, doctorLastName: string): string {
  const recommendText = "Hi " + patientFirstName + ", on a scale of 1-10, would you recommend Dr " +
    doctorLastName + " to a friend or family member? 1 = Would not recommend, 10 = Would strongly recommend";
  return recommendText;
}

function getExplainText(doctorLastName: string, diagnosis: string): string {
  const explainText = "Thank you. You were diagnosed with " + diagnosis + ". " +
    "Did Dr " + doctorLastName + " explain how to manage this diagnosis in a way you could understand?";
  return explainText;
}
function getFeelingText(diagnosis: string): string {
  const feelingText = "We appreciate the feedback, one last question: how do you feel about being diagnosed with " +
    diagnosis + "?";
  return feelingText;
}

export default PatientApp;