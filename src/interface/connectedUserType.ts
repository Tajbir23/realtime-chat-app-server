// types.ts (optional)
export default interface ConnectedUserType {
    [userId: string]: string[]; // userId maps to an array of socket IDs
  }
  