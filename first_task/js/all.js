(() => {
  function testAll() {
    console.log("Тестирование собственного Custom_JSON.stringify с replacer и со space: \n\n");

    function replacer(key, value) {
      return value;
    }

    console.log("\t\tТест № 1 - type number:\n");

    const num = 23;
    testLogger(num, replacer, 4);

    console.log("\t\tТест № 2 - type string:");
    const str = 'Hello World!';
    testLogger(str, replacer, 3);

    console.log("\t\tТест № 3 - type object:");

    console.log("\t\t\t3.1) object:");
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

    testLogger(obj, replacer, 5);

    console.log("\t\t\t3.2) array:");
    const arr = [{
      someObj: {
        someArr: [1, "C#", {
          key: new Date()
        }]
      },
      amount: 2,
      toyArr: [false, "JavaScript"]
    }, true, 'Hello World!'];

    testLogger(arr, replacer, 3);

    function testLogger(value, replacer, space) {
      let wrap = '';
      if (typeof value === 'object' && value && space) {
        wrap = '\n';
      }

      try {
        console.log("\t\t\treplacer: ", replacer);
        console.log("\t\t\tspace ", space);
        console.log("\t\t\tvalue: ", value);
        console.log("\t\t\ttypeof value: ", typeof value);
        console.log(`\n\t\t\tJSON.stringify(value): ${wrap}`, wrap + JSON.stringify(value, replacer, space));
        console.log("\t\t\ttypeof JSON.stringify(value): ", typeof JSON.stringify(value, replacer, space));
        console.log(`\n\t\t\tCustom_JSON.stringify(value): ${wrap}`, wrap + CUSTOM_JSON.stringify(value, replacer, space));
        console.log("\t\t\ttypeof Custom_JSON.stringify(value): ", typeof CUSTOM_JSON.stringify(value, replacer, space));
        console.log(
          "\n\t\t\tJSON.stringify(value) === Custom_JSON.stringify(value): ",
          JSON.stringify(value, replacer, space) === CUSTOM_JSON.stringify(value, replacer, space)
        );
        console.log(
          "\t\t\ttypeof JSON.stringify(value) === typeof Custom_JSON.stringify(value): ",
          typeof JSON.stringify(value, replacer, space) === typeof CUSTOM_JSON.stringify(value, replacer, space)
        );

        console.log('\t-------------------------------------------------------------------------------------');
      }
      catch (err) {
        console.log(err);
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    testAll();
  })
})();
