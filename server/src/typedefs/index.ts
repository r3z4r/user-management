export const typeDefs = `#graphql
  type Query {
    user(email: String!): User
    users(options: EntityQueryInput): PaginatedUsers!
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

  input AuthUserInput {
		email: String!
		password: String!
  }
  
  input CreateUserInput {
		email: String!
		password: String!
  }
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
  
  type PaginatedUsers {
    results: [User]!
    total: Int!
  }
  
  input PaginationOptionsInput {
    limit: Int!
    page: Int!
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
		email: String
    id: String!
		name: String
		password: String
  }
  
  type User {
    _id: String!
    access_token: String!
		createdAt: String!
		createdBy: String!
		email: String!
    name: String
		password: String
    roles: [UserRoles!]
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
		createdAt: String
		createdBy: String
		email: String
    id: String
		isAdmin: Boolean
		name: String
		password: String
    roles: [UserRoles!]
		updatedAt: Float
  }  
`;
