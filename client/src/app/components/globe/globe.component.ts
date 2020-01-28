import { Component, ElementRef,Input, OnInit, OnChanges,ViewChild, ViewEncapsulation  } from '@angular/core';
import * as d3 from 'd3';
import { MatInkBar } from '@angular/material';
import * as topojson from 'topojson';


@Component({
	encapsulation: ViewEncapsulation.None,
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
  svg = null;

  path = null;
  elapsed = 0
  points = [{
    type: "Point",
    coordinates: [-74.2582011, 40.7058316],
    location: "Your Location",
    icon: "\uF015"
}, {
    type: "Point",
    coordinates: [34.8887969, 32.4406351],
    location: "Caribe Royale Orlando",
    icon: "\uF236"
}];
  constructor() {
	  this.projection = d3.geoOrthographic().translate([this.width/2, this.height/2]).scale(this.scale).clipAngle(90).rotate([90,0]);
	    //SVG container
		this.path = d3.geoPath()
		.projection(this.projection);
  	  	this.svg = d3.select("body").append("svg")
  			.attr("width", this.width)
  			.attr("height", this.height);
		this.svg.append("path").datum({type:"Sphere"}).attr("class","water").attr("d", this.path)
	  //this.context = this.canvas.node().getContext("2d");
	  //this.path=d3.geoPath().projection(this.projection).context(this.context);
  }
  ngOnInit() {
	let jsondata = d3.json("https://gist.githubusercontent.com/mbostock/4090846/raw/d534aba169207548a8a3d670c9c2cc719ff05c47/world-110m.json");
	jsondata.then((data) => {
		let land = topojson.feature(data, data.objects.countries).features

		console.log(land)
		var world = this.svg.selectAll("path.land")
			.data(land)
			.enter().append("path")
			.attr("class", "land")
			.attr("d", this.path)
		this.loop();
	})
  }

    
  loop() {
	var self = this;
	var i=0;
	var scaleMiddle = this.width/2;
    var scaleStartEnd = this.width * 2;
	d3.transition()
	  .tween("rotate",function () {
		  console.log("Rotating")
		  var flightPath = {
			  type: 'Feature',
			  geometry: {
				  type: "LineString",
				  coordinates: [self.points[i++%2].coordinates, self.points[i%2].coordinates]
			  }
		  };

		// next point:
		var p = self.points[i%2].coordinates;
		// current rotation:
		var currentRotation = self.projection.rotate();  
		// next rotation:
		var nextRotation = self.projection.rotate([-p[0],-p[1]]).rotate();
		
		// Interpolaters:
		var r = d3.geoInterpolate(currentRotation,nextRotation);
		var s = d3.interpolate(0.0000001,Math.PI);
		
		return function(t) {
			console.log("tweening " + t)
		  // apply interpolated values
		  self.projection.rotate([t*-133,t*25])//.center([0 - (t * 30),35]) 
			.scale(  (1-Math.abs(Math.sin(s(t))))*scaleStartEnd + Math.abs(Math.sin(s(t)))*scaleMiddle  ) ;          
			self.svg.selectAll("path").attr("d", self.path);
		//   c.clearRect(0, 0, self.width, self.height);
		//   c.fillStyle = colorGlobe, c.beginPath(), path(sphere), c.fill();
		//   c.fillStyle = colorLand, c.beginPath(), path(land), c.fill();
		//   c.beginPath(), path(flightPath), c.globalAlpha = 0.5, c.shadowColor = "#fff", c.shadowBlur = 5, c.lineWidth = 0.5, c.strokeStyle = "#fff", c.stroke(), c.shadowBlur = 0, c.globalAlpha = 1;

		}
	  })
	  .duration(3000)
	  //.on("end", function() {  loop();  })
	
	
  }
}


// map projection

            




