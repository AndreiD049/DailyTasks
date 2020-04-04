import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {Router, MemoryRouter, BrowserRouter} from "react-router-dom";
import {act} from "react-dom/test-utils";

import NewOrgModal from "../MainPage/NewOrgModal";

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

it("should render with correct id", () => {
    act(() => {
        render(<NewOrgModal id="someRandomId"/>, container);
    });
    expect(container.querySelector("#someRandomId")).not.toBeNull();
});