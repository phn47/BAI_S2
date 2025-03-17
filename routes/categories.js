let express = require('express');
let router = express.Router();
let Category = require('../schemas/category'); // Import schema

// Create a new category
router.post('/', async (req, res) => {
    try {
        let category = new Category(req.body);
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all categories
router.get('/', async (req, res) => {
    try {
        let categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single category by ID
router.get('/:id', async (req, res) => {
    try {
        let category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a category by ID
router.put('/:id', async (req, res) => {
    try {
        let category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a category by ID
router.delete('/:id', async (req, res) => {
    try {
        let category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;