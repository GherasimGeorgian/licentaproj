import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Container } from '@material-ui/core';
import { height } from '@mui/system';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { getproductbyId, getProductSelector } from '../features/Slice/productItems/productlistSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ResponsiveAppBar from './ResponsiveBarApp';
import LinearProgress from '@mui/material/LinearProgress';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '75vh', 
        
    },
    inputImage:{
     
    },
    container2:{
  
    },
    button_gen:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
    }
   
  })
);
function convertToByteArray(input:any) {
  var sliceSize = 512;
  var bytes = [];

  for (var offset = 0; offset < input.length; offset += sliceSize) {
      var slice = input.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);

      for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      bytes.push(byteArray);
  }

  return bytes;
}
export function VirtualDressing() {

    let { id } = useParams();


    const dispatch = useAppDispatch();
    
    
   
    useEffect(() => {
      if (id) {
          dispatch<any>(getproductbyId({id:Number(id)}));
      }
    },[id]); 
    const product = useSelector(getProductSelector)

    const classes = useStyles();
    const [fileSelected, setFileSelected] = React.useState<File>() // also tried <string | Blob>
    const [picture, setPicture] = React.useState('');
    const [picturerec, setPicturerec] = React.useState('');
    const [loadingScreen, setloadingScreen] = React.useState(0);
    let comp;
    let response_gen;
    let button_generate;
    let loadingScr;
    const [fileformData, setFileformData] = React.useState<FormData>()
    //const formData = new FormData();
    const reader = new FileReader();
    const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files;

        if (!fileList) return;
        
        setFileSelected(fileList[0]);

        setPicture(URL.createObjectURL(fileList[0]));
        const formData = new FormData();
        formData.append("image", fileList[0]);
        setFileformData(formData)

    };

    
  const handleVirtualDressing= async () => {
    setloadingScreen(1)
    axios
    .post("http://localhost:5000/virtual_dressing/"+(product.product_.url_image).split(".")[0], fileformData)
    .then((response) => {
      console.log(response)
      setPicturerec(`data:image/jpeg;base64,${response.data}`)
      console.log(picturerec)
      //const Example = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} />
      //var blob = atob(response.data);
      //var file = new Blob(convertToByteArray(blob), { type: "image/jpg" });
      //var imageUrl = window.URL.createObjectURL(file);
      setloadingScreen(0)
      //return response.data;
    })
    .catch(err => console.warn(err));
   
  }
  
  const uploadFile = function (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
  
    
};
    if(loadingScreen){
     loadingScr = <div><Box sx={{ width: '100%' }}>
                  <LinearProgress />
                </Box></div> 
    }

    if (!fileSelected) {
        
        comp = <div className={classes.inputImage}>
        <label htmlFor="photo">
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="photo"
            name="photo"
            type="file"
            multiple={false}
            onChange={handleImageChange}
          />

          <Button
           // className={classes.buttons}
            component="span"
            variant="contained"
      
          >
            Alege o imagine pentru a testa 
            <br/>
            îmbracămintea selectată (click aici)
          </Button>
        </label>
      </div>

    } else {
        
        button_generate = <div  className={classes.button_gen}>
        <Button variant="contained"  onClick={handleVirtualDressing}>Generate</Button> 
        </div>
        comp = 


            <Card  sx={{ maxWidth: 300 }}>
            <Typography gutterBottom variant="h6" component="div">
                Imaginea pentru care se face testul virtual
            </Typography>
            <CardMedia
                      component="img"
                      height="340"
                      image={picture}
                      alt="green iguana"
                    />
            <CardContent>
              
            </CardContent>
            <CardActions>
            <label htmlFor="photo">
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="photo"
            name="photo"
            type="file"
            multiple={false}
            onChange={handleImageChange}
          />

          <Button
           // className={classes.buttons}
            component="span"
            variant="contained"
      
          >
          Alege alta imagine
          </Button>
        </label>
            </CardActions>
          
            </Card>


      if(picturerec != ''){
      response_gen =


<Card  sx={{ maxWidth: 300 }}>
<Typography gutterBottom variant="h6" component="div">
    Rezultat proba virtuala
</Typography>
<CardMedia
        component="img"
        height="340"
        image={picturerec}
        alt="green iguana"
      />
<CardContent>
  
</CardContent>
<CardActions>

</CardActions>

</Card>
      }

    }
    return (
        <div className={classes.container2}>
          <ResponsiveAppBar/> 
          
            <div className={classes.container}>
            
                <Card  sx={{ maxWidth: 300 }}>
                <Typography gutterBottom variant="h6" component="div">
                    Îmbrăcămintea selectatată pentru testul virtual
                </Typography>
                <CardMedia
                    component="img"
                    height="340"
                    image={"http://127.0.0.1:5000/imgs/"+ product.product_.url_image} 
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                    {product.product_.denumire}
                    </Typography>
                  
                </CardContent>
                <CardActions>
                    {/* <Button size="small">Adauga in cos</Button> */}
                </CardActions>
                
                </Card>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

                {comp}
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                {response_gen}
              
                </div>
                {loadingScr}  
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                {button_generate}
        </div>
      );
  }
  