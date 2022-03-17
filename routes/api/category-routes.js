const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products 
  Category.findAll({
    include: [{ model: Product }],
  }).then((catData) => {
    res.json(catData);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    include: {
      model: Product,
    },
    where: {
      id: req.params.id,
    },
  }).then((catData) => {
    res.json(catData);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  }).then((catData) => res.json(catData));
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      }
    }
  )
  .then(updateCat => {
    res.json(updateCat);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  }).then((deleteCat) => {
    res.json(deleteCat);
  });
});

module.exports = router;
