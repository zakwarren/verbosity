const chartWidth = 1000;
const chartHeight = 500;
const padding = 25;
const barPadding = 1;
let barWidth = 0;
let svg;
let xScale;
let yScale;


const setUpCanvas = () => {
    barWidth = (chartWidth / dataset.length) - (padding / dataset.length);

    svg = d3.select('#chartTopWords')
            .append('svg')
            .attr('width', chartWidth)
            .attr('height', chartHeight)
            .attr('class', 'chart');

    xScale = d3.scaleLinear()
                .domain([padding, dataset.length])
                .range([padding, chartWidth - 1]);

    yScale = d3.scaleLinear()
                .domain([barPadding, d3.max(dataset, d => d.uses)])
                .range([chartHeight - barPadding, barPadding]);
};


const plotData = () => {
    svg.selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
        .attr('y', d => {
            return yScale(d.uses);
        })
        .attr('height', d => {
            return chartHeight - yScale(d.uses);
        })
        .attr('width', barWidth - barPadding)
        .attr('transform', (d, i) => {
            let xCoordinate = barWidth * i + padding;
            let yCoordinate = -barPadding;
            return 'translate(' + xCoordinate + ', ' + yCoordinate + ')';
        })
        .attr('class', 'bar')
        .append('title')
        .text((d) => d.word + ': ' + d.uses);
};


const plotLabels = () => {
    svg.selectAll('text')
        .data(dataset)
        .enter()
        .append('text')
        .text((d) => d.word)
        .attr('transform', (d, i) => {
            let xCoordinate = barWidth * i + (padding * 1.5);
            let yCoordinate = -barPadding;
            return 'translate(' + xCoordinate + ', ' + yCoordinate + ')';
        })
        .attr('y', (d, i) => yScale(d.uses) + padding)
        .attr('class', 'bar__label');
};


const plotAxis = () => {
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale)
                    .ticks(5);

    svg.append("g")
        .attr("transform", "translate(0," + (chartHeight - barPadding) + ")")
        .call(xAxis);

    svg.append("g")
        .attr("transform", "translate(" + padding + ", 0)")
        .call(yAxis);
};


const resetCanvas = () => {
    const canvas = document.getElementById('chartTopWords');
    while (canvas.lastChild) {
        canvas.removeChild(canvas.lastChild);
    }
    setUpCanvas();
    plotData();
    plotLabels();
    plotAxis();
};

setUpCanvas();
plotData();
plotLabels();
plotAxis();
