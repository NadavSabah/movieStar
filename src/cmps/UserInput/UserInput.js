import React, { useState } from 'react'
import movieService from '../../services/movieService'
import { connect } from 'react-redux'



const UserInput = ({ inputResult, OnHandleSubmit }) => {

    const [value, setValue] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('handleSubmit', event)
        OnHandleSubmit(value)
        inputResult(value)
    }
    const handleChange = (event) => {
        setValue(event.target.value)
    }
    return (


        <form onSubmit={handleSubmit}>
            <label>
                Search
        <input type="text" value={value} onChange={handleChange} />
            </label>
        </form>
    )
}
const mapDIspatchToProps = dispatch => {
    return {
        OnHandleSubmit: async (value) => {
            const inputResults = await movieService.getInputResults(value)
                dispatch({ type: 'SET_INPUT_RESULTS', data: inputResults })
        }
    }
}


export default connect(null, mapDIspatchToProps)(UserInput)