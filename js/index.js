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
        btn.innerHTML = `<i class="fa-solid fa-book-open"></i> Lesson - ${level_no}`;
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
                <button onclick="loadWordDetailsModal(${id})" class="btn bg-[#1a91ff10] hover:bg-[#1a91ff88]">
                    <i class="fa-solid fa-circle-info"></i>
                </button>
                <button class="btn bg-[#1a91ff10] hover:bg-[#1a91ff88]" onclick="pronounceWord('${currentWord}')">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </span>
        `;
        wordContainer.appendChild(wordCard);
    });
    wordsLoadingInfinity.classList.add("hidden");
};

const loadWordDetailsModal = async (id) => {
    word_details_modal.showModal()
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    const wordDetailsObj = data?.data || {};
    const {meaning, pronunciation, sentence, synonyms, word} = wordDetailsObj;
    const wordDetails = document.getElementById('word-details');
    wordDetails.innerHTML = `
    <h1 class="text-2xl font-bold">${word} (<span class="cursor-pointer hover:text-blue-600" onclick="pronounceWord('${word}')"><i class="fa-solid fa-microphone-lines"></i></span> : ${pronunciation})</h1>
    <div class="my-4">
        <h3 class="text-lg font-bold">Meaning</h3>
        <p class="font-bangla">${meaning || "<span class='text-red-400 italic'>অর্থ পাওয়া যায়নি</span>"}</p>
    </div>
    <div class="my-4">
        <h3 class="text-lg font-bold">Example</h3>
        <p onclick="pronounceWord('${sentence}')" class="cursor-pointer">${sentence}</p>
    </div>
    <div class="my-4">
        <h3 class="text-lg font-bold">Synonym</h3>
        <div class="flex gap-x-2">${synonyms.length ? synonyms.map(synonym => `<span onclick="pronounceWord('${synonym}')" class="cursor-pointer rounded-lg p-1 bg-slate-100">${synonym}</span>`).join("") : '<span class="text-red-400 italic">No Synonyms Found</span>'}</div>
    </div>
    `;
}

const pronounceWord = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-EN"; // English
    utterance.rate = 0.75;
    window.speechSynthesis.speak(utterance);
}