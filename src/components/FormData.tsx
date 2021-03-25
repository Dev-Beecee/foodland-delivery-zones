import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { useForm } from "react-hook-form";
import dotenv from 'dotenv';

dotenv.config()

const useStyles = makeStyles({
  dropZone: {
    width: "300px",
    height: "100px",
    opacity: "0",
    position: "relative",
    zIndex: 1,
  },
  dzOverlay: {
    width: "300px",
    height: "100px",
    border: "solid 3px white",
    borderRadius: "25px",
    fontFamily: "cursive",
    color: "#black",
    position: "absolute",
    top: "494px",
    right: "810px",
    textAlign: "center",
    padding: "5px",
  },
});

const FormData = (): JSX.Element => {
  const [coordinates, setCoordinates] = useState({});
  const [statut, setStatut] = useState(false);
  const classes = useStyles();
  const [selectedFile, setSelectedFile]: any = useState(undefined);
  
  const handleClick = (e: { target: any }): any => {
    const file = e.target.files[0];
    file.text().then((text: string) => console.log(text));
    setSelectedFile(file);
  };

  function dropZone() {
    if (selectedFile && selectedFile.name) {
      return <div>{selectedFile.name}</div>;
    } else {
      return (
        <div className={classes.dzOverlay}>
          Glissez votre fichier kml ici <br />
          ou
          <br />
          Cliquez pour ajouter
        </div>
      );
    }
  }
  const { register, handleSubmit, watch } = useForm();
  const onSubmit = async (data: any) => {
    console.log(data);
    const file = data.file[0];
    if(file){
      await file.text().then((text: string) => {
        let nfCoords = text.split("<coordinates>")[1].split("</coordinates>")[0];
        let coords = nfCoords
          .split("\n")
          .slice(1, nfCoords.split("\n").length - 1)
          .reverse()
          .map((item) => {
            return { lat: Number(item[1]), lng: Number(item[0]) };
          });
        setCoordinates(coords);
      });
      axios({
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.APIKEY
        },
        url: `https://apiv4.ordering.co/v400/en/foodland/business/${data.idBusiness}/deliveryzones`,
        responseType:'json',
        data: {
          enabled: data.enabled,
          name: data.zoneName,
          address: data.address,
          type: 2,
          price: data.price,
          minimum: data.min,
          data: JSON.stringify(coordinates),
          schedule: JSON.stringify({enabled : true, lapses : {open : {hour:0 , minute:0}, close : {hour:23 , minute:59}}})
        }
      }).then(response => console.log(response.status))
        .catch(err => console.error(err));
    };
    console.log(watch("example"));
  }
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} className="col">
        <Form.Label>id du Restaurant</Form.Label>
        <FormControl
          ref={register}
          name="idBusiness"
          type="text"
          placeholder="id du restaurant"
        />

        <Form.Label>Nom de la zone</Form.Label>
        <input
          ref={register}
          name="zoneName"
          type="text"
          className="form-control"
        />

        <Form.Label>Adresse</Form.Label>
        <input
          ref={register}
          name="address"
          type="text"
          className="form-control"
        />

        <Form.Label>Prix minimum</Form.Label>
        <input ref={register} name="min" type="text" className="form-control" />

        <Form.Label>Prix</Form.Label>
        <input
          ref={register}
          name="price"
          type="text"
          className="form-control"
        />
        <label> statut de la zone </label>
        <div className="form-check form-switch">
          <input ref={register} name="enabled" className="form-check-input mx-2" type="checkbox" id="flexSwitchCheckDefault" onChange={(e) => {setStatut(e.target.checked);}}/>
          <label>{statut?  'active' : 'désactivé'}</label>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center my-5">
          <label></label>
          <input
            ref={register}
            type="file"
            name="file"
            className={classes.dropZone}
            onChange={handleClick}
          />
          {dropZone()}
        </div>
        <Button variant="success" type="submit" className="my-2">
          {" "}
          Envoyer{" "}
        </Button>
      </Form>
    </>
  );
};
export default FormData;
