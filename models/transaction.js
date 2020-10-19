const mongoose = require('mongoose');

// Transaction Schema
const Schema = mongoose.Schema;
const TransactionSchema = new Schema({
    userId: String,
    category: String,
    createdOn: {
        type: String,
        default: Date.now()
    }
});
const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;