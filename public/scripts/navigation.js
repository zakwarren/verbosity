function responsiveNav() {
    var x = document.getElementById('topnav');
    if (x.className === 'topnav') {
        x.className += ' responsive';
    } else {
        x.className = 'topnav';
    }
}

const topNavIcon = document.getElementById('topNavIcon');
topNavIcon.addEventListener('click', responsiveNav);
