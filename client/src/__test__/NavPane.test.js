import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import {BrowserRouter} from "react-router-dom";

import NavPane from "../NavPane/NavPane";

// declare the container here so we can place our dom element in it
let container = null;
let fakeLoginContext;

beforeEach(() => {
    fakeLoginContext = {
        checkLogin: jest.fn(),
        logged: null
    }
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("should render", () => {
    act(() => {
        render(<BrowserRouter><NavPane loginContext={fakeLoginContext}/></BrowserRouter>, container);
    });
    expect(container.querySelector("#brandLogo").textContent).toBe("DailyTasks");
})