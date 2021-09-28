import { Container,Row,Table,Dropdown,Form } from "react-bootstrap";

function RestOrders()
{
    return(
       <Container>
          <Row>
                <div style={{marginTop:'4%'}} className="col-sm">
                    <h5>All Orders View</h5>
                </div>
          </Row>
          <Row>
              <div className="col-sm">
              <hr class="one" ></hr>  
              </div>
          </Row>

          <Row style={{padding:'3%'}}>
              <div  className="col-sm-2">
                    <Form>
                        <input type="checkbox" id="cancelled_order" name="cancelled_order"/>
                        <label style={{marginLeft:"2%"}} for="cancelled_order">Cancelled Order</label>
                    </Form>
              </div>
              <div  className="col-sm-2">
                    <Form>
                        <input type="checkbox" id="new_order" name="new_order"/>
                        <label style={{marginLeft:"2%"}} for="new_order">New Order</label>
                    </Form>
              </div>
              <div  className="col-sm-2">
                    <Form>
                        <input type="checkbox" id="delieverd_order" name="delieverd_order"/>
                        <label style={{marginLeft:"2%"}} for="delieverd_order">Delievered Order</label>
                    </Form>
              </div>
              <div className="col-sm-6">
                 
              </div>
          </Row>

          <Row style={{marginTop:'3%'}}>
          <div className="col-sm-6">
                       Name
                   </div>
                   <div className="col-sm-6">
                       Moti Mahal
                   </div>
                   <div className="col-sm-6">
                       Location
                   </div>
                   <div className="col-sm-6">
                       San Jose
                   </div>
                   <div className="col-sm-6">
                       Contact
                   </div>
                   <div className="col-sm-6">
                       9911294357
                   </div>
                   <div className="col-sm-6">
                       Timings
                   </div>
                   <div className="col-sm-6">
                       9pm-10pm
                   </div>
                   <div className="col-sm-6">
                       Description
                   </div>
                   <div className="col-sm-6">
                   Wish you could ask someone what's the best thing on the menu? The jasmine rice is one of the most ordered items on the menu and the pen pineapple fried rice and the sesame chicken are two of the items most commonly ordered together at this evening go-to. • $ • Thai • Asian • Noodles • Alcohol
                   </div>

          </Row>

       </Container>

    ); 
}
export default RestOrders;