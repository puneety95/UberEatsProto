import {Container,Row,Form} from 'react-bootstrap';
import {useState} from 'react';
import axios from 'axios';
import './SignUp.css';
import validator from 'validator';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {signUpGetUserDetails} from '../state/action-creators/actions';
import {bindActionCreators} from "redux";


function SignUp()
{
    const history=useHistory();
    const dispatch=useDispatch();
    const [signup_name,set_signup_name] =useState("");
    const [signup_pass,set_signup_pass] =useState("");
    const [signup_email ,set_signup_email]=useState("");
    const [signup_location ,set_signup_location]=useState("");

    const [cust,setCust] =useState(true);

    function Togglecheck(p)
    {
        if(p===false)
        {
            setCust(()=>false);
        }
        else{
            setCust(()=>true);    
        }
        
    }

    function SignUpHandler(e)
    {

        var ele = document.getElementById("customer_signup");
        var chk_status = ele.checkValidity();
        ele.reportValidity();
       if (!chk_status) {
            
            return;
           }
        e.preventDefault();

        if (!(validator.isEmail(signup_email))) {
           
            alert('Enter valid Email!');
            return ;
          }
       


        let role=1;//cust , 2rest
       
        if(!cust)
        {
            role=2;

        }
        const signup_data={signup_name,signup_pass,signup_email,signup_location,role};
       // console.log(signup_data);
        axios({
            method:'post',
            url:'http://localhost:4000/signup',
            data : JSON.stringify(signup_data),
            headers:{"Content-Type":"application/json"}
        }).then ((response)=>{  
          alert("Sign Up Successfull!!! ");
          const signUpUserDetails=bindActionCreators(signUpGetUserDetails,dispatch);
          signUpUserDetails(response.data);
          history.push('/');
          
                })
        .catch((error) => {
            console.log(error.response)
            alert(error.response.data);
          });

    };


    return (<Container>
        <Row xs style={{marginTop:'6%'}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="57 57 369 61" height="30px"><g><path fill="#000000" d="M228.06,81.56c-5.47,0-9.35,4.28-9.35,10.85v24.1h-8.35V74.09h8.25v5.18a11.19,11.19,0,0,1,9.94-5.48h3v7.77ZM204.59,95.3c0-12.65-9-22.11-21.18-22.11A21.83,21.83,0,0,0,161.73,95.3c0,12.64,9.75,22.2,22.47,22.2a22.17,22.17,0,0,0,18.3-9.06L196.44,104a14.78,14.78,0,0,1-12.24,6.17,14.22,14.22,0,0,1-14-12.14h34.41Zm-34.21-3.89c1.49-6.47,6.66-10.85,12.93-10.85s11.43,4.38,12.83,10.85Zm-35.1-18.22a21.12,21.12,0,0,0-15,6.27V58.25h-8.35v58.26h8.25v-5.38a21.45,21.45,0,0,0,15.12,6.37,22.16,22.16,0,1,0,0-44.31Zm-.6,36.85A14.69,14.69,0,1,1,149.3,95.4,14.58,14.58,0,0,1,134.68,110Zm-53.5-.4c8.06,0,14.32-6.18,14.32-15.44V58.25h8.65v58.26H95.6V111a21.24,21.24,0,0,1-15.41,6.47c-12.43,0-22-9.06-22-22.8V58.25H67v36C67,103.56,73,109.64,81.18,109.64Z"/><path fill="#5FB709" d="M252.32,58.25h40.87v10H263.36V82.45h29v9.66h-29v14.44h29.83v10H252.32ZM406.06,117.6c12.53,0,19.59-6,19.59-14.24,0-5.87-4.18-10.25-12.93-12.15l-9.25-1.89c-5.37-1-7.06-2-7.06-4,0-2.59,2.59-4.18,7.36-4.18,5.17,0,9,1.39,10,6.17h10.84c-.59-9-7.06-14.94-20.18-14.94-11.34,0-19.3,4.68-19.3,13.75,0,6.27,4.38,10.35,13.83,12.34l10.34,2.39c4.08.8,5.17,1.9,5.17,3.59,0,2.69-3.08,4.38-8.06,4.38-6.26,0-9.84-1.39-11.23-6.17H384.28C385.87,111.63,392.53,117.6,406.06,117.6Zm-24.93-1.09H369.4c-7.36,0-11.44-4.58-11.44-10.36V83.25h-8.25V73.49H358V61.24H368.9V73.49h12.23v9.76H368.9v20.11c0,2.29,1.59,3.39,4.08,3.39h8.15Zm-47-43v3.88a21.16,21.16,0,0,0-13.73-5,22.61,22.61,0,1,0,0,45.21,21.1,21.1,0,0,0,13.73-5v3.89H345v-43Zm-12.83,34.65a13.15,13.15,0,1,1,13-13.14A13,13,0,0,1,321.28,108.14Z" /></g></svg>
                </Row>
              
                <Container style={{marginLeft:'14%'}}>
                <Row style={{marginTop:'3%'}}>
                   <div className ="col offset-3 "><h3>Sign UP</h3></div>
                </Row>

                <Row>
                    <div  className="col-sm-2 offset-sm-3 ">
                      <div className="form-check">
                         <input class="form-check-input" onClick={()=>Togglecheck(false)} type="radio" name="flexRadioDefault" id="Customer"/>
                          <label class="form-check-label" for="flexRadioDefault1">
                            Restaurant Owner
                              </label>
                        </div>
                    </div>

                    <div  className="col-sm-3   ">
                      <div className="form-check">
                         <input class="form-check-input" onClick={()=>Togglecheck(true)} type="radio" name="flexRadioDefault" id="Customer" defaultChecked/>
                          <label class="form-check-label" for="flexRadioDefault1">
                            Customer
                              </label>
                        </div>
                    </div>
                </Row>

                { cust  &&      <Row>
              <div className="col-sm-2 col-ms-4 offset-sm-3 ">
                        <Form style={{marginTop:'6%'}} id="customer_signup">
                        <label for="custlabel">Name</label>
                            <input onChange={(e)=>{set_signup_name(e.target.value)}} style={{marginBottom:"8%"}} type="text" name="custlabel"  required/>
                            <label for="custlabel">Email</label>
                            <input onChange={(e)=>{set_signup_email(e.target.value)}} style={{marginBottom:"8%"}} type="text" name="custlabel"   required />
                            <label for="custlabel">Password</label>
                            <input onChange={(e)=>{set_signup_pass(e.target.value)}} style={{marginBottom:"8%"}} type="password" name="custlabel"  minlength="7" required />
                            <button type="Submit" onClick={SignUpHandler} style={{color:"white",marginTop:"10%" ,backgroundColor:"green"}} id="Custformbutton">Submit</button>
                           
                        </Form>
                </div>
                </Row> }
                
                { !cust  &&     <Row>
                <div className="col-sm-2 col-ms-4 offset-sm-3 ">
                        <Form style={{marginTop:'6%'}} id="customer_signup">
                        <label for="custlabel">Restaurant Name</label>
                            <input onChange={(e)=>{set_signup_name(e.target.value)}} set_signup_passstyle={{marginBottom:"8%"}} type="text" name="custlabel"  required/>
                            <label for="custlabel">Email</label>
                            <input onChange={(e)=>{set_signup_email(e.target.value)}} style={{marginBottom:"8%"}} type="text" name="custlabel"   required />
                            <label for="custlabel">Password</label>
                            <input onChange={(e)=>{set_signup_pass(e.target.value)}}  style={{marginBottom:"8%"}} type="password" name="custlabel"  minlength="7" required />
                            <label for="custlabel">Location</label>
                            <input  onChange={(e)=>{set_signup_location(e.target.value)}} style={{marginBottom:"8%"}} type="text" name="custlabel"  minlength="7" required />
                            <button onClick={SignUpHandler} style={{color:"white",marginTop:"10%" ,backgroundColor:"green"}} id="Custformbutton">Submit</button>
                           
                        </Form>
                </div>
              </Row>}
                </Container>
    </Container>)
}
export default SignUp;