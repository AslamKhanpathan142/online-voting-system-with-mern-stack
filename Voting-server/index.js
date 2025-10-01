const express = require('express');
const dotenv = require('dotenv');
const connectDB = require("./config/db")
const cors = require('cors');
const authRouter = require('./routes/authRoutes')
const pollRoutes = require('./routes/pollRoutes');
const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

dotenv.config()
connectDB();


app.use('/api/auth', authRouter);
app.use('/api/polls', pollRoutes);

app.get('/', (req, res) => {
    res.json({message: 'seccessful'})
})





const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running in ${PORT}`);
})