import { Component, ElementRef,Input, OnChanges,ViewChild, ViewEncapsulation  } from '@angular/core';
import * as d3 from 'd3';
import {BarDataModel} from '../../rest.service'
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements  OnChanges {

  @ViewChild('chart', {static: false})
  private chartContainer: ElementRef;

  @Input()
  data: BarDataModel[];

  margin = {top: 20, right: 20, bottom: 30, left: 40};

  constructor() { }

  ngOnChanges(): void {
    if (!this.data) { return; }
    console.log(this.data)
    this.createChart();
  }

  private createChart(): void {
    d3.select('.bar-svg').remove();

    const element = this.chartContainer.nativeElement;
    const data = this.data;

    const svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
    const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;


    // const x = d3
    //   .scaleBand()
    //   .rangeRound([0, contentWidth])
    //   .padding(0.1)
    //   .domain(data.map(d => d.letter));
// parse the date / time
    const  parseTime = d3.timeParse("%d-%b-%y");

// set the ranges
    var x = d3.scaleTime().range([0, contentWidth]).domain(d3.extent(data, function(d) { return d.dt; }));
    console.log(d3.extent(data, function(d) { return d.dt; }));

    const y = d3
      .scaleLinear()
      .rangeRound([contentHeight, 0])
      .domain([0, d3.max(data, d => d.count)]);
        // define the y axis
            // define the x scale (horizontal)


    const g = svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + contentHeight + ')')
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(10, '%'))
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .text('Frequency');

    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.dt))
        .attr('y', d => y(d.count > 0 ? d.count : 0))
        .attr('width', 1)//TODO  
        .attr('height',  d => {var v =d.count > 0 ?d.count : 0; console.log(v);return (contentHeight - y(v))});
  }
}
