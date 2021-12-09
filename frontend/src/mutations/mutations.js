import { gql } from "apollo-boost";

const signUpMutation = gql`
  mutation signup(
    $signup_email: String
    $signup_pass: String
    $signup_name: String
    $signup_location: String
    $role: String
  ) {
    signup(
      email: $signup_email
      password: $signup_pass
      signup_name: $signup_name
      signup_location: $signup_location
      role: $role
    ) {
      email
      signup_name
      signup_location
      role
      password
    }
  }
`;

const loginMutation = gql`
  mutation login($loginEmail: String, $loginPassword: String) {
    login(login: $loginEmail, password: $loginPassword) {
      name
      email
      id
    }
  }
`;

const CustProfileUpdateMutation = gql`
  mutation CustProfileUpdate(
    $dob: String
    $city: String
    $state: String
    $country: String
    $phone: String
    $nickname: String
    $about: String
    $name: String
  ) {
    CustProfileUpdate(
      dob: $dob
      city: $city
      state: $state
      country: $country
      phone: $phone
      nickname: $nickname
      about: $about
      name: $name
    ) {
      dob
      city
      state
      country
      phone
      nickname
      about
      name
    }
  }
`;

const createOrderMutation = gql`
  mutation createOrder(
    $cust_id: String
    $rest_id: String
    $date: String
    $status: String
    $mode: String
    $address: String
    $order_status: String
    $rest_name: String
    $cust_name: String
    $cust_profile_pic: String
    $rest_profile_pic: String
    $order_item: String
    $instruction: String
  ) {
    createOrder(
      cust_id: $cust_id
      rest_id: $rest_id
      date: $date
      status: $status
      mode: $mode
      address: $address
      order_status: $order_status
      rest_name: $rest_name
      cust_name: $cust_name
      cust_profile_pic: $cust_profile_pic
      rest_profile_pic: $rest_profile_pic
      order_item: $order_item
      instruction: $instruction
    ) {
      order_id
    }
  }
`;
const cancelCustomerOrderMutation = gql`
  mutation cancelCustomerOrder($id: String) {
    cancelCustomerOrder(id: $id) {
      id
    }
  }
`;
const RestProfileUpdateMutation = gql`
  mutation RestProfileUpdate(
    $r_id: String
    $r_timings2: String
    $r_timings3: String
    $r_timings4: String
    $r_id: String
    $name: String
    $location: String
    $r_description: String
  ) {
    RestProfileUpdate(
      r_id: $r_id
      r_timings2: $r_timings2
      r_timings3: $r_timings3
      r_timings4: $r_timings4
      r_id: $r_id
      name: $name
      location: $location
      r_description: $r_description
    ) {
      r_id
      r_timings2
      r_timings3
      r_timings4
      r_id
      name
      location
      r_description
    }
  }
`;
const RestDishesAddMutation = gql`
  mutation RestDishesAdd( 
    $id:String,
    $name:String,
    $ingredients:String,
    $imageUrl:String,
    $price:String,
    $description:String,
    $category:String,
    $type:String,
    RestDishesAdd( id:$id,
      name:$name,
      ingredients:$ingredients,
      imageUrl:$imageUrl,
      price:$price,
      description:$desription,
      category:$category,
      type:$type) {
      id
    }
  }
`;

const UpdateOrderStatusMutation = gql`
  mutation UpdateOrderStatus($id: String, $status: String) {
    addExpense(id: $id, status: $status) {
      id
      status
    }
  }
`;
const RestDishesAdd = gql`
  mutation addExpense($groupID: String, $userID: String) {
    addExpense(groupID: $groupID, userID: $userID) {
      groupID
    }
  }
`;

export {
  signUpMutation,
  loginMutation,
  CustProfileUpdateMutation,
  createOrderMutation,
  cancelCustomerOrderMutation,
  RestProfileUpdateMutation,
  RestDishesAddMutation,
  UpdateOrderStatusMutation,
  RestDishesAdd,
};
