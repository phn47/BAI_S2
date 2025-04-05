const mongoose = require('mongoose');
const Category = require('./schemas/category');
const Product = require('./schemas/product');
const Menu = require('./schemas/menu');

// Kết nối đến MongoDB
mongoose.connect('mongodb://localhost:27017/S2', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Hàm tạo slug từ tên
function createSlug(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[đĐ]/g, 'd')
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

// Hàm xóa tất cả dữ liệu cũ
async function clearData() {
    try {
        await Category.deleteMany({});
        await Product.deleteMany({});
        await Menu.deleteMany({});
        console.log('Đã xóa dữ liệu cũ');
    } catch (error) {
        console.error('Lỗi khi xóa dữ liệu:', error);
    }
}

// Hàm tạo dữ liệu mẫu
async function seedData() {
    try {
        // Tạo danh mục
        const categories = [
            { name: 'Điện thoại Apple', description: 'Các sản phẩm điện thoại của Apple' },
            { name: 'Điện thoại Samsung', description: 'Các sản phẩm điện thoại của Samsung' },
            { name: 'Điện thoại Xiaomi', description: 'Các sản phẩm điện thoại của Xiaomi' },
            { name: 'Điện thoại OPPO', description: 'Các sản phẩm điện thoại của OPPO' }
        ];

        const createdCategories = [];
        for (const category of categories) {
            const slug = createSlug(category.name);
            const newCategory = new Category({
                ...category,
                slug
            });
            const savedCategory = await newCategory.save();
            createdCategories.push(savedCategory);
            console.log(`Đã tạo danh mục: ${category.name}`);
        }

        // Tạo sản phẩm
        const products = [
            {
                name: 'iPhone 14 Pro Max',
                price: 34990000,
                quantity: 50,
                description: 'iPhone 14 Pro Max 128GB chính hãng VN/A',
                imgURL: 'https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-den-thumb-600x600.jpg',
                category: createdCategories[0]._id
            },
            {
                name: 'Samsung Galaxy S23 Ultra',
                price: 31990000,
                quantity: 40,
                description: 'Samsung Galaxy S23 Ultra 256GB chính hãng',
                imgURL: 'https://cdn.tgdd.vn/Products/Images/42/249948/samsung-galaxy-s23-ultra-thumb-xanh-600x600.jpg',
                category: createdCategories[1]._id
            },
            {
                name: 'Xiaomi 13 Pro',
                price: 19990000,
                quantity: 30,
                description: 'Xiaomi 13 Pro 256GB chính hãng',
                imgURL: 'https://cdn.tgdd.vn/Products/Images/42/288967/xiaomi-13-pro-thumb-xanh-600x600.jpg',
                category: createdCategories[2]._id
            },
            {
                name: 'OPPO Find X6 Pro',
                price: 22990000,
                quantity: 25,
                description: 'OPPO Find X6 Pro 256GB chính hãng',
                imgURL: 'https://cdn.tgdd.vn/Products/Images/42/288967/oppo-find-x6-pro-thumb-den-600x600.jpg',
                category: createdCategories[3]._id
            }
        ];

        for (const product of products) {
            const slug = createSlug(product.name);
            const newProduct = new Product({
                ...product,
                slug
            });
            await newProduct.save();
            console.log(`Đã tạo sản phẩm: ${product.name}`);
        }

        // Tạo menu
        const menus = [
            { text: 'Trang chủ', url: '/', order: 1 },
            { text: 'Sản phẩm', url: '/products', order: 2 },
            { text: 'Giới thiệu', url: '/about', order: 3 },
            { text: 'Liên hệ', url: '/contact', order: 4 }
        ];

        for (const menu of menus) {
            const newMenu = new Menu(menu);
            await newMenu.save();
            console.log(`Đã tạo menu: ${menu.text}`);
        }

        // Tạo menu con cho Sản phẩm
        const productMenu = await Menu.findOne({ text: 'Sản phẩm' });
        if (productMenu) {
            for (const category of createdCategories) {
                const subMenu = new Menu({
                    text: category.name,
                    url: `/products/${category.slug}`,
                    order: category.order || 0,
                    parent: productMenu._id
                });
                await subMenu.save();
                console.log(`Đã tạo menu con: ${category.name}`);
            }
        }

        console.log('Đã hoàn thành việc tạo dữ liệu mẫu');
        process.exit(0);
    } catch (error) {
        console.error('Lỗi khi tạo dữ liệu mẫu:', error);
        process.exit(1);
    }
}

// Thực hiện xóa dữ liệu cũ và tạo dữ liệu mới
clearData().then(() => {
    seedData();
}); 