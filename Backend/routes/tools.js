const express = require('express');
const router = express.Router();
const Tool = require('../models/ToolsSchema'); 

// POST /api/tools/add
router.post('/add', async (req, res) => {
    const { toolId, name, category, description, location, status } = req.body;
  
    try {
      const newTool = new Tool({
        toolId,
        name,
        category,
        description,
        location,
        status
      });
  
      await newTool.save();
      res.status(201).json({ message: 'Tool added successfully', tool: newTool });
    } catch (error) {

      console.error("Error adding tool:", error); 
  res.status(500).json({ message: 'Error adding tool', error: error.message });
    }
  });

  // PUT /api/tools/update/:id
router.put('/update/:toolId', async (req, res) => {
    const { toolId } = req.params;
    const updatedData = req.body;
  
    try {
      const updatedTool = await Tool.findByIdAndUpdate(
        toolId,            
        updatedData,       
        { new: true }
      );
  
      if (!updatedTool) {
        return res.status(404).json({ message: 'Tool not found' });
      }
  
      res.status(200).json({ message: 'Tool updated successfully', tool: updatedTool });
    } catch (error) {
      console.error("Error updating tool:", error);
      res.status(500).json({ message: 'Error updating tool', error: error.message });
    }
  });
  
  
// DELETE /api/tools/delete/:id
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedTool = await Tool.findByIdAndDelete(id);
      if (!deletedTool) return res.status(404).json({ message: 'Tool not found' });
  
      res.json({ message: 'Tool deleted successfully', tool: deletedTool });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting tool', error });
    }
  });
// Get /api/tools/all
  router.get('/all', async (req, res) => {
    try {
      const tools = await Tool.find();
      res.status(200).json(tools);
    } catch (error) {
      console.error("Error fetching tools:", error);
      res.status(500).json({ message: 'Error fetching tools', error: error.message });
    }
  });
// Get /api/tools/all/:id
  router.get('/:id', async (req, res) => {
    const { id } = req.params; 
  
    try {
      const tool = await Tool.findById(id); 
      if (!tool) {
        return res.status(404).json({ message: 'Tool not found' }); 
      }
  
      res.status(200).json(tool); 
    } catch (error) {
      console.error("Error fetching tool:", error);
      res.status(500).json({ message: 'Error fetching tool', error: error.message }); 
    }
  });
  
  
  module.exports = router;