let clockCreated = false;
let rotationActive = false;
let clock, secondHand, minuteHand, hourHand;
let secondDegree = 0, minuteDegree = 0, hourDegree = 0;
let rotateInterval;
let rotationSpeed = 1000; // 회전 속도 초기값 (1초)
let rotationStartTime;
let lastClockPosition = { x: 0, y: 0 };

document.addEventListener('click', function(event) {
    if (isWithinRange(event.clientX, event.clientY)) {
        if (!clockCreated || !rotationActive) {
            if (!clockCreated) {
                createClock(event.clientX, event.clientY);
            } else {
                if (!rotationActive) {
                    startRotation();
                }
            }
        } else {
            adjustSpeed();
            createClock(event.clientX, event.clientY);
        }
    }
});

document.addEventListener('mousemove', function(event) {
    const indicator = document.getElementById('click-indicator');
    if (isWithinRange(event.clientX, event.clientY)) {
        indicator.style.left = `${event.clientX + 10}px`;
        indicator.style.top = `${event.clientY + 10}px`;
        indicator.classList.add('show'); // "show" 클래스 추가
    } else {
        indicator.classList.remove('show'); // "show" 클래스 제거
    }
});

function isWithinRange(x, y) {
    if (!clockCreated) return true;

    const dx = x - lastClockPosition.x;
    const dy = y - lastClockPosition.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance >= 350 && distance <= 500;
}

function createClock(x, y) {
    // 시계 템플릿 가져오기
    const template = document.getElementById('clock-template');
    clock = template.content.cloneNode(true).querySelector('.clock');

    // 시계 위치 설정
    clock.style.left = `${x}px`;
    clock.style.top = `${y}px`;

    // 시계 추가
    document.body.appendChild(clock);

    // 초침, 분침, 시침 요소 가져오기
    secondHand = clock.querySelector('.second-hand');
    minuteHand = clock.querySelector('.minute-hand');
    hourHand = clock.querySelector('.hour-hand');

    lastClockPosition = { x, y }; // 마지막 시계 위치 저장

    clockCreated = true;
    startRotation();

}


function startRotation() {
    rotationActive = true;
    rotationStartTime = Date.now();
    rotateInterval = requestAnimationFrame(rotateHands);
}

function stopRotation() {
    rotationActive = false;
    cancelAnimationFrame(rotateInterval);
}

function adjustSpeed() {
    const currentTime = Date.now();
    const elapsedTime = (currentTime - rotationStartTime) / 1000; // 초 단위로 경과 시간 계산

    if (elapsedTime <= 10) {
        rotationSpeed /= 1.5; // 10초 이내 클릭 시 속도 50% 증가
    } else {
        rotationSpeed *= 3; // 10초 이후 클릭 시 속도 50% 감소
    }

    // 새로운 시계의 회전 속도 설정을 위한 애니메이션 시간 업데이트
    secondHand.style.transition = `transform ${rotationSpeed / 1000}s linear`;
}

// 초침, 분침, 시침을 회전시키는 함수
function rotateHands() {
    if (!rotationActive) return;

    // 초침 1초마다 6도 회전 (360도 / 60초)
    secondDegree += (6 * (1000 / rotationSpeed));
    secondHand.style.transform = `rotate(${secondDegree}deg)`;

    // 분침 1분마다 0.1도 회전 (360도 / 60분 / 60초)
    minuteDegree += (0.1 * (1000 / rotationSpeed));
    minuteHand.style.transform = `rotate(${minuteDegree}deg)`;

    // 시침 1시간마다 0.00833도 회전 (360도 / 12시간 / 60분 / 60초)
    hourDegree += (0.00833 * (1000 / rotationSpeed));
    hourHand.style.transform = `rotate(${hourDegree}deg)`;

    rotateInterval = requestAnimationFrame(rotateHands);
}

document.addEventListener("DOMContentLoaded", function() {
    const toggleViewButton = document.getElementById("toggle-view");
    const scriptGear = document.querySelector(".script-gear");

    toggleViewButton.addEventListener("click", function() {
        if (scriptGear.style.display === "none" || scriptGear.style.display === "") {
            scriptGear.style.display = "block";
            toggleViewButton.textContent = "CLOSE";
        } else {
            scriptGear.style.display = "none";
            toggleViewButton.textContent = "HOW IT WORKS";
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const resetButton = document.querySelector(".setting h1:first-child");

    resetButton.addEventListener("click", function() {
        window.location.href = "/"; // 이동하고자 하는 초기 페이지 URL로 변경
    });
});



