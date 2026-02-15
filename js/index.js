const lessonsLoadingSpiner = document.querySelector(
    "#level-container>.loading",
);
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
    console.log(level);
    const url = `https://openapi.programming-hero.com/api/level/${level}`;
    const res = await fetch(url);
    const data = await res.json();
    showLevelWords(data.data);
};
const showLevelWords = (words = []) => {
    const wordContainer = document.getElementById("word-container");
    words.forEach((word) => {
        // {id: 170, level: 6, word: 'Vicarious', meaning: 'পরোক্ষভাবে অনুভূতি গ্রহণ করা', pronunciation: 'ভিকেরিয়াস'}
        const {
            id,
            level,
            word: currentWord,
            meaning,
            pronounciation,
        } = word || {};
        const wordCard = document.createElement("div");
        wordCard.innerHTML = `
        <p>${currentWord}</p>
        `;
        wordContainer.appendChild(wordCard);
    });
};
