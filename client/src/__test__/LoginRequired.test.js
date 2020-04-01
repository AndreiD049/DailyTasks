import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {Router, MemoryRouter, BrowserRouter} from "react-router-dom";
import {act} from "react-dom/test-utils";

import LoginRequired from "../LoginRequired/LoginRequired";

let fakeLoginContext = {
    checkLogin: jest.fn(),
    logged: null
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

it("should not be rendered", () => {
    act(() => {
        fakeLoginContext.logged = null;
        render(<MemoryRouter><LoginRequired loginContext={fakeLoginContext}><h1>User is not logged in. Is not rendered</h1></LoginRequired></MemoryRouter>, container);
    });
    expect(container.textContent).toBe("");
    expect(container.textContent).toBeFalsy();
});

it("should be redirected to /login page", () => {
    act(() => {
        fakeLoginContext.logged = false;
        render(<BrowserRouter><LoginRequired loginContext={fakeLoginContext}><h1>User is not logged in. Is not rendered</h1></LoginRequired></BrowserRouter>, container);
    });
    expect(window.location.pathname).toBe("/login");
});

it("should render the inside content if user is logged in", () => {
    act(() => {
        fakeLoginContext.logged = true;
        render(<BrowserRouter><LoginRequired loginContext={fakeLoginContext}><h1>Logged in content</h1></LoginRequired></BrowserRouter>, container);
    });
    expect(container.textContent).toMatch(/^logged in content$/i);
});