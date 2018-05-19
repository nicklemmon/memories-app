const mongoose = require( 'mongoose' )
const Schema = mongoose.Schema

var MemoriesSchema = new Schema({
 title: String,
 date: Date,
 summary: String,
 tags: Array
})

module.exports = mongoose.model( 'Memory', MemoriesSchema )