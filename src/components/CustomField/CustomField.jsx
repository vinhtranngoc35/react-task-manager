
import React from 'react'
import SelectOptionField from './SelectOptionField'
import InputField from './InputField'
import { useId } from 'react'

const CustomField = (props) => {

    const key = useId();
    if (props.type === 'select') {
        return <SelectOptionField key={key} {...props} />
    }
    return <InputField key={key} {...props} />
}

export default CustomField