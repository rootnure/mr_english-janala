const loadLessions = async () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";
    const res = await fetch(url);
    const data = await res.json();
    displayLessons(data.data);
};

const displayLessons = (lessons = []) => {
    const lessonsContainer = document.getElementById("level-container");
    lessonsContainer.innerHTML = "";
    lessons.forEach((lesson) => {
        const { id, level_no, lessonName } = lesson;
        const btn = document.createElement("button");
        btn.classList = "btn btn-outline btn-primary w-max text-nowrap";
        btn.setAttribute("title", lessonName);
        btn.setAttribute("onclick", `loadLesson(${id})`);
        btn.textContent = "Level - " + level_no;
        lessonsContainer.appendChild(btn);
    });
};

loadLessions();
