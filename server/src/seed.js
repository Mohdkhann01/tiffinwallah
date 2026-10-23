import 'dotenv/config'
import dns from 'node:dns'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const dnsServers = String(process.env.MONGODB_DNS_SERVERS || '8.8.8.8,1.1.1.1').split(',').map(s => s.trim()).filter(Boolean)
dns.setServers(dnsServers)

const uri = String(process.env.MONGODB_URI || '').trim()
if (!uri) { console.error('MONGODB_URI is missing in server/.env'); process.exit(1) }

const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
const defaultMenu = {
  key:'main', monthlyPrice:4500,
  monthlyPlans:[
    {id:'standard',name:'Standard Tiffin',price:4500,description:'A balanced monthly homestyle tiffin plan with hygienic daily meals.'},
    {id:'premium',name:'Premium Tiffin',price:6000,description:'A premium monthly plan with upgraded menu choices and premium meal options.'}
  ],
  paymentWindow:{startDay:1,endDay:5},deliverySettings:{autoAssignSingle:true,bootstrapInitialized:false},
  referral:{enabled:true,code:'TWFREEPRESS',title:'Free Press Wallah Offer',description:'Use this referral code to unlock one complimentary Press Wallah service.',offerType:'free-press',value:0,service:'laundry-free',expiresAt:'',oneUsePerCustomer:true},
  serviceAddresses:{tiffin:'Star Plaza, Pahadpur, Kanchan Bihari Marg',press:'Near Firoz Hostel, opposite Integral University Gate No. 2, Kursi Road 22826'},
  preBooking:{enabled:false,offerTitle:'Free Laundry Offer',offerDescription:'Book your monthly tiffin in advance and unlock one complimentary laundry service after 15 days.',offerService:'laundry-free',claimAfterDays:15,expiresAfterMonths:2},
  rulesBook:['Orders are confirmed only after successful payment verification.','Monthly tiffin services are available under Standard and Premium plans.','Customers must keep their delivery address and phone number updated.','Pre-booking offers can be claimed after the eligibility period shown at booking.','An offer expires automatically after the configured validity period.','Laundry pickup and delivery times are subject to service availability.','Party bookings require the selected guest count, event date and address.','Service availability, menu and prices may be updated by the administrator.'],
  daily:[],
  weekly:Object.fromEntries(days.map((day,i)=>[day,{morning:{name:['Poha + Tea','Aloo Paratha + Curd','Idli + Sambar','Veg Sandwich + Tea','Upma + Fruit','Chole Bhature','Masala Dosa + Chutney'][i]},lunch:{name:['Dal Tadka + Roti + Rice','Rajma Rice + Salad','Kadhi Pakora + Roti','Chole + Jeera Rice','Dal Makhani + Roti','Veg Biryani + Raita','Paneer Curry + Roti'][i]},dinner:{name:['Mix Veg + Dal + Roti','Paneer Masala + Roti','Aloo Gobi + Dal + Roti','Kofta Curry + Roti','Matar Paneer + Rice','Dal Fry + Jeera Rice','Seasonal Veg + Dal + Roti'][i]}}])),
  party:{pricePerPlate:800,minGuests:1,packages:[{id:'standard',name:'Standard Party',description:'A dependable party menu with homestyle favourites.',price:800},{id:'premium',name:'Premium Party',description:'A richer party menu with premium starters and mains.',price:1000}],
  starters:[{id:'starter-paneer',name:'Paneer Tikka',pricePerPlate:40},{id:'starter-kebab',name:'Veg Seekh Kebab',pricePerPlate:45}],
  mainCourse:[{id:'main-paneer',name:'Paneer Butter Masala',pricePerPlate:55},{id:'main-dal',name:'Dal Tadka',pricePerPlate:25},{id:'main-mixveg',name:'Seasonal Mix Veg',pricePerPlate:30}],
  breadsRice:[{id:'bread-naan',name:'Butter Naan',pricePerPlate:20},{id:'bread-roti',name:'Tandoori Roti',pricePerPlate:10},{id:'rice-jeera',name:'Jeera Rice',pricePerPlate:25},{id:'rice-biryani',name:'Veg Biryani',pricePerPlate:45}],
  desserts:[{id:'dessert-gulab',name:'Gulab Jamun',pricePerPlate:20},{id:'dessert-kheer',name:'Kheer',pricePerPlate:25}],
  drinks:[{id:'drink-lassi',name:'Sweet Lassi',pricePerPlate:30},{id:'drink-juice',name:'Fresh Juice',pricePerPlate:35}]}
}
const cloneWeekly = source => JSON.parse(JSON.stringify(source))
for (const plan of defaultMenu.monthlyPlans) { plan.weekly = cloneWeekly(defaultMenu.weekly); if(plan.id==='standard') for(const day of days) delete plan.weekly[day].morning }
for (const pkg of defaultMenu.party.packages) pkg.menu = {starters:JSON.parse(JSON.stringify(defaultMenu.party.starters)),mainCourse:JSON.parse(JSON.stringify(defaultMenu.party.mainCourse)),breadsRice:JSON.parse(JSON.stringify(defaultMenu.party.breadsRice)),desserts:JSON.parse(JSON.stringify(defaultMenu.party.desserts)),drinks:JSON.parse(JSON.stringify(defaultMenu.party.drinks))}
const defaultLaundry = [
  {id:'shirt',name:'Shirt / T-Shirt',prices:{wash:25,press:15,'wash-press':40}},
  {id:'pants',name:'Pants / Trousers',prices:{wash:35,press:20,'wash-press':55}},
  {id:'jeans',name:'Jeans',prices:{wash:45,press:25,'wash-press':70}},
  {id:'kurta',name:'Kurta',prices:{wash:40,press:25,'wash-press':65}},
  {id:'dress',name:'Dress',prices:{wash:55,press:35,'wash-press':90}},
  {id:'bedsheet',name:'Bedsheet',prices:{wash:70,press:45,'wash-press':115}}
]

