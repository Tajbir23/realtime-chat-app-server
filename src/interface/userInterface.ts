
interface user extends Document {
    name: string;
    username: string;
    email: string;
    photoUrl: string;
    password: string;
    isActive: boolean;
    _id: string
}

export default user