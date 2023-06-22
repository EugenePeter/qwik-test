import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { getHostTheme } from "../utils";
// import Hero from "~/components/starter/hero/hero";
// import Starter from "~/components/starter/next-steps/next-steps";
import { server$, routeLoader$, routeAction$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";

// By wrapping a function with `server$()` we mark it to always
// execute on the server. This is a form of RPC mechanism.
const serverGreeter = server$((firstName: string, lastName: string) => {
  const greeting = `Hello ${firstName} ${lastName}`;
  console.log("Prints in the server", greeting);
  return greeting;
});

// export const onGet: RequestHandler = server$(async ({ cacheControl }) => {
//   cacheControl({
//     public: true,
//     maxAge: 500,
//     sMaxAge: 10,
//     staleWhileRevalidate: 60 * 60 * 24 * 365,
//   });

//   const result = await getHostTheme("localhost:3000");
//   console.log("ON GET HOOOOOOOOOOOST:", result);
//   // cacheControl({
//   //   // Always serve a cached response by default, up to a week stale
//   //   staleWhileRevalidate: 60 * 60 * 24 * 7,
//   //   // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
//   //   maxAge: 5,
//   // });
// });

export const useProductDetails = routeLoader$(async (requestEvent) => {
  // This code runs only on the server, after every navigation
  requestEvent.cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 31536000,
    public: true,
  });

  const result = await getHostTheme("localhost:3000");
  console.log("useProductDetails:");

  return new Promise((resolve) => {
    return setTimeout(() => {
      resolve(result);
    }, 6000);
  });
  // return result;
  // const data = await fetch("https://jsonplaceholder.typicode.com/todos/1").then(
  //   (response) => response.json()
  // );
  // // .then((json) => console.log("useProductDetails:", json));
  // // console.log("DATA DATA:", data);
  // return data;
  // return product as any;
});

export const useAddUser = routeAction$(async (data, requestEvent) => {
  console.log("ADD USER INVOKED");

  // This will only run on the server when the user submits the form (or when the action is called programmatically)
  const userID = await data;
  return {
    success: true,
    userID,
  };
});
export default component$(() => {
  const firstName = useSignal("eugene");
  const lastName = useSignal("peter");
  const signal = useProductDetails(); // Readonly<Signal<Product>>
  const action = useAddUser();
  console.log("I AM RERENDERING");
  return (
    <>
      <p>{JSON.stringify(signal.value)}</p>
      {/* <p>Product name: {signal.value.title}</p> */}
      <div class="container container-center container-spacing-xl">
        <button
          onClick$={async () => {
            const greeting = await serverGreeter(
              firstName.value,
              lastName.value
            );
            // console.log("greeting", greeting);
          }}
        >
          greet
        </button>
        <button
          onClick$={async () => {
            await action.submit({ name: "Jennifer" });
          }}
        >
          Add user
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
