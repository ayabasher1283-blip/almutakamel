document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. تفعيل شريط البحث الفوري (Live Search)
    // ==========================================
    const searchInputs = document.querySelectorAll('.search-box input, .search-bar input');

    searchInputs.forEach(searchInput => {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();
            
            // تحديد جميع بطاقات المنتجات في الصفحة
            const productCards = document.querySelectorAll('.product-card');

            productCards.forEach(card => {
                // جلب النص الموجود في العنوان والوصف والشارة
                const title = card.querySelector('h4, h3, .product-title')?.textContent.toLowerCase() || '';
                const desc = card.querySelector('p, .product-desc')?.textContent.toLowerCase() || '';
                const tag = card.querySelector('.badge-tag, .product-tag')?.textContent.toLowerCase() || '';

                // إذا كانت كلمة البحث مطابقة للعنوان أو الوصف أو الشارة
                if (title.includes(query) || desc.includes(query) || tag.includes(query)) {
                    card.style.display = ''; // إظهار المنتج
                } else {
                    card.style.display = 'none'; // إخفاء المنتج
                }
            });
        });
    });

    // ==========================================
    // 2. إدارة عداد عربة التسوق (Cart Counter)
    // ==========================================
    let cartCount = 0;
    const cartBadge = document.querySelector('.cart-badge');
    const cartButtons = document.querySelectorAll('.btn-cart-icon');

    cartButtons.forEach(button => {
        button.addEventListener('click', () => {
            cartCount++;
            if (cartBadge) {
                cartBadge.textContent = cartCount;
            }
            alert('تم إضافة المنتج إلى عربة التسوق بنجاح!');
        });
    });

    // ==========================================
    // 3. تفعيل أزرار "اطلب السعر" (WhatsApp Order)
    // ==========================================
    const orderButtons = document.querySelectorAll('.btn-order, .btn-price');
    
    orderButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card, .category-card');
            let productName = "المنتج";
            
            if (productCard) {
                const titleElement = productCard.querySelector('h4, h3, .product-title');
                if (titleElement) {
                    productName = titleElement.textContent.trim();
                }
            }
            
            const whatsappNumber = "+249000000000"; // استبدليه برقم الواتساب الخاص بالمتجر
            const message = encodeURIComponent(`السلام عليكم، أود الاستفسار عن سعر ومواصفات منتج: ${productName}`);
            
            window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
        });
    });

});