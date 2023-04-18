import { createElement } from "../helper/createElement.js";

export const createCategory = (app) => {
  const category = createElement("section", {
    className: "category section-offset",
  });

  const container = createElement("div", {
    className: "container",
  });

  category.append(container);

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
        textContent: `${data.length} пар`,
      })
    );

    item.append(
      btnTitle,

      createButtonCard("category__btn category__edit", {
        ariaLabel: "редактировать",
      }),

      createButtonCard("category__btn category__del", {
        ariaLabel: "удалить",
      })
    );

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
