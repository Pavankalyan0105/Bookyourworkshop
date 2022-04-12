import React, {useEffect , useState} from "react"; 
import axios from "axios"; 
import Razorpay from 'razorpay';
import {Navigate} from "react-router-dom";
import Myworkshops from "./Myworkshops";
import PopUp from "./layout/Workshop";
import "./css/Card.css";

import image1 from './SIHIMAGES/image1.jpg' 
import image2 from './SIHIMAGES/image2.jpg' 
import image3 from './SIHIMAGES/image3.jpg' 
import image4 from './SIHIMAGES/image4.jpg' 
import image5 from './SIHIMAGES/image5.jpg' 
import image6 from './SIHIMAGES/image6.jpg' 
import image7 from './SIHIMAGES/image7.jpg' 
import image8 from './SIHIMAGES/image8.jpg' 
import image9 from './SIHIMAGES/image9.jpg' 
import image10 from './SIHIMAGES/image10.jpg' 
import image11 from './SIHIMAGES/image11.jpg' 
import image12 from './SIHIMAGES/image12.jpg' 
import image13 from './SIHIMAGES/image13.jpg' 
import image14 from './SIHIMAGES/image14.jpg' 
import image15 from './SIHIMAGES/image15.jpg' 
import image16 from './SIHIMAGES/image16.jpg' 
import image17 from './SIHIMAGES/image17.jpg' 
import image18 from './SIHIMAGES/image18.jpg' 
import image19 from './SIHIMAGES/image19.jpg' 
import image20 from './SIHIMAGES/image20.jpg' 
import image21 from './SIHIMAGES/image21.jpg' 
import image22 from './SIHIMAGES/image22.jpg' 
import image23 from './SIHIMAGES/image23.jpg' 
import image24 from './SIHIMAGES/image24.jpg' 
import image25 from './SIHIMAGES/image25.jpg'

var arr = [image1,image2,image3,image4,image5,image6,image7,image8,image9,image10,image11,image12,image13,image14,image15,image16,image17,image18,image19,image20,image21,image22,image23,image24,image25];

const Card = ({workshop , page}) => { 
    const [ token , setToken ] = useState("")
    const [ userId , setUserId ] = useState("")
    const [ booked , setBooked] = useState(false)
    // const [minus , setMinus]  =useState(0)
    const [seats , setSeats] = useState(workshop.seats)

    //popup
    const [openPopup,setOpenPopup] = useState(false);
    
    // const [showImg ] = useState()
    const [role , setRole] = useState(
        localStorage.getItem("role") == "0"?0:1)

    // useEffect( () => {
    //     console.log( JSON.parse(localStorage.getItem("user")).workshops )
    // } , [])


    const tokenn = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };

    const bookMyWorkshop =  async () => {
        console.log("Booking...")


        await axios.post(
            `http://localhost:8000/api/workshop/book/${localStorage.getItem("id")}/${workshop._id}`,
            tokenn
          ).
          then(
              (res) => {
                console.log(res.data)
                // setMinus(res.data.students.length)
              }
          ).catch(
              err => console.log(err)
          )
    }

    const initPayment = (data) => {
		const options = {
			key: "rzp_test_75sXdBCKAt28Vo",
			amount: data.amount,
			currency: data.currency,
			name: workshop.name,
			description: "Test Transaction",
			image: "../../public/logo192.png",
			order_id: data.id,
			handler: async (response) => {
				try {
					const verifyUrl = "http://localhost:8000/api/payment/verify";
					const { data } = await axios.post(verifyUrl, response);
					console.log(data.message);
                    if(data && data.message === "Payment verified successfully"){
                            bookMyWorkshop()
                    }

				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
        rzp1.open();
        
	};

	const handlePayment = async () => {
		try {
			const orderUrl = "http://localhost:8000/api/payment/orders";
			const { data } = await axios.post(orderUrl, { amount: workshop.amount });
			// console.log(data);
            if(data){
                console.log("intialising pament");
                initPayment(data.data);
            }
		} catch (error) {
			console.log(error);
		}


	};

    

    useEffect( () => {
        setToken(localStorage.getItem("token"))
        setUserId(localStorage.getItem("id"))
        // console.log(page)
    } , [])



    return( 
  

            <div className="card-container"> 
                <div className="image-container"> 
                    <img 
                        src={arr[workshop.imgNo]} 
                        alt="..." 
                    /> 
                </div> 
                <div className="card-content"> 
                    <div className="card-title"> 
                        <h3>{workshop.name}</h3> 
                    </div> 
                    <div className="card-body"> 
                       <p>College:   {workshop.college}</p> 
                       <p> fromDate : &nbsp; {workshop.fromDate.toString().slice(0,10)}</p> 
                       <p> toDate : &nbsp; {workshop.toDate.toString().slice(0,10)}</p> 
                       {console.log( workshop.fromDate.toString().slice(0,10)) }
                       <p> FromTime : &nbsp; {workshop.fromTime}</p> 
                       <p> toTime : &nbsp; {workshop.toTime}</p> 
                       {workshop.seats!==-1?(<p>Seats Left: {seats}</p>):""} 
 
                    </div> 
                </div> 
                 
                {/* {
                        (workshop.seats === -1)?
                        (
                            <div className="l-btn" > 
                            <button disabled>Already booked</button> 
                        </div>
                        ):
                        (
                        <div className="l-btn" > 
                            {(seats === 0)?(
                                <button
                                    style={{
                                        backgroundColor: "#676767"
                                    }}
                                >No seats available</button>
                            ):(
                                <button  onClick={handlePayment}>book</button> 
                            )}
                        </div> 
                        )
                }   */}
                {/* student */}
               { 
                    (role === 0)?(
                        (page === "Home")?(
                            (workshop.seats == 0)?(
                                <button 
                                    style={{
                                        opacity: 0.4
                                    }}
                                    disabled>Seats Full</button>
                            ):(
                            <button  onClick={handlePayment}>book</button> )
                        ):(
                            <button onClick={ () => setOpenPopup(true)}>View</button> 

                        )

                    ):(
                        <button onClick={
                            () => (setOpenPopup(true) ,console.log("Clicked popup") )}>View</button>
                    )
                        
                }

                <PopUp openPopup={openPopup} setOpenPopup={setOpenPopup}/>
 
                

            </div> 


            
    ) 
} 
 
export default Card;