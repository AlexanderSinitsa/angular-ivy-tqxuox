# Angular Test (lazy loading + infinilt scroll)

The text of each field should come from the server and the application should send a request to the server only when the element becomes visible on the screen.
In this example, we use the fetch service to simulate sending a request to the server.
The Box component should receive and display the result of the fetch service.

Rules:
1- Do not change the codes of the box component and the fetch service. However, you can create any new files (component, directive, pipe, service, utils or ...).
1- Call the fetch method only when the element is visible on the screen.
2- The box component should be rendered only when the value is ready from the server.
4- Try to implement everything reusable as much as possible (for example, if you need to create a component, create it so that we can use it in other parts of the application too).

If you have any questions, please send me an email (milad.faghihi@fourpanels.net)
