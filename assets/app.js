var source = "https://raw.githubusercontent.com/hanesy/plotly-challenge/master/data/samples.json";

function init() {
  // default dashboard
  d3.json(source).then((data) => {
    console.log ('entire data');
    console.log(data);

    // select data from data
    var personNames = data.names;

    // select data and choose individual by index
    // loads in the same order as the createDropDown()
    var sampleData = data.samples;
    var sampleDataSelect = sampleData[0];
    console.log(`first person from Sample:`) 
    console.log(sampleDataSelect);

    var metaData = data.metadata;
    var metaDataSelect = metaData[0];
    console.log(`first person from Meta:`) 
    console.log(metaDataSelect);

    // select variables from sample
    var otu_ids = sampleDataSelect.otu_ids;
    var samp_values = sampleDataSelect.sample_values;
    var otu_labs = sampleDataSelect.otu_labels;

    // select variables from metaDataSelect
    var personID = metaDataSelect.id;
    var ethnicity = metaDataSelect.ethnicity;
    var gender = metaDataSelect.gender;
    var age = metaDataSelect.age;
    var location = metaDataSelect.location;
    var bbtype = metaDataSelect.bbtype;
    var wfreq = metaDataSelect.wfreq;
  
    createDropDown(personNames);
    firstCharts(otu_ids, samp_values, otu_labs, wfreq); 
    demoPanel(personID, ethnicity, gender, age, location, bbtype, wfreq);
  });  

}

function createDropDown(personNames) {
  console.log("creating drop down")

  var dropDown = d3.select ("#selDataset");
    for (var i = 0; i < personNames.length; i++) {
      // console.log(names[i]);
      dropDown.append("option").attr("value", i).text(personNames[i]);
    }
}

function firstCharts(otu_ids, samp_values, otu_labs, wfreq){ 
  console.log("creating first charts...")

  var otu_id_ten = otu_ids.slice(0,10);
  var sample_values_ten = samp_values.slice(0,10);
  var otu_labs_ten = otu_labs.slice(0,10);
  // transform y-label as text
  var new_otu_ids_ten = otu_id_ten.map(function(id) {
    return `OTU ${id}`;
  });

  // Horizontal Bar Chart
  console.log("first horizontal bar chart")
  
  var traceH = {
    x: sample_values_ten,
    y: new_otu_ids_ten,
    text: otu_labs_ten,
    type: "bar",
    orientation: 'h',
    name: 'otu by type of bacteria'
  };

  var dataH = [traceH];

  var layoutH = {
    autosize: true,
    width:  $("#bar").width(),
    title: "Top 10 OTU <br> by sample size",
    yaxis: {
    //  https://stackoverflow.com/questions/46201532/plotly-js-reversing-the-horizontal-bar-chart-in-plotly
      autorange: "reversed",
    },
    };

  Plotly.newPlot("bar", dataH, layoutH); 
  
  
  // Bubble Chart
  console.log("first bubble chart")
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
    autosize: true,
    width:  $("#bubble").width(),
    title: 'OTU <br> by sample size',
    xaxis:{
      title: 'OTU ID'
    },
    yaxis: {
      title: 'Value'
    },
  };
  
  Plotly.newPlot('bubble', dataB, layoutB);

  // Gauge Chart
  console.log("first gauge chart")
  var dataG = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: wfreq,
      title: { text: "Belly Button Washing <br> Frequency per Week", font: { size: 16 } },
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
  
  var layoutG = {
    // autosize: true,
    width:  $("#gauge").width(),
    // height:  $("#gauge").width()/1.5,
    margin: { t: 60, b: 0 } 
  };
  
    Plotly.newPlot('gauge', dataG, layoutG);
}

function demoPanel(personID, ethnicity, gender, age, location, bbtype, wfreq){ 
  console.log("creating demo panel")
  // var metapanel1 = d3.select ("#sample-metadata1");
  // metapanel1.text("");
  // metapanel1.append("p").attr("value", "id").text(`ID: ${personID}`);

  var metapanel2 = d3.select ("#sample-metadata2");
  metapanel2.text("");
  metapanel2.append("p").attr("value", "ethnicity").text(`Ethnicity: ${ethnicity}`);
  metapanel2.append("p").attr("value", "gender").text(`Gender: ${gender}`);
  metapanel2.append("p").attr("value", "age").text(`Age: ${age}`);

  var metapanel3 = d3.select ("#sample-metadata3");
  metapanel3.text("");
  metapanel3.append("p").attr("value", "location").text(`Location: ${location}`);
  metapanel3.append("p").attr("value", "bbtype").text(`Belly Buttontype: ${bbtype}`);
  metapanel3.append("p").attr("value", "wfreq").text(`Wash Frequency per Week: ${wfreq}`);
}

function optionChanged(option_index) {
  console.log (`Updated option index: ${option_index}`);

  d3.json("https://raw.githubusercontent.com/hanesy/plotly-challenge/master/data/samples.json").then((data) => {
    // select data and choose individual by index
    // loads in the same order as the createDropDown()
    var sampleData = data.samples;
    var sampleDataSelect = sampleData[option_index];
    console.log(`updated person from Sample:`) 
    console.log(sampleDataSelect);

    var metaData = data.metadata;
    var metaDataSelect = metaData[option_index];
    console.log(`updated person from Meta:`) 
    console.log(metaDataSelect);

    // select variables from sample
    var otu_ids = sampleDataSelect.otu_ids;
    var samp_values = sampleDataSelect.sample_values;
    var otu_labs = sampleDataSelect.otu_labels;

    // select variables from metaDataSelect
    var personID = metaDataSelect.id;
    var ethnicity = metaDataSelect.ethnicity;
    var gender = metaDataSelect.gender;
    var age = metaDataSelect.age;
    var location = metaDataSelect.location;
    var bbtype = metaDataSelect.bbtype;
    var wfreq = metaDataSelect.wfreq;

    updateCharts(otu_ids, samp_values, otu_labs, wfreq); 
    demoPanel(personID, ethnicity, gender, age, location, bbtype, wfreq);
  });
}  

function updateCharts(otu_ids, samp_values, otu_labs, wfreq) {
  d3.json(source).then((data) => {
    var otu_id_ten = otu_ids.slice(0,10);
    var sample_values_ten = samp_values.slice(0,10);
    var otu_labs_ten = otu_labs.slice(0,10);
      
    // transform y-label as text
    var new_otu_ids_ten = otu_id_ten.map(function(id) {
      return `OTU ${id}`;
    });
  
    // Update Plots 
    console.log("update horizontal bar chart")
    Plotly.restyle("bar", "x", [sample_values_ten]);
    Plotly.restyle("bar", "y", [new_otu_ids_ten]);
    Plotly.restyle("bar", "text", [otu_labs_ten]);    

    console.log("update bubble chart")
    Plotly.restyle('bubble', "x", [otu_ids]);
    Plotly.restyle('bubble', "y", [samp_values]);
    Plotly.restyle('bubble', "text", [otu_labs]);
    Plotly.restyle('bubble', "marker", [{color: otu_ids, size: samp_values}]);

    console.log("update gauge chart")
    Plotly.restyle('gauge', "value", [wfreq]);
    });
  }

init();

window.addEventListener('resize', init);