const userSchema = new mongoose.Schema({
  name:{type:String,required:true,trim:true}, email:{type:String,required:true,unique:true,lowercase:true,trim:true,index:true},
  phone:{type:String,default:''}, address:{type:String,default:''}, city:{type:String,default:''}, pincode:{type:String,default:''},
  passwordHash:{type:String,required:true}, role:{type:String,enum:['customer','admin'],default:'customer',index:true}
},{timestamps:true})
const menuSchema = new mongoose.Schema({key:{type:String,unique:true,index:true},monthlyPrice:Number,monthlyPlans:Array,paymentWindow:mongoose.Schema.Types.Mixed,referral:mongoose.Schema.Types.Mixed,deliverySettings:mongoose.Schema.Types.Mixed,serviceAddresses:mongoose.Schema.Types.Mixed,preBooking:mongoose.Schema.Types.Mixed,rulesBook:[String],daily:Array,weekly:mongoose.Schema.Types.Mixed,party:mongoose.Schema.Types.Mixed},{timestamps:true})
const laundrySchema = new mongoose.Schema({key:{type:String,unique:true,index:true},items:Array},{timestamps:true})
const User = mongoose.model('User', userSchema)
const deliveryPartnerSchema = new mongoose.Schema({partnerId:{type:String,unique:true,index:true},name:String,phone:String,passwordHash:String,active:{type:Boolean,default:true},createdBy:String},{timestamps:true})
const DeliveryPartner = mongoose.model('DeliveryPartner', deliveryPartnerSchema)
const Menu = mongoose.model('Menu', menuSchema)
const Laundry = mongoose.model('Laundry', laundrySchema)

