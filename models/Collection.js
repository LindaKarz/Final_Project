import mongoose from "mongoose"

const CollectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: 'Description not created'
  },
  topic: {
    type: Array,
    default: []
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  image: String
},
{
  timestamps: true
})

export default mongoose.model('Collection', CollectionSchema)