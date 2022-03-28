const Workshop = require("../models/workshop");
const User = require("../models/user")



exports.createWorkshop = (req , res) => {
    // TODO:
    // if(req.profile.isVerified){
    //     return res.json({
    //         message: "You are not yet verfied to create workshop"
    //     })
    // }

    // when using postman
        // data = req.body;

    //whhen using frontend
        data = req.body;


    console.log(data)
    const newWorkshop = new Workshop(data);
    newWorkshop.facultyid = req.profile._id;
    newWorkshop.college = req.profile.college;


    newWorkshop.save(
        (err , workshop) => {
            if(err || !workshop){
                return res.status(400).json({
                    message: "Unable to create Workshop"
                })
            }
            req.profile.workshops.push(newWorkshop);
            req.profile.save()
            return res.json(workshop)
        }
    )
    
    
};



exports.getWorkshopById = (req , res , next , id)=>{

    Workshop.findById(id).exec( (err , workshop) =>{
        if(err || !workshop){
            return res.status(400).json({
                message: "No workshop found!!!"
            })
        }
        req.workshop = workshop;
        next();

    })
}


//  TODO: COME BACK AGAIN
exports.getAllWorkshops = ( req , res) => {

    Workshop.find().exec(
        (err , workshops ) => {
            if(err || !workshops){
                return res.status(400).json({
                    message: "No Workshops found"
                })
            }
            res.json(workshops);
        }
    )
};




exports.bookWorkshop = ( req , res) => {

    if(req.workshop.seats <= 0) 
        return res.json({
            err: "Seats Full"
        })

    // console.log(body)

    req.profile.workshops.push(req.workshop);
    
    req.workshop.seats-=1;

    req.workshop.students.push(req.profile.email);
    
    req.workshop.save();
    req.profile.save();

    return res.json(req.workshop)
} 




exports.searchWorkshops = (req , res) => {

    var val = req.body.name
    console.log(req.body.name)
        Workshop.find({info:{$regex:val}}).exec(
        
        (err , ws) => {
            if(err)
                return res.json({
                    message:"Something went wrong"
                })
            if(ws.length === 0)
            return res.json({
                message:"No workshops found"
            })

            return res.json(ws);
        }
    )


}


exports.getMyWorkshops =    (req , res) => {

    return res.json(req.profile.workshops)

}