import mongoose from 'mongoose';

const mongoConnect = async () => {
    return mongoose.connect(process.env.MONGODB_URI, {}, (err) => {
        if (err) console.log('Error connecting to Mongodb:', err);
        console.log('Db connected!');
    });
}

export default mongoConnect;