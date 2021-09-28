var bcrypt=require('brcypt');
console.log("YES");
let p="puneet";
let c=bcrypt.hash(p,10);
let pp="puneet";
if(bcrypt.compare(pp,c))
{
    console.log("YES");
}
console.log("NO");