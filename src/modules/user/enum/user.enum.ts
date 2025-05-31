export enum UserType {
  FREE = 'free',
  PAID = 'paid',
}

export enum AuthProvider {
  EMAIL_PASSWORD = 'EMAIL_PASSWORD',
  GOOGLE = 'GOOGLE',
  LINKEDIN = 'LINKEDIN',
  CREATE_ACCOUNT = 'CREATE_ACCOUNT ',
}

export enum InviteStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
}

export enum InviteStatusFE {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  DEACTIVATED = 'deactivated',
}

export enum UserNature {
  AdminPanelUser = 'admin-panel-user',
  User = 'user',
}

export enum RestrictedStatus {
  ACTIVE = 'active',
  RESTRICTED = 'restricted',
}

export enum UserRole {
  SUPPORT = 'SUPPORT',
  ADMIN = 'ADMIN',
}
