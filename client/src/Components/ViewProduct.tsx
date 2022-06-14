import {Link, useParams,useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, Grid } from '@mui/material';
import { useAppDispatch } from "../app/hooks";
import { getproductbyId, getProductSelector } from "../features/Slice/productItems/productlistSlice";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import useUpdateEffect from "./useUpdateEffect";
import ResponsiveAppBar from "./ResponsiveBarApp";
export function ViewProduct() {
    let { id } = useParams();
    const dispatch = useAppDispatch();
    
    
   
      useEffect(() => {
        if (id) {
            dispatch<any>(getproductbyId({id:Number(id)}));
        }
      },[id]); 
    const product = useSelector(getProductSelector)

    let navigate = useNavigate();
    const handleClickVirtual = async () => {
         navigate(`/virtual-dressing/${id}`); 
    }

    return (
        
        <div >
            <ResponsiveAppBar/>  
            <Grid container
            
            spacing={1}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '90vh' }}>
           <Card 
           
           >
                   
                <CardActionArea style={{ display:'flex', justifyContent:'center' }} sx={{
            height: 500,
            width: 700,
            }}>
              <CardActionArea style={{ display:'flex', justifyContent:'center' }}>
                  
                  
                   <Typography  gutterBottom variant="h5" component="div">
               
                    {product.product_.denumire}
                    <Typography> 
                    <img src={"http://127.0.0.1:5000/imgs/"+ product.product_.url_image} width="200px" height="300px"/>
                    </Typography>
                  
                    <Typography variant="body2" color="text.secondary">
                    {`Descriere produs: ${product.product_.descriere}`}
                    </Typography>

                    </Typography>
                   
               </CardActionArea>


                   

                   
               
                
                </CardActionArea>
               
            </Card>
           
                <Typography style={{ color:'white' }} gutterBottom variant="h5" component="div">
                    {`Pret: ${product.product_.pret} lei`}
                </Typography> 
            <Button
            variant="contained"
            size="large"
            color="secondary"
          //  className={classes.loginBtn}
            onClick={handleClickVirtual}
           // disabled={state.isButtonDisabled}
           >
            Incearca proba virtuala
           </Button>
            </Grid>
        </div>
    );
  }
  