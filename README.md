bChart
-----
bChart is a D3-based charting library. bChart provides a simple, clean and easy way to create SVG-style charts and to integrate to daily use web application.

Why bChart?
----
* D3-based
    * bChart is sitting on the top of D3 library. 
    * It gives all the powers and flexibilities D3 provides and make it much simpler to create a visualization chart.  
* Customizable
    * All charts' style can be easily customized without touch of CSS.
    * All charts' transition/animation can be customized (coming soon).
* Easy of use 
    * Straight forward. 
    * Chainable methods.
    * Easy API (coming soon).
    * AMD supportable.
  
Tutorial
----
1. Download the bChart.js (or bChart.min.js) and bChart.css (or bChart.min.css).
2. Load the scripts and CSS

        <!-- Load bChart.css -->
        <link href="/path/to/c3.css" rel="stylesheet" type="text/css">
    
        <!-- Load d3.js and bChart.js -->
        <script src="/path/to/d3.v3.min.js"></script>
        <script src="/path/to/bChart.min.js"></script>
 
3. Calling **bChart** selector to create a chart. For example, to create a Barchart:

        bChart.BarChart("#chart");
        
        //to change background of barchart: 
        bChart("#chart").background("color", "#ccc")
        
        //to load data:
        bChart("#chart").load([['data1', '45', '32', '15']]);
        
        //You can also chaining all these steps above together:
        bChart.BarChart("#chart").background("color", "#ccc").load([['data1', '45', '32', '15']]);
        
        //You can also asign a variable to the chart you create and reuse it in your code.
        var myBarChart = bChart("#chart");
        myBarChart.background("color", "#ccc").load([['data1', '45', '32', '15']]);
    

Group
---
Coming soon.

Dependency
---
[D3.js](http://d3js.org/)

