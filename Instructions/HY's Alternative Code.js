
function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }
  
  function init() {
    createDropDown();
    // default dashboard
    firstChart(0);
    firstGuage(0);
  
    demoPanel(0);
  }
  
  function optionChanged(option_index) {
    console.log (`Updated option index: ${option_index}`);
  
    updateChart(option_index);
    demoPanel(option_index);
    updateGuage(option_index);
  }
  
  
  function createDropDown() {
  
    var dropDown = d3.select ("#selDataset");
  
    // get data
    d3.json("../../samples.json").then((data) => {
     
      // Append Dropdown
      var names = data.names;
      // console.log(`names: ${names}`);
      
      for (var i = 0; i < names.length; i++) {
        // console.log(names[i]);
        dropDown.append("option").attr("value", i).text(names[i]);
      }
    });
  }
  
  function firstChart(index){
    d3.json("../../samples.json").then((data) => {
    
    // select data and choose individual by index
    // loads in the same order as the createDropDown()
    var sampleData = data.samples;
    var sampleDataSelect = sampleData[index];
    console.log(`first data point:`) 
    console.log(sampleDataSelect);
  
    // slice the top 10, since the data is ordered in descending
    var otu_ids = sampleDataSelect.otu_ids;
    var otu_id_ten = otu_ids.slice(0,10);
    var samp_values = sampleDataSelect.sample_values;
    var sample_values_ten = samp_values.slice(0,10);
    var otu_labs = sampleDataSelect.otu_labels;
    var otu_labs_ten = otu_labs.slice(0,10);
      
    // transform y-label as text
    var new_otu_ids_ten = otu_id_ten.map(function(id) {
      return `OTU ${id}`;
    });
  
    // Horizontal Bar Chart
    // 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    // * Use `sample_values` as the values for the bar chart.
    // * Use `otu_ids` as the labels for the bar chart.
    // * Use `otu_labels` as the hovertext for the chart.
    var traceH = {
      x: sample_values_ten,
      y: new_otu_ids_ten,
      text: otu_labs_ten,
      type: "bar",
      orientation: 'h',
      name: 'otu by type of bacteria'
    };
  
    var dataH = [traceH];
      // Apply the group bar mode to the layout
  
    var layoutH = {
      title: "Top 10 <br> operational taxonomic units (otu) <br> by sample size",
      yaxis: {
      //  https://stackoverflow.com/questions/46201532/plotly-js-reversing-the-horizontal-bar-chart-in-plotly
        autorange: "reversed",
      },
      };
    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar", dataH, layoutH); 
    
    
    // Bubble Chart
    // 3. Create a bubble chart that displays each sample.
    // * Use `otu_ids` for the x values.
    // * Use `sample_values` for the y values.
    // * Use `sample_values` for the marker size.
    // * Use `otu_ids` for the marker colors.
    // * Use `otu_labels` for the text values.
    var traceB = {
      x: otu_ids,
      y: samp_values,
      text: otu_labs,
      mode: 'markers',
      marker: {
        color: otu_ids,
        size: samp_values
      }
    };
    
    var dataB = [traceB];
    
    var layoutB = {
      title: ' Operational taxonomic units (otu) <br> by sample size',
      xaxis:{
        title: 'Operational Taxonomic Unit (otu) ID'
      },
      yaxis: {
        title: 'Value'
      },
      height: 500,
    };
    
    Plotly.newPlot('bubble', dataB, layoutB);
    });
  }
  
  function updateChart(index) {
    d3.json("../../samples.json").then((data) => {
      // select data and choose individual by index
      // loads in the same order as the createDropDown()
      var sampleData = data.samples;
      var sampleDataSelect = sampleData[index];
      console.log(sampleDataSelect);
    
      // slice the top 10, since the data is ordered in descending
      var otu_ids = sampleDataSelect.otu_ids;
      var otu_id_ten = otu_ids.slice(0,10);
      var samp_values = sampleDataSelect.sample_values;
      var sample_values_ten = samp_values.slice(0,10);
      var otu_labs = sampleDataSelect.otu_labels;
      var otu_labs_ten = otu_labs.slice(0,10);
    
      // transform y-label as text
      var new_otu_ids_ten = otu_id_ten.map(function(id) {
        return `OTU ${id}`;
      });
      
      // console.log(new_otu_ids);
     
      // Update Plots 
      Plotly.restyle("bar", "x", [sample_values_ten]);
      Plotly.restyle("bar", "y", [new_otu_ids_ten]);
      Plotly.restyle("bar", "text", [otu_labs_ten]);    
      
      Plotly.restyle('bubble', "x", [otu_ids]);
      Plotly.restyle('bubble', "y", [samp_values]);
      Plotly.restyle('bubble', "text", [otu_labs]);
      Plotly.restyle('bubble', "marker", [{color: otu_ids, size: samp_values}]);
      });
  
    }
  
  function demoPanel(index){
    d3.json("../../samples.json").then((data) => {
    
      // select data and choose individual by index
      // loads in the same order as the createDropDown()
      var sampleData = data.metadata;
      var sampleDataSelect = sampleData[index];
      // var sampleDataSelect = sampleData[index];
      console.log(sampleDataSelect);
  
      var personID = sampleDataSelect.id;
      var ethnicity = sampleDataSelect.ethnicity;
      var gender = sampleDataSelect.gender;
      var age = sampleDataSelect.age;
      var location = sampleDataSelect.location;
      var bbtype = sampleDataSelect.bbtype;
      var wfreq = sampleDataSelect.wfreq;
      
      var metapanel = d3.select ("#sample-metadata");
      metapanel.text("");
      metapanel.append("p").attr("value", "id").text(`id: ${personID}`);
      metapanel.append("p").attr("value", "ethnicity").text(`ethnicity: ${ethnicity}`);
      metapanel.append("p").attr("value", "gender").text(`gender: ${gender}`);
      metapanel.append("p").attr("value", "age").text(`age: ${age}`);
      metapanel.append("p").attr("value", "location").text(`location: ${location}`);
      metapanel.append("p").attr("value", "bbtype").text(`bbtype: ${bbtype}`);
      metapanel.append("p").attr("value", "wfreq").text(`wfreq: ${wfreq}`);
  });
  }
  
  function firstGuage(index){
    d3.json("../../samples.json").then((data) => {
    
      // select data and choose individual by index
      // loads in the same order as the createDropDown()
      var sampleData = data.metadata;
      var sampleDataSelect = sampleData[index];
      // var sampleDataSelect = sampleData[index];
  
      var wfreq = sampleDataSelect.wfreq;
  
      var dataG = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: wfreq,
          title: { text: "Belly Button Washing Frequency per Week" },
          type: "indicator",
          mode: "gauge+number",
  
          gauge: {
            axis: {range: [null, 9]},
            // https://www.colorhexa.com/
            steps: [
              {range: [0,1], color: "#ffffed"},
              {range: [1,2], color: "#e9eecb"},
              {range: [2,3], color: "#cfddac"},
              {range: [3,4], color: "#b3cc8f"},
              {range: [4,5], color: "#95bb75"},
              {range: [5,6], color: "#76aa5d"},
              {range: [6,7], color: "#579848"},
              {range: [7,8], color: "#3a8736"},
              {range: [8,9], color: "#26762d"},          
            ],
            bar: {color: "black"}
  
          }
        }
      ];
  
      var layoutG = { width: 600, height: 500, margin: { t: 0, b: 0 } };
  
      Plotly.newPlot('gauge', dataG, layoutG);
  });
  }
  
  function updateGuage(index){
    d3.json("../../samples.json").then((data) => {
    
      // select data and choose individual by index
      // loads in the same order as the createDropDown()
      var sampleData = data.metadata;
      var sampleDataSelect = sampleData[index];
      // var sampleDataSelect = sampleData[index];
  
      var wfreq = sampleDataSelect.wfreq;
  
      Plotly.restyle('gauge', "value", [wfreq]);
  });
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  init();
  
  
  
    
  // var test = unpack(sampleData, 4);
  // console.log(test);
    
  // console.log(data);
  // console.log(sampleData);
  // console.log(sampleDataSelect); 
  //   console.log (`otu_ids: ${otu_ids}`);
  //   console.log (`sample_values: ${sample_values}`);
  //   console.log (`otu_labels: ${otu_labels}`);
    // sampleDataselect.sort(function compareFunction(first, second) {
    //   return second.sample_values - first.sample_values;
    // });
  
    // sampleDataselect.slice(0, 10);
  
    // var otu_ids = sampleDataselect["otu_ids"];
    // var sample_values = sampleDataselect["sample_values"];
    // var otu_labels = sampleDataselect["otu_labels"];
    
    
    // console.log(data);
    // console.log(sampleDataSelect); 
    // console.log(sorted);
    // console.log (`otu_ids: ${otu_ids}`);
    // console.log (`sample_values: ${sample_values}`);
    // console.log (`otu_labels: ${otu_labels}`);
  
  
    // function filterPerson (data, person_id) {
    //   return data.names == person_id;