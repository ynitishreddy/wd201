/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const todoList = require('../todo');

const { all, markAsComplete, add, overdue, dueLater, dueToday } = todoList();

describe("TodoList Test Suite", () => {
    test("Should add a new todo", () => {
        expect(all.length).toBe(0);
        add(
            {
                title: "Test todo",
                completed: false,
                dueDate: new Date().toISOString()
            }
        );
        expect(all.length).toBe(1);
    });

    test("Should mark a todo as complete", () => {
        expect(all[0].completed).toBe(false);
        markAsComplete(0);
        expect(all[0].completed).toBe(true);
    });

    test("Should return overdue items", async () => {

        const today = new Date();
        const yesterday = new Date(new Date().setDate(today.getDate() - 1))

        add({
            title: "Test todo",
            completed: false,
            dueDate: yesterday.toISOString().split("T")[0]
        });

        console.log(overdue())
        expect(overdue().length).toBe(1);
    });

    test("Should return duetoday items", async () => {
        
        const today = new Date().toISOString().split("T")[0];

        const beforeadding = dueToday();
        console.log(dueToday())
        add({
            title: "Test todo",
            completed: false,
            dueDate: today
        });

        const afteradding = dueToday();
        expect(afteradding.length).toBe(beforeadding.length + 1);
    });

    test("Should return duelater items", async () => {

        const today = new Date();
        const tomorrow = new Date(new Date().setDate(today.getDate() + 1))

        const beforeadding = dueLater();
        add({
            title: "Test todo",
            completed: false,
            dueDate: tomorrow.toISOString().split("T")[0]
        });
        const afteradding = dueLater();
        expect(afteradding.length).toBe(beforeadding.length + 1);
    });

})