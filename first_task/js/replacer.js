(() => {
  function testReplacer() {
    console.log("Тестирование собственного Custom_JSON.stringify с replacer и без space: \n\n");

    function firstReplacer(key, value) {
      if (key === 'age') {
        return;
      }

      return value;
    }

    function secondReplacer() {
      return [];
    }

    const thirdReplacer = ['age', 'hobbies', 'name', 'address'];

    console.log("\t\tСлучай № 1 value - это объект:\n");

    const obj = {
      address: {
        street: "123 Main St",
        city: "Anytown",
        age: 30,
        someObj: {
          someValue: 86,
          age: 30
        }
      },
      name: "John Doe",
      age: 30,
      hobbies: ["reading", "gaming", { age: 30, b: 40 }, [
        "JavaScript", "C#", { age: 30, amount: true }
      ]]
    };

    console.log("\t\t\tТест № 1 - firstReplacer:\n");
    testLogger(obj, firstReplacer, null);

    console.log("\t\t\tТест № 2 - secondReplacer:\n");
    testLogger(obj, secondReplacer, null);

    console.log("\t\t\tТест № 3 - thirdReplacer:\n");
    testLogger(obj, thirdReplacer, null);


    console.log("\t\tСлучай № 2 value - это массив:\n");

    const arr = [true, 1, "Hello World!", { age: 40, name: "Bill" }];

    console.log("\t\t\tТест № 1 - firstReplacer:\n");
    testLogger(arr, firstReplacer, null);

    console.log("\t\t\tТест № 2 - secondReplacer:\n");
    testLogger(arr, secondReplacer, null);

    console.log("\t\t\tТест № 3 - thirdReplacer:\n");
    testLogger(arr, thirdReplacer, null);


    console.log("\t\tСлучай № 3 value - это число:\n");

    const num = 13;

    console.log("\t\t\tТест № 1 - firstReplacer:\n");
    testLogger(num, firstReplacer, null);

    console.log("\t\t\tТест № 2 - secondReplacer:\n");
    testLogger(num, secondReplacer, null);

    console.log("\t\t\tТест № 3 - thirdReplacer:\n");
    testLogger(num, thirdReplacer, null);


    console.log("\t\tСлучай № 4 value - это строка:\n");

    const str = "Hello World! age name"

    console.log("\t\t\tТест № 1 - firstReplacer:\n");
    testLogger(str, firstReplacer, null);

    console.log("\t\t\tТест № 2 - secondReplacer:\n");
    testLogger(str, secondReplacer, null);

    console.log("\t\t\tТест № 3 - thirdReplacer:\n");
    testLogger(str, thirdReplacer, null);

    function testLogger(value, replacer, space) {
      let wrap = '';
      if (typeof value === 'object' && value && space) {
        wrap = '\n';
      }

      try {
        console.log("\t\t\t\treplacer: ", replacer);
        console.log("\t\t\t\tvalue: ", value);
        console.log("\t\t\t\ttypeof value: ", typeof value);
        console.log(`\n\t\t\t\tJSON.stringify(value): ${wrap}`, wrap + JSON.stringify(value, replacer, space));
        console.log("\t\t\t\ttypeof JSON.stringify(value): ", typeof JSON.stringify(value, replacer, space));
        console.log(`\n\t\t\t\tCustom_JSON.stringify(value): ${wrap}`, wrap + CUSTOM_JSON.stringify(value, replacer, space));
        console.log("\t\t\t\ttypeof Custom_JSON.stringify(value): ", typeof CUSTOM_JSON.stringify(value, replacer, space));
        console.log(
          "\n\t\t\t\tJSON.stringify(value) === Custom_JSON.stringify(value): ",
          JSON.stringify(value, replacer, space) === CUSTOM_JSON.stringify(value, replacer, space)
        );
        console.log(
          "\t\t\t\ttypeof JSON.stringify(value) === typeof Custom_JSON.stringify(value): ",
          typeof JSON.stringify(value, replacer, space) === typeof CUSTOM_JSON.stringify(value, replacer, space)
        );
      }
      catch (err) {
        console.log(err);
      }

      console.log('\t-------------------------------------------------------------------------------------');
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    testReplacer();
  })
})();
