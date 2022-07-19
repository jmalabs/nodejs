const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(a + b);
    }, 2000);
  });
};

const doWork = async () => {
  const sum = await add(5, 49);
  console.log("sum", sum);
};

const init = async () => {
  doWork();
  console.log("Finished");
};

init();
