const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
    .then(dbtab => res.json(dbtab))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(dbTag => res.json(dbTag))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });


});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
})
    .then(dbTag => res.json(dbTag))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  Tag.update(req.body,{
    where: {
      id: req.params.id
    }
  })
  .then(dbTag => res.json(dbTag))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where:{
      id: req.params.id
    }
  })
  .then(dbtab => {
    if (!dbtab) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.json(dbtab);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});

module.exports = router;
