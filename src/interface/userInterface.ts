
interface user extends Document {
    name: string;
    username: string;
    email: string;
    photoUrl: string;
    password: string;
    isActive: boolean;
    _id: string;
    lastActive: number;
}

export default user