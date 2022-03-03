import React, {InputHTMLAttributes} from 'react'
import {useField} from 'formik'
import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Textarea } from '@chakra-ui/textarea'
function MyTextField({label, ...props}) {
    const [field, meta, helpers] = useField(props);
    return (
      <>
        <label>
          {label}
          <input {...field} {...props} />
        </label>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };

export default MyTextField