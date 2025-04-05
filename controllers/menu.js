const Menu = require('../schemas/menu');

// Lấy danh sách menu
exports.getMenus = async (req, res) => {
    try {
        const menus = await Menu.find({ isDeleted: false })
            .populate('parent')
            .sort({ order: 1 });
        res.json(menus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy chi tiết menu
exports.getMenu = async (req, res) => {
    try {
        const menu = await Menu.findOne({
            _id: req.params.id,
            isDeleted: false
        }).populate('parent');

        if (!menu) {
            return res.status(404).json({ message: 'Không tìm thấy menu' });
        }

        res.json(menu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tạo menu mới
exports.createMenu = async (req, res) => {
    try {
        const menu = new Menu({
            text: req.body.text,
            url: req.body.url,
            order: req.body.order || 0,
            parent: req.body.parent || null
        });

        const newMenu = await menu.save();
        res.status(201).json(newMenu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Cập nhật menu
exports.updateMenu = async (req, res) => {
    try {
        const menu = await Menu.findOne({
            _id: req.params.id,
            isDeleted: false
        });

        if (!menu) {
            return res.status(404).json({ message: 'Không tìm thấy menu' });
        }

        menu.text = req.body.text || menu.text;
        menu.url = req.body.url || menu.url;
        menu.order = req.body.order || menu.order;
        menu.parent = req.body.parent || menu.parent;

        const updatedMenu = await menu.save();
        res.json(updatedMenu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Xóa menu (soft delete)
exports.deleteMenu = async (req, res) => {
    try {
        const menu = await Menu.findOne({
            _id: req.params.id,
            isDeleted: false
        });

        if (!menu) {
            return res.status(404).json({ message: 'Không tìm thấy menu' });
        }

        menu.isDeleted = true;
        await menu.save();

        res.json({ message: 'Đã xóa menu thành công' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 