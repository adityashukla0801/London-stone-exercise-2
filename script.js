// Mocking location object for Node.js testing
const mockLocation = {
  href: "https://www.londonstone.co.uk/show-showrooms/?showrooms=barnsley,birmingham,bristol",
};

function displayShowrooms(location) {
  let nationwideShowrooms = [];
  let showroomQS = "";
  let showroomCount = 1;

  // Check if 'showrooms' exists in the query string
  if (location.href.indexOf("showrooms=") !== -1) {
    showroomQS = location.href.split("showrooms=")[1];
    nationwideShowrooms = showroomQS.split(",");

    // Mock a simple HTML content area
    const contentArea = {
      innerHTML: "",
      appendChild: function (element) {
        this.innerHTML += element.innerHTML + "\n"; // Simulate appending elements
      },
    };

    // Loop through each showroom and render the elements
    nationwideShowrooms.forEach(function (showroom) {
      const divEl = document.createElement("div");
      const spanCount = document.createElement("span");
      spanCount.innerHTML = `(${showroomCount}). `;

      const spanName = document.createElement("span");
      spanName.innerHTML = showroom.charAt(0).toUpperCase() + showroom.slice(1);

      divEl.append(spanCount, spanName);
      contentArea.appendChild(divEl);

      showroomCount++;
    });

    console.log(contentArea.innerHTML); // Output the final HTML content
  } else {
    console.error("No 'showrooms' parameter found in the URL.");
  }
}

// Mock a simple document object for Node.js
global.document = {
  createElement: function (tag) {
    return {
      innerHTML: "",
      append: function (...children) {
        this.innerHTML += children.map((child) => child.innerHTML).join("");
      },
    };
  },
};

// Run the function with the mock location
displayShowrooms(mockLocation);
