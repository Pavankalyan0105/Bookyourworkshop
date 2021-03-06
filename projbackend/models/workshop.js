const mongoose = require("mongoose")


var workshopSchema = new mongoose.Schema({
    
    facultyid: String,
    name:{
        type: String,
        required: true
    },
    info:{
        type: String,
        required:true
    },
    college:{
        type:String
    },
    amount:{
        type: Number,
        required: true
    },
    seats:{
        type: Number,
        required: true
    },
    accno:{
        type: Number
    },
    IFSC:{
        type: String
    },

    fromDate:{
        type: Date,
        required: true
    },
    toDate:{
        type: Date,
        required: true
    },
    fromTime:{
        type: String,
        required: true
    },   
    toTime:{
        type: String,
        required : true,
    },

    instructor:{
        type: String,
        required: true
    },
    students:{
        type: Array,
        required:[]
    },
    imgNo:{
        type:Number,
    }
},
{ timestamps: true }
)

module.exports = mongoose.model("Workshop", workshopSchema);
