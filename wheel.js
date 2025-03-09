// Canvas and Wheel Configuration
const canvas = document.getElementById('wheelcanvas');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spin-button');
const modalOverlay = document.getElementById('modal-overlay');
const questionCategory = document.getElementById('question-category');
const questionText = document.getElementById('question-text');
const optionButtons = document.querySelectorAll('.option-button');
const closeModalButton = document.getElementById('close-modal');

// Wheel Segments
const segments = [
    { label: 'Right to Equality', color:'FF6384' },
    { label: 'Right to Freedom', color: '#36A2EB' },
    { label: 'Right against Exploitation', color: '#FFCE56' },
    { label: 'Right to Freedom of religion', color: '#FF6384' },
    { label: 'Cultural and Educational Rights', color: '#36A2EB' },
    { label: 'Right to Constituional Remedies', color: '#FF6384' },
];

// Questions Database
const questions = {
    Executive: [
        {
            question: 'Who is the head of the Executive branch in India?',
            options: [
                'The President',
                'The Prime Minister',
                'The Chief Justice',
                'The Speaker of Lok Sabha'
            ],
            answer: 'The President'
        },
        // Add more Executive questions here
    ],
    Legislative: [
        {
            question: 'Which is the Lower House of the Indian Parliament?',
            options: [
                'Rajya Sabha',
                'Lok Sabha',
                'Vidhan Sabha',
                'Gram Sabha'
            ],
            answer: 'Lok Sabha'
        },
        // Add more Legislative questions here
    ],
    Judiciary: [
        {
            question: 'What is the highest court in India?',
            options: [
                'High Court',
                'District Court',
                'Supreme Court',
                'Session Court'
            ],
            answer: 'Supreme Court'
        },
        // Add more Judiciary questions here
    ],
};

// Variables for spinning
let startAngle = 0;
let arcSize = (2 * Math.PI) / segments.length;
let spinTimeout = null;
let spinAngleStart = 0;
let spinTime = 0;
let spinTimeTotal = 0;

// Draw Wheel
function drawWheel() {
    for (let i = 0; i < segments.length; i++) {
        const angle = startAngle + i * arcSize;
        ctx.fillStyle = segments[i].color;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(
            canvas.width / 2,
            canvas.height / 2,
            canvas.width / 2,
            angle,
            angle + arcSize,
            false
        );
        ctx.lineTo(canvas.width / 2, canvas.height / 2);
        ctx.fill();

        // Add Text
        ctx.save();
        ctx.translate(
            canvas.width / 2 + Math.cos(angle + arcSize / 2) * (canvas.width / 4),
            canvas.height / 2 + Math.sin(angle + arcSize / 2) * (canvas.height / 4)
        );
        ctx.rotate(angle + arcSize / 2 + Math.PI / 2);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 20px Poppins';
        ctx.fillText(segments[i].label, -ctx.measureText(segments[i].label).width / 2, 0);
        ctx.restore();
    }

    // Arrow
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 10, 10);
    ctx.lineTo(canvas.width / 2 + 10, 10);
    ctx.lineTo(canvas.width / 2, 40);
    ctx.closePath();
    ctx.fill();
}

// Spin Functionality
function spin() {
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3000 + 4000;
    rotateWheel();
}

function rotateWheel() {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
    }
    const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI) / 180;
    drawWheel();
    spinTimeout = setTimeout(rotateWheel, 30);
}

function stopRotateWheel() {
    clearTimeout(spinTimeout);
    const degrees = (startAngle * 180) / Math.PI + 90;
    const arcd = (arcSize * 180) / Math.PI;
    const index = Math.floor((360 - (degrees % 360)) / arcd);
    const selectedSegment = segments[index];
    showQuestionModal(selectedSegment.label);
}

function easeOut(t, b, c, d) {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
}

// Show Question Modal
function showQuestionModal(category) {
    const categoryQuestions = questions[category];
    const randomQuestion = categoryQuestions[Math.floor(Math.random() * categoryQuestions.length)];

    questionCategory.textContent = `Category: ${category}`;
    questionText.textContent = randomQuestion.question;

    optionButtons.forEach((button, index) => {
        button.textContent = randomQuestion.options[index];
        button.onclick = () => {
            if (button.textContent === randomQuestion.answer) {
                alert('Correct Answer!');
            } else {
                alert(`Wrong Answer! Correct answer is: ${randomQuestion.answer}`);
            }
            closeModal();
        };
    });

    modalOverlay.style.display = 'flex';
}

// Close Modal
function closeModal() {
    modalOverlay.style.display = 'none';
}

// Event Listeners
spinButton.addEventListener('click', spin);
closeModalButton.addEventListener('click', closeModal);

// Initialize Wheel
drawWheel();
