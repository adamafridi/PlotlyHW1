function getPlots(sampleID) {
  d3.json("samples.json").then((sampleData) => {
    console.log(sampleData);

    var samples = sampleData.samples;

    var ids = samples.filter((sampleValues) => sampleValues.id == sampleID);

    var display = ids[0];

    var dataIDs = display.otu_ids;
    console.log(dataIDs);

    var values = display.sample_values;
    console.log(values);

    var otu_labels = display.otu_labels;
    console.log(otu_labels);

    var otuids = dataIDs.slice(0, 10);
    console.log(otuids);

    var topValues = values.slice(0, 10).reverse();
    console.log(topValues);

    var labels = otu_labels.slice(0, 10).reverse();
    console.log(labels);

    var otu_id = otuids.map((id) => "OTU" + "  " + id);
    console.log(`OTU ID: ${otu_id}`);

    console.log(`OTU_labels: ${labels}`);

    var trace1 = {
      x: topValues,
      y: otu_id,
      text: labels,
      type: "bar",
      orientation: "h",
    };

    var data = [trace1];

    var layout = {
      title: "Top OTUs Present",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100,
      },
    };
    Plotly.newPlot("bar", data, layout);
    var trace2 = {
      x: values,
      y: dataIDs,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: values,
        color: otuids,
        colorscale: "Earth",
      },
    };
    var bubble = [trace2];

    var layout2 = {
      title: "OTU Samples",
      xaxis: { title: "OTU IDs" },
      showlegend: false,
      height: 600,
      width: 1000,
    };

    Plotly.newPlot("bubble", bubble, layout2);
  });
}

function dropdown() {
  var dropdownselector = d3.select("#selDataset");
  d3.json("samples.json").then((metadata) => {
    console.log(metadata);
    var dataPoints = metadata.names;
    dataPoints.forEach((data) => {
      dropdownselector.append("option").text(data).property("value", data);
    });

    var firstDataPoint = dataPoints[0];
    getPlots(firstDataPoint);
    createMeta(firstDataPoint);
  });
}

function createMeta(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var response = metadata.filter(
      (sampleElement) => sampleElement.id == sample
    );
    var result = response[0];
    var charts = d3.select("#sample-metadata");
    charts.html(" ");
    Object.entries(result).forEach(([key, value]) => {
      charts.append("h5").text(`${key}: ${value}`);
    });
  });
}
function optionChanged(panel) {
  /*call the two functions here*/
  console.log(panel);
  getPlots(panel);
  createMeta(panel);
}
dropdown();