try {
  await mongoose.connect(uri,{serverSelectionTimeoutMS:10000,connectTimeoutMS:10000})
  const email=(process.env.ADMIN_EMAIL || 'admin@tiffinwallah.com').trim().toLowerCase()
  const password=process.env.ADMIN_PASSWORD || 'TiffinAdmin@123'
  const deliveryId=String(process.env.DELIVERY_PARTNER_ID || 'TWDEL001').trim().toUpperCase()
  const deliveryPassword=String(process.env.DELIVERY_PARTNER_PASSWORD || 'Delivery@123').trim()
  const hash=await bcrypt.hash(password,10)
  await User.findOneAndUpdate({email},{name:'Tiffin Wallah Admin',passwordHash:hash,role:'admin'},{upsert:true,new:true,setDefaultsOnInsert:true})

  let m=await Menu.findOne({key:'main'})
  if(!m) {m=await Menu.create(defaultMenu)}
  else {
    if(!m.monthlyPrice)m.monthlyPrice=4500
    if(!Array.isArray(m.monthlyPlans)||!m.monthlyPlans.length)m.monthlyPlans=defaultMenu.monthlyPlans
    else m.monthlyPlans=m.monthlyPlans.map(p=>({...p,weekly:p.weekly||cloneWeekly(m.weekly||defaultMenu.weekly)}))
    if(!m.preBooking)m.preBooking=defaultMenu.preBooking
    if(!m.paymentWindow)m.paymentWindow=defaultMenu.paymentWindow
    if(!m.deliverySettings)m.deliverySettings=defaultMenu.deliverySettings
    else m.deliverySettings={...defaultMenu.deliverySettings,...m.deliverySettings}
    m.markModified('deliverySettings')
    if(!m.referral)m.referral=defaultMenu.referral
    else m.referral={...defaultMenu.referral,...m.referral}
    if(!m.serviceAddresses)m.serviceAddresses=defaultMenu.serviceAddresses
    if(!Array.isArray(m.rulesBook)||!m.rulesBook.length)m.rulesBook=defaultMenu.rulesBook
    if(!m.daily?.length)m.daily=defaultMenu.daily
    if(!m.weekly)m.weekly=defaultMenu.weekly
    if(!m.party)m.party=defaultMenu.party
    else { m.party.packages=(m.party.packages||[]).filter(x=>x?.id==='standard'||x?.id==='premium'); if(!m.party.packages.length)m.party.packages=defaultMenu.party.packages; m.party.packages=m.party.packages.map(p=>({...p,menu:p.menu||{starters:JSON.parse(JSON.stringify(defaultMenu.party.starters)),mainCourse:JSON.parse(JSON.stringify(defaultMenu.party.mainCourse)),breadsRice:JSON.parse(JSON.stringify(defaultMenu.party.breadsRice)),desserts:JSON.parse(JSON.stringify(defaultMenu.party.desserts)),drinks:JSON.parse(JSON.stringify(defaultMenu.party.drinks))}})); for(const key of ['starters','mainCourse','breadsRice','desserts','drinks']) if(!Array.isArray(m.party[key])) m.party[key]=defaultMenu.party[key] }
    m.markModified('party')
    await m.save()
  }
  const l=await Laundry.findOne({key:'main'})
  if(!l) await Laundry.create({key:'main',items:defaultLaundry})
  else if(!l.items?.length){l.items=defaultLaundry;await l.save()}

  const deliveryHash=await bcrypt.hash(deliveryPassword,10)
  const existingDelivery=await DeliveryPartner.findOne({partnerId:deliveryId})
  const bootstrapReady=Boolean(m?.deliverySettings?.bootstrapInitialized)
  if(!existingDelivery && !bootstrapReady){await DeliveryPartner.create({partnerId:deliveryId,name:'Primary Delivery Partner',phone:'',passwordHash:deliveryHash,active:true,createdBy:'env'});m.deliverySettings={...(m.deliverySettings||{}),bootstrapInitialized:true};m.markModified('deliverySettings');await m.save()}
  else if(existingDelivery?.createdBy==='env'){existingDelivery.passwordHash=deliveryHash;existingDelivery.active=true;await existingDelivery.save()}

  console.log('Seed completed successfully.')
  console.log(`Admin account: ${email}`)
} catch (e) {
  console.error('Seed failed:', e.message)
  process.exitCode=1
} finally {
  await mongoose.disconnect()
}
