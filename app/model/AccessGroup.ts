import { AccessGroupUser } from "./AccessGroupUser";

export interface AccessGroup {
    id?: string; // generated by Firestore if not set on saving
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    accessGroupUsers: AccessGroupUser[]; // assigned users to group
  }