export interface Application {
    id?: string; // generated by Firestore if not set on saving
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    accessGroupIds: string[]; // access groups, which are allowed to access this application
  }