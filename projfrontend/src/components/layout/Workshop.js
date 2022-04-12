import React from "react"; 
import { Dialog, DialogContent, DialogTitle, Typography } from "@material-ui/core"; 
 
const PopUp = ({openPopup , setOpenPopup}) => { 
    return ( 
        <div>
        <Dialog open={openPopup} maxWidth="md"> 
            <DialogTitle> 
                <div style={{display:'flex'}}> 
                    <Typography  
                        variant="h6" component="div" style={{flexGrow:1}} 
                    > 
                        {"asdasd"} 
                    </Typography> 
                    <button color="red" text="X" onClick={()=>{setOpenPopup(false)}}> 
 
                    </button> 
                </div> 
            </DialogTitle> 
            <DialogContent dividers> 
                <div> 
                    <h1>Content</h1> 
                </div> 
            </DialogContent> 
        </Dialog> 
        </div>
    ) 
 
} 
export default PopUp;