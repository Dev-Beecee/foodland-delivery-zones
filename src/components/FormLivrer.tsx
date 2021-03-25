import { Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import generatePassword  from "password-generator";
import { useState } from "react";
import * as dotenv from 'dotenv';
import nodefetch from 'node-fetch';

dotenv.config()

export const FormLivrer = () : JSX.Element => {
    const [driverGroups , setDriverGroups] = useState<{id: Number, name: String}[]>();
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = async (data : any) => {
        console.log(data);
        const maxLength = 18;
        const minLength = 8;
        let randomLength = Math.floor(Math.random() * (maxLength - minLength)) + minLength;
        let password = generatePassword(randomLength, false, /[\w\d?-]/, `${data.name[0]}-`);
        const url = 'https://apiv4.ordering.co/v400/en/foodland/users';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'sMbNsNE6X7eq3kNJwSh0YtSdM7dWv81BB5_Vrb0dpKkk1bkqcisngoF01uCxbXwSy'
            },
            body: JSON.stringify({
                country_phone_code: 1,
                level: 4,
                busy: false,
                available: true,
                enabled: true,
                name: data.name,
                lastname: data.lastname,
                email: data.email,
                password: password,
                cellphone: data.cellphone,
            })
        }
        console.log(options)
        /*axios({
            method: 'post',
            url: url,
            headers : {
                'Content-Type': 'application/json',
                'x-api-key': process.env.APIKEY
            },
            responseType:'json',
            data: {
                name: data.name,
                lastname: data.lastname,
                email: data.email,
                password: password,
                cellphone: data.cellphone,
                level : 4,
                city_id: 1,
                location: JSON.stringify({lat: 0, lng: 1}),
                drivergroups: { 0: {id : data.drivergroups}}
            }
        })
        .then(response => console.log(response))
        .catch(err => console.error(err))*/
        

        nodefetch(url, options)
            .then(res => res.json())
            .then(json => {
                console.log(json);
            })
            .catch(err => console.error(err))
    }
        const driverUrl = 'https://apiv4.ordering.co/v400/en/foodland/drivergroups';
        const driversOptions = {
            method: 'GET',
            headers: {
                'x-api-key': 'sMbNsNE6X7eq3kNJwSh0YtSdM7dWv81BB5_Vrb0dpKkk1bkqcisngoF01uCxbXwSy',
            }
          };
        window.addEventListener('load' , () => {

            fetch(driverUrl , driversOptions)
                .then(res => res.json())
                .then((out) =>{
                    let groups: {id: Number, name: String}[] = out.result.map( (group: { id: Number; name: String; }) => {
                        return {
                            id : group.id,
                            name : group.name,
                        }
                    });
                    setDriverGroups(groups)
                })
        })

    return (
        <>
            <h1>Créer un livreur</h1>
            <Form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">
                <Form.Row className="row my-2">
                    <Col sm={6}>
                        {errors.email && <span className="text-danger text-center">Email requis</span>}
                        <Form.Control ref={register} name="lastname" type="text" placeholder="Nom*"/>
                    </Col>
                    <Col sm={6}>                    
                        <Form.Control ref={register} name="name" type="text" placeholder="Prénom" />
                    </Col>
                </Form.Row>
                <Form.Group className="input-group my-2">
                    {errors.email && <span className="text-danger text-center">Email requis</span>}
                    <span className="input-group-text">@</span>
                    <Form.Control ref={register({required : true})} name="email" type="text" aria-describedby="inputGroupPrepend" placeholder="email*"/>
                </Form.Group>
                
                <Form.Control ref={register} name="cellphone" type="text" placeholder="Telephone" className="my-2"/>
                
                <select ref={register} name="drivergroups" className="form-select" onChange={(e) => console.log(e.target.value)}>
                    {driverGroups?.map((item : any)=>(
                        <option value={item.id}>{item.name}</option>
                    ))}
                </select>
                <input type="submit" className="btn btn-success my-5" value="créer"/>

            </Form>
        </>
    )
};
