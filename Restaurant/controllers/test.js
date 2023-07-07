const {Client}=require("@elastic/elasticsearch")

// Create an Elasticsearch client
const client = new Client({ node: `https://localhost:9200`,auth:{
  username:"elastic",
  password:"GSCP5ZA6+exiBZ1LEiJ2"
},tls: {
  //  ca: fs.readFileSync('./http_ca.crt'),
  rejectUnauthorized: false,
},});

// console.log(client)

const addingData=async()=>{
    //insert  into elastic search
    try{
        const response=await client.index({
          index:"restaurants",
          body:{
            name:"day",
            // city:req.body.city,
            // state:req.body.state,
            // country:req.body.country,
          }
        })
        console.log("response---",response)
      }
        catch(err){
          console.log("error---",err)
        };

}
// addingData().catch(err=>console.log("err",err))


const searchRestaurants = async (req, res) => {
 // Build the ElasticSearch query
  const  body  = await client.search({
    index: 'restaurants',
    body: {
      query: {
         match:{
          name:
            "dayyu"
         }
      },
    },
   
  });
  // console.log(body)
   console.log(body.hits.hits)

}
searchRestaurants().catch(err=>console.log(err));
    
  