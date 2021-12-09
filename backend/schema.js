const graphql = require("graphql");
const user_login = require("./Model/SignUpModel");
const dish = require("./Model/DishesModel.js");
const add = require("./Model/AddDeliveryModel.js");
const cust_profile = require("./Model/CustomerModel");
const orders = require("./Model/OrdersModel.js");
const rest_info = require("./Model/RestModel");
const dish_add = require("./Model/DishesModel");

const bcrypt = require("bcrypt");
const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const userObject = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    id: { type: GraphQLInt },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    role: { type: GraphQLString },
    location: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});

const addDeliverySchemaObject = new GraphQLObjectType({
  name: "addDelivery",
  fields: () => ({
    cust_id: { type: GraphQLInt },
    address: { type: GraphQLString },
  }),
});

const categorySchemaObject = new GraphQLObjectType({
  name: "category",
  fields: () => ({
    id: { type: GraphQLInt },
    type: { type: GraphQLString },
  }),
});

const customerObject = new GraphQLObjectType({
  name: "customer",
  fields: () => ({
    id: { type: GraphQLInt },
    dob: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    country: { type: GraphQLString },
    nickname: { type: GraphQLString },
    phone: { type: GraphQLString },
    profile_pic: { type: GraphQLString },
    about: { type: GraphQLString },
  }),
});

const dishesObject = new GraphQLObjectType({
  name: "dishes",
  fields: () => ({
    id: { type: GraphQLInt },
    rest_id: { type: GraphQLString },
    name: { type: GraphQLString },
    ingredients: { type: GraphQLString },
    images: { type: GraphQLString },
    price: { type: GraphQLString },
    description: { type: GraphQLString },
    cat: { type: GraphQLInt },
    filter: { type: GraphQLString },
  }),
});

const imagesObject = new GraphQLObjectType({
  name: "images",
  fields: () => ({
    id: { type: GraphQLInt },
    type: { type: GraphQLString },
  }),
});

const ordersObject = new GraphQLObjectType({
  name: "order",
  fields: () => ({
    id: { type: GraphQLInt },
    cust_id: { type: GraphQLInt },
    rest_id: { type: GraphQLInt },
    status: { type: GraphQLInt },
    rest_name: { type: GraphQLString },
    cust_name: { type: GraphQLString },
    cust_profile_pic: { type: GraphQLString },
    rest_profile_pic: { type: GraphQLString },
    address: { type: GraphQLString },
    order_status: { type: GraphQLString },
    date: { type: GraphQLString },
    instruction: { type: GraphQLString },
  }),
});

const orderItemListObject = new GraphQLObjectType({
  name: "orderItemList",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    quantity: { type: GraphQLInt },
    cost: { type: GraphQLString },
  }),
});

const restObject = new GraphQLObjectType({
  name: "rest",
  fields: () => ({
    name: { type: GraphQLString },
    location: { type: GraphQLString },
    r_id: { type: GraphQLInt },
    r_description: { type: GraphQLString },
    r_contact: { type: GraphQLString },
    r_timings: { type: GraphQLString },
    profile_pic: { type: GraphQLString },
    type: { type: GraphQLString },
  }),
});

