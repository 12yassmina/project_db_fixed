const { MongoClient } = require('mongodb');
require('dotenv').config();

class Database {
  constructor() {
    this.client = null;
    this.db = null;
  }

  async connect() {
    try {
      if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI is not defined in environment variables');
      }

      console.log('Connecting to MongoDB...');
      this.client = new MongoClient(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });

      await this.client.connect();
      this.db = this.client.db(process.env.DB_NAME || 'marhba-bik');
      
      console.log('✅ Successfully connected to MongoDB Atlas');
      console.log(`📊 Database: ${this.db.databaseName}`);
      
      // Test the connection
      await this.db.admin().ping();
      console.log('🏓 Database ping successful');

      return this.db;
    } catch (error) {
      console.error('❌ MongoDB connection error:', error.message);
      throw error;
    }
  }

  async disconnect() {
    try {
      if (this.client) {
        await this.client.close();
        console.log('📴 Disconnected from MongoDB');
      }
    } catch (error) {
      console.error('❌ Error disconnecting from MongoDB:', error.message);
    }
  }

  getDb() {
    if (!this.db) {
      throw new Error('Database not connected. Call connect() first.');
    }
    return this.db;
  }

  // Collection helpers
  getCollection(name) {
    return this.getDb().collection(name);
  }

  // Health check
  async healthCheck() {
    try {
      await this.db.admin().ping();
      return { status: 'healthy', database: this.db.databaseName };
    } catch (error) {
      return { status: 'unhealthy', error: error.message };
    }
  }
}

// Create singleton instance
const database = new Database();

module.exports = database;
