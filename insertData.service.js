const data = {
  "account": [
    {
      "balance": 3000.25,
      "email": "user1@test.com",
      "name": "Mr.John Something",
      "type": "Saving"
    },
    {
      "balance": 200.45,
      "email": "user2@test.com",
      "name": "Mr.Jane Hack",
      "type": "Saving"
    },
    {
      "balance": 40000,
      "email": "user3@test.com",
      "name": "Mr.Jack Jak",
      "type": "Saving"
    }
  ],
  "tranfers": [
    {
      "amount": 500,
      "date": "January 31,2023 at 12:23:47 PM UTC+7",
      "from": "Mr.John Something",
      "to": "Mr.Jane Hack"
    },
    {
      "amount": 5000,
      "date": "January 12,2023 at 10:23:47 PM UTC+7",
      "from": "Mr.Jack Jak",
      "to": "Mr.Jane Hack"
    },
    {
      "amount": 100,
      "date": "January 31,2023 at 12:23:47 PM UTC+7",
      "from": "Mr.John Something",
      "to": "Mr.Jack Jak"
    },
    {
      "amount": 400,
      "date": "January 31,2023 at 12:23:47 PM UTC+7",
      "from": "Mr.Jack Jak",
      "to": "Mr.John Something"
    },
    {
      "amount": 1000,
      "date": "January 31,2023 at 12:23:47 PM UTC+7",
      "from": "Mr.John Something",
      "to": "Mr.Jack Jak"
    },
    {
      "amount": 1000,
      "date": "January 31,2023 at 12:23:47 PM UTC+7",
      "from": "Mr.John Something",
      "to": "Mr.Jack Jak"
    },
    {
      "amount": 1000,
      "date": "January 31,2023 at 12:23:47 PM UTC+7",
      "from": "Mr.Jane Hack",
      "to": "Mr.Jack Jak"
    },
    {
      "amount": 2000,
      "date": "January 31,2023 at 12:23:47 PM UTC+7",
      "from": "Mr.John Something",
      "to": "Mr.Jack Jak"
    },
    {
      "amount": 1000,
      "date": "January 3,2023 at 04:00:47 PM UTC+7",
      "from": "Mr.Jane Hack",
      "to": "Mr.Jack Jak"
    },
    {
      "amount": 200,
      "date": "January 1,2023 at 08:23:47 PM UTC+7",
      "from": "Mr.John Something",
      "to": "Mr.Jack Jak"
    }
  ]
}
const { collection, addDoc } = require("firebase/firestore");
async function addData() {

  for (let index = 0; index < data.tranfers.length; index++) {
    const element = data.tranfers[index];

    // try {
    //   const docRef = await addDoc(collection(this.$db, "transfers"), {
    //     amount: element.amount,
    //     date: element.date,
    //     from: element.from,
    //     to: element.to
    //   });

    //   console.log("Document written with ID: ", docRef.id);
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    // }

    // Add a second document with a generated ID.
    db.collection("transfers").add(element)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

  }

  // console.log("Document written with ID: ", docRef.id);
}

addData()



// try {
//   const docRef = await addDoc(collection(db, "users"), {
//     first: "Alan",
//     middle: "Mathison",
//     last: "Turing",
//     born: 1912
//   });

//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }



