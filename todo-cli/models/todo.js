// models/todo.js
"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      console.log(
        (await Todo.overdue())
          .map((todo) => todo.displayableString())
          .join("\n"),
      );
      console.log("\n");

      console.log("Due Today");
      console.log(
        (await Todo.dueToday())
          .map((todo) => todo.displayableString())
          .join("\n"),
      );
      console.log("\n");

      console.log("Due Later");
      console.log(
        (await Todo.dueLater())
          .map((todo) => todo.displayableString())
          .join("\n"),
      );
    }

    static async overdue() {
      const today = new Date().toISOString().split("T")[0];
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: today,
          },
        },
      });
    }

    static async dueToday() {
      const today = new Date().toISOString().split("T")[0];
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.eq]: today,
          },
        },
      });
    }

    static async dueLater() {
      const today = new Date().toISOString().split("T")[0];
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: today,
          },
        },
      });
    }

    static async markAsComplete(id) {
      const task = await Todo.findByPk(id);
      if (task) {
        task.completed = true;
        await task.save();
      }
    }

    // displayableString () {
    //   const checkbox = this.completed ? '[x]' : '[ ]'
    //   const displayedDate = this.dueDate === new Date().toISOString().slice(0, 10) ? '' : this.dueDate
    //   return `${this.id}. ${checkbox} ${this.title} ${displayedDate}`
    // }
    displayableString() {
      const checkbox = this.completed ? "[x]" : "[ ]";
      const displayedDate =
        this.dueDate === new Date().toISOString().slice(0, 10)
          ? ""
          : this.dueDate;
      const datePart = displayedDate ? ` ${displayedDate.trim()}` : "";
      return `${this.id}. ${checkbox} ${this.title}${datePart}`;
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    },
  );
  return Todo;
};
