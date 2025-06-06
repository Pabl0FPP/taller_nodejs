export const typeDefs = `
type Fragrance {
  id: ID!
  name: String!
  description: String!
  color: String!
  image_url: String!
}

type Container {
  id: ID!
  material: String!
  height: Float!
  width: Float!
  description: String!
}

input UserInput {
  name: String!
  email: String!
  password: String!
}

type User {
  id: ID!
  name: String!
  email: String!
  role: String!
}

type Candle {
  id: ID!
  id_container: String!
  id_fragance: String!
  image_url: String!
  text: String!
}

type Cart {
  id: ID!
  items: [Candle!]!
}

type Query {
  users: [User!]!
  user(id: ID!): User
  candles: [Candle!]!
  candle(id: ID!): Candle
  cart: Cart
  containers: [Container!]!
  container(id: ID!): Container
  fragances: [Fragrance!]!
  fragance(id: ID!): Fragrance
}

input CandleInput {
  id_container: String!
  id_fragance: String!
  image_url: String!
  text: String!
}

input ContainerInput {
  material: String!
  height: Float!
  width: Float!
  description: String!
}

input FragranceInput {
  name: String!
  description: String!
  color: String!
  image_url: String!
}

input AddToCartInput {
  candleId: ID!
  quantity: Int!
}

type Mutation {
  createUser(input: UserInput!): User!
  updateUser(id: ID!, input: UserInput!): User!
  deleteUser(id: ID!): Boolean!
  createCandle(input: CandleInput!): Candle!
  addToCart(input: AddToCartInput!): Cart!
  removeFromCart(candleId: ID!): Cart!
  createContainer(input: ContainerInput!): Container!
  updateContainer(id: ID!, input: ContainerInput!): Container!
  deleteContainer(id: ID!): Boolean!
  createFragance(input: FragranceInput!): Fragrance!
  updateFragance(id: ID!, input: FragranceInput!): Fragrance!
  deleteFragance(id: ID!): Boolean!
}
`; 