import { gql } from "apollo-boost";
const getCustProfile = gql`
  query getCustProfile($id: String) {
    getCustProfile(id: $id) {
      id
      dob
      city
      state
      country
      nickname
      phone
      profile_pic
      about
    }
  }
`;
const getRestaurant = gql`
  query getRestaurant($id: String) {
    getRestaurant(id: $id) {
      r_id
      r_description
      r_contact
      r_timings
      type
      location
      name
    }
  }
`;

const getRestaurantCustomer = gql`
  query getRestaurantCustomer($id: String) {
    getRestaurantCustomer(id: $id) {
      groupName
      description
      amount
      settleFlag
      createdAt
    }
  }
`;

const getDeliveryAddress = gql`
  query getDeliveryAddress($id: String) {
    getDeliveryAddress(id: $id) {
      cust_id
      address
    }
  }
`;

const getCustOrders = gql`
  query getCustOrders($id: String) {
    getDeliveryAddress(id: $id) {
      id
      cust_id
      rest_id
      status
      rest_name
      cust_name
      cust_profile_pic
      rest_profile_pic
      address
      order_status
      date
      instruction
    }
  }
`;

const getDishes2 = gql`
  query getDishes2($id: String) {
    getDishes2(id: $id) {
      id
      rest_id
      name
      ingredients
      images
      price
      description
      cat
      filter
    }
  }
`;
const getRestOrders = gql`
  query getRestOrders($id: String) {
    getRestOrders(id: $id) {
      id
      cust_id
      rest_id
      status
      rest_name
      cust_name
      cust_profile_pic
      rest_profile_pic
      address
      order_status
      date
      instruction
    }
  }
`;

export {
  getCustProfile,
  getRestaurant,
  getRestaurantCustomer,
  getDeliveryAddress,
  getCustOrders,
  getDishes2,
  getRestOrders,
};
