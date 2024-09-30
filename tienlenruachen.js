const gameInputs = document.querySelectorAll('.gameInput');
        const enterButton = document.querySelector('.enter');
        const calculateButton = document.querySelector('.calculate');
        const submitButton = document.querySelector('.submit');
        const table = document.getElementById('scoreTable');
        const images = document.querySelectorAll('img');
// Biến để theo dõi số lượng game đã nhập
let gameCount = 1;

enterButton.addEventListener('click', function() {
    // Cập nhật giá trị vào bảng cho từng người chơi
    gameInputs.forEach(input => {
        const player = input.dataset.player;  // Lấy số thứ tự của người chơi
        const value = input.value;  // Lấy giá trị trong ô input

        // Tạo một tên class cho ô Game
        const gameClass = `game${gameCount}`;

        // Kiểm tra xem ô Game đã tồn tại chưa
        let gameCell = table.rows[player].querySelector(`.${gameClass}`);
        if (!gameCell) {
            gameCell = document.createElement('td');
            gameCell.classList.add(gameClass);
            table.rows[player].appendChild(gameCell);
        }

        // Cập nhật ô tương ứng trong bảng
        gameCell.textContent = value;

        // Xóa giá trị trong ô input sau khi nhập xong
        input.value = '';
    });

    // Cập nhật tiêu đề cho cột mới
    const header = document.createElement('th');
    header.textContent = `Game ${gameCount}`; // Tạo tiêu đề cho game mới
    table.rows[0].appendChild(header); // Thêm tiêu đề vào hàng đầu tiên

    // Tăng số lượng game lên 1 cho lần nhập tiếp theo
    gameCount++;
});

// Hàm tính tổng điểm cho từng người chơi
calculateButton.addEventListener('click', function() {
    // Thêm cột tổng nếu chưa có
    let totalHeader = table.rows[0].querySelector('th.total');
    if (!totalHeader) {
        totalHeader = document.createElement('th');
        totalHeader.textContent = 'Total';
        table.rows[0].appendChild(totalHeader);
    }

    // Tính tổng cho từng người chơi
    for (let i = 1; i < table.rows.length; i++) {
        let total = 0;
        const cells = table.rows[i].querySelectorAll('td:not(.total)'); // Không tính cột tổng

        cells.forEach(cell => {
            const value = parseFloat(cell.textContent) || 0;
            total += value;
        });

        // Cập nhật ô tổng trong bảng
        let totalCell = table.rows[i].querySelector('.total');
        if (!totalCell) {
            totalCell = document.createElement('td');
            totalCell.classList.add('total');
            table.rows[i].appendChild(totalCell);
        }

        totalCell.textContent = total;
        calculateButton.disabled = true;
            calculateButton.style.backgroundColor = '#ccc';
    }
});
submitButton.addEventListener('click', function () {
    let lowestScore = Infinity;
            let lowestIndex = -1;

            for (let i = 1; i < table.rows.length; i++) { // Bắt đầu từ hàng 1 để bỏ qua tiêu đề
                const totalCell = table.rows[i].querySelector('.total');
                const score = parseFloat(totalCell.textContent) || 0;

                if (score < lowestScore) {
                    lowestScore = score;
                    lowestIndex = i; // Lưu index của hàng có điểm thấp nhất
                }
            }

            // Thay đổi kích thước hình ảnh trong cột có điểm thấp nhất
            if (lowestIndex !== -1) {
            
        const playerName = table.rows[lowestIndex].querySelector('td[data-player]').dataset.player;
        const overlay = document.getElementById('overlay');
        overlay.style.display = 'block'; // Hiển thị overlay
        // Hiển thị thông báo chúc mừng
        const congratulatoryMessage = document.getElementById('congratulations');
        congratulatoryMessage.textContent = `Chúc mừng ${playerName} là người rửa chén!`; // Thay thế bằng tên người chơi
        congratulatoryMessage.style.display = 'block'; // Hiển thị thông báo
        const sound = document.getElementById('congratulationsSound');
        sound.play();
            }
            
});
