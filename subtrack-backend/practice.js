// ASYNC - AWAIT
async function getuser() {


    try{
        const users = await fetch("https://jsonplaceholder.typicode.com/users");
        const allusers = await users.json();
        // for(const user of allusers) {
        //     const post = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
        //     const userPost =  await post.json();
        //     console.log(user.name, "--" ,userPost[0].title)
        // }
        const postPromises = allusers.map(async(user) => {
            const post = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
            const userPost =  await post.json();
            return {name: user.name ,post: userPost[0].title};
        });

       const allpost = await Promise.all(postPromises);
       allpost.forEach(res => console.log(res))
    }catch(err){
        console.log(err)
    }
}


/* PROMISES START */

function foodorder(){
    function cook(dish, ms) {
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                const rand = Math.random() * 10;
                if(rand < 9){
                    resolve(`cooking ${dish}`);
                }else{
                    reject(`Failed to cook ${dish}`);
                }
            }, ms);
        });
    }

    const allOrders = [cook("pizza", 1500), cook("burger",1500), cook("fries", 1500)];

    // cook("Pizza")
    // .then(result => {console.log(result); return cook("Burger")})
    // .then(result => {console.log(result); return cook("Fries")})
    // .then(result => {console.log(result); return "ALL item Cooked"})
    // .then(result => {console.log(result); return "Deliverd to Suraj";})
    // .then(result => console.log(result))
    // .catch(err => {console.log(err)})
    // .finally(() => console.log("Order Ended."))

    Promise.all(allOrders)
    .then(results => {
        console.log("🍽️ All items cooked:");
        results.forEach(item => console.log(item));

        return `📦 Packed Order: [${results.join(', ')}]`;
    })
    .then(packed => {
        console.log(packed);
        return "Delivered to Suraj";
    })
    .then(delivery => {
        console.log(delivery);
    })
    .catch(err => {
        console.log(err)
    })
    .finally(() => console.log("End of Order"))

    // Promise.race(allOrders)
    // .then(result => {
    //     console.log(result)
    // })
    // .catch(err => console.log(err))

    Promise.allSettled(allOrders)
    .then(res => {
        res.forEach(result => {
            // console.log(result)
            if(result.status == "fulfilled"){
                console.log(`${result.value} ✅`);
            }else{
                console.log(`${result.reason} ❌`);
            }
        })
    })
}
// foodorder()

/* PROMISES END */

module.exports = {getuser, foodorder};