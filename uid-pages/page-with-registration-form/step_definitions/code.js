const urlPrefix = "build/dist/";
const url = urlPrefix + "resources/index.html";
const userAPI = urlPrefix + "API/identity/user/";

given("API call response for {string} is mocked", (apiType) => {
    switch (apiType) {
        case "user creation should not be called":
            cy.route({
                method: "POST",
                url: userAPI,
                onRequest: () => {
                    throw new Error("This should have not been called");
                }
            });
            break;
        case "401 response":
            createRouteWithEmptyResponseAndStatus(401);
            break;
        case "403 response":
            createRouteWithEmptyResponseAndStatus(403);
            break;
        case "500 response":
            createRouteWithEmptyResponseAndStatus(500);
            break;
        case "user created":
            cy.fixture("json/userCreatedResponse.json").as("userCreated");
            cy.route({
                method: "POST",
                url: userAPI,
                response: "@userCreated"
            }).as("userCreatedRoute");
            break;
        case "user created after delay":
            cy.fixture("json/userCreatedResponse.json").as("userCreated");
            cy.route({
                method: "POST",
                url: userAPI,
                delay: 5000,
                response: "@userCreated"
            }).as("userCreatedRoute");
            break;
        default:
            throw new Error("Case not supported");
    }

    function createRouteWithEmptyResponseAndStatus(status) {
        cy.fixture("json/emptyResponse.json").as("emptyResponse");
        cy.route({
            method: "POST",
            url: userAPI,
            response: "@emptyResponse",
            status: status
        });
    }
});

given("The server is started", () => {
    cy.server();
});

when("I visit the index page", () => {
    cy.visit(url);
});

when("The {string} input is filled", (inputName) => {
    switch (inputName) {
        case "username":
            cy.get("input").eq(0).type("walter.bates");
            break;
        case "password":
            cy.get("input").eq(1).type("bpm");
            break;
        case "confirm password":
            cy.get("input").eq(2).type("bpm");
            break;
        case "firstname":
            cy.get("input").eq(3).type("Walter");
            break;
        case "lastname":
            cy.get("input").eq(4).type("Bates");
            break;
        default:
            throw new Error("Case is not supported");
    }
});

when("All inputs are filled", () => {
    cy.get("input").eq(0).type("walter.bates");
    cy.get("input").eq(1).type("bpm");
    cy.get("input").eq(2).type("bpm");
    cy.get("input").eq(3).type("Walter");
    cy.get("input").eq(4).type("Bates");
});

when("Input {string} is cleared", (inputCount) => {
    cy.get("input").eq(inputCount - 1).clear();
});

when("I modify the password field", () => {
    cy.get("input").eq(1).type("incorrect");
});

when("I try to create the user", () => {
    cy.contains("button", "Create").click();
});

when("I wait for {int} delay", (time) => {
    cy.wait(time);
});

then("The create button is {string}", (state) => {
    cy.contains("button", "Create").should("be." + state);
});

then("The loader is shown", () => {
    cy.get(".glyphicon.glyphicon-cog.gly-spin").should("be.visible");
    cy.contains("p", "Creating user.").should("be.visible");
});

then("The loader is not shown", () => {
    cy.get(".glyphicon.glyphicon-cog.gly-spin").should("not.be.visible");
    cy.contains("p", "Creating user.").should("not.be.visible");

});

then("I see the message about {string}", (message) => {
    cy.contains("p", message).should("be.visible");
});

then("I don't see the message about {string}", (message) => {
    cy.contains("p", message).should("not.be.visible");
});
