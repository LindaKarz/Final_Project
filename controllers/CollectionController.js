import CollectionModel from '../models/Collection.js'

export const getAll = async (req, res)=> {
  try {
    const collections = await CollectionModel.find().populate('user').exec()
    res.json(collections)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Failed to find collection'
    })
  }
}

export const getOne = async (req, res) => {
  try {
    const collectionId = req.params.id

    CollectionModel.findOne(
      {
      _id: collectionId
      },
      (err, doc) => {
        if(err) {
          console.log(err)
          return res.status(500).json({
          message: 'Failed to find collection'
          })
        }

        if(!doc) {
          return res.status(404).json({
            message: 'Collection is not found'
          })
        }

        res.json(doc)
      }
    ).populate('user')
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Failed to find collectionR'
    })
  }
}

export const remove = async (req, res)=> {
  try {
    const collectionId = req.params.id
    
    CollectionModel.findOneAndDelete({
      _id: collectionId
    }, (err, doc) => {
      if(err) {
        console.log(err)
        res.status(500).json({
        message: 'Failed to delete collection'
        })
      }

      if(!doc) {
        return res.status(404).json({
          message: 'Collection is not found'
        })
      }

      res.json({
        message: 'Collection deleted successfully'
      })
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Failed to find collection'
    })
  }
}

export const create = async (req, res) => {
  try {
    const doc = new CollectionModel({
      title: req.body.title,
      description: req.body.description,
      topic: req.body.topic,
      image: req.body.image,
      user: req.userId,
    })
    const collection = await doc.save()

    res.json(collection)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Failed to create collection'
    })
  }
}

export const update = async (req, res) => {
  try {
    const collectionId = req.params.id
    
    await CollectionModel.updateOne({
      _id: collectionId
    }, {
      title: req.body.title,
      description: req.body.description,
      topic: req.body.topic,
      image: req.body.image,
      user: req.userId,
    })

    res.json({
      message: 'Collection updated successfully'
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Failed to update collection'
    })
  }
}
