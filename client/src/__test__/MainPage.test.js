import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {Router, MemoryRouter, BrowserRouter} from "react-router-dom";
import {act} from "react-dom/test-utils";

import MainPageLogged from "../MainPage/MainPageLogged";

let fakeLoginContext = {
    checkLogin: jest.fn(),
    logged: true,
    user_info: {
        organisation: null,
    }
}

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
        render(<BrowserRouter><MainPageLogged loginContext={fakeLoginContext}/></BrowserRouter>, container);
    });
    expect(container.textContent).toMatch(/.*Missing organisation.*/i);
});