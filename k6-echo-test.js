// Auto-generated by the postman-to-k6 converter

import "./libs/shim/core.js";
import URI from "./libs/urijs.js";
import { group } from "k6";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options
});

export default function() {
  group("Auth: Digest", function() {
    postman[Request]({
      name: "DigestAuth Request",
      id: "d94adf6c-13cf-4cb3-8702-0015e86cb398",
      method: "GET",
      address: "https://postman-echo.com/digest-auth",
      data: {
        code: "xWnkliVQJURqB2x1",
        grant_type: "authorization_code",
        redirect_uri: "https://www.getpostman.com/oauth2/callback",
        client_id: "abc123",
        client_secret: "ssh-secret"
      },
      post(response) {
        tests["response code is 401"] = responseCode.code === 401;
        tests[
          "response has WWW-Authenticate header"
        ] = postman.getResponseHeader("WWW-Authenticate");

        var authenticateHeader = postman.getResponseHeader("WWW-Authenticate"),
          realmStart =
            authenticateHeader.indexOf(
              '"',
              authenticateHeader.indexOf("realm")
            ) + 1,
          realmEnd = authenticateHeader.indexOf('"', realmStart),
          realm = authenticateHeader.slice(realmStart, realmEnd),
          nonceStart =
            authenticateHeader.indexOf(
              '"',
              authenticateHeader.indexOf("nonce")
            ) + 1,
          nonceEnd = authenticateHeader.indexOf('"', nonceStart),
          nonce = authenticateHeader.slice(nonceStart, nonceEnd);

        postman.setGlobalVariable("echo_digest_realm", realm);
        postman.setGlobalVariable("echo_digest_nonce", nonce);
      }
    });

    postman[Request]({
      name: "DigestAuth Success",
      id: "dfc5e581-8c19-4999-84e5-1636fedf51cd",
      method: "GET",
      address: "https://postman-echo.com/digest-auth",
      data: {},
      headers: {
        Authorization:
          'Digest username="postman", realm="Users", nonce="ni1LiL0O37PRRhofWdCLmwFsnEtH1lew", uri="/digest-auth", response="254679099562cf07df9b6f5d8d15db44", opaque=""'
      },
      post(response) {
        tests["response code is 200"] = responseCode.code === 200;
        tests["body contains authenticated"] = responseBody.has(
          "authenticated"
        );
      },
      auth(config, Var) {
        const address = new URI(config.address);
        address.username("postman");
        address.password("password");
        config.address = address.toString();
        config.options.auth = "digest";
      }
    });
  });

  group("Auth: Others", function() {
    postman[Request]({
      name: "Basic Auth",
      id: "eb3d0a88-49e7-4087-95f5-db243634016e",
      method: "GET",
      address: "https://postman-echo.com/basic-auth",
      data: {},
      headers: {
        Authorization: "Basic cG9zdG1hbjpwYXNzd29yZA=="
      },
      post(response) {
        tests["response code is 200"] = responseCode.code === 200;
        tests["Body contains authenticated"] = responseBody.has(
          "authenticated"
        );
      },
      auth(config, Var) {
        const address = new URI(config.address);
        address.username("postman");
        address.password("password");
        config.address = address.toString();
        config.options.auth = "basic";
      }
    });
  });

  group("Cookies", function() {
    postman[Request]({
      name: "Set Cookies",
      id: "fe8b4b12-f7a3-497d-8403-f6ffe232fde7",
      method: "GET",
      address: "https://postman-echo.com/cookies/set?foo1=bar1&foo2=bar2",
      data: {},
      post(response) {
        tests["Status code is 200"] = responseCode.code === 200;
        tests["Body contains cookies"] = responseBody.has("cookies");
        var body = JSON.parse(responseBody);
        tests["Body contains cookie foo1"] = "foo1" in body.cookies;
        tests["Body contains cookie foo2"] = "foo2" in body.cookies;
      }
    });

    postman[Request]({
      name: "Get Cookies",
      id: "7f05e5b8-4c79-4994-a021-faa877eb69fc",
      method: "GET",
      address: "https://postman-echo.com/cookies",
      data: {},
      post(response) {
        tests["Status code is 200"] = responseCode.code === 200;
        tests["Body contains cookies"] = responseBody.has("cookies");
        var body = JSON.parse(responseBody);
        tests["Body contains cookie foo2"] = "foo2" in body.cookies;
      }
    });

    postman[Request]({
      name: "Delete Cookies",
      id: "cf36761d-f3b7-4bb1-bd80-86b3c6acbe62",
      method: "GET",
      address: "https://postman-echo.com/cookies/delete?foo1=",
      data: {},
      post(response) {
        tests["Status code is 200"] = responseCode.code === 200;
        tests["Body contains key cookies"] = responseBody.has("cookies");
        var body = JSON.parse(responseBody);
        tests["Body contains cookie foo2"] = "foo2" in body.cookies;
        tests["Body does not contain cookie foo1"] = !("foo1" in body.cookies);
      }
    });
  });

  group("Headers", function() {
    postman[Request]({
      name: "Request Headers",
      id: "80bcb291-5730-4822-8035-1de13a2f7aa5",
      method: "GET",
      address: "https://postman-echo.com/headers",
      data: {},
      headers: {
        "my-sample-header": "test"
      },
      post(response) {
        tests["Body contains headers"] = responseBody.has("headers");

        var data = JSON.parse(responseBody).headers;

        tests["Header contains host"] = "host" in data;
        tests["Header contains test parameter sent as part of request header"] =
          "my-sample-header" in data;
      }
    });

    postman[Request]({
      name: "Response Headers",
      id: "75affe12-2c4a-4a6a-9fe6-bc0f4b4b38fa",
      method: "GET",
      address:
        "https://postman-echo.com/response-headers?Content-Type=text/html&Server=apibin",
      data: {
        code: "xWnkliVQJURqB2x1",
        grant_type: "authorization_code",
        redirect_uri: "https://www.getpostman.com/oauth2/callback",
        client_id: "abc123",
        client_secret: "ssh-secret"
      },
      post(response) {
        tests["Body contains Content-Type"] = responseBody.has("Content-Type");
        tests["Body contains Server"] = responseBody.has("Server");
      }
    });
  });

  group("Request Methods", function() {
    postman[Request]({
      name: "GET Request ",
      id: "94c83dec-80ee-435f-8201-7345c08398d4",
      method: "GET",
      address: "https://postman-echo.com/get?test=123",
      data: {
        code: "xWnkliVQJURqB2x1",
        grant_type: "authorization_code",
        redirect_uri: "https://www.getpostman.com/oauth2/callback",
        client_id: "abc123",
        client_secret: "ssh-secret"
      },
      post(response) {
        tests["Body contains headers"] = responseBody.has("headers");
        tests["Body contains args"] = responseBody.has("args");
        tests["Body contains url"] = responseBody.has("url");

        var data = JSON.parse(responseBody);

        tests["Args key contains argument passed as url parameter"] =
          "test" in data.args;
      }
    });

    postman[Request]({
      name: "POST Request",
      id: "30eb0cfc-cd44-4529-b2e9-60f326a34d48",
      method: "POST",
      address: "https://postman-echo.com/post",
      data:
        "Duis posuere augue vel cursus pharetra. In luctus a ex nec pretium. Praesent neque quam, tincidunt nec leo eget, rutrum vehicula magna.\nMaecenas consequat elementum elit, id semper sem tristique et. Integer pulvinar enim quis consectetur interdum volutpat.",
      headers: {
        "Content-Type": "text/plain"
      },
      post(response) {
        var responseJSON;

        try {
          responseJSON = JSON.parse(responseBody);
        } catch (e) {}

        tests["response has data"] =
          responseJSON && responseJSON.data && responseJSON.data.length === 256;
        tests["content-type equals text/plain"] =
          responseJSON &&
          responseJSON.headers &&
          responseJSON.headers["content-type"] === "text/plain";
      }
    });

    postman[Request]({
      name: "PUT Request",
      id: "71fa75ee-177a-47ab-adf2-5eff0b5b1eef",
      method: "PUT",
      address: "https://postman-echo.com/put",
      data:
        "Etiam mi lacus, cursus vitae felis et, blandit pellentesque neque. Vestibulum eget nisi a tortor commodo dignissim.\nQuisque ipsum ligula, faucibus a felis a, commodo elementum nisl. Mauris vulputate sapien et tincidunt viverra. Donec vitae velit nec metus.",
      headers: {
        "Content-Type": "text/plain"
      },
      post(response) {
        var responseJSON;

        try {
          responseJSON = JSON.parse(responseBody);
        } catch (e) {}

        tests["Body contains files"] = responseBody.has("files");
        tests["Body contains args"] = responseBody.has("args");
        tests["Body contains form"] = responseBody.has("form");
        tests["Body contains headers"] = responseBody.has("headers");
        tests["Body contains url"] = responseBody.has("url");

        tests["Data has been passed"] =
          responseJSON && responseJSON.data && responseJSON.data.length;
      }
    });

    postman[Request]({
      name: "PATCH Request",
      id: "5b4064c3-e708-44b6-a891-20db5a7609ae",
      method: "PATCH",
      address: "https://postman-echo.com/patch",
      data: "test",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      post(response) {
        tests["Body contains files"] = responseBody.has("files");
        tests["Body contains args"] = responseBody.has("args");
        tests["Body contains form"] = responseBody.has("form");
        tests["Body contains headers"] = responseBody.has("headers");
        tests["Body contains url"] = responseBody.has("url");

        var data = JSON.parse(responseBody);

        tests["form key has data passed in as form-data"] = "test" in data.form;
      }
    });

    postman[Request]({
      name: "DELETE Request",
      id: "1109d540-958a-4885-b2a8-a2d5b8b7d8be",
      method: "DELETE",
      address: "https://postman-echo.com/delete",
      data: "test",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      post(response) {
        tests["Body contains files"] = responseBody.has("files");
        tests["Body contains args"] = responseBody.has("args");
        tests["Body contains form"] = responseBody.has("form");
        tests["Body contains headers"] = responseBody.has("headers");
        tests["Body contains url"] = responseBody.has("url");

        var data = JSON.parse(responseBody);

        tests["form key has data passed in as form-data"] = "test" in data.form;
      }
    });
  });

  group("Utilities", function() {
    postman[Request]({
      name: "Response Status Code",
      id: "63c1d1f2-c018-4dac-a373-fc81ae590ad4",
      method: "GET",
      address: "https://postman-echo.com/status/200",
      data: {
        test: "123"
      },
      post(response) {
        tests["Body contains status"] = responseBody.has("status");

        var data = JSON.parse(responseBody);

        tests["Status equals 200"] = data.status === 200;
      }
    });

    postman[Request]({
      name: "Streamed Response",
      id: "94694536-9e6d-4dc5-a250-ac2fcb109dad",
      method: "GET",
      address: "https://postman-echo.com/stream/10",
      data: {},
      post(response) {
        tests["response code is 200"] = responseCode.code === 200;
      }
    });

    postman[Request]({
      name: "Delay Response",
      id: "21294b86-d464-481d-b728-d1cd29737692",
      method: "GET",
      address: "https://postman-echo.com/delay/3",
      data: {
        test: "123"
      },
      post(response) {
        tests["response code is 200"] = responseCode.code === 200;

        var data = JSON.parse(responseBody);

        tests["response body has key delay"] = "delay" in data;
      }
    });

    postman[Request]({
      name: "Get UTF8 Encoded Response",
      id: "b9e07fd3-7f5a-4e4a-83fe-881d9d09d893",
      method: "GET",
      address: "https://postman-echo.com/encoding/utf8",
      data: {},
      post(response) {
        tests["response code is 200"] = responseCode.code === 200;
      }
    });

    postman[Request]({
      name: "GZip Compressed Response",
      id: "b0fa102b-3c0b-4220-a3c6-c2f0f2fa8d5c",
      method: "GET",
      address: "https://postman-echo.com/gzip",
      data: {
        code: "xWnkliVQJURqB2x1",
        grant_type: "authorization_code",
        redirect_uri: "https://www.getpostman.com/oauth2/callback",
        client_id: "abc123",
        client_secret: "ssh-secret"
      },
      post(response) {
        tests["response code is 200"] = responseCode.code === 200;

        try {
          var data = JSON.parse(responseBody);
          tests["Body contains gzipped"] = responseBody.has("gzipped");
          tests["Body contains headers"] = responseBody.has("headers");
          tests["Body contains method"] = responseBody.has("method");
        } catch (e) {
          console.log("Cannot parse response,probably not a JSON");
        }
      }
    });

    postman[Request]({
      name: "Deflate Compressed Response",
      id: "0cf4f9d5-b231-4d2d-b23a-60c14f36b503",
      method: "GET",
      address: "https://postman-echo.com/deflate",
      data: {},
      post(response) {
        tests["response code is 200"] = responseCode.code === 200;

        try {
          var data = JSON.parse(responseBody);
          tests["Body contains deflated"] = responseBody.has("deflated");
          tests["Body contains headers"] = responseBody.has("headers");
          tests["Body contains method"] = responseBody.has("method");
        } catch (e) {
          console.log("Cannot parse response,probably not a JSON");
        }
      }
    });
  });
}
