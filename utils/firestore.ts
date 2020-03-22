const admin = require("firebase-admin");
let serviceAccount = require("./firestore.json");

//initializing firestore
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin.firestore();
//end initialization

// module.exports.db = db;
