const { MongoClient } = require("mongodb");

// Support either ATLAS_URI (older name used in this project) or the
// more common MONGODB_URI environment variable.
const uri = process.env.ATLAS_URI || process.env.MONGODB_URI;

let _db;

module.exports = {
  connectToServer: function (callback) {
    if (!uri) {
      const msg = 'Missing MongoDB connection string. Set ATLAS_URI or MONGODB_URI in config.env or environment variables.';
      console.error(msg);
      return callback(new Error(msg));
    }

    // Create the client when we have a URI so the error is clear when missing.
    const client = new MongoClient(uri, {
      // these options are harmless with newer drivers but left for compatibility
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    client.connect(function (err, db) {
      if (err) {
        console.error('Failed to connect to MongoDB:', err.message || err);
        return callback(err);
      }

      // Verify we got a good "db" object
      if (db) {
        // choose a sensible default DB name if not included in the URI
        // the original code used "employees" so preserve that behavior
        _db = db.db("employees");
        console.log("Successfully connected to MongoDB.");
      }
      return callback(err);
    });
  },

  getDb: function () {
    return _db;
  },
};