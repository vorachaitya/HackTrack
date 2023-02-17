import { useState, useEffect } from "react";
import "./css/timeline.css"
import axios from "axios";


const Timeline = () => {
    const [listItems, setListItems] = useState([]);
    useEffect(() => {
        const getItemsList = async () => {
            try {
                const res = await axios.get('http://localhost:6001/api/items')
                setListItems(res.data);
                console.log('render')
            } catch (err) {
                console.log(err);
            }
        }
        getItemsList()
    }, []);
    return (
        <>
            {/* <div className="todo-listItems">
                {
                    listItems.map(item => (
                        <div className="todo-item">
                            {
                                <>
                                    <p className="item-content">{item.item}</p>
                                </>
                            }
                        </div>
                    ))
                }


            </div> */}





            <h2 className='headtitle' style={{textAlign:'center',paddingTop:'2rem'}}>Timeline</h2>
            {/* <div class="rightbox">
                <div class="rb-container">
                    <ul class="rb">
                        {
                            listItems.map(item => (
                                <li class="rb-item" ng-repeat="itembx">
                                    <div className="item-title">
                                        {
                                            <>
                                                <p className="item-content">{item.item}</p>
                                            </>
                                        }
                                    </div>
                                </li>
                            ))
                        }


                    </ul>

                </div>
            </div> */}
            <div id="timeline-container">
                <div class="inner-container">
                    {/* <h2 class="heading">Schedule</h2> */}
                    <ul class="timeline">
                    {
                            listItems.map(item => (
                                <li class="timeline-item" data-date={item.item.substring(0,11)}>
                                   
                                        {
                                            <>
                                               {item.item.substring(11)}
                                            </>
                                        }
                                    
                                </li>
                            ))
                        }
                       
                        
                    </ul>
                </div>
            </div>

        </>
    );
}

export default Timeline;