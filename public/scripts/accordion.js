const accordion = document.getElementsByClassName('accordion');

for (let i = 0; i < accordion.length; i++) {
    console.log(accordion[i]);
    accordion[i].addEventListener('click', function() {
        this.classList.toggle('accordion-active');
        const panelAcc = this.nextElementSibling;
        if (panelAcc.style.maxHeight) {
            panelAcc.style.maxHeight = null;
        } else {
            panelAcc.style.maxHeight = panelAcc.scrollHeight + "px";
        }
    });
}
