const lessonsLoadingSpiner = document.querySelector(
    "#level-container>.loading",
);
const wordsLoadingInfinity = document.querySelector("#word-container>.loading");
const loadLessons = async () => {
    lessonsLoadingSpiner.classList.remove("hidden");
    const url = "https://openapi.programming-hero.com/api/levels/all";
    const res = await fetch(url);
    const data = await res.json();
    showLessons(data.data);
};

const showLessons = (lessons = []) => {
    const lessonsContainer = document.getElementById("level-container");
    lessonsContainer.innerHTML = "";
    lessons.forEach((lesson) => {
        const { id, level_no, lessonName } = lesson;
        const btn = document.createElement("button");
        btn.setAttribute("id", "lesson-btn-" + level_no);
        btn.classList =
            "btn btn-outline btn-primary w-max text-nowrap lesson-btn";
        btn.setAttribute("title", lessonName);
        btn.setAttribute("onclick", `loadLevelWords(${level_no})`);
        btn.textContent = "Level - " + level_no;
        lessonsContainer.appendChild(btn);
    });
    lessonsLoadingSpiner.classList.add("hidden");
};

loadLessons();

const removeLessonActive = () => {
    const lessonBtns = document.getElementsByClassName("lesson-btn");
    Array.from(lessonBtns).forEach((btn) => btn.classList.add("btn-outline"));
};

const loadLevelWords = async (level) => {
    wordsLoadingInfinity.classList.remove("hidden");
    const url = `https://openapi.programming-hero.com/api/level/${level}`;
    const res = await fetch(url);
    const data = await res.json();
    showLevelWords(data.data);
    // active btn
    const activeLessonBtn = document.getElementById("lesson-btn-" + level);
    removeLessonActive();
    activeLessonBtn.classList.remove("btn-outline");
    console.log(activeLessonBtn);
};
const showLevelWords = (words = []) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    if (!words.length) {
        wordContainer.innerHTML = `
        <div class="font-bangla text-center col-span-full rounded-xl py-10 space-y-4">
            <img class="mx-auto" src="./assets/alert-error.png" />
            <p class="text-xl font-medium text-gray-400">
                এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
            </p>
            <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
        </div>`;
        return;
    }
    words.forEach((word) => {
        const {
            id,
            level,
            word: currentWord,
            meaning,
            pronunciation,
        } = word || {};
        const wordCard = document.createElement("div");
        wordCard.classList =
            "bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-2";
        wordCard.innerHTML = `
            <h2 class="text-2xl font-bold">${currentWord || "Not Found"}</h2>
            <p class="text-lg">Meaning / Pronounciation</p>
            <p class="font-bangla text-xl font-semibold">"${meaning || "<span class='text-red-400'>অর্থ পাওয়া যায়নি</span>"} / ${pronunciation || "<span class='text-red-400'>উচ্চারণ পাওয়া যায়নি</span>"}"</p>
            <span class="flex justify-between">
                <button onclick="my_modal_5.showModal()" class="btn bg-[#1a91ff10] hover:bg-[#1a91ff88]">
                    <i class="fa-solid fa-circle-info"></i>
                </button>
                <button class="btn bg-[#1a91ff10] hover:bg-[#1a91ff88]">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </span>
        `;
        wordContainer.appendChild(wordCard);
    });
    wordsLoadingInfinity.classList.add("hidden");
};
