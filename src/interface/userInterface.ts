
interface user extends Document {
    name: string;
    username: string;
    email: string;
    photoUrl: string;
    password: string;
}

export default user