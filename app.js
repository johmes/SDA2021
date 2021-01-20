// Copyright Johannes Mensalo 2021
// Credits: Johannes Mensalo
// Version 1.0.1


// This is a Solita Dev Academy 2021 code exercise solution for Name Application.
// Please check README for complete assignment.
// And most important, have fun!



// Get names.json file from url using jQuery function getJSON.
function getNameList(callback) {
  $.getJSON('https://raw.githubusercontent.com/solita/dev-academy-2021/main/names.json', function (json) {
      callback(json);
  });
}
// Function where we add the data to HTML element and return it.
// Parameters are for wanted array and different index values.
function addToMainList(array,i,i2,i3) {
  return document.getElementById('list').innerHTML += "<li>" + array[i][i3] + ": " +
  array[i][i2] + "</li>";
}

// Show this in list as a default when page is loaded.
getNameList(function(data) {
  for (var i = 0; i < data['names'].length; i++) {
    addToMainList(data['names'],i,['amount'],['name']);
  }

  // REQUIREMENT #4
  // Execute real time search function. For now it only shows result when the name
  // is fully written in the search bar. Using keyup event listener to detect user input.
  var findName = document.getElementById("find_name");
  findName.addEventListener("keyup", function() {
    document.getElementById('list').innerHTML = '';
    var search = findName.value;
    var searchToUpperCase = search.charAt(0).toUpperCase() + search.slice(1);

    for (var i = 0; i < data['names'].length; i++) {
      var onlyName = [];
      for (var i = 0; i < data['names'].length; i++) {
        onlyName.push(data['names'][i]['name']);
      }
      // Check if search bar is empty
      if (searchToUpperCase == '') {
        for (var i = 0; i < data['names'].length; i++) {
          addToMainList(data['names'],i,['amount'],['name']);
        }
      } else {
        // Insert result to name list
        if (onlyName.indexOf(searchToUpperCase) == -1) {
          document.getElementById('list').innerHTML = "<h3 style='text-align: center; margin-top: 10px;'>Sorry, we could not find this guy! </h3><br>";
        } else {
          const indexOfSearch = onlyName.indexOf(searchToUpperCase);
          addToMainList(data['names'],indexOfSearch,['amount'],['name']);
        }
      }
    }
  });
});

// REQUIREMENT #1 and #2
// Change order by name (Alphabetically) or
// by amount (The most common name first).
// Element #orderBy has onchange event listening for changeOrder function.
// Functions parameter input gets value of #orderBy element.
// Insert data to page as a list using <li> tag.
function changeOrder(input) {
  getNameList(function(data){
    var value = input.value;
    var namesArray = [];
    // Clear list element every time before function is called.
    document.getElementById('list').innerHTML = "";
    // Create array for name and its amount.
    for (var i = 0; i < data['names'].length; i++) {
      namesArray.push([data['names'][i]['name'], data['names'][i]['amount']]);
    }
    // Check user input from sort input
    // Values are "Amount", "Alphabeth" and "Default".
    if (value == "Amount") {
      // Sort biggest value first using build in sort function.
      var sortOrder = namesArray.slice().sort(function(a, b) {
        return b[1] - a[1];
      });
      for (var i = 0; i < sortOrder.length; i++) {
        addToMainList(sortOrder,i,[0],[1]);
      }
    } else if (value == "Alphabet") {
      // Sort Alphabetically.
      var sortOrder = namesArray.sort();
      for (var i = 0; i < sortOrder.length; i++) {
        addToMainList(sortOrder,i,[1],[0]);
      }
    } else if (value == "Default") {
      // Default order if input is neither of two past values.
      for (var i = 0; i < namesArray.length; i++) {
        addToMainList(namesArray,i,[1],[0]);
      }
    }
  });
};

// REQUIREMENT #3
// Count all names and how many different names there is and show the result
// at the bottom of the page.
// TotalNames variable to sumup all the names.
// Create an array to insert name and amount under that certain name.
// Loop through the names and insert data to namesArray.
// Finally, insert values to elements
getNameList(function(data){
  var totalNames = 0;
  var namesArray = [];
  for (var i = 0; i < data['names'].length; i++) {
    namesArray.push([data['names'][i]['name'],data['names'][i]['amount']]);
    var totalNames = totalNames + namesArray[i][1];
  }
  document.getElementById('totalNames').innerHTML = "Total Dude Count: <strong>" + totalNames + "</strong>";
  document.getElementById('differentNames').innerHTML = "Different Orthonyms: <strong>" + namesArray.length + "</strong>";
});
