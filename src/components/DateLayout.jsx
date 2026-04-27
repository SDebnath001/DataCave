import React from "react";

const DateLayout = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const weekday = date.toLocaleString("default", { weekday: "long" });
  const handleReload = () => {
    location.reload();
  };
  return (
    <div>
      <div className="dashboard-data-btns">
        <div className="add-date-layout">
          <div className="add-btn">
            <button className="btn btn-dark text-white">
              <i className="bi bi-plus-circle"></i>&nbsp;Add New
            </button>
          </div>
          <div>
            <div className="date-badge">
              <div className="date-left">
                <span className="date-day">{day}</span>
                <div className="date-month-year">
                  <span>{month}</span>
                  <span>{year}</span>
                </div>
              </div>
              <div className="date-right">{weekday}</div>
            </div>
          </div>
        </div>
        <div className="refresh-btn">
          <button className="btn btn-dark" onClick={handleReload}>
            <i className="bi bi-arrow-clockwise"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateLayout;
