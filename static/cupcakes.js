const BASE_URL = "http://127.0.0.1:5000/api";


/** given data about a cupcake, generate html */

function generateCupcakeHTML(cupcake) {
    return `
      <div data-cupcake-id="${cupcake.id}">
        <li>
          Flavor: <span class="cupcake-flavor">${cupcake.flavor}</span><br>
          Size: <span class="cupcake-size">${cupcake.size}</span><br>
          Rating: <span class="cupcake-rating">${cupcake.rating}</span><br>
          <button class="update-button">Update</button>
          <button class="delete-button">Delete</button>
        </li>
        <img class="cupcake-image" src="${cupcake.image}" alt="(no image provided)">
      </div>
    `;
  }
  


/** put initial cupcakes on page. */

async function showInitialCupcakes() {
  const response = await axios.get(`${BASE_URL}/cupcakes`);

  for (let cupcakeData of response.data.cupcakes) {
    let newCupcake = $(generateCupcakeHTML(cupcakeData));
    $("#cupcakes-list").append(newCupcake);
  }
}


/** handle form for adding of new cupcakes */

$("#new-cupcake-form").on("submit", async function (evt) {
  evt.preventDefault();

  let flavor = $("#form-flavor").val();
  let rating = $("#form-rating").val();
  let size = $("#form-size").val();
  let image = $("#form-image").val();

  const newCupcakeResponse = await axios.post(`${BASE_URL}/cupcakes`, {
    flavor,
    rating,
    size,
    image
  });

  let newCupcake = $(generateCupcakeHTML(newCupcakeResponse.data.cupcake));
  $("#cupcakes-list").append(newCupcake);
  $("#new-cupcake-form").trigger("reset");
});


/** handle clicking delete: delete cupcake */

$("#cupcakes-list").on("click", ".delete-button", async function (evt) {
  evt.preventDefault();
  let $cupcake = $(evt.target).closest("div");
  let cupcakeId = $cupcake.attr("data-cupcake-id");

  await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
  $cupcake.remove();
});

/** handle clicking update: update cupcake */

$("#cupcakes-list").on("click", ".update-button", async function (evt) {
    evt.preventDefault();
    let $cupcake = $(evt.target).closest("div");
    let cupcakeId = $cupcake.attr("data-cupcake-id");
  
    let flavor = $cupcake.find(".cupcake-flavor").text();
    let rating = $cupcake.find(".cupcake-rating").text();
    let size = $cupcake.find(".cupcake-size").text();
    let image = $cupcake.find(".cupcake-image").attr("src");
  
    // Prompt the user to enter the updated cupcake details
    let updatedFlavor = prompt("Enter the updated flavor", flavor);
    let updatedRating = prompt("Enter the updated rating", rating);
    let updatedSize = prompt("Enter the updated size", size);
    let updatedImage = prompt("Enter the updated image URL", image);
  
    const response = await axios.patch(`${BASE_URL}/cupcakes/${cupcakeId}`, {
      flavor: updatedFlavor,
      rating: updatedRating,
      size: updatedSize,
      image: updatedImage,
    });
  
    // Update the cupcake details on the page
    $cupcake.find(".cupcake-flavor").text(response.data.cupcake.flavor);
    $cupcake.find(".cupcake-rating").text(response.data.cupcake.rating);
    $cupcake.find(".cupcake-size").text(response.data.cupcake.size);
    $cupcake.find(".cupcake-image").attr("src", response.data.cupcake.image);
  });


$(showInitialCupcakes);