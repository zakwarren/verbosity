class BarChart {
    constructor(dataset, axisField, dataField) {
        this.dataset = dataset;
        this.axisField = axisField;
        this.dataField = dataField;

        this.dashboardChart = document.getElementById('dashboardChart');

        this.totals;
        this.breakPoint = 900;
        this.padding = 25;
        this.chartScaling;
        this.chartWidth;
        this.chartHeight;
        this.barPadding = 1;
        this.barWidth = 0;
        this.svg;
        this.xScale;
        this.yScale;
        this.setChartSizing();

        this.running = false;
        this.setRedrawOnResize();
        this.resetCanvas();
    };

    setChartSizing = () => {
        this.chartScaling = window.innerWidth < this.breakPoint ? 0.8 : 0.5;
        this.chartWidth = (window.innerWidth * this.chartScaling) - this.padding;
        this.chartHeight = 0.7 * this.chartWidth;
    };

    setRedrawOnResize = () => {
        const barchart = this;
        d3.select(window)
            .on("resize", () => {
                if (!barchart.running) {
                    barchart.running = true;
                    setTimeout(() => {
                        barchart.setChartSizing();
                        barchart.resetCanvas();
                        barchart.running = false;
                    }, 1000);
                }
            });
    };

    resetCanvas = () => {
        this.emptyChart();
        this.setUpCanvas();
        this.plotData();
        this.plotLabels();
        this.plotAxis();
    };

    emptyChart = () => {
        while (this.dashboardChart.lastChild) {
            this.dashboardChart.removeChild(this.dashboardChart.lastChild);
        }
    };

    setUpCanvas = () => {
        this.barWidth = (this.chartWidth / this.dataset.length) - (this.padding / this.dataset.length);
    
        this.svg = d3.select('#dashboardChart')
                    .append('svg')
                    .attr('width', this.chartWidth)
                    .attr('height', this.chartHeight)
                    .attr('class', 'chart');
    
        this.xScale = d3.scaleLinear()
                        .domain([this.padding, this.dataset.length])
                        .range([this.padding, this.chartWidth - 1]);
    
        this.yScale = d3.scaleLinear()
                        .domain([this.barPadding, d3.max(this.dataset, d => d[this.dataField])])
                        .range([this.chartHeight - this.barPadding, this.barPadding]);
    };

    plotData = () => {
        this.svg.selectAll('rect')
                .data(this.dataset)
                .enter()
                .append('rect')
                .attr('y', d => {
                    return this.yScale(d[this.dataField]);
                })
                .attr('height', d => {
                    return this.chartHeight - this.yScale(d[this.dataField]);
                })
                .attr('width', this.barWidth - this.barPadding)
                .attr('transform', (d, i) => {
                    let xCoordinate = this.barWidth * i + this.padding;
                    let yCoordinate = -this.barPadding;
                    return 'translate(' + xCoordinate + ', ' + yCoordinate + ')';
                })
                .attr('class', 'bar')
                .append('title')
                .text(d => d[this.axisField] + ': ' + d[this.dataField]);
    };

    plotLabels = () => {
        this.svg.selectAll('text')
                .data(this.dataset)
                .enter()
                .append('text')
                .text(d => d[this.axisField])
                .attr('transform', (d, i) => {
                    let xCoordinate = this.barWidth * i + (this.padding * 1.2);
                    let yCoordinate = -this.barPadding;
                    return 'translate(' + xCoordinate + ', ' + yCoordinate + ')';
                })
                .attr('y', (d, i) => this.yScale(d[this.dataField]) + this.padding)
                .attr('class', 'bar__label');
    };

    plotAxis = () => {
        const xAxis = d3.axisBottom(this.xScale);
        const yAxis = d3.axisLeft(this.yScale);

        if (window.innerWidth < this.breakPoint) {
            xAxis.ticks(2);
        } else {
            xAxis.ticks(5);
        }

        this.svg.append("g")
                .attr("transform", "translate(0," + (this.chartHeight - this.barPadding) + ")")
                .call(xAxis);

        this.svg.append("g")
                .attr("transform", "translate(" + this.padding + ", 0)")
                .call(yAxis);
    };
};
