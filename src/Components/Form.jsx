import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import * as yup from "yup";
import axios from "axios";

const formSchema = yup.object().shape({
    name: yup.string().required("please input a name").min(2, "Name must be more than 2 characters."),
    textarea: yup.string(),
    dropdown: yup.string().oneOf(["Small", "Medium", "Large"]),
    Pepperoni: yup.boolean(),
    Ham: yup.boolean(),
    Cheese: yup.boolean(),
    Olives: yup.boolean(),
    coronaVirus: yup.boolean()
})
.test("personal test", 
null,
(obj) => {
    if( obj.Pepperoni || obj.Ham || obj.Cheese || obj.Olives || obj.coronaVirus) {
        return true; //everything is fine
    }
    return new yup.ValidationError(
        "Please check one checkbox",
        null,
        "personal test"
    )
})
;

export default function Form() {

        // state for your button and whether you can submit depending on if you fill out required fields
        const [button, setButton] = useState(true);
        // state for our form
        const [formState, setFormState] = useState({
            name: "",
            textarea: "",
            dropdown: "",
        });
        // state for our errors
        const [errors, setErrors] = useState({
            name: "",
            textarea: "",
            dropdown: "",
        });
        // state for our post request 
        const [post, setPost] = useState([]);
        useEffect(() => {
            formSchema.isValid(formState).then(valid => {
                setButton(!valid);
            });
        }, [formState]);
        const formSubmit = e => {
            e.preventDefault();
            axios
                .post("https://reqres.in/api/orders", formState)
                .then(res => {
                    setPost(res.data); 
                    setFormState({
                        name: "",
                        textarea: "",
                        dropdown: "",
                    });
                })
                .catch(err => console.log("something went wrong when submitting your form", err.response));
        };
        const validateChange = e => {
            yup 
                .reach(formSchema, e.target.name)
                .validate(e.target.name === "terms" ? e.target.checked : e.target.value)
                .then(valid => {
                    setErrors({
                        ...errors,
                        [e.target.name]: ""
                    });
                })
                .catch(err => {
                    setErrors({
                        ...errors,
                        [e.target.name]: err.errors[0]
                    });
                });
        };
        const inputChange = e => {
            e.persist(); // constantly checking to see what the user is typing in and checking if its valid
            const newFormData = {
                ...formState,
                [e.target.name]:
                e.target.type  === "checkbox" ? e.target.checked : e.target.value
            };
            validateChange(e);
            setFormState(newFormData);
        };

    return (
        <div>
            <Link to="/">
                Home
            </Link>

            <form onSubmit={formSubmit}>
                <label htmlFor="name">
                    Name
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={inputChange}
                    />
                    {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null} 
                </label><br/>

                <label htmlFor="dropdown">
                Choose your pizza size 
                 <select 
                    id="dropdown" 
                    name="dropdown"
                    onChange={inputChange}
                    >
                    <option value="selectOne">Select One</option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                </select>
            </label> <br/>

                <p>Select your toppings</p>

                <label htmlFor="toppings">
                    <input
                        type="checkbox"
                        name="Pepperoni"
                        onChange={inputChange}
                    />Pepperoni
                </label>

                <label htmlFor="toppings">
                    <input
                        id="toppings"
                        name="Ham"
                        type="checkbox"
                        onChange={inputChange}
                    />Ham
                </label><br/>
                
                <label htmlFor="toppings">
                    <input
                        id="toppings"
                        name="Cheese"
                        type="checkbox"
                        onChange={inputChange}
                    />Cheese
                </label>
                
                <label htmlFor="toppings">
                    <input
                        id="toppings"
                        name="Olives"
                        type="checkbox"
                        onChange={inputChange}
                    />Olives
                </label><br/>
                
                <label htmlFor="toppings">
                    <input
                        id="toppings"
                        name="coronaVirus"
                        type="checkbox"
                        onChange={inputChange}
                    />Corona Virus
                </label><br/>

                <label htmlFor="instructions">
                    Any special instructions?
                    <textarea
                        id="textarea"
                        name="textarea"
                        value={formState.textarea}
                        onChange={inputChange}
                    />
                </label><br/>
                <pre>{JSON.stringify(post, null, 2)}</pre>
                <button disabled={button}>Add to Order</button>

            </form>
        </div>
    )
}