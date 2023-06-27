const express = require('express');
const dotenv = require('dotenv');
const app = express();
const connectDB = require("./config/db");
dotenv.config();
connectDB();

app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");




// const notes = require('./data/notes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

const PORT =  process.env.PORT||5000;

app.get('/', (req, res) => {
    // console.log(process.env.PORT);
    res.send('Welcome to Local host 5000')
})

// app.get('/api/notes', (req, res) => {
//     res.json(notes);
// })

// app.get("/api/notes/:id", (req, res) => {
//     const note = notes.find((no) => no._id === req.params.id)
//     res.send(note);
// });

app.use('/api/users', userRoutes);
app.use("/api/notes", noteRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, (err)=>{
    if(err) throw err;
    console.log(`Server running on port ${PORT}`);
});