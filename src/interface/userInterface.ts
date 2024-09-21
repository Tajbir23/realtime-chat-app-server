
interface user extends Document {
    name: string;
    username: string;
    email: string;
    photoUrl: string;
    password: string;
    isActive: boolean;
    _id: string;
    lastActive: number;
    myDay: string;
    myDayEndAt: number
}

export default user