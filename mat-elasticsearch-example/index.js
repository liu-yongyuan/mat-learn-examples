import { elsClient } from "./search.cjs";

async function moduleCache() {
  // init();

  console.log(elsClient !== null);
}

moduleCache();
