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
        btn.classList = "btn btn-outline btn-primary w-max text-nowrap";
        btn.setAttribute("title", lessonName);
        btn.setAttribute("onclick", `loadLevelWords(${level_no})`);
        btn.textContent = "Level - " + level_no;
        lessonsContainer.appendChild(btn);
    });
    lessonsLoadingSpiner.classList.add("hidden");
};

loadLessons();

const loadLevelWords = async (level) => {
    wordsLoadingInfinity.classList.remove("hidden");
    const url = `https://openapi.programming-hero.com/api/level/${level}`;
    const res = await fetch(url);
    const data = await res.json();
    showLevelWords(data.data);
};
const showLevelWords = (words = []) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    words.forEach((word) => {
        // {id: 170, level: 6, word: 'Vicarious', meaning: 'পরোক্ষভাবে অনুভূতি গ্রহণ করা', pronunciation: 'ভিকেরিয়াস'}
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
            <h2 class="text-2xl font-bold">${currentWord}</h2>
            <p class="font-bangla text-lg">${meaning}</p>
            <p class="font-bangla text-xl font-semibold">"${pronunciation}"</p>
            <span class="flex justify-between">
                <button class="btn bg-[#1a91ff10] hover:bg-[#1a91ff88]">
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
