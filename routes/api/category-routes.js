const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll()
  .then(dbCategory => res.json(dbCategory))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});

router.get('/:id', (req, res) => {
 
    Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [Product],
    })
      .then((dbCategory) => res.json(dbCategory))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
  });

router.post('/', (req, res) => {
  Category.create({
    Category_name: req.body.Category_name,
    
  })
    .then(dbCategory => res.json(dbCategory))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then((dbCategory) => res.status(200).json(dbCategory))
  .catch((err) => res.status(400).json(err));
});


router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCategory => {
      if (!dbCategory) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
      res.json(dbCategory);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

module.exports = router;
