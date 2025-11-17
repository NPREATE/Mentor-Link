export const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    phone: String
    type: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    signup(name: String!, email: String!, password: String!, type: String!): AuthPayload
    signin(email: String!, password: String!): AuthPayload
    requestOtp(email: String!): RequestOtpResult!
    verifyOtp(email: String!, code: String!): VerifyOtpResult!
    enrollCourse(id: String!): Boolean!
    updateUser(
      email: String!
      full_name: String
      phone: String
    ): User
  }

  type RequestOtpResult {
    success: Boolean!
    expiresAt: String
  }

  type VerifyOtpResult {
    success: Boolean!
  }

  type Course {
    id: String! 
    name: String!
    faculty: String!
  }

  type Query {
    _empty: String
    requestOtp(email: String!): RequestOtpResult!
    verifyOtp(email: String!, code: String!): VerifyOtpResult!
    enrollCourse(id: String!): Boolean!
    updateUser(
      email: String!
      full_name: String
      phone: String
    ): User
  }

  type Query {
    checkExistUser(email: String! ): Boolean!
    getCourse: [Course!]!
    getUserByEmail(email: String!): User
  }
`;