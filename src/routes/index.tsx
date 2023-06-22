import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { getHostTheme } from "../utils";
import { server$, routeLoader$, routeAction$ } from "@builder.io/qwik-city";

const serverGreeter = server$((firstName: string, lastName: string) => {
  const greeting = `Hello ${firstName} ${lastName}`;
  console.log("Prints in the server", greeting);
  return greeting;
});

export const useProductDetails = routeLoader$(async (requestEvent) => {
  // This code runs only on the server, after every navigation
  requestEvent.cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 31536000,
    public: true,
  });
  // Everytime Add user button is clicked routeLoader$ runs
  // Notice cache control above, cache is not added, and the API below is always called when routeLoader$ is invoked
  // Cache is missed every single time
  const result = await getHostTheme("localhost:3000");
  console.log("useProductDetails:");

  return new Promise((resolve) => {
    return setTimeout(() => {
      resolve(result);
    }, 6000);
  });
});

export const useAddUser = routeAction$(async (data) => {
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
      <div class="container container-center container-spacing-xl">
        <button
          onClick$={async () => {
            await serverGreeter(firstName.value, lastName.value);
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
