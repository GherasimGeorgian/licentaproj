
import {useSelector} from 'react-redux'
import { useAppDispatch } from '../app/hooks';
import { fetchItems, getProductSelector } from '../features/Slice/productItems/productlistSlice';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    CardHeader,
    Theme,
    makeStyles
} from '@material-ui/core/'
import { Box } from '@mui/material';
import ResponsiveAppBar from './ResponsiveBarApp';
import { Link } from 'react-router-dom';
  
const useStyles = makeStyles((theme: Theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 300,
  
      width: 400,
    },
    pret:{
        color:"white",
    },
    
  }));


export function ContentPageView() {

    const classes = useStyles();
 
    
    const products = useSelector(getProductSelector)  
    
    

    console.log("insf",products)
        
    return (
      <div>
        <ResponsiveAppBar/>
        <br/>
       <Grid
                container
                spacing={6}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
                {products.productitems.map(elem => (
                     
                    <Grid container className={classes.root} spacing={1} item xs={12} sm={12} md={2} key={products.productitems.indexOf(elem)}>
                     
                        <Card className={classes.paper}>
                              <Link to={`/Products/${elem.id}`} style={{ textDecoration: 'none' }}>
                                <CardHeader
                                title={`${elem.denumire}`}
                                subheader={`${elem.descriere}`}
                                />
                            </Link>
                             
                            <CardContent>
                            <Box
                                component="img"
                                sx={{
                                height: 200,
                                width: 100,
                                maxHeight: { xs: 300, md:100 },
                                maxWidth: { xs: 400, md:400 },
                                }}
                                alt="image with product."
                                src= {"http://127.0.0.1:5000/imgs/" + elem.url_image}
                            />
                            
                            </CardContent>
                        </Card>
                       
                        <Typography  className={classes.pret} variant="h6" gutterBottom>
                                {`Pret: ${elem.pret} lei`}
                        </Typography>
                     </Grid>
                    
                ))}
            </Grid>
      </div>
    )
}
