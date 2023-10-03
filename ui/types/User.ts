export enum UserRoles {
  admin = "ADMIN",
  contentExpert = "CONTENT_EXPERT",
  contentManager = "CONTENT_MANAGER",
  courier = "COURIER",
  customer = "CUSTOMER",
  maintainer = "MAINTAINER",
  saleseExpert = "SALES_EXPERT",
  salesManager = "SALES_MANAGER",
}

export interface User {
  _id: string;
  name: string;
  email: string;
  roles: UserRoles[];
}
