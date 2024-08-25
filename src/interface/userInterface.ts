
interface user extends Document {
    name: string;
    username: string;
    email: string;
    photoUrl: string;
    password: string;
    isActive: boolean;
}

export default user