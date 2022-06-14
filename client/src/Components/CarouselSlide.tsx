import React, { useEffect } from 'react';
import { Card, createTheme, makeStyles } from '@material-ui/core';
import { useAppDispatch } from '../app/hooks';
import { getproductbyId, getProductSelector } from '../features/Slice/productItems/productlistSlice';
import { useSelector } from 'react-redux';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createTheme({
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  });

export default function CarouselSlide(props:any) {
    const { backgroundColor, id } = props.content;

    const useStyles = makeStyles(() => ({
        card: {
            backgroundColor,
            borderRadius: 5,
            padding: '75px 50px',
            margin: '0px 25px',
            width: '500px',
            boxShadow: '20px 20px 20px black',
            display: 'flex',
            justifyContent: 'center',
        },
        
    }));

    const classes = useStyles();

    const dispatch = useAppDispatch();
    
    
   
      useEffect(() => {
        if (id) {
            dispatch<any>(getproductbyId({id:Number(id)}));
        }
      },[id]); 
    const product = useSelector(getProductSelector)

    return (
        
        <Card className={classes.card}>
          
            <Grid container
            sx={{
                height: 600,
                width: 300,
                }}
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '10vh' }}>
           <Card  >
                    <Typography gutterBottom variant="h4" component="div" sx={{
        fontFamily: '-apple-system',
      }}>
                    {product.product_.denumire}
                    </Typography>
                <CardActionArea>
                <img src={"http://127.0.0.1:5000/imgs/"+ product.product_.url_image} width="200px" height="300px"/>
                    <CardContent  sx={{
                        height: 100,
                        width: 300,
                        }}>
                   
                    <Typography variant="body2" color="text.secondary">
                    {product.product_.descriere}
                    </Typography>
                    <ThemeProvider theme={theme}>
                    <Typography  gutterBottom variant="h5" component="div"  sx={{
        fontFamily: 'Apple Color Emoji',
      }}>
                    {`Pret: ${product.product_.pret} lei`}
                    </Typography>
                    </ThemeProvider>
                    </CardContent>
                </CardActionArea>
            </Card>
            </Grid>
        </Card>
       
    );
}