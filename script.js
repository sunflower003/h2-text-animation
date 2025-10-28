const hero = document.querySelector(".hero");
const heroTexts = document.querySelectorAll(".hero h2");

// --- 2. HÀM KHỞI TẠO ANIMATION ---
// Hàm này sẽ chạy sau khi trang và font chữ đã tải xong.
function init() {
    let duration = 0.75;

    // --- THIẾT LẬP TRẠNG THÁI BAN ĐẦU ---
	// Đẩy toàn bộ khối .hero xuống 75% chiều cao của chính nó.
	// Điều này làm cho chỉ có dòng chữ đầu tiên nằm ở giữa màn hình.
    gsap.set(hero, {yPercent: 75});

    // --- TẠO GSAP TIMELINE ---
    let tl = gsap.timeline();

    // --- TẠO ANIMATION CHO TỪNG DÒNG CHỮ ---
    heroTexts.forEach((text, index) => {
        tl.set(text, {opacity: 1})
            .from(text, {
                duration: duration,
                yPercent: 120,
                scale: 0.6,
                ease: "power3"
            });

        if (index > 0) {
            tl.to(hero, {
                yPercent: "-=25",
                duration: duration,
                ease: "power2"
            }, "<");   
        }
    });
}

// --- 3. ĐẢM BẢO TRANG ĐÃ TẢI XONG ---
// Kỹ thuật này đảm bảo animation chỉ bắt đầu khi trang web và tất cả các font chữ
// đã được tải hoàn toàn. Điều này tránh tình trạng animation bị giật hoặc chạy sai
// do font chưa sẵn sàng.

// Tạo một Promise sẽ hoàn thành khi sự kiện window.onload được kích hoạt.

const pageLoadedPromise = new Promise(resolve => {
    window.onload = resolve;
});

// Sử dụng Promise.all để đợi cả hai: trang tải xong và font chữ sẵn sàng.
Promise.all([pageLoadedPromise])
    .then(() => {
        // Khi cả hai đã hoàn thành, gọi hàm khởi tạo animation.
        init();
    })
    .catch(error => {
        console.error("Error:", error);
    });