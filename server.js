const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Add this line to parse JSON data from requests


mongoose.connect('mongodb+srv://aditya123:aditya123@cluster0.jqvh9ci.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.once('open', () => {
    console.log('Connected to MongoDB successfully!');
});

const studentSchema = new mongoose.Schema({
    studentId: String,
    role: String,
    startDate: String,
    endDate: String,
    membershipStatus: String,
    name: String,
});

const StudentModel = mongoose.model('Student', studentSchema);

app.post('/api/student', async (req, res) => {
    console.log(req.body)
    const studentId = req.params.studentId; // Change to the correct property name
    console.log(studentId)

    try {
        const studentDetails = await StudentModel.find({ });
        console.log(studentDetails)
        if (!studentDetails) {
            console.log("inside if")
            return res.status(200).json({ message: 'Student not found' });
            console.log("not found")
        }

        res.json(studentDetails);
    } catch (error) {
        // console.error('Error fetching student details:', error);
        // res.status(500).json({ message: 'Internal server error' });
        console.log(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
