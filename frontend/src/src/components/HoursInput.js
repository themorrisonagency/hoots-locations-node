import React from 'react'
import { Formik, Field, Form, FormikHelpers } from "formik"

function HoursInput(obj) {
  const { hours } = obj
  return (
      <>
          {Object.keys(hours).map((day) => (
        <div className="hoursWrapper">
        <label>{day}</label>
        <br />
        <label htmlFor={day}>Open</label>
          <Field id={`${day}Open`} name={`${day}Open`} placeholder={`${day}Open`} />
          <label htmlFor={day}>Close</label>
          <Field id={`${day}Close`} name={`${day}Close`} placeholder={`${day}Close`} />

        </div>
    ))}
    </>
  )  
}

export default HoursInput