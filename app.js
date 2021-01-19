
function getNameList(callback) {
  $.getJSON('https://raw.githubusercontent.com/solita/dev-academy-2021/main/names.json', function (json) {
      callback(json);
  });
}

// Show this in list when reloaded.
getNameList(function(data) {
  for (var i = 0; i < data['names'].length; i++) {
    document.getElementById('list').innerHTML += "<li>" + data['names'][i]['name'] + ": " +
    data['names'][i]['amount'] + "</li>";
  }

  // Execute real time search function
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
          document.getElementById('list').innerHTML += "<li>" + data['names'][i]['name'] + ": " +
          data['names'][i]['amount'] + "</li>";
        }
      } else {
        // Insert result to name list
        if (onlyName.indexOf(searchToUpperCase) == -1) {
          document.getElementById('list').innerHTML = "No result <br>";
        } else {
          const indexOfSearch = onlyName.indexOf(searchToUpperCase);
          document.getElementById('list').innerHTML = "<li>" + data['names'][indexOfSearch]['name'] + ": " +
          data['names'][indexOfSearch]['amount'] + "</li>";
        }
      }
    }
  });


});

// Change order of names.
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

    if (value == "Amount") {
      // Sort biggest value first.
      var sortOrder = namesArray.slice().sort(function(a, b) {
        return b[1] - a[1];
      });

      for (var i = 0; i < sortOrder.length; i++) {
        document.getElementById('list').innerHTML += "<li>" + sortOrder[i][1] + ": " +
        sortOrder[i][0] + "</li>";
      }

    } else if (value == "Alphabet") {
      // Sort Alphabetically.
      var sortOrder = namesArray.sort();
      for (var i = 0; i < sortOrder.length; i++) {
        document.getElementById('list').innerHTML += "<li>" + sortOrder[i][0] + ": " +
        sortOrder[i][1] + "</li>";
      }

    } else {
      // Default array
      for (var i = 0; i < namesArray.length; i++) {
        document.getElementById('list').innerHTML += "<li>" + namesArray[i][0] + ": " +
        namesArray[i][1] + "</li>";
      }

    }
  });
};

// Count all names and how many different names there is.
getNameList(function(data){
  var totalNames = 0;
  var namesArray = [];
  for (var i = 0; i < data['names'].length; i++) {
    namesArray.push([data['names'][i]['name'],data['names'][i]['amount']]);
    var totalNames = totalNames + namesArray[i][1];
  }
  // Insert values to elements
  document.getElementById('totalNames').innerHTML = "Total names: <strong>" + totalNames + "</strong>";
  document.getElementById('differentNames').innerHTML = "Different names: <strong>" + namesArray.length + "</strong>";
});