const AllGetQueryObject = new GraphQLObjectType({
  name: "AllGetQuery",
  fields: {
    getCustProfile: {
      type: customerObject,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      async resolve(parent, args) {
        const user_info = await cust_profile.find({ id: args.id });
        const user_info_name = await cust_profile_name.find(
          { id: args.id },
          { password: 0 }
        );
        const result = { ...user_info_name[0]._doc, ...user_info[0]._doc };
        return result;
      },
    },

    getRestaurant: {
      type: restObject,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      async resolve(parent, args) {
        const restName = await user_login.find(
          { email: args.loginEmail },
          { name: 1, id: 1, location: 1, _id: 0 }
        );
        const restProf = await rest_info.find(
          { r_id: restName[0].id },
          { _id: 0 }
        );
        restProf[0].name = restName[0].name;
        restProf[0].idd = restName[0].id;
        restProf[0].location = restName[0].location;
        const restDetails = { ...restName[0]._doc, ...restProf[0]._doc };
        return a;
        return restDetails;
      },
    },

    getRestaurantCustomer: {
      type: userObject,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      async resolve(parent, args) {
        const restName = await user_login.find(
          { email: args.id },
          { name: 1, id: 1, location: 1, _id: 0 }
        );
        const restProf = await rest_info.find(
          { r_id: restName[0].id },
          { _id: 0 }
        );
        restProf[0].name = restName[0].name;
        restProf[0].idd = restName[0].id;
        restProf[0].location = restName[0].location;
        const restDetails = { ...restName[0]._doc, ...restProf[0]._doc };
        return restDetails;
      },
    },

    getDeliveryAddress: {
      type: addDeliverySchemaObject,
      args: {
        id: {
          type: GraphQLInt,
        },
      },
      async resolve(parent, args) {
        const result = await add.find({ cust_id: args.id });
        return result;
      },
    },

    getCustOrders: {
      type: ordersObject,
      args: {
        id: {
          type: GraphQLInt,
        },
      },
      async resolve(parent, args) {
        let order_detail;
        if (args.status == 7) {
          order_detail = await orders
            .find({ cust_id: args.id })
            .sort({ date: "desc" });
        } else {
          order_detail = await orders
            .find({ cust_id: value.id, status: value.status })
            .sort({ date: "desc" });
        }
        return order_detail;
      },
    },

    getDishes2: {
      type: ordersObject,
      args: {
        id: {
          type: GraphQLInt,
        },
      },
      async resolve(parent, args) {
        const value = args;
        let filter = value.filter;
        if (filter.length == 0) {
          filter = ["veg", "nonveg", "vegan"];
        } else {
          filter = filter.split(",");
        }
        const result = await dish.find({ rest_id: value.id });
        return result;
      },
    },

    getCustImage: {
      type: ordersObject,
      args: {
        id: {
          type: GraphQLInt,
        },
      },
      async resolve(parent, args) {
        let value = args;
        const pic = await customer.find(
          { id: value.id },
          { profile_pic: 1, _id: 0 }
        );
        const name = await user.find({ id: value.id }, { name: 1, _id: 0 });
        const result = { ...pic[0]._doc, ...name[0]._doc };
        return result;
      },
    },

    RestProfile: {
      type: ordersObject,
      args: {
        id: {
          type: GraphQLInt,
        },
      },
      async resolve(parent, args) {
        const value = msg;

        const restName = await user_login.find(
          { email: value.loginEmail },
          { name: 1, id: 1, location: 1, _id: 0 }
        );
        const restProf = await rest_info.find(
          { r_id: restName[0].id },
          { _id: 0 }
        );

        restProf[0].name = restName[0].name;
        restProf[0].idd = restName[0].id;
        restProf[0].location = restName[0].location;
        const restDetails = { ...restName[0]._doc, ...restProf[0]._doc };
        return restDetails;
      },
    },

    getRestOrders: {
      type: ordersObject,
      args: {
        id: {
          type: GraphQLString,
        },
        status: {
          type: GraphQLString,
        },
      },
      async resolve(parent, args) {
        try {
          const value = args;

          let order_detail;
          if (value.status == 7) {
            order_detail = await orders
              .find({ rest_id: value.id })
              .sort({ date: "desc" });
          } else {
            order_detail = await orders
              .find({ rest_id: value.id, order_status: value.status })
              .sort({ date: "desc" });
          }
          return { status: 200, msg: order_detail };
        } catch (error) {
          console.log("---------------inside error----------------", error);
          return { status: 500 }, null;
        }
      },
    },
    //here RestProfile
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    signup: {
      type: userObject,
      args: {
        signup_email: {
          type: GraphQLString,
        },
        role: {
          type: GraphQLString,
        },
        signup_location: {
          type: GraphQLString,
        },
        signup_name: {
          type: GraphQLString,
        },
        signup_pass: {
          type: GraphQLString,
        },
      },
      async resolve(parent, args) {
        console.log("------args------", args);
        const value = args;
        const isPresent = await user_login.find({ email: value.signup_email });

        if (isPresent.length == 0) {
          //const maxid = await user_login.find().sort({id:-1}).limit(1);
          let maxid = await user_login.count();
          maxid = maxid + 1;
          console.log("--------------", maxid);
          //    console.log("IDDDDD is",maxid[0].id);

          const pp = bcrypt.hashSync(value.signup_pass, 10);
          const user_info = new user_login({
            id: maxid,
            email: value.signup_email,
            password: pp,
            role: value.role,
            location: value.signup_location,
            name: value.signup_name,
          });

          try {
            const saved_user = user_info.save();
            if (value.role == 1) {
              const cust_prof = new cust_profile({
                id: maxid,
                dob: "",
                city: "",
                state: "",
                country: "",
                nickname: "",
                phone: "",
                profile_pic: "",
                about: "",
              });
              cust_prof.save();
            } else {
              const rest_prof = new rest_info({
                r_id: maxid,
                r_description: "",
                r_contact: "",
                r_timings: "",
                profile_pic: "",
                type: "",
                user_name: "",
              });
              rest_prof.save();
            }
            return saved_user;
          } catch (error) {
            return error;
          }
        }

        return { msg: "Email ID already present" };
      }, //closing resolve function
    }, //closing one route

    login: {
      type: userObject,
      args: {
        loginEmail: {
          type: GraphQLString,
        },
        loginPassword: {
          type: GraphQLString,
        },
      },
      async resolve(parent, args) {
        const value = args;
        const isPresent = await user_login.find({ email: value.loginEmail });
        if (isPresent.length != 0) {
          try {
            if (
              bcrypt.compareSync(value.loginPassword, isPresent[0].password)
            ) {
              return isPresent[0];
            } else {
              return "Login Credentials are wrong. Please try again";
            }
          } catch (error) {
            return "There were some errors while processing your request";
          }
        } else {
          return "Login Credentials are wrong. Please try again";
        }
      },

      //closing login
    },

    userLogin: {
      type: userObject,
      args: {
        email: {
          type: GraphQLString,
        },
        password: {
          type: GraphQLString,
        },
      },
      async resolve(parent, args) {
        console.log("In user login " + args.email);
        return users
          .findOne({ email: args.email })
          .then((doc) => {
            if (bcrypt.compareSync(args.password, doc.password)) {
              let payload = {
                _id: doc._id,
                type: "users",
                email: doc.email,
                name: doc.name,
              };
              return payload;
            } else {
              console.log("invalid credentials");
              return "Invalid Credentials";
            }
          })
          .catch((error) => {
            console.log("error", error);
            return "404";
          });
      },
    },

    CustProfileUpdate: {
      type: customerObject,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      async resolve(parent, args) {
        try {
          const value = args;
          await cust_profile.updateOne(
            { id: value.id },
            {
              dob: value.dob,
              city: value.city,
              state: value.state,
              country: value.country,
              phone: value.phone,
              nickname: value.nickname,
              about: value.about,
            }
          );
          await user_login.updateOne(
            { id: value.id },
            {
              name: value.name,
              location: value.city,
              email: value.email,
            }
          );
          const result = await cust_profile.find(
            { id: value.id },
            { location: 1, _id: 0 }
          );

          return result[0];
        } catch (error) {
          console.log("Inside Error", error);
          return "There were some error while performing this task.";
        }
      },
    },

    updateCustomerProfilePic: {
      type: customerObject,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      async resolve(parent, args) {
        try {
          const value = args;
          const user_info = await cust_profile.find({ id: value.id });
          const user_info_name = await cust_profile_name.find(
            { id: value.id },
            { password: 0 }
          );
          const result = { ...user_info_name[0]._doc, ...user_info[0]._doc };
          return result;
        } catch (error) {
          return "There were some error while performing this task.";
        }
      },
    },

    createOrder: {
      type: ordersObject,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      async resolve(parent, args) {
        try {
          const value = args.order;
          const val2 = args.items;

          const maxid = await orders.count();
          const rest = await users.find({ id: value.rest_id });
          const cust = await users.find({ id: value.cust_id });
          const restP = await rest_info.find({ r_id: value.rest_id });
          const custP = await cust_info.find({ id: value.cust_id });

          let values2 = [];
          for (let i = 0; i < val2.length; i++) {
            values2.push({
              id: maxid + 1,
              name: val2[i].name,
              quantity: val2[i].size,
              cost: val2[i].price,
            });
          }
          const order_detail = new orders({
            id: maxid + 1,
            cust_id: value.cust_id,
            rest_id: value.rest_id,
            date: value.time,
            status: 1,
            mode: value.mode,
            address: value.address,
            order_status: 1,
            rest_name: rest[0].name,
            cust_name: cust[0].name,
            cust_profile_pic: restP[0].profile_pic,
            rest_profile_pic: custP[0].profile_pic,
            order_item: values2,
            instruction: value.special_instruction,
          });
          await order_detail.save();

          return { status: 200 };
        } catch (error) {
          return { status: 500 };
        }
      },
    },

    cancelCustomerOrder: {
      type: ordersObject,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      async resolve(parent, args) {
        try {
          const value = msg;
          await orders.updateOne(
            { id: value.id },
            {
              status: 8,
              order_status: 3,
            }
          );
          return { status: 200 };
        } catch (error) {
          return { status: 500 };
        }
      },
    },

    RestProfileUpdate: {
      type: restObject,
      args: {
        r_id: {
          type: GraphQLString,
        },
        r_timings2: {
          type: GraphQLString,
        },
        r_timings3: {
          type: GraphQLString,
        },
        r_timings4: {
          type: GraphQLString,
        },

        r_id: {
          type: GraphQLString,
        },
        name: {
          type: GraphQLString,
        },
        location: {
          type: GraphQLString,
        },
        r_description: {
          type: GraphQLString,
        },
      },
      async resolve(parent, args) {
        try {
          const value = args;
          const time =
            value.r_timings +
            ":" +
            value.r_timings3 +
            " - " +
            value.r_timings2 +
            ":" +
            value.r_timings4;
          await user_login.updateOne(
            { id: value.r_id },
            { name: value.name, location: value.location }
          );
          await rest_info.updateOne(
            { r_id: value.r_id },
            {
              r_contact: value.r_contact,
              r_description: value.r_description,
              r_timings: time,
              type: value.type,
            }
          );
          return { status: 200 };
        } catch (error) {
          console.log("Inside Error", error);
          return {
            status: 500,
            msg: "There were some error while performing this task.",
          };
        }
      },
    },

    RestDishesAdd: {
      type: dishesObject,
      args: {
        id: {
          type: GraphQLString,
        },
        name: {
          type: GraphQLString,
        },
        ingredients: {
          type: GraphQLString,
        },
        imageUrl: {
          type: GraphQLString,
        },
        price: {
          type: GraphQLString,
        },
        description: {
          type: GraphQLString,
        },
        category: {
          type: GraphQLString,
        },
        type: {
          type: GraphQLString,
        },
      },
      async resolve(parent, args) {
        const value = args;

        try {
          const len = await dish_add.find();
          const dish_details = new dish_add({
            id: len.length + 1,
            rest_id: value.id,
            name: value.name,
            ingredients: value.ingredients,
            images: value.imageUrl,
            price: value.price,
            description: value.description,
            cat: value.category,
            filter: value.type,
          });
          const saved_dish = await dish_details.save();
          return { status: 200, msg: "Dish was added successfully" };
        } catch (error) {
          console.log("Inside Error", error);
          return {
            status: 500,
            msg: "There were some error while performing this task.",
          };
        }
      },
    },

    UpdateOrderStatus: {
      type: ordersObject,
      args: {
        id: {
          type: GraphQLString,
        },
        status: {
          type: GraphQLString,
        },
      },
      async resolve(parent, args) {
        try {
          const value = args.orderStatus2;

          let order_detail;
          if (value.status == 4) {
            await orders.updateOne(
              { id: value.id },
              {
                status: 4,
                order_status: 2,
              }
            );
          } else if (value.status == 8) {
            await orders.updateOne(
              { id: value.id },
              {
                status: 8,
                order_status: 3,
              }
            );
          } else {
            await orders.updateOne(
              { id: value.id },
              {
                status: value.status,
              }
            );
          }
          callback(null, { status: 200, msg: order_detail });
        } catch (error) {
          callback({ status: 500 }, null);
        }
      },
    },

    UpdateOrderStatus2: {
      type: categorySchemaObject,
      args: {
        id: {
          type: GraphQLString,
        },
        status: {
          type: GraphQLString,
        },
      },
      async resolve(parent, args) {
        try {
          const value = args.orderStatus2;

          let order_detail;
          if (value.status == 4) {
            await orders.updateOne(
              { id: value.id },
              {
                status: 4,
                order_status: 2,
              }
            );
          } else if (value.status == 8) {
            await orders.updateOne(
              { id: value.id },
              {
                status: 8,
                order_status: 3,
              }
            );
          } else {
            await orders.updateOne(
              { id: value.id },
              {
                status: value.status,
              }
            );
          }
          callback(null, { status: 200, msg: order_detail });
        } catch (error) {
          callback({ status: 500 }, null);
        }
      },
    },

    UpdateOrderStatus3: {
      type: categorySchemaObject,
      args: {
        id: {
          type: GraphQLString,
        },
        status: {
          type: GraphQLString,
        },
      },
      async resolve(parent, args) {
        try {
          const value = args.orderStatus2;

          let order_detail;
          if (value.status == 4) {
            await orders.updateOne(
              { id: value.id },
              {
                status: 4,
                order_status: 2,
              }
            );
          } else if (value.status == 8) {
            await orders.updateOne(
              { id: value.id },
              {
                status: 8,
                order_status: 3,
              }
            );
          } else {
            await orders.updateOne(
              { id: value.id },
              {
                status: value.status,
              }
            );
          }
          callback(null, { status: 200, msg: order_detail });
        } catch (error) {
          callback({ status: 500 }, null);
        }
      },
    },

    UpdateOrderStatus4: {
      type: orderItemListObject,
      args: {
        id: {
          type: GraphQLString,
        },
        status: {
          type: GraphQLString,
        },
      },
      async resolve(parent, args) {
        try {
          const value = args.orderStatus2;

          let order_detail;
          if (value.status == 4) {
            await orders.updateOne(
              { id: value.id },
              {
                status: 4,
                order_status: 2,
              }
            );
          } else if (value.status == 8) {
            await orders.updateOne(
              { id: value.id },
              {
                status: 8,
                order_status: 3,
              }
            );
          } else {
            await orders.updateOne(
              { id: value.id },
              {
                status: value.status,
              }
            );
          }
          callback(null, { status: 200, msg: order_detail });
        } catch (error) {
          callback({ status: 500 }, null);
        }
      },
    },
    updateDish3: {
      type: imagesObject,
      args: {
        id: {
          type: GraphQLString,
        },
        rest_id: {
          type: GraphQLString,
        },
      },
      async resolve(parent, args) {
        try {
          const value = args;
          await dish_update.updateOne(
            { id: value.id, rest_id: value.rest_id },
            {
              name: value.name,
              ingredients: value.ingredients,
              price: value.price,
              description: value.description,
            }
          );
          return { status: 200 };
        } catch (error) {
          console.log("Inside Error", error);
          return {
            status: 500,
            msg: "There were some error while performing this task.",
          };
        }
      },
    },
  },
});
//
const schema = new GraphQLSchema({
  query: AllGetQueryObject,
  mutation: Mutation,
});

module.exports = schema;
