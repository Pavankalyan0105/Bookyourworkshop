import React from 'react';


const WorkshopCard = () => {
    return (
    <div className="container">
            <div className="row">
                    <div className="gallery">
                        <img src="img-logo2.jpg" className="card"/>
                        <span style="padding-right: 250px">TITLE:</span>
                        <span style="text-align: right;">Date:</span>
                        <div style="padding-left: 300px;">Time:</div>
                            <div className="desc">
                                <p>Instructor Name:</p>
                                <p>College Name:</p>
                                <table>
                                    <tr>
                                        <td><span style="padding-right: 150px;">
                                            <button>Book Workshop</button>
                                        </span></td>
                                    <td><span style="text-align: right;">Seats:</span></td>
                                    </tr>
                                </table>
                            </div>
                    </div>
            </div>
        </div>
    )
}

export default WorkshopCard;