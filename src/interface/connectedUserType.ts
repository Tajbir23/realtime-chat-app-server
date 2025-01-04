// types.ts (optional)
export default interface ConnectedUserType {
  [userId: string]: {
    [deviceId: string]: string; // Each deviceId maps to a single socketId
}}
  