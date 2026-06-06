// ================= 1. KHO ĐÁP ÁN CHO TẤT CẢ CÁC ĐỀ =================
const ALL_ANSWER_KEYS = {
    "TEST_1": {
        listening: { 
            // Part 1
            q1: "april", q2: "14", q3: "45 km", q4: "pool", q5: "850", q6: "dinner", q7: "helmet", q8: "bike-gear", q9: "route", q10: "castle",
            // Part 2
            q11: "A", q12: "C", q13: "B", q14: "C", 
            q15: "C", q16: "H", q17: "F", q18: "G", q19: "E", q20: "A",
            // Part 3
            q21: "E", q22: "I", q23: "G", q24: "A", q25: "H", q26: "D",
            q27: "C", q28: "A", q29: "E", q30: "G",
            // Part 4
            q31: "atlantic", q32: "meat", q33: "gardens", q34: "flatworm", q35: "soil", q36: "north-west", q37: "shrubs", q38: "seaweed", q39: "united states", q40: "competitors"
        },
        reading: { 
            // Passage 1
            q1: "ten thousand", q2: "south-east asia", q3: "hard seeds", 
            q4: "F", q5: "A", q6: "D", q7: "C", q8: "E", q9: "B", q10: "C", 
            q11: "NOT GIVEN", q12: "FALSE", q13: "TRUE",
            // Passage 2
            q14: "C", q15: "E", q16: "B", q17: "F", q18: "D", 
            q19: "NO", q20: "NOT GIVEN", q21: "NO", q22: "NOT GIVEN", q23: "YES", q24: "YES", 
            q25: "B", q26: "D",
            // Passage 3
            q27: "D", q28: "B", q29: "C", q30: "C", q31: "A", q32: "A", 
            q33: "high tides", q34: "agricultural production", q35: "coastal boundaries", 
            q36: "NOT GIVEN", q37: "NO", q38: "NOT GIVEN", q39: "YES", q40: "NO" 
        }
    },
    "TEST_2": {
            listening: { 
            // Part 1
            q1: "743002", q2: "international", q3: "6:45 to 6:15", q4: "30", q5: "echo", q6: "credit card", q7: "7 days", q8: "1000", q9: "luggage", q10: "pavement",
            // Part 2
            q11: "A", q12: "C", q13: "B", q14: "C", q15: "A", 
            q16: "F", q17: "A", q18: "G", q19: "E", q20: "D",
            // Part 3
            q21: "B", q22: "D", q23: "A", q24: "E", 
            q25: "F", q26: "H", q27: "C", q28: "D", q29: "B", q30: "A",
            // Part 4
            q31: "beach erosion", q32: "camera", q33: "storm", q34: "continent", q35: "geology", q36: "rounded", q37: "spoon", q38: "permanent marker", q39: "newspaper", q40: "label"
        },
            reading: {
                // Passage 1
                q1: "A", q2: "C", q3: "D",
                q4: "amygdala", q5: "10 per cent", q6: "their personality",
                q7: "graded", q8: "therapist", q9: "negative thoughts", q10: "behaviour",
                q11: "psychotherapy", q12: "endorphins", q13: "insomnia",
                // Passage 2
                q14: "C", q15: "D", q16: "F", q17: "A", q18: "D", q19: "E", q20: "B",
                q21: "C", q22: "B", q23: "A",
                q24: "FALSE", q25: "TRUE", q26: "NOT GIVEN",
                // Passage 3
                q27: "longevity", q28: "less developed countries", q29: "more developed nations",
                q30: "reform", q31: "contributions", q32: "generations", q33: "precedent",
                q34: "NO", q35: "NO", q36: "YES", q37: "NOT GIVEN", q38: "YES", q39: "NO",
                q40: "B"
            }
        }
};

// ================= 2. LOGIC CHUYỂN TAB (NGHE - ĐỌC - VIẾT) =================
function switchSkill(skillName) {
    // Ẩn tất cả các Section
    document.querySelectorAll('.skill-section').forEach(section => {
        section.classList.remove('active');
    });
    // Bỏ kích hoạt tất cả các tab điều hướng
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Hiển thị section và kích hoạt tab được chọn
    document.getElementById(`${skillName}-section`).classList.add('active');
    document.getElementById(`tab-${skillName}`).classList.add('active');
}

// ================= 3. LOGIC ĐỒNG HỒ ĐẾM NGƯỢC =================
let timeElapsed = 0; // Tính bằng giây, bắt đầu từ 0
const timerElement = document.getElementById('timer');

// Kiểm tra xem trang có đồng hồ không rồi mới chạy
if (timerElement) {
    setInterval(() => {
        let minutes = Math.floor(timeElapsed / 60);
        let seconds = timeElapsed % 60;

        // Định dạng hiển thị số 0 phía trước nếu < 10
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        timerElement.textContent = `${minutes}:${seconds}`;
        
        // Tăng thời gian lên 1 giây, không có lệnh bắt buộc nộp bài (submitTest)
        timeElapsed++; 
    }, 1000);
}

// ================= 4. LOGIC CHẤM ĐIỂM =================
function submitTest() {
    // Kiểm tra xem mã đề có được khai báo ở file HTML không
    if (typeof CURRENT_TEST_ID === 'undefined') {
        alert("Lỗi: Không tìm thấy mã đề (CURRENT_TEST_ID) trong file HTML.");
        return;
    }

    const currentAnswers = ALL_ANSWER_KEYS[CURRENT_TEST_ID];

    // Chấm điểm Listening
    let listeningScore = 0;
    for (let i = 1; i <= 40; i++) {
        const inputElement = document.getElementById(`lis-q${i}`);
        if (inputElement) {
            const studentAns = inputElement.value.trim().toLowerCase();
            const correctAns = currentAnswers.listening[`q${i}`].toLowerCase();
            if (studentAns === correctAns) {
                listeningScore++;
            }
        }
    }

    // Chấm điểm Reading
    let readingScore = 0;
    for (let i = 1; i <= 40; i++) {
        const selectElement = document.getElementById(`read-q${i}`);
        if (selectElement) {
            const studentAns = selectElement.value;
            const correctAns = currentAnswers.reading[`q${i}`];
            if (studentAns === correctAns) {
                readingScore++;
            }
        }
    }

    // Hiển thị điểm lên giao diện Modal công bố kết quả
    const scoreLisEl = document.getElementById('score-listening');
    const scoreReadEl = document.getElementById('score-reading');
    const modalEl = document.getElementById('result-modal');

    if (scoreLisEl) scoreLisEl.textContent = `${listeningScore} / 40`;
    if (scoreReadEl) scoreReadEl.textContent = `${readingScore} / 40`;
    if (modalEl) modalEl.style.display = 'flex';
}

function closeModal() {
    const modalEl = document.getElementById('result-modal');
    if (modalEl) modalEl.style.display = 'none';
}
// ================= 5. LOGIC CHUYỂN PASSAGE TRONG PHẦN ĐỌC =================
function switchReadingPart(partNum) {
    // Ẩn tất cả các Passage
    for (let i = 1; i <= 3; i++) {
        const partEl = document.getElementById(`reading-part-${i}`);
        if (partEl) {
            partEl.classList.remove('active');
        }
    }
    
    // Bỏ tô màu tất cả các nút
    const btns = document.querySelectorAll('.part-btn');
    btns.forEach(btn => btn.classList.remove('active'));

    // Hiển thị Passage được chọn và tô màu nút đó
    const selectedPart = document.getElementById(`reading-part-${partNum}`);
    if (selectedPart) {
        selectedPart.classList.add('active');
    }
    btns[partNum - 1].classList.add('active');
}
// ================= 6. LOGIC CHUYỂN PART TRONG PHẦN NGHE =================
function switchListeningPart(partNum) {
    // Ẩn tất cả các Part trong Listening
    for (let i = 1; i <= 4; i++) {
        const partEl = document.getElementById(`listening-part-${i}`);
        if (partEl) {
            partEl.classList.remove('active');
        }
    }
    
    // Bỏ tô màu tất cả các nút (chỉ tính các nút trong tab Listening)
    const listeningNav = document.querySelector('#listening-section .reading-parts-nav');
    if(listeningNav) {
        const btns = listeningNav.querySelectorAll('.part-btn');
        btns.forEach(btn => btn.classList.remove('active'));
        
        // Hiển thị Part được chọn và tô màu nút
        const selectedPart = document.getElementById(`listening-part-${partNum}`);
        if (selectedPart) {
            selectedPart.classList.add('active');
        }
        btns[partNum - 1].classList.add('active');
    }
}