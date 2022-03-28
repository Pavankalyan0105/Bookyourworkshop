import React, {useEffect , useState} from "react"; 
import axios from "axios"; 
import Razorpay from 'razorpay';
import {Navigate} from "react-router-dom";
import Myworkshops from "./Myworkshops"
import "./css/Card.css";
const Card = ({workshop , page}) => { 
    const [ token , setToken ] = useState("")
    const [ userId , setUserId ] = useState("")
    const [ booked , setBooked] = useState(false)
    // const [minus , setMinus]  =useState(0)
    const [seats , setSeats] = useState(workshop.seats)
    const [role , setRole] = useState(
        localStorage.getItem("role") == "0"?0:1)

    useEffect( () => {
        console.log( JSON.parse(localStorage.getItem("user")).workshops )
    } , [])


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
			console.log(data);
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
        console.log(page)
    } , [])



    return( 
  

            <div className="card-container"> 
                <div className="image-container"> 
                    <img 
                        src="https://ts-production.imgix.net/images/mobile-cover-uploaded/843a5821-fc0a-4795-a82a-082a80e4a6e0.jpg?auto=compress,format&w=800&h=450" 
                        alt="..." 
                    /> 
                </div> 
                <div className="card-content"> 
                    <div className="card-title"> 
                        <h3>{workshop.name}</h3> 
                    </div> 
                    <div className="card-body"> 
                       <p>{workshop.college}</p> 
                       <p>{workshop.date.toString().slice(0,10)}</p> 
                       <p>{workshop.fromTime}</p> 
                       <p>{workshop.toTime}</p> 
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
                            <button>View</button> 

                        )

                    ):(
                        <button>View</button>
                    )
                        
                }

            </div> 


            
    ) 
} 
 
export default Card;