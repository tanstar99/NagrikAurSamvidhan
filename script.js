// Function to toggle the menu visibility on small screens
document.getElementById('menu')?.addEventListener('click', function() {
    const navLinks = document.querySelector('nav ul');
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
    }
});

// Function to handle login button click
/*document.querySelector('.btn')?.addEventListener('click', function() {
    alert('Login button clicked!');
});*/

// Function to ensure that parallax images are set properly
document.addEventListener('DOMContentLoaded', function() {
    const parallaxSections = document.querySelectorAll('.parallax');
    parallaxSections.forEach(section => {
        const backgroundImage = section.style.backgroundImage;
        if (!backgroundImage) {
            console.error('Background image not found for:', section);
        }
    });

    // Constitutional Scenario Cards Functionality
    const scenarios = [
        "What would you do if the police disperse your peaceful protest,claiming it illegal?",
        "What would you do if a private company refuses to hire you due to your gender?",
        "What can you if you are arrested without being informed of the charges or allowed to contact a lawyer?",
        "How does the government providing free mid day meals in school allign with social welfare principals?",
    ];

    let currentScenarioIndex = 0;

    const scenarioText = document.getElementById('scenario-text');
    const nextCardButton = document.getElementById('next-card');
    const responseText = document.getElementById('response-text');

    function showNextScenario() {
        if (currentScenarioIndex < scenarios.length) {
            scenarioText.textContent = scenarios[currentScenarioIndex];
            responseText.value = '';
            currentScenarioIndex++;
        } else {
            scenarioText.textContent = 'No more scenarios.';
            nextCardButton.disabled = true;
        }
    }

    nextCardButton.addEventListener('click', showNextScenario);
});

// Array of questions and answers
const questions = [
    { statement: "The right to equality means that I cannot be discriminated against based on religion,race,caste,sex,or place of birth", answer: true },
    { statement: "My fundamental right to life and personal liberty can never be suspended even during an emergency", answer: false },
    { statement: "I have the right to move freely throughout India without any restrictions", answer: true },
    { statement: "The directive principles of state policy are enforcable by law and the government can be sued if it fails to implement them", answer: false }
];

let currentQuestionIndex = 0;

// Function to load a question
function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('statement').textContent = question.statement;
    document.getElementById('result').textContent = '';
}

// Function to check the answer for truefalse
function checkAnswer(isTrue) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    const result = document.getElementById('result');

    if (isTrue === correctAnswer) {
        result.textContent = "Correct!";
        result.style.color = 'green';
    } else {
        result.textContent = "Incorrect!";
        result.style.color = 'red';
    }

    // Move to the next question
    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    setTimeout(loadQuestion, 1500); // Load next question after 1.5 seconds
}

// Event listeners for True and False buttons
document.getElementById('true-btn').addEventListener('click', function() {
    checkAnswer(true);
});

document.getElementById('false-btn').addEventListener('click', function() {
    checkAnswer(false);
});

// Load the first question on page load
document.addEventListener('DOMContentLoaded', loadQuestion);
