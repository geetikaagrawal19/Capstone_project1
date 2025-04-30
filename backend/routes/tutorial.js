// routes/tutorial.js
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { marked } = require('marked'); // if using latest marked version

const router = express.Router();

// Fetch all available tutorials
router.get('/', async (req, res) => {
  try {
    const files = await fs.readdir('tutorials');
    const tutorials = files.map(file => ({
      title: file.replace('.md', '').replace(/-/g, ' '),
      filename: file,
    }));
    res.json(tutorials);
  } catch (error) {
    res.status(500).json({ error: 'Failed to list tutorials.' });
  }
});

// Fetch a specific tutorial
router.get('/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '..', 'tutorials', filename); // safer path
    const content = await fs.readFile(filePath, 'utf-8');
    const htmlContent = marked(content); // convert Markdown to HTML
    res.send(htmlContent);
  } catch (error) {
    console.error('Error fetching tutorial:', error);
    res.status(404).json({ error: 'Tutorial not found.' });
  }
});

module.exports = router;
