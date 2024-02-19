/* ============================== Phase 1 ============================== */
/* -------------------------- exploring async -------------------------- */

// Your code here

function num1() {
    return 1;
}
async function num2() {
    return 2;
}
num2().then(result => console.log(result))
console.log("\n /* ============================== Phase 1 ============================== */\n ")
console.log('num1', num1());
console.log('num2', num2());


/* ============================== Phase 2 ============================== */
/* -------------------------- exploring await -------------------------- */

// Your code here

async function waiting() {
    const value = await num2();
    console.log("\n /* ============================== Phase 2 ============================== */ \n")
    console.log('waiting', value);
}
waiting();



/* ============================== Phase 3 ============================== */
/* --------------------- creating a custom Promise --------------------- */

// Your code here
async function waitForMyPromise() {
    const promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve('done!!!');
        }, 100)
    });
    const result = await promise 
    console.log("\n /* ============================== Phase 3 ============================== */ \n")
    console.log("my promise is", result)
}
waitForMyPromise();


/* ============================== Phase 4 ============================== */
/* -------------------------- exploring then --------------------------- */

// Your code here

new Promise((resolve) => {
    setTimeout(() => {
        resolve('done!');
    }, 150) // changing 150 to lower than 100 will result in phase 4 being before phase 3 
}).then(r => {console.log("\n /* ============================== Phase 4 ============================== */ \n")
                return r;
                })
  .then(r => console.log('then my other promise is', r));



/* ============================== Phase 5 ============================== */
/* ------------------- turn setTimeout into a Promise ------------------ */

// Your code here
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function waitTesting() {
    await wait(200) // changing 200 to lower than 150 or 100 will make the other phases outpace this one;
    console.log("\n /* ============================== Phase 5 ============================== */ \n")
};
async function waitTestingTwo(){
    wait(100);
    await waitTesting();
    console.log("this way we can manipulate the wait time without affecting the flow")
}




/* ============================== Phase 6 ============================== */
/* -------------------- exploring reject and .catch -------------------- */

// Your code here
const tryRandomPromise = (random) => {
    return new Promise((resolve, reject)=> {
        if(random > 0.5) {
            resolve("sucess!!!");
        }
        else {
            reject("random error")
        }


    });
   
    }
    async function printingThePhaseSix() {
    await waitTestingTwo()  
    console.log("\n /* ============================== Phase 6 ============================== */ \n")
}

    async function tryingRandomPromises() {
     await printingThePhaseSix();

        const promises = [];
    for(let i = 1; i < 10; i++){
        const random = Math.random();
       
        /* await */
            const promise =  wait(2000 + random * 1000)
            .then(()=> tryRandomPromise((random)))
            .then(result => console.log('random try #', i, result))
            .catch(error => console.error("random try #", i, error));
            promises.push(promise);
    }
    await Promise.all(promises)

 }


/* ============================== Phase 7 ============================== */
/* ---------------- exploring async/await and try/catch ---------------- */

// Your code here
async function printingThePhaseSeven() {

    await tryingRandomPromises()
    console.log("\n /* ============================== Phase 7 ============================== */ \n")
}


async function wrapper(){

    await printingThePhaseSeven()
const tryTryAgain = async (i) => {
 
   
    
 
   
    const random = Math.random();

    // no need for try-catch if there's no possibility of error (rarely happens)
  
    await wait(3000 +random * 1000);

    // usually you need to wrap the await to gracefully handle the error
    try {
        const result =  await tryRandomPromise(random);
        console.log('random again #', i, result);
    } catch (error) {
        console.error('random again #', i, error);
    }
    }
    for (let i = 1; i < 10; i++) {
        tryTryAgain(i);
    }

}
wrapper();


/* ============================== Phase 8 ============================== */
/* -------------------- Promises are asynchronous! --------------------- */
console.log("End of Program");
// i expect it to be just after phase 2 when we introduced a timeout
// almost even await will execute after it so yeah async functions completely take out of the flow the idea of code flowing down to bottom but that could result
// powerful results as i more learn about this

// Your code here