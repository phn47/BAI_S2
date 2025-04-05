const axios = require('axios');

// Cấu hình axios
const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Hàm test API Categories
async function testCategoryAPI() {
    console.log('=== TEST API CATEGORIES ===');

    try {
        // Lấy danh sách categories
        console.log('1. Lấy danh sách categories:');
        const categoriesResponse = await api.get('/categories');
        console.log('Kết quả:', categoriesResponse.data);

        // Lấy chi tiết category theo slug
        if (categoriesResponse.data.length > 0) {
            const categorySlug = categoriesResponse.data[0].slug;
            console.log(`\n2. Lấy chi tiết category theo slug (${categorySlug}):`);
            const categoryDetailResponse = await api.get(`/categories/${categorySlug}`);
            console.log('Kết quả:', categoryDetailResponse.data);
        }
    } catch (error) {
        console.error('Lỗi khi test API Categories:', error.response ? error.response.data : error.message);
    }
}

// Hàm test API Products
async function testProductAPI() {
    console.log('\n=== TEST API PRODUCTS ===');

    try {
        // Lấy danh sách products
        console.log('1. Lấy danh sách products:');
        const productsResponse = await api.get('/products');
        console.log('Kết quả:', productsResponse.data);

        // Lấy chi tiết product theo slug
        if (productsResponse.data.length > 0) {
            const productSlug = productsResponse.data[0].slug;
            console.log(`\n2. Lấy chi tiết product theo slug (${productSlug}):`);
            const productDetailResponse = await api.get(`/products/${productSlug}`);
            console.log('Kết quả:', productDetailResponse.data);
        }

        // Lấy sản phẩm theo category
        const categoriesResponse = await api.get('/categories');
        if (categoriesResponse.data.length > 0) {
            const categorySlug = categoriesResponse.data[0].slug;
            console.log(`\n3. Lấy sản phẩm theo category (${categorySlug}):`);
            const productsByCategoryResponse = await api.get(`/api/${categorySlug}`);
            console.log('Kết quả:', productsByCategoryResponse.data);
        }
    } catch (error) {
        console.error('Lỗi khi test API Products:', error.response ? error.response.data : error.message);
    }
}

// Hàm test API Menu
async function testMenuAPI() {
    console.log('\n=== TEST API MENU ===');

    try {
        // Lấy danh sách menu
        console.log('1. Lấy danh sách menu:');
        const menusResponse = await api.get('/menus');
        console.log('Kết quả:', menusResponse.data);

        // Lấy chi tiết menu
        if (menusResponse.data.length > 0) {
            const menuId = menusResponse.data[0]._id;
            console.log(`\n2. Lấy chi tiết menu theo ID (${menuId}):`);
            const menuDetailResponse = await api.get(`/menus/${menuId}`);
            console.log('Kết quả:', menuDetailResponse.data);
        }
    } catch (error) {
        console.error('Lỗi khi test API Menu:', error.response ? error.response.data : error.message);
    }
}

// Hàm chạy tất cả các test
async function runAllTests() {
    console.log('Bắt đầu test các API...\n');

    await testCategoryAPI();
    await testProductAPI();
    await testMenuAPI();

    console.log('\nHoàn thành tất cả các test!');
}

// Chạy tất cả các test
runAllTests(); 