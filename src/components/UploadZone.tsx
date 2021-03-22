import { makeStyles } from "@material-ui/styles";
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const useStyles = makeStyles({
    dropZone: {
        width: '300px',
        height: '100px',
        opacity:'0',
        position: 'relative',
        zIndex: 1
    },
    dzOverlay: {
        width: '300px',
        height: '100px',
        border: 'solid 3px white',
        borderRadius:'',
        fontFamily: 'cursive',
        color: '#black',
        position: 'absolute',
        top: '3px',
        right: '836px',
        textAlign: 'center',
    }
})


const UploadZone = (): JSX.Element => {
    const classes = useStyles()
    const [selectedFile, setSelectedFile]: any = useState(undefined);
    const handleClick = (e : {target : any}): any => {
        const file = e.target.files[0]
        file.text().then((text : string) => console.log(text))
        setSelectedFile(file)
    }   

    function dropZone(){
        
        if(selectedFile && selectedFile.name){
            console.log(selectedFile.name)
            return (<div>{selectedFile.name}</div>)
        }else {
            console.log("nothing here")
            return (
                <div className={classes.dzOverlay}>Glissez votre fichier kml ici <br />ou<br />Cliquez pour ajouter</div>
            )
        }

    }
    return(
        
            <Col>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <label></label>
                    <input type="file" name="file" className={classes.dropZone} onChange={handleClick}/>
                    {dropZone()}
                </div>
            </Col>
          
    )
};

