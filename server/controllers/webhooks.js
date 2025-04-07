// import { Webhook } from "svix";
// import User from "../models/User.js";


// const clerkWebhooks = async (req,res) =>{
//     try{

//         const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

//         await whook.verify(JSON.stringify(req.body),{
//             "svix-id" : req.headers["svix-id"],
//             "svix-timestamp":req.headers["svix-timestamp"],
//             "svix-signature":req.headers["svix-signature"]
//         })

//         const {data,type} = req.body
//         switch (type) {
//             case 'user.created':{
//                 const userData ={
//                     _id:data.id,
//                     email:data.email_address[0],
//                     name:data.first_name + " " + data.last_name,
//                     imageUrl : data.image_url,
//                 }
//                 await User.create(userData)
//                 res.json({})
//                 break;
//             }
                
//             case 'user.updated':{
//                 const userData ={
//                     email:data.email_address[0],
//                     name:data.first_name + " " + data.last_name,
//                     imageUrl : data.image_url,
//                 }
//                 await User.findByIdAndUpdate(data.id,userData)
//                 res.json({})
//                 break;
//             }

//             case 'user.deleted':{
//                 await User.findByIdAndDelete(data.id)
//                 res.json({})
//                 break;
//             }
        
//             default:
//                 break;
//         }


//     } catch(error){
//         res.json({success:false,message:error.message})

//     }
// }

// export { clerkWebhooks };


import { Webhook } from "svix";
import User from "../models/User.js";

const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        const payload = req.body; // raw Buffer
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        };

        const evt = whook.verify(payload, headers);
        const { data, type } = evt;

        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address, // updated access path
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,
                };
                await User.create(userData);
                res.status(200).json({ success: true });
                break;
            }

            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,
                };
                await User.findByIdAndUpdate(data.id, userData);
                res.status(200).json({ success: true });
                break;
            }

            case 'user.deleted': {
                await User.findByIdAndDelete(data.id);
                res.status(200).json({ success: true });
                break;
            }

            default:
                res.status(200).json({ success: true, message: "Unhandled event type" });
                break;
        }

    } catch (error) {
        console.error("Webhook error:", error.message);
        res.status(400).json({ success: false, message: error.message });
    }
};

export { clerkWebhooks };
