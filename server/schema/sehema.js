import Product from "../models/ProductModel.js";
import graphql from "graphql";
import User from "../models/UserModel.js";
const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLNonNull,
} = graphql;

//PRODUCT TYPE

const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLFloat },
    category: { type: GraphQLString },
    image: { type: GraphQLString },
    rating: {
      type: new GraphQLObjectType({
        name: "ProductRating",
        fields: () => ({
          rate: { type: GraphQLFloat },
          count: { type: GraphQLInt },
        }),
      }),
    },
  }),
});

//USER TYPE

const userType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    userName: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    isAdmin: { type: GraphQLBoolean },
    createdAt: {
      type: GraphQLString,
      resolve: (user) => user.createdAt.toISOString(),
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (user) => user.updatedAt.toISOString(),
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        return Product.find();
      },
    },

    product: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Product.findById(args.id);
      },
    },
  },
});

//MUTATIONS

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: userType,
      args: {
        userName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const user = new User({
          userName: args.userName,
          email: args.email,
          phone: args.phone,
        });
        return user.save();
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
