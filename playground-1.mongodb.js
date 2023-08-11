/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('Members');

// Insert multiple documents into the memberDetails collection.
db.getCollection('memberdetails').insertMany([
  {
    "studentId": "2020130011",
    "role": "csi-core",
    "startDate": "2023-09-01",
    "endDate": "2023-12-15",
    "membershipStatus": "Active",
    "name": "Suhani"
  },
  {
    "studentId": "2020130039",
    "role": "csi-member",
    "startDate": "2023-09-01",
    "endDate": "2023-12-15",
    "membershipStatus": "Active",
    "name": "Saanvi"
  },
  // Add more documents here as needed
]);

// Find a document in the memberDetails collection by studentId
var studentIdToFetch = "2020130011";
var document = db.getCollection('memberdetails').findOne({
  "studentId": studentIdToFetch
});

// Print the fetched document as a formatted JSON string
print(JSON.stringify(document, null, 2));
