import { createCategory } from "./components/createCategory.js";
import { createHeader } from "./components/createHeader.js";
import { createElement } from "./helper/createElement.js";
import { fetchCategories } from "./service/api-service.js";

const initApp = async () => {
  const headerParent = document.querySelector(".header");
  const app = document.getElementById("app");

  const headerObj = createHeader(headerParent);

  const categoryObj = createCategory(app);

  const categories = await fetchCategories();
  if (categories.error) {
    const errorText = createElement("p", {
      className: "server-error",
      textContent: "Ошибка сервера, попробуйте зайти позже!",
    });

    app.append(errorText);
  }

  categoryObj.mount(categories);

  const returnIndex = (e) => {
    e.preventDefault();

    headerObj.updateHeaderTitle("Категории");
  };

  headerObj.headerLogoLink.addEventListener("click", returnIndex);

  headerObj.headerButton.addEventListener("click", () => {
    headerObj.updateHeaderTitle("Новая категория");
  });
};

initApp();
