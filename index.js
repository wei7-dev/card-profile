document.addEventListener("DOMContentLoaded", () => {
    // 1. KHO DỮ LIỆU TẤT CẢ CÁC DỰ ÁN CỦA BẠN (Tự do thêm hàng chục dự án tại đây)
    const allMyProjectsArray = [
        { title: "Dự án 1: Thiệp sinh nhật", url: "https://sinh-nhat-ny.netlify.app/", icon: "🎂" },
        { title: "Dự án 2: Thẻ giới thiệu thông tin", url: "https://wei7-dev.github.io/card_profile/", icon: "💳" },
        { title: "Dự án 3: HRM-System", url: "https://wei7-dev.github.io/hrm-system/", icon: "📱" },
        { title: "Dự án 4: Honda-Model", url: "https://wei7-dev.github.io/honda-model/admin-dashboard/index.html", icon: "🏍️" }
    ];

    const PROJECTS_PER_PAGE = 4; // Cấu hình số dự án tối đa hiện trên 1 trang
    let currentPageIndex = 0;

    // 2. KHAI BÁO CÁC BIẾN DOM (Bắt buộc phải có đầy đủ để tránh lỗi tàng hình)
    const mainContent = document.getElementById('main-profile-content');
    const codeViewer = document.getElementById('code-viewer-content');
    const viewSourceBtn = document.getElementById('view-source-trigger');
    const backBtn = document.getElementById('back-to-profile');
    
    const projectsContainer = document.getElementById('projects-container-list');
    const counterDisplay = document.getElementById('project-counter');
    const prevBtn = document.getElementById('prev-project');
    const nextBtn = document.getElementById('next-project');

    // 3. HÀM TẠO GIAO DIỆN THANH DỰ ÁN XẾP TẦNG & PHÂN TRANG
    function renderProjectsList() {
        if (!projectsContainer) return; // Chặn lỗi ngầm nếu HTML chưa load kịp
        
        projectsContainer.innerHTML = ""; // Làm sạch danh sách cũ
        
        // Tính toán vị trí cắt mảng dự án theo trang hiện tại
        const startIndex = currentPageIndex * PROJECTS_PER_PAGE;
        const endIndex = startIndex + PROJECTS_PER_PAGE;
        const paginatedProjects = allMyProjectsArray.slice(startIndex, endIndex);
        
        // Cập nhật bộ đếm số trang dưới chân (Ví dụ: Trang 1 / 2)
        const totalPages = Math.ceil(allMyProjectsArray.length / PROJECTS_PER_PAGE);
        if (counterDisplay) {
            counterDisplay.innerText = `Trang ${currentPageIndex + 1} / ${totalPages}`;
        }

        // Vẽ hàng loạt ô dự án xếp tầng phẳng lỳ gọn gàng giống ảnh mẫu
        paginatedProjects.forEach(project => {
            const aTag = document.createElement("a");
            aTag.setAttribute("href", project.url);
            aTag.setAttribute("target", "_blank");
            aTag.classList.add("project-list-item");
            
            aTag.innerHTML = `
                <div class="item-icon">${project.icon}</div>
                <div class="item-text-group">
                    <h4>${project.title}</h4>
                    <span class="item-link-text">Nhấp để truy cập dự án ↗</span>
                </div>
            `;
            projectsContainer.appendChild(aTag);
        });
    }

    // 4. CẤU HÌNH CÁC SỰ KIỆN ĐIỀU HƯỚNG CHUYỂN TRANG DỰ ÁN
    // Bấm xem nguồn dự án tại Profile -> Ẩn thông tin cá nhân, Hiện danh sách dự án
    if (viewSourceBtn && mainContent && codeViewer) {
        viewSourceBtn.addEventListener('click', (e) => {
            e.preventDefault();
            mainContent.style.display = 'none';
            codeViewer.style.display = 'flex';
            renderProjectsList();
        });
    }

    // Bấm nút quay lại -> Trở lại Card Profile ban đầu
    if (backBtn && mainContent && codeViewer) {
        backBtn.addEventListener('click', () => {
            codeViewer.style.display = 'none';
            mainContent.style.display = 'block';
        });
    }

    // Nút điều hướng sang trang dự án Sau
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(allMyProjectsArray.length / PROJECTS_PER_PAGE);
            if (currentPageIndex < totalPages - 1) {
                currentPageIndex++;
                renderProjectsList();
            }
        });
    }

    // Nút điều hướng lùi về trang dự án Trước
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPageIndex > 0) {
                currentPageIndex--;
                renderProjectsList();
            }
        });
    }

    // 5. LOGIC ĐIỀU KHIỂN NÚT BẤM LIGHT / DARK THEME (ĐÃ FIX KHỚP NGOẶC KHÉP KÍN)
    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
        const sunIcon = themeBtn.querySelector(".sun-icon");
        const moonIcon = themeBtn.querySelector(".moon-icon");

        themeBtn.addEventListener("click", () => {
            // Kích hoạt thêm/xóa class light-mode tại body tổng để ăn CSS biến var()
            document.body.classList.toggle("light-mode");
            
            // Hoán đổi ẩn/hiện icon SVG Mặt trời và Mặt trăng tương ứng
            if (document.body.classList.contains("light-mode")) {
                if (sunIcon) sunIcon.style.display = "none";     // Ẩn icon mặt trời
                if (moonIcon) moonIcon.style.display = "block";    // Hiện icon mặt trăng
            } else {
                if (sunIcon) sunIcon.style.display = "block";    // Hiện icon mặt trời
                if (moonIcon) moonIcon.style.display = "none";     // Ẩn icon mặt trăng
            }
        });
    }
});
