import { createCategory } from "./components/createCategory.js";
import { createEditCategory } from "./components/createEditCategory.js";
import { createHeader } from "./components/createHeader.js";
import { createPairs } from './components/createPairs.js';
import { createElement } from "./helper/createElement.js";
import { fetchCards, fetchCategories } from "./service/api-service.js";

const initApp = async () => {
  const headerParent = document.querySelector(".header");
  const app = document.getElementById("app");

  const headerObj = createHeader(headerParent);
  const categoryObj = createCategory(app);
  const editCategoryObj = createEditCategory(app);
  const pairsObj = createPairs(app);

  const allSectionUnmount = () => {
    [categoryObj, editCategoryObj].forEach((obj) => obj.unmount());
  };

  const returnIndex = async (e) => {
    e?.preventDefault();
    allSectionUnmount();

    const categories = await fetchCategories();
    if (categories.error) {
      const errorText = createElement("p", {
        className: "server-error",
        textContent: "Ошибка сервера, попробуйте зайти позже!",
      });

      app.append(errorText);
    }

    categoryObj.mount(categories);
  };

  returnIndex();

  headerObj.headerLogoLink.addEventListener("click", returnIndex);

  headerObj.headerButton.addEventListener("click", () => {
    allSectionUnmount();

    headerObj.updateHeaderTitle("Новая категория");

    editCategoryObj.mount();
  });

  categoryObj.categoryList.addEventListener("click", async (e) => {
    const target = e.target;

    const categoryItem = target.closest(".category__item");

    if (target.closest(".category__item")) {
      const dataCards = await fetchCards(categoryItem.dataset.id);

      allSectionUnmount();

      headerObj.updateHeaderTitle("Редактирование");

      editCategoryObj.mount(dataCards);
      return;
    }
  });
};

initApp();
