import { Component, ElementRef,Input, OnInit, OnChanges,ViewChild, ViewEncapsulation  } from '@angular/core';
import * as d3 from 'd3';
import { MatInkBar } from '@angular/material';
import * as topojson from 'topojson';

@Component({
  selector: 'app-globe',
  templateUrl: './globe.component.html',
  styleUrls: ['./globe.component.css']
})
export class GlobeComponent implements OnInit {
// width and height
  width = 960;
  height = 500;
  radius = this.height / 2 -5;
  scale = this.radius;
  velocity = 0.02
  projection = null;
  canvas = null;
  context = null;
  path = null;
  elapsed = 0

  constructor() {
	  this.projection = d3.geoOrthographic().translate([this.width/2, this.height/2])
	  .scale(this.scale).clipAngle(90);
	  this.canvas = d3.select("body").append("canvas").attr("width", this.width).attr("height", this.height);

	  this.context = this.canvas.node().getContext("2d");
	  this.path=d3.geoPath().projection(this.projection).context(this.context);
  }
  ngOnInit() {
	let jsondata = d3.json("https://gist.githubusercontent.com/mbostock/4090846/raw/d534aba169207548a8a3d670c9c2cc719ff05c47/world-110m.json");
	jsondata.then((data) => {
		let land = topojson.feature(data, data.objects.land)
		this.context.clearRect(0,0,this.width, this.height);
		this.projection.rotate([this.velocity * this.elapsed,0]);
		this.context.beginPath();
		this.path(land)
		this.context.fill();

		this.context.beginPath();
		this.context.arc(this.width / 2, this.height / 2, this.radius, 0,2*Math.PI, true);
		this.context.lineWidth = 2.5;
		this.context.stroke();
	})
  }
}


// map projection

            




