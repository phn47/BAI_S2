const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu');

// Lấy danh sách menu
router.get('/', menuController.getMenus);

// Lấy chi tiết menu
router.get('/:id', menuController.getMenu);

// Tạo menu mới
router.post('/', menuController.createMenu);

// Cập nhật menu
router.put('/:id', menuController.updateMenu);

// Xóa menu
router.delete('/:id', menuController.deleteMenu);

module.exports = router; 