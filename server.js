const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Add this line to parse JSON data from requests

// Replace 'csidbit' and '<password>' with your MongoDB Atlas username and password
const dbUsername = 'csidbit';
const dbPassword = 'csidbit';
const dbName = 'Members';

// Replace the connection URL with your MongoDB Atlas connection string
const dbURL = `mongodb+srv://${dbUsername}:${dbPassword}@verify-csi-members.iaqdmjc.mongodb.net/${dbName}?retryWrites=true&w=majority`;


mongoose.connect(dbURL, {
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

const MemberDetail = mongoose.model('memberdetails', studentSchema);

app.post('/api/student', async (req, res) => {
    console.log(req.body)
    const studentId = req.body.studentId; // Change to the correct property name
    console.log(studentId)

    try {
            const document = await MemberDetail.findOne({
              "studentId": studentId
            });
        
            if (document) {
              res.json(document);
            } else {
              res.status(404).json({ message: 'Document not found.' });
            }
          } catch (error) {
            res.status(500).json({ error: 'An error occurred while fetching data.' });
          }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// const express = require('express');
// const mongoose = require('mongoose');

// const app = express();

// // Replace 'csidbit' and '<password>' with your MongoDB Atlas username and password
// const dbUsername = 'csidbit';
// const dbPassword = 'csidbit';
// const dbName = 'Members';

// // Replace the connection URL with your MongoDB Atlas connection string
// const dbURL = `mongodb+srv://${dbUsername}:${dbPassword}@verify-csi-members.iaqdmjc.mongodb.net/${dbName}?retryWrites=true&w=majority`;

// mongoose.connect(dbURL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('Connected to MongoDB Atlas');
// }).catch(err => {
//   console.error('Error connecting to MongoDB Atlas:', err);
// });

// const memberDetailsSchema = new mongoose.Schema({
//   studentId: String,
//   role: String,
//   startDate: String,
//   endDate: String,
//   membershipStatus: String,
//   name: String
// });

// const MemberDetail = mongoose.model('memberdetails', memberDetailsSchema);

// app.get('/fetchMember/:studentId', async (req, res) => {
//   const studentIdToFetch = req.params.studentId;
  
//   try {
//     const document = await MemberDetail.findOne({
//       "studentId": studentIdToFetch
//     });

//     if (document) {
//       res.json(document);
//     } else {
//       res.status(404).json({ message: 'Document not found.' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while fetching data.' });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
