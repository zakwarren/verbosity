const panelHome = document.getElementById('panelHome');
const loader = document.getElementById('loader');
const btnAnalyze = document.getElementById('btnAnalyze');
const inputUrl = document.getElementById('url');
const panelError = document.getElementById('panelError');
const errorMsg = document.getElementById('errorMsg');

const panelAnalysis = document.getElementById('panelAnalysis');
const panelData = document.getElementById('panelData');
const panelBlog = document.getElementById('panelBlog');
const switchPanel = document.getElementById('switchPanel');
const switchCheck = document.getElementById('switchCheck');
const dashboardChart = document.getElementById('dashboardChart');

const urlAnalyzed = document.getElementById('urlAnalyzed');
const urlAnalyzed2 = document.getElementById('urlAnalyzed2');
const wordCount = document.getElementById('wordCount');
const mostUsed = document.getElementById('mostUsed');
const usesFound = document.getElementById('usesFound');
const blogHeader = document.getElementById('blogHeader');
const blogBody = document.getElementById('blogBody');

let topTenWords;
let topHundredWords;
let barChart;

const activateLoader = () => {
    if (panelError) {
        panelError.style.display = 'none';
    }
    loader.style.display = 'block';
};

const postData = async (url, body) => {
    try {
        const result = await fetch(
            url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        );
        const data = await result.json();
        console.log(data);
        return data;

    } catch (error) {
        console.log(error);
        return error;
    }
};

const analyzeResults = data => {
    loader.style.display = 'none';
    panelHome.style.display = 'none';
    panelAnalysis.style.display = 'block';

    urlAnalyzed.href = data.urlAnalyzed;
    urlAnalyzed.textContent = data.siteTitle;
    urlAnalyzed2.href = data.urlAnalyzed;
    urlAnalyzed2.textContent = data.siteTitle;

    wordCount.textContent = data.analysis.totalWords;
    mostUsed.textContent = data.analysis.mostUsedWord;
    usesFound.textContent = data.analysis.mostUses;
    blogHeader.textContent = data.generatedTitle;
    blogBody.textContent = data.generatedBlog;

    topTenWords = data.analysis.topTenWords;
    topHundredWords = data.analysis.topHundredWords;
    barChart = new BarChart(topTenWords, 'word', 'uses');
};

btnAnalyze.addEventListener('click', async () => {
    activateLoader();
    const data = await postData('/analysis', { url: inputUrl.value });
    if (data.message === 'Success') {
        analyzeResults(data);
    } else if (data.message === 'Validation failed') {
        loader.style.display = 'none';
        panelError.style.display = 'block';
        errorMsg.textContent = data.data;
    } else {
        loader.style.display = 'none';
        panelError.style.display = 'block';
        errorMsg.textContent = 'An error occurred! Please try another URL';
    }
});
switchPanel.addEventListener('click', function() {
    if (switchPanel.textContent === 'View Blog') {
        switchPanel.textContent = 'View Analysis';
        panelData.style.display = 'none';
        panelBlog.style.display = 'block';
    } else {
        switchPanel.textContent = 'View Blog';
        panelData.style.display = 'block';
        panelBlog.style.display = 'none';
    }
});

switchCheck.addEventListener('change', function() {
    if(this.checked) {
        barChart.dataset = topHundredWords;
        barChart.resetCanvas();
    } else {
        barChart.dataset = topTenWords;
        barChart.resetCanvas();
    }
});

panelError.style.display = 'none';
panelAnalysis.style.display = 'none';
