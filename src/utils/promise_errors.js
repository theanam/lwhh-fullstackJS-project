module.exports = function(prom){
    /* যেহেতু await একটা প্রমিস আশা করে, আমরা একটা প্রমিস রিটার্ন করবো।
    এর ভিতরে আমরা আমাদের আসল প্রমিস প্রোসেস করবো
    এবং আমাদের নতুন প্রমিস সব সময় রিজল্ভ হবে, যেন আমাদের async
    কখনো ইরর না পায়
    */
    return new Promise(function(resolve,reject){
        let error = null;
        let data = null;
        prom
        .then(d=>{
            data = d;
            resolve([error,data]);
        })
        .catch(e=>{
            error=e;
            resolve([error,data]);
        });
        
    })
}