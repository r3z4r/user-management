export const typeDefs = `#graphql
input AuthUserInput {
    # email of the user
    email: String!
  
    # password of the user
    password: String!
  }
  
  input CreateUserInput {
    # email of the user
    email: String!
  
    # password of the user
    password: String!
  }
  
  # A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format.
  scalar DateTime
  
  input EditRoleInput {
    role: UserRoles!
    userId: String!
  }
  
  input EntityQueryInput {
    filters: FiltersExpressionInput
    pagination: PaginationOptionsInput
    search: SearchQueryInput
    sort: SortOptionsInput
  }
  
  input FilterInput {
    field: String!
    operation: FilterOperation!
    relationField: String!
    values: [String!]!
  }
  
  enum FilterOperation {
    EQ
    GE
    GT
    IN
    LE
    LIKE
    LT
    NE
  }
  
  enum FilterOperator {
    AND
    OR
  }
  
  input FiltersExpressionInput {
    childExpressions: [FiltersExpressionInput!]!
    filters: [FilterInput!]!
    operator: FilterOperator!
  }
  
  type Mutation {
    assignRole(assignRoleInput: EditRoleInput!): RolesForUser!
    createUser(createUserInput: CreateUserInput!): UserWithTokens!
    login(authUserInput: AuthUserInput!): UserWithTokens!
    logout: Boolean!
    removeRole(removeRoleInput: EditRoleInput!): Boolean!
    removeUser(id: String!): String!
    updateUser(updateUserInput: UpdateUserInput!): User!
  }
  
  type PaginatedUsers {
    results: [User!]!
    total: Int!
  }
  
  input PaginationOptionsInput {
    limit: Int!
    page: Int!
  }
  
  type Query {
    user(email: String!): User!
    userRoles(id: String!): RolesForUser!
    users(options: EntityQueryInput): PaginatedUsers!
  }
  
  type Role {
    createdAt: DateTime!
    description: String!
    id: String!
    title: UserRoles!
    updatedAt: DateTime!
  }
  
  type RolesForUser {
    id: String!
    roles: [UserRoles!]!
  }
  
  input SearchQueryInput {
    q: String!
  }
  
  input SortOptionsInput {
    field: String
    order: SortOrder
  }
  
  enum SortOrder {
    ASC
    DESC
  }
  
  input UpdateUserInput {
    # User email
    email: String
    id: String!
  
    # User Name
    name: String
  
    # User password
    password: String
  }
  
  type User {
    access_token: String!
  
    # The user registered time
    createdAt: String!
  
    # Created By
    createdBy: String!
  
    # User email
    email: String!
    id: String!
  
    # User role
    isAdmin: Boolean
  
    # User Name
    name: String
  
    # User password
    password: String
    roles: [Role!]
  
    # The user update information time
    updatedAt: String!
  }
  
  enum UserRoles {
    ADMIN
    CONTENT_EXPERT
    CONTENT_MANAGER
    COURIER
    CUSTOMER
    MAINTAINER
    SALES_EXPERT
    SALES_MANAGER
  }
  
  type UserWithTokens {
    access_token: String
  
    # The user registered time
    createdAt: String
  
    # Created By
    createdBy: String
  
    # User email
    email: String
    id: String
  
    # User role
    isAdmin: Boolean
  
    # User Name
    name: String
  
    # User password
    password: String
    roles: [Role!]
  
    # The user update information time
    updatedAt: Float
  }  
`;
