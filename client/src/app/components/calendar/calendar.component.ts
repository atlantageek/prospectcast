import { Component, ElementRef,Input, OnChanges,ViewChild, ViewEncapsulation  } from '@angular/core';
import * as d3 from 'd3';
import {SalesModel} from '../../rest.service'
@Component({
  selector: 'app-calendar-chart',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements  OnChanges {

  @ViewChild('chart2', {static: true})
  private chartContainer: ElementRef;
  cellSize = 12;
  width = 954
  height=this.cellSize * 7 + 30
  @Input()
  data: SalesModel[ ] = [
   
  ];

  margin = {top: 20, right: 20, bottom: 30, left: 40};
  maxVal
  constructor() { }
  processData(){
    let fullDateData: SalesModel[] = []
    let dts= this.data.map(d=> d.dt.getTime())
    let vals = this.data.map(d=>d.count)
    let mindt = Math.min(...dts)
    let maxdt = Math.max(...dts)
    this.maxVal = Math.max(...vals);
    for (var dtnum = mindt; dtnum < maxdt; dtnum += 86400000) {
      let dt= new Date(dtnum)
      let idx = this.data.findIndex((d) => (Math.abs(d.dt.getTime() - dt.getTime())) <= 43200000)
      if (idx == -1){
        fullDateData.push({dt: dt, count:0})
      }
      else {
        fullDateData.push({dt:dt, count: this.data[idx].count})
      }
    }
    return fullDateData;
  }
  private color(obj:any) {

    if (obj.count  == 0) return "#cccccc"
    if (obj.count < 0.33 * this.maxVal ) return "#880000"
    if (obj.count < 0.66 * this.maxVal ) return "#444400"
    else return "#008800"
  }
  private createChart() {
    let data = this.processData();
    console.log("create chart")
    d3.select('svg').remove();
    
    const element = this.chartContainer.nativeElement;

    console.log(data)
    const svg = d3.select(element).append('svg')
        // .attr('width', element.offsetWidth)
        // .attr('height', element.offsetHeight);
    
    const years = d3.nest()
      .key((d:SalesModel) => d.dt.getUTCFullYear().toLocaleString())
      .entries(data)
      .reverse();
    svg
      .attr("viewBox", [0, 0, this.width, this.height * years.length].join(","))
      .attr("font-family", "sans-serif")
      .attr("font-size", 10);

    const year = svg.selectAll("g")
      .data(years)
      .join("g")
      .attr("transform", (d, i) => `translate(40,${this.height * i + this.cellSize * 1.5})`);

    year.append("text")
      .attr("x", -5)
      .attr("y", -5)
      .attr("font-weight", "bold")
      .attr("text-anchor", "end")
      .text(d => d.key);

      year.append("g")
      .attr("text-anchor", "end")
    .selectAll("text")
    .data( d3.range(7).map(i => new Date(2012, 0, i)))
    .join("text")
      .attr("x", -5)
      .attr("y", d => (this.countDay(d) + 0.5) * this.cellSize)
      .attr("dy", "0.31em")
      .text(this.formatDay);
    console.log(year)
     year.append("g")
      .selectAll("rect")
      .data(d => d.values)
      .join("rect")
        .attr("width", this.cellSize - 1)
        .attr("height", this.cellSize - 1)
        .attr("x", d=> {return d3.utcSunday.count(d3.utcYear(d["dt"]), d["dt"]) * this.cellSize + 0.5}) 
        //.attr("x", d => {d3.utcSunday.count(d3.utcYear(d.date), d.date) * this.cellSize + 0.5)}
        .attr("y", d => d["dt"].getUTCDay() * this.cellSize + 0.5)
        .attr("fill", d => this.color(d))
    //  .append("title")
    //    .text(d => `${"SMTWTFS"[d.getUTCDay()]}: ${format(d.value)}`);

  // const month = year.append("g")
  //   .selectAll("g")
  //   .data(d => d3.utcMonths(d3.utcMonth(d.values[0].date), d.values[d.values.length - 1].date))
  //   .join("g");

  // month.filter((d, i) => i).append("path")
  //     .attr("fill", "none")
  //     .attr("stroke", "#fff")
  //     .attr("stroke-width", 3)
  //     .attr("d", this.pathMonth);

  // month.append("text")
  //     .attr("x", d => d3.utcSunday.count(d3.utcYear(d), d3.utcSunday.ceil(d)) * cellSize + 2)
  //     .attr("y", -5)
  //     .text((d) => "SMTWTFS"[d.getUTCDay()]); 
  }
  countDay(d) {
    return (d.getUTCDay() + 6) % 7
  }

  formatDay(d) {
    return "SMTWTFS"[d.getUTCDay()]
  }
  
  formatMonth(d) {
    return d3.utcFormat("%b")
  }
  ngAfterViewInit():void {
    this.createChart();
  }
  ngOnChanges(): void {
    if (!this.data) { return; }

    this.createChart();
  }

  pathMonth(t) {
    const n= 7;
    const d = Math.max(0, Math.min(n, this.countDay(t)));
    const w = d3.utcSunday.count(d3.utcYear(t), t);
    return `${d === 0 ? `M${w * this.cellSize},0`
        : d === n ? `M${(w + 1) * this.cellSize},0`
        : `M${(w + 1) * this.cellSize},0V${d * this.cellSize}H${w * this.cellSize}`}V${n * this.cellSize}`;
  }
  
}

