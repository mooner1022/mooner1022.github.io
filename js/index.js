const checkpoint = 300;

// show fireflies after animation
window.addEventListener("load", () => {
    for (let firefly of document.getElementsByClassName("firefly")) {
        firefly.style.opacity = 0;
    }

    setTimeout(() => {
        fade(1, 1000, document.getElementsByClassName("firefly"));
    }, 4000);
});

// hide all fireflies
const FLAG_FIREFLY_HIDDEN = 0;
const FLAG_FIREFLY_SHOWN = 1;
let flag = FLAG_FIREFLY_SHOWN;
window.addEventListener("scroll", () => {
    const scrollOffset = window.scrollY;

    if (scrollOffset >= checkpoint) {
        if (flag === FLAG_FIREFLY_SHOWN) {
            fade(-1, 1000, document.getElementsByClassName("firefly"));
            flag = FLAG_FIREFLY_HIDDEN;
        }
    } else {
        if (flag === FLAG_FIREFLY_HIDDEN) {
            fade(1, 1000, document.getElementsByClassName("firefly"));
            flag = FLAG_FIREFLY_SHOWN;
        }
    }
});

const githubUrl = "https://api.github.com/users/mooner1022/repos?per_page=100";
fetch(githubUrl)
    .then((response) => {return response.json()})
    .then((json) => {
        const sorted = json.sort((a, b) => {
            let sa = a.stargazers_count;
            let sb = b.stargazers_count;

            if(sa > sb) return -1;
            if(sa === sb) return 0;
            if(sa < sb) return 1;
        });
        const size = json.length > 4 ? 4 : json.length;
        for (let i = size; i > 0; i--) {
            const data = sorted[i - 1];
            const html = "<div class=\"git-card\" data-aos=\"fade\">\n" +
            "            <article style=\"text-align: start;\" onclick=\"window.open('" + data.html_url + "', '_blank')\">\n" +
            "                <h3>" + data.name + "</h3>\n" +
            "                <small>" + data.description + "</small>\n" +
            "                <br><br>\n" +
            "                <footer>\n" +
            "                    <div class='bottom'>\n" +
            "                        <div class='footer-content'>\n" +
            "                            <span class='img fa-solid fa-code'></span>\n" +
            "                            " + data.language + "\n" +
            "                        </div>\n" +
            "                        <div class='footer-content'>\n" +
            "                            <span class='img fa-solid fa-star'></span>\n" +
            "                            " + data.stargazers_count + "\n" +
            "                        </div>\n" +
            "                        <div class='footer-content'>\n" +
            "                            <span class='img fa-solid fa-code-fork'></span>\n" +
            "                            " + data.forks + "\n" +
            "                        </div>\n" +
            "                    </div>\n" +
            "                </footer>\n" +
            "            </article>\n" +
            "        </div>"
            document.querySelector("#git-repo").insertAdjacentHTML('afterbegin', html);
        }
    });

function fade(direction, duration, elements) {
    let step = 1 / (duration / 50);
    let target, op;
    if (direction === 1) {
        target = 1;
        op = 0;
    } else {
        target = 0;
        op = 1;
    }
    const timer = setInterval(() => {
        let opt = direction === 1 ? (op += step) : (op -= step);
        if (opt >= target) {
            clearInterval(timer);
            for (let element of elements)
                element.style.opacity = target;
        } else {
            for (let element of elements)
                element.style.opacity = op;
        }
    }, 50);
}