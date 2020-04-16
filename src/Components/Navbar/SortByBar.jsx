import React from "react";

const SortByBar = ({ listName, handleSortClick }) => {
  const catergories = [
    { name: "Votes", icon: "stats-chart", value: "votes" },
    { name: "Comments", icon: "pencil", value: "comment_count" },
    { name: "Date", icon: "today", value: "created_at" },
  ];

  return (
    <div className="SortByBar">
      Sort {listName} by:
      <ul className="catergorieslist">
        {catergories.map((category) => {
          if (listName === "comments" && category.name === "Comments")
            return null;
          return (
            <div
              className={`category ${category.name}`}
              key={category.name}
              onClick={() => handleSortClick(category.value)}
            >
              <span className="categoryName">{category.name}</span>
              <span className="categoryIcon">
                {" "}
                <ion-icon name={category.icon} />
              </span>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default SortByBar;
