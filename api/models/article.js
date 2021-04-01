const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    clicks:{
      type:Number,
      default:0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Article', articleSchema);