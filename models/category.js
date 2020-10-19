const { builtinModules } = require('module');
const mongoose = require('mongoose');

// Category Schema
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
    userId: String,
    name: String,
    budgetedAmount: Number,
    spentAmount: Number,
    createdOn: {
        type: String,
        default: Date.now()
    }
});
const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;