import * as elements from "typed-html";

const BaseHtml = ({ children }: elements.Children) => {
  return (
    "<!DOCTYPE html>" +
    (
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>DMS</title>
          <link href="/index.css" rel="stylesheet" />
          <link href="/favicon.png" rel="icon" type="image/x-icon" />
        </head>
        <body class="min-vh-100">{children}</body>
        <script
          src="https://unpkg.com/htmx.org@1.9.6"
          integrity="sha384-FhXw7b6AlE/jyjlZH5iHa/tTe9EpJ1Y55RjcgPbjeWMskSxZt1v9qkxLJWNJaGni"
          crossorigin="anonymous"
        />
        <script src="https://unpkg.com/hyperscript.org@0.9.11" />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
          crossorigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
        />
      </html>
    )
  );
};

export default BaseHtml;
