const loader = document.getElementById('loader');
const btnLoad = document.getElementById('btnLoad');
const formAnalysis = document.getElementById('formAnalysis');
const panelError = document.getElementById('panelError');

const activateLoader = () => {
    if (panelError) {
        panelError.style.display = 'none';
    }
    loader.style.display = 'block';
    formAnalysis.submit();
};

btnLoad.addEventListener('click', activateLoader);
