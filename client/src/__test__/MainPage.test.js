import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";

import MainPage from "../MainPage/MainPage";

// declare the container here so we can place our dom element in it
let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("should just render", () => {
    act(() => {
        // render the MainPage in the container
        render(<MainPage />, container);
    });
    expect(container.textContent).toBe("I am the main page");
});