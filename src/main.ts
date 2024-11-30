import { setupCounter } from "./counter.ts"

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="bg-red-500">
    <h1 class="bg-red-200">Hello</h1>
    lorem
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!)
