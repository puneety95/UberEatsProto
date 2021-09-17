import brandlogo from "./brand.svg";
import { Button, Navbar, ButtonGroup, Nav, Form } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as CGIcons from "react-icons/cg";
import "bootstrap/dist/css/bootstrap.css";
import "./NavigBar.css";

function NavigBar(props) {
  return (
    <div>
      <Navbar >
        <Nav id="space2">
          <Button onClick={props.sd_click_handler}>
            <FaIcons.FaBars />{" "}
          </Button>
        </Nav>
        <Nav id="space">
          <Navbar.Brand>
            <img
              width="146px"
              height="24px"
              className="img-responsive"
              src={brandlogo}
              alt="logo"
            />
          </Navbar.Brand>
        </Nav>
        <Nav>
          <div id="groupBtn" className="rounded-pill">
            <ButtonGroup id="gg" data-toggle="Buttons">
              <Button
                type="radio"
                id="b1"
                name="toggle"
                className="rounded-pill"
              >
                Delivery
              </Button>
              <Button
                type="radio"
                id="b2"
                name="toggle"
                className="rounded-pill"
              >
                Pickup
              </Button>
            </ButtonGroup>
          </div>
        </Nav>
        <Nav id="space">
          <Button id="navaddress" className="rounded-pill">
            <MdIcons.MdLocationOn />
            754 The Alameda. Now
          </Button>
        </Nav>
        <Nav className="flex-container">
          <div id="navsearch">
            <FaIcons.FaSearch id="icon" />
            <Form>
              <Form.Control
                id="navform"
                type="text"
                placeholder="What are you craving?"
              />
            </Form>
          </div>
          </Nav>
          <Nav className="ms-auto" >
              <Button id="cart_button" className="rounded-pill">
                 <CGIcons.CgShoppingCart/>Cart
              </Button>
          </Nav>
      </Navbar>
    </div>
  );
}
export default NavigBar;
