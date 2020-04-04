import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import {BrowserRouter} from "react-router-dom";

import UserInfoSection from "../NavPane/UserInfoSection";

// declare the container here so we can place our dom element in it
let container = null;
let fakeLoginContext;
let onLogOut;

beforeEach(() => {
    onLogOut = jest.spyOn(UserInfoSection.prototype, "onLogOut");    
    fakeLoginContext = {
        checkLogin: jest.fn(),
        logged: null
    }
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    jest.restoreAllMocks();
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("should call the function checklogin once", () => {
    act(() => {
        const userinfo = (<UserInfoSection loginContext={fakeLoginContext}/>)
        fakeLoginContext.checkLogin.mockImplementationOnce(function() {
            fakeLoginContext.logged = false;
        });
        render(<BrowserRouter>{userinfo}</BrowserRouter>, container);
    });
    expect(fakeLoginContext.checkLogin.mock.calls.length).toBe(1);
})

it("should return buttons 'Log in' and 'Sign up'", () => {
    act(() => {
        fakeLoginContext.logged = false;
        render(<BrowserRouter><UserInfoSection loginContext={fakeLoginContext}/></BrowserRouter>, container);
    });
    expect(container.textContent).toMatch(/.*log in.*sign up.*/i);
});

it("should return 'Hi user' as if user is logged in", () => {
    act(() => {
        fakeLoginContext.logged = true;
        fakeLoginContext.user_info = { 
            user_credential: { login: "User123" }    
        };
        render(<BrowserRouter><UserInfoSection loginContext={fakeLoginContext}/></BrowserRouter>, container);
    });
    expect(container.querySelector("#dropDownMenuButton").textContent).toBe("Hi User123");
});

it("should call onLogout when clicking the button", () => {
    act(() => {
        fakeLoginContext.logged = true;
        fakeLoginContext.user_info = { 
            user_credential: { login: "User123" }    
        };
        const elem = (<UserInfoSection loginContext={fakeLoginContext}/>);
        render(<BrowserRouter>{elem}</BrowserRouter>, container);
    });

    const logOutButton = container.querySelector("#logOutButton");

    act(() => {
        logOutButton.dispatchEvent(new MouseEvent("click", {bubbles: true}));
    })

    expect(onLogOut).toHaveBeenCalledTimes(1);
    expect(container.querySelector("#dropDownMenuButton").textContent).toBe("Hi User123");
});

it("should be redirected to settings page", () => {
    act(() => {
        fakeLoginContext.logged = true;
        fakeLoginContext.user_info = { login: "User123" };
        render(<BrowserRouter><UserInfoSection loginContext={fakeLoginContext} /></BrowserRouter>, container);
    });

    const settingsButton = container.querySelector("#settingsButton");

    act(() => {
        settingsButton.dispatchEvent(new MouseEvent("click", {bubbles: true}));
    });

    expect(window.location.pathname).toBe("/settings");
    expect(container.textContent).toMatch(/.*settings.*/i)
});

