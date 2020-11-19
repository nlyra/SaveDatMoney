import * as d3 from 'd3';

const url = "https://udemy-react-d3.firebaseio.com/tallest_men.json";

export default class D3Chart {
    constructor(element) {
        const svg = d3.select(element)
            .append("svg")
                .attr("width", 1000)
                .attr("height", 500)

    d3.json(url).then(data => {
        const rects = svg.selectAll("rect").data(data)
        rects.enter().append("rect")
            .attr("x", (d, i) => i*100)
            .attr("y", 0)
            .attr("width", 50)
            .attr("height", d => d.height)
            .attr("fill", "green")
    })
    }
}