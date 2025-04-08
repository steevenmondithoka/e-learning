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
import Stripe from "stripe";
import { Purchase } from "../models/Purchase.js";
import Course from "../models/Course.js";

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

// const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)

// export const stripeWebhooks = async(request,response)=>{
//     const sig = request.headers['stripe-signature'];
//     let event;

//     try{
//         event = Stripe.Webhooks.constructEvent(request.body,sig,process.env.STRIPE_WEBHOOK_SECRET);
//     }
//     catch(error){
//         return response.status(400).send(`Webhook Error: ${error.message}`)
//     }

//     switch(event.type){
//         case 'payment_intent.succeeded':{
//             const paymentIntent=event.data.object;
//             const paymentIntentId = paymentIntent.id;
//             const session = await stripeInstance.checkout.sessions.list({
//                 payment_intent: paymentIntentId
//             })

//             const {purchaseId} = session.data[0].metadata;

//             const purchaseData = await Purchase.findById(purchaseId)
//             const userData = await User.findById(purchaseData.userId);

//             const courseData = await Course.findById(purchaseData.courseId.toString())

//             courseData.enrolledStudents.push(userData)
//             await courseData.save()

//             userData.enrolledCourses.push(courseData._id)
//             await userData.save()

//             purchaseData.status = 'completed'
//             await purchaseData.save()

//             break;
//         }
//             case 'payment_intent.payment_failed':{
//             const paymentIntent=event.data.object;
//             const paymentIntentId = paymentIntent.id;
//             const session = await stripeInstance.checkout.sessions.list({
//                 payment_intent: paymentIntentId
//             })

//             const {purchaseId} = session.data[0].metadata;

//             const purchaseData = await Purchase.findById(purchaseId)
//             purchaseData.status = 'failed'
//             await purchaseData.save()
//                 break;


//             }

//             default:
//                 console.log(`Unhandled event type ${event.type}`);
//     }

//     response.json({received:true});

// }

export const stripeWebhooks = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = Stripe.Webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object;
            const { purchaseId } = session.metadata;

            const purchaseData = await Purchase.findById(purchaseId);
            const userData = await User.findById(purchaseData.userId);
            const courseData = await Course.findById(purchaseData.courseId.toString());

            courseData.enrolledStudents.push(userData._id);
            await courseData.save();

            userData.enrolledCourses.push(courseData._id);
            await userData.save();

            purchaseData.status = 'completed';
            await purchaseData.save();

            console.log("✅ Purchase completed:", purchaseId);
            break;
        }

        case 'checkout.session.expired':
        case 'checkout.session.async_payment_failed': {
            const session = event.data.object;
            const { purchaseId } = session.metadata;

            const purchaseData = await Purchase.findById(purchaseId);
            purchaseData.status = 'failed';
            await purchaseData.save();

            console.log("❌ Purchase failed:", purchaseId);
            break;
        }

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return res.json({ received: true });
};
