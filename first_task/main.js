(() => {
  function main() {
    console.log("Тестирование собственного Custom_JSON.stringify без replacer и space: \n\n");
    

    console.log("\t\tТест № 1 - type number:\n");

    console.log("\t\t1.1) integer:");
    const intNum = 23;
    testLogger(intNum);

    console.log("\t\t1.2) float:");
    const floatNum = 23.4;
    testLogger(floatNum);

    console.log("\t\t1.2) negative:");
    const negNum = -23;
    testLogger(negNum);

    console.log("\t\t1.3) Infinity:");
    const inf = Infinity;
    testLogger(inf);

    console.log("\t\t\t1.4) NaN:");
    const nan = NaN;
    testLogger(nan);

    console.log("\t\t\t1.5) Число в другой системе счисления (двоичная - const bin = 0b1001):");
    const bin = 0b1001;
    testLogger(bin);


    console.log("\t\tТест № 2 - type bigint:");
    const bgInt = 1234567890123456789012345678901234567890n;
    testLogger(bgInt);
    try {
      console.log("\n\t\t\tCustom_JSON.stringify(value): ", CUSTOM_JSON.stringify(bgInt));
    }
    catch (err) {
      console.log(err);
      console.log('\t-------------------------------------------------------------------------------------');
    }

    console.log("\t\tТест № 3 - type boolean:");
    const bool = true;
    testLogger(bool);

    console.log("\t\tТест № 4 - type symbol:");
    const sym = Symbol(123);
    testLogger(sym);

    console.log("\t\tТест № 5 - type string:");
    const str = 'Hello World!';
    testLogger(str);

    console.log("\t\tТест № 6 - type null:");
    const nl = null;
    testLogger(nl);

    console.log("\t\tТест № 7 - type undefined:");
    const und = undefined;
    testLogger(und);

    console.log("\t\tТест № 8 - type object:");

    console.log("\t\t\t8.1) object:");
    const obj = {
      name: "Bogdan",
      surname: "Nozdryakov",
      lastName: "Valerievich",
      university: "ITMO",
      age: 21,
      adult: true,
      dateOfBirth: new Date('2002-12-29'),
      hobby: {
        sport: {
          type: "football",
          team: "Barcelona",
          player: "Messi",
          playerNumber: 10
        },
        favoriteBook: "The Lord of the Rings: The Fellowship of the Ring",
      },

      contacts: [
        {
          type: "phone",
          value: "+7 982 408 31 75"
        },
        {
          type: "email",
          value: "voyagerbvb@gmail.com"
        }
      ],

      getFullName() {
        return `${this.surname} ${this.name} ${this.lastName}`;
      }
    };

    testLogger(obj);

    console.log("\t\t\t8.2) array:");
    const arr = [{
      someObj: {
        someArr: [1, "C#", {
          key: new Date()
        }]
      },
      amount: 2,
      toyArr: [false, "JavaScript"]
    }, true, 'Hello World!'];

    testLogger(arr);

    console.log("\t\t\t8.3) function:");
    function swap(firstIndex, secondIndex, arr) {
      const memory = arr[firstIndex];
      arr[firstIndex] = arr[secondIndex];
      arr[secondIndex] = memory;
    }

    testLogger(swap);

    console.log("\t\t\t8.4) Date:");
    const date = new Date();
    testLogger(date);

    console.log("\t\t\t8.5) RegExp:");
    const regExp = new RegExp("^(100|[1-9][0-9]{2})$");
    testLogger(regExp);

    console.log("\t\t\t8.6) Error:");
    const err = new Error("Some Error!");
    testLogger(err);

    console.log("\t\t\t8.7) Uint8Array:");
    const typedArray = new Uint8Array([1, true, "JS", [2, 3, 'C++']]);
    testLogger(typedArray);

    console.log("\t\tТест № 9 - type class:");
    console.log("\t\t\t9.1) class Human:");
    class Human {
      constructor(fullName, age) {
        this.fullName = fullName;
        this.age = age;
      }

      getFullName() {
        return this.fullName;
      }

      getAge() {
        return this.age;
      }
    }

    testLogger(Human);

    console.log("\t\t\t9.2) new Human:");
    testLogger(new Human("Bogdan", 21));


    function testLogger(value) {
      try {
        console.log("\t\t\tvalue: ", value);
        console.log("\t\t\ttypeof value: ", typeof value);
        console.log("\n\t\t\tJSON.stringify(value): ", JSON.stringify(value));
        console.log("\t\t\ttypeof JSON.stringify(value): ", typeof JSON.stringify(value));
        console.log("\n\t\t\tCustom_JSON.stringify(value): ", CUSTOM_JSON.stringify(value));
        console.log("\t\t\ttypeof Custom_JSON.stringify(value): ", typeof CUSTOM_JSON.stringify(value));
        console.log(
          "\n\t\t\tJSON.stringify(value) === Custom_JSON.stringify(value): ",
          JSON.stringify(value) === CUSTOM_JSON.stringify(value)
        );
        console.log(
          "\t\t\ttypeof JSON.stringify(value) === typeof Custom_JSON.stringify(value): ",
          typeof JSON.stringify(value) === typeof CUSTOM_JSON.stringify(value)
        );

        console.log('\t-------------------------------------------------------------------------------------');
      }
      catch (err) {
        console.log(err);
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    main();
  })
})();
