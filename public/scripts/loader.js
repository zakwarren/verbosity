const loader = document.getElementById('loader');
const btnLoad = document.getElementById('btnLoad');
const formAnalysis = document.getElementById('formAnalysis');

const activateLoader = () => {
    loader.style.display = 'block';
    formAnalysis.submit();
};

btnLoad.addEventListener('click', activateLoader);
