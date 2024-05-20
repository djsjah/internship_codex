(() => {
  function testException() {
    console.log("Тестирование собственного Custom_JSON.stringify (Исключение циклической ссылки): \n\n");

    const obj = {
      name: "John Doe",
      age: 30,
      adult: true
    };

    const arr = [1, true, "Hello World!", { age: 12 }];

    obj.owner = obj;
    arr[3].someArr = arr;

    function firstReplacer(key, value) {
      return value;
    }

    function thirdReplacer(key, value) {
      if (key === 'adult' || key === 'age' || key === 'owner') {
        return value;
      }

      return;
    }

    function fourthReplacer(key, value) {
      if (key === 'adult') {
        return;
      }

      return value;
    }

    const secondReplacer = ["age", "adult"];

    console.log('\t\tТесты для объекта: ', obj);

    console.log("\t\t\tТест № 1 - JSON.stringify():\n");
    testLoggerStandard(obj, null, 3);

    console.log("\t\t\tТест № 1 - CUSTOM_JSON.stringify():\n");
    testLoggerCustom(obj, null, 3);

    console.log("\t\t\tТест № 2 - JSON.stringify():\n");
    testLoggerStandard(obj, firstReplacer);

    console.log("\t\t\tТест № 2 - CUSTOM_JSON.stringify():\n");
    testLoggerCustom(obj, firstReplacer);

    console.log("\t\t\tТест № 3 - JSON.stringify():\n");
    testLoggerStandard(obj, secondReplacer, 5);

    console.log("\t\t\tТест № 3 - CUSTOM_JSON.stringify():\n");
    testLoggerCustom(obj, secondReplacer, 5);

    console.log("\t\t\tТест № 4 - JSON.stringify():\n");
    testLoggerStandard(obj, thirdReplacer);

    console.log("\t\t\tТест № 4 - CUSTOM_JSON.stringify():\n");
    testLoggerCustom(obj, thirdReplacer);

    console.log("\t\t\tТест № 5 - JSON.stringify():\n");
    testLoggerStandard(obj, fourthReplacer);

    console.log("\t\t\tТест № 5 - CUSTOM_JSON.stringify():\n");
    testLoggerCustom(obj, fourthReplacer);


    console.log('\t\tТесты для массива: ', arr);

    console.log("\t\t\tТест № 1 - JSON.stringify():\n");
    testLoggerStandard(arr, null, 3);

    console.log("\t\t\tТест № 1 - CUSTOM_JSON.stringify():\n");
    testLoggerCustom(arr, null, 3);

    console.log("\t\t\tТест № 2 - JSON.stringify():\n");
    testLoggerStandard(arr, firstReplacer);

    console.log("\t\t\tТест № 2 - CUSTOM_JSON.stringify():\n");
    testLoggerCustom(arr, firstReplacer);

    console.log("\t\t\tТест № 3 - JSON.stringify():\n");
    testLoggerStandard(arr, secondReplacer, 5);

    console.log("\t\t\tТест № 3 - CUSTOM_JSON.stringify():\n");
    testLoggerCustom(arr, secondReplacer, 5);

    console.log("\t\t\tТест № 4 - JSON.stringify():\n");
    testLoggerStandard(arr, thirdReplacer);

    console.log("\t\t\tТест № 4 - CUSTOM_JSON.stringify():\n");
    testLoggerCustom(arr, thirdReplacer);

    console.log("\t\t\tТест № 5 - JSON.stringify():\n");
    testLoggerStandard(arr, fourthReplacer);

    console.log("\t\t\tТест № 5 - CUSTOM_JSON.stringify():\n");
    testLoggerCustom(arr, fourthReplacer);

    function testLoggerStandard(value, replacer, space) {
      let wrap = '';
      if (typeof value === 'object' && value && space) {
        wrap = '\n';
      }

      try {
        console.log("\t\t\t\treplacer: ", replacer);
        console.log("\t\t\t\tspace: ", space);
        console.log("\t\t\t\tvalue: ", value);
        console.log("\t\t\t\ttypeof value: ", typeof value);
        console.log(`\n\t\t\t\tJSON.stringify(value): ${wrap}`, wrap + JSON.stringify(value, replacer, space));
        console.log("\t\t\t\ttypeof JSON.stringify(value): ", typeof JSON.stringify(value, replacer, space));
      }
      catch (err) {
        console.log("\t\t\t\tJSON.stringify() error: ", err);
        console.log('');
      }
    }
  }

  function testLoggerCustom(value, replacer, space) {
    let wrap = '';
    if (typeof value === 'object' && value && space) {
      wrap = '\n';
    }

    try {
      console.log("\t\t\t\treplacer: ", replacer);
      console.log("\t\t\t\tspace: ", space);
      console.log("\t\t\t\tvalue: ", value);
      console.log("\t\t\t\ttypeof value: ", typeof value);
      console.log(`\n\t\t\t\tCustom_JSON.stringify(value): ${wrap}`, wrap + CUSTOM_JSON.stringify(value, replacer, space));
      console.log("\t\t\t\ttypeof Custom_JSON.stringify(value): ", typeof CUSTOM_JSON.stringify(value, replacer, space));
    }
    catch (err) {
      console.log("\t\t\t\tCUSTOM_JSON.stringify() error: ", err);
      console.log('');
    }

    console.log('\t-------------------------------------------------------------------------------------');
  }

  document.addEventListener('DOMContentLoaded', () => {
    testException();
  })
})();
