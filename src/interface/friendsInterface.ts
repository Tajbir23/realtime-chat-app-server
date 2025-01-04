interface info {
    _id: string;
    name: string;
    username: string;
    email: string;
    photoUrl: string;
    isActive: boolean;
  }
  
  interface friendsInterface {
    _id: string;
    senderId: info;
    receiverId: info;
    createdAt: string;
    updatedAt: string;
  }

  export default friendsInterface