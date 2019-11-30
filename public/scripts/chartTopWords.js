const chartWidth = 800;
const chartHeight = 600;
const padding = 25;
const barWidth = (chartWidth / dataset.length) - (padding / dataset.length);
const barPadding = 1;
const heightFactor = 3;

const svg = d3.select('#chartTopWords')
            .append('svg')
            .attr('width', chartWidth)
            .attr('height', chartHeight)
            .attr('class', 'chart');

const xScale = d3.scaleLinear()
            .domain([padding, dataset.length])
            .range([padding, chartWidth - 1]);

const yScale = d3.scaleLinear()
            .domain([barPadding, d3.max(dataset, d => d.uses)])
            .range([chartHeight - barPadding, barPadding]);


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

plotData();
plotLabels();
plotAxis();
