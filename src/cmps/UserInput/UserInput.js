import React, { useState } from 'react'
import './UserInput.css'
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

        <div className="input_wrapper">
            <form className='container_form' onSubmit={handleSubmit}>
                <label>
                    <input placeholder="Search for a movie..." className='user_input' type="text" value={value} onChange={handleChange} />
                    <button className='input_btn'>Search</button>
                </label>
            </form>
            <div className="bg_img_txt">
                Plenty of movies to discover.<br />
                Explore,share,enjoy
            </div>
        </div>
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