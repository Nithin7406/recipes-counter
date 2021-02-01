const recipes = document.querySelector(".recipes");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const accountDetails = document.querySelector(".account-details");

const setupUI = (user) => {
  if (user) {
    //acc info
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        const html = `
      <div>Logged in as ${user.email}</div>
      <div>${doc.data().bio}</div>
      `;
        accountDetails.innerHTML = html;
      });
    //toggle UI elements
    loggedInLinks.forEach((item) => (item.style.display = "block"));
    loggedOutLinks.forEach((item) => (item.style.display = "none"));
  } else {
    //hide acc info
    accountDetails.innerHTML = "";
    //toggle UI elements
    loggedInLinks.forEach((item) => (item.style.display = "none"));
    loggedOutLinks.forEach((item) => (item.style.display = "block"));
  }
};
document.addEventListener("DOMContentLoaded", function () {
  // nav menu
  const menus = document.querySelector(".side-menu");
  M.Sidenav.init(menus, { edge: "right" });
  // modals
  const modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);
});
//render recipe data
const renderRecipe = (data, id) => {
  const html = `<div class="card-panel recipe white row" data-id="${id}">
  <img src="/img/dish.png" alt="recipe thumbnail" />
  <div class="recipe-details">
    <div class="recipe-title">${data.title}</div>
    <div class="recipe-ingredients">${data.ingredients}</div>
  </div>
    <div class="recipe-delete">
    <i class="material-icons waves-effect edit-recipe modal-trigger" data-target="update-form1" data-id="${id}">edit</i>
    <i class="material-icons waves-effect delete-recipe" data-id="${id}">delete_outline</i>
  </div>
</div>`;
  recipes.innerHTML += html;
};
//remove recipe from doc
const removeRecipe = (id) => {
  const recipe = document.querySelector(`div[data-id=${id}]`);
  recipe.remove();
};
//update document
const updateRecipe = (data, id) => {
  const recipe = document.querySelector(`div[data-id="${id}"]`);
  const html = `
  <img src="/img/dish.png" alt="recipe thumbnail" />
  <div class="recipe-details">
    <div class="recipe-title">${data.title}</div>
    <div class="recipe-ingredients">${data.ingredients}</div>
  </div>
    <div class="recipe-delete">
    <i class="material-icons waves-effect edit-recipe modal-trigger" data-target="update-form1" data-id="${id}">edit</i>
    <i class="material-icons waves-effect delete-recipe" data-id="${id}">delete_outline</i>
  </div>`;
  recipe.innerHTML = html;
};

//enter recipes
const enterRecipes = () => {
  recipes.innerHTML = `<h6 class="center">Recipes</h6>`;
};
//clear recipes
const clearRecipes = () => {
  recipes.innerHTML = `
  <div class="center entry-page">
  <h5 class="center"> Login to View Recipes</h5>
  <div>
  <a
  href="#"
  class="waves-effect modal-trigger btn"
  data-target="modal-signup"
  ><i class="material-icons right">person_add</i> Sign up</a
>
<a href="#" class="waves-effect modal-trigger btn" data-target="modal-login"
><i class="material-icons right">person_pin</i> Login</a
>
</div>
</div>
  `;
};
