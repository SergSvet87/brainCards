import { createElement } from "../helper/createElement.js";
import { declOfNum } from "../helper/declOfNum.js";

export const createPairs = (app) => {
  const pairs = createElement("section", {
    className: "card section-offset",
  });

  const container = createElement("div", {
    className: "container card__container",
  });

  pairs.append(container);

  const categoryList = createElement("ul", {
    className: "category__list",
  });

  container.append(categoryList);

  const createCategoryCard = (data) => {
    const item = createElement("li", {
      className: "category__item",
    });

    const createButtonCard = (className, attr) => {
      const button = createElement("button", {
        className: className,
      });

      return Object.assign(button, attr);
    };

    item.dataset.id = data.id;

    const btnTitle = createButtonCard("category__card");
    btnTitle.append(
      createElement("span", {
        className: "category__title",
        textContent: data.title,
      })
    );
    btnTitle.append(
      createElement("span", {
        className: "category__pairs",
        textContent: declOfNum(data.length, ["пара", "пары", "пар"]),
      })
    );

    const btnEdit = createButtonCard("category__btn category__edit", {
      ariaLabel: "редактировать",
    });

    const btnDel = createButtonCard("category__btn category__del", {
      ariaLabel: "удалить",
    });

    item.append(btnTitle, btnEdit, btnDel);

    return item;
  };

  const mount = (data) => {
    categoryList.textContent = "";
    app.append(category);

    const cards = data.map(createCategoryCard);

    categoryList.append(...cards);
  };

  const unmount = () => {
    category.remove();
  };

  return { mount, unmount, categoryList };
};
