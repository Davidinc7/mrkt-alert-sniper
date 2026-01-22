console.log("BOOT OK");

async function test() {
  const res = await fetch(`https://api.telegram.org/bot${process.env.TG_TOKEN}/getMe`);
  const data = await res.json();
  console.log("GET ME RESULT:", data);
}

test();
