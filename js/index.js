/*
const checkpoint = 300;

window.addEventListener("scroll", () => {
    const scrollOffset = window.scrollY;

    let backgroundOpacity;
    if (scrollOffset >= checkpoint) {
        backgroundOpacity = scrollOffset / checkpoint - 1;
    } else {
        backgroundOpacity = 0;
    }

    document.querySelector("#background-filler").style.opacity = backgroundOpacity;
});
*/

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
        for (let i = 0; i < size; i++) {
            const data = sorted[i];
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
            document.querySelector("#git-repo").insertAdjacentHTML('beforeend', html);
        }
    });