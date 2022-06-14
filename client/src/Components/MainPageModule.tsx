import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ContentPageView } from './ContentPageView'
import { LogoMainPage } from './LogoMainPage';
import  {LogoSite } from './LogoSite'
import ResponsiveAppBar from './ResponsiveBarApp'
import { SlideShow } from './SlideShow';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
     container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: 400,
        margin: `${theme.spacing(0)} auto`,
        color: 'white'
      },
    
    })
  );
export function MainPageModule(){

    
    const classes = useStyles();
    return(

        <div>
            <ResponsiveAppBar/>
            <div className={classes.container}>
                
                <LogoMainPage />
                <span className="text">
                    <div className="content">
                        <h2 className="text_shadows">Testeaza online produsele noastre!</h2>
                    
                    </div>
                </span>

                <span className="text2">
                    <div className="content">
                        <h2 className="text_shadows">Vezi produsele disponibile!</h2>
                    
                    </div>
                </span>
                
               
            </div>
            <SlideShow/>
           
        </div>
        
    )
}
