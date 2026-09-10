export enum RoleTypes {
  ORG_ADMIN = 'Organization Admin',
  PRODUCT_OWNER = 'Product owner',
  ANALYST = 'Analyst',
  MARKETER = 'Marketer',
  MED_REP = 'Medical representative',
  HEAD_OF_BRICK = 'Head of Brick',
  TRAINER = 'Trainer',
  CALL_CENTER = 'Call Center',
  HAVE_NO_ROLE = '',
}

export type RoleType =
  | RoleTypes.ORG_ADMIN
  | RoleTypes.PRODUCT_OWNER
  | RoleTypes.ANALYST
  | RoleTypes.MARKETER
  | RoleTypes.MED_REP
  | RoleTypes.HEAD_OF_BRICK
  | RoleTypes.TRAINER
  | RoleTypes.CALL_CENTER
  | RoleTypes.HAVE_NO_ROLE;
