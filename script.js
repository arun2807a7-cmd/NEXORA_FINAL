/* =========================================================
   0. IMAGE LIBRARY (real photos used across dynamic content)
   ========================================================= */
// Fallback photo used if a specific crop's image URL ever fails to load.
// Uses a real photo of assorted produce (matched to category) instead of
// a cartoon placeholder, so a broken link never shows as just an icon.
const CATEGORY_FALLBACK_IMG = {
  veg:'https://images.pexels.com/photos/735536/pexels-photo-735536.jpeg?auto=compress&cs=tinysrgb&w=800',
  fruit:'https://images.pexels.com/photos/235294/pexels-photo-235294.jpeg?auto=compress&cs=tinysrgb&w=800',
  grain:'https://images.pexels.com/photos/158603/pexels-photo-158603.jpeg?auto=compress&cs=tinysrgb&w=800'
};
function phImg(label, cat){
  return CATEGORY_FALLBACK_IMG[cat] || CATEGORY_FALLBACK_IMG.veg;
}
const IMG = {
  tomato:'https://upload.wikimedia.org/wikipedia/commons/f/f5/Tomatoes.jpg',
  onion:'https://upload.wikimedia.org/wikipedia/commons/a/a2/Mixed_onions.jpg',
  potato:'https://images.pexels.com/photos/4110476/pexels-photo-4110476.jpeg?auto=compress&cs=tinysrgb&w=800',
  mango:'https://upload.wikimedia.org/wikipedia/commons/7/74/Mangos_-_single_and_halved.jpg',
  banana:'https://images.pexels.com/photos/2116020/pexels-photo-2116020.jpeg?auto=compress&cs=tinysrgb&w=800',
  wheat:'https://images.pexels.com/photos/33411353/pexels-photo-33411353.jpeg?auto=compress&cs=tinysrgb&w=800',
  rice:'https://commons.wikimedia.org/wiki/Special:FilePath/Rice%20grains%20(IRRI).jpg',
  spinach:'https://images.pexels.com/photos/7195272/pexels-photo-7195272.jpeg?auto=compress&cs=tinysrgb&w=800',
  grapes:'https://upload.wikimedia.org/wikipedia/commons/6/6a/Bunch_of_Green_Grapes.jpg'
};

/* =========================================================
   1. LANGUAGE DICTIONARY
   ========================================================= */
const dict = {
  en:{
    brand:"KhetSetu",tagline:"Straight from the khet to you",
    navHome:"Home",navMarket:"Marketplace",navForecast:"Price Forecast",navWeather:"Weather",navExport:"Export",navServices:"Book Services",navProfile:"Get Started",navcta:"Join Free",
    exKicker:"Export Opportunities",exTitle:"Sell beyond the mandi — export by demand",
    exDesc:"See which crops overseas buyers want right now, the price premium over today's mandi rate, and the paperwork needed — then register your produce and get matched to a destination.",
    exFilterCategory:"Category",exFilterDemand:"Demand level",exFilterSort:"Sort by",
    exDemandAll:"All demand levels",exDemandHigh:"High demand",exDemandMedium:"Medium demand",exDemandLow:"Low demand",
    exSortDemand:"Highest demand first",exSortPremiumHigh:"Export premium: high to low",exSortPremiumLow:"Export premium: low to high",
    exFormTitle:"📦 Register produce for export",exFormDesc:"Tell us what you have — we'll match it to the best-paying overseas destination for that crop.",
    exFieldCrop:"Crop",exFieldQty:"Quantity (kg)",exFieldGrade:"Quality grade",
    exGradeA:"Export Grade A",exGradeB:"Grade B",exGradeStd:"Standard",
    exSubmit:"Match me to a buyer",
    exSuccess:"Listed for export — matched to a buyer below. Our team will reach out to confirm pickup and paperwork.",
    exMyListingsTitle:"My export listings",
    exRibbon:"Illustrative demo data",exNoteTitle:"How the export match works",
    exNoteBody:"Demand levels, destination countries, and price premiums shown here are illustrative estimates for this prototype — not live trade data. In production this module would plug into APEDA/DGFT trade statistics and real buyer demand feeds to route each listing to a verified importer.",
    wxKicker:"Live Weather",wxTitle:"Weather forecast for your mandi",
    wxDesc:"Tap a pin on the map or search any village, city, or mandi for a 5-day outlook — rain, temperature, humidity and wind — so you know the best day to harvest, spray, or head to market.",
    wxSearchPh:"Search village, city or mandi…",wxSearchBtn:"Search",wxLocateBtn:"📍 Use my location",
    wxMapSub:"Tap a pin to load its forecast",wxDaybyday:"5-day outlook",
    wxHumidity:"Humidity",wxWind:"Wind",wxRainChance:"Rain chance",
    eyebrow:"SIH26033 · Ministry of Consumer Affairs, Food & Public Distribution",
    heroTitle:'Cut out the middlemen. <em>Keep the farmer\'s fair share.</em>',
    heroLead:"A direct mandi in your pocket — connecting farmers and FPOs straight to buyers, with logistics, cold storage, market-day slots and AI price forecasts built in.",
    heroTag1:"Verified Farmers",heroTag2:"Direct Mandi",heroTag3:"AI Price Alerts",heroTag4:"DPDP Ready ✓",
    ctaFarmer:"I'm a Farmer / FPO",ctaBuyer:"I'm a Buyer",
    heroFloatCrop:"Today's tomato rate",heroFloatPrice:"₹32/kg",heroFloatTrend:"▲ 6% from yesterday",
    splitTitle:"Where ₹100 of tomato sales actually goes",
    splitSub:"Based on a typical 4-intermediary supply chain vs. the KhetSetu direct model",
    splitOldLabel:"Traditional chain",splitNewLabel:"KhetSetu direct",
    legFarmer:"Farmer share",legMid:"Intermediaries",legLog:"Logistics",legNew:"Farmer share (direct)",
    ql1t:"Marketplace",ql1d:"Browse and filter fresh produce by price.",
    ql2t:"Price Forecast",ql2d:"AI-projected prices for the week ahead.",
    ql3t:"Book Services",ql3d:"Reserve cold storage and market-day stalls.",
    ql4t:"Get Started",ql4d:"Create a free farmer or buyer account.",
    qlGo:"Open →",
    tsKicker:"Voices from the field",tsTitle:"What farmers are saying",
    t1q:"Earlier the mandi barely paid me a fraction of the price. Now I sell straight to the buyer.",
    t1n:"Ramesh Kumar",t1l:"Nashik · Tomato grower",
    t2q:"Booking cold storage from my phone saved two tonnes of onion last monsoon.",
    t2n:"Sunita Devi",t2l:"Nagpur · Onion FPO",
    t3q:"The price forecast tells me exactly which week to sell my mangoes.",
    t3n:"Anil Patil",t3l:"Ratnagiri · Mango grower",
    mpKicker:"Marketplace",mpTitle:"Fresh listings, seedhe khet se",
    mpDesc:"Browse produce from verified farmers and FPOs near you. Filter by the price you're willing to pay.",
    mpStatL:"Today's fresh arrivals",mpStatV:"9,850 kg · 59 crops",
    filterPrice:"Price range (₹ per kg)",filterCategory:"Category",filterSort:"Sort by",
    catAll:"All produce",catVeg:"Vegetables",catFruit:"Fruits",catGrain:"Grains",
    sortLow:"Price: low to high",sortHigh:"Price: high to low",sortFresh:"Freshest first",
    fcKicker:"AI Demand Forecast",fcTitle:"Know tomorrow's price today",
    fcDesc:"A trend model projects next week's price from the last 14 days, so farmers can decide when to sell and buyers can plan purchases.",
    fcPanelTitle:"Mandi Bhav Tracker",
    fcSub:"Price per kg, last 14 days + 7-day AI projection",
    enamKicker:"eNAM Auction Price",
    pgKicker:"Price Guard",pgTitle:"Don't let a quick sale eat your profit",
    pgDesc:"Set the lowest price you can accept, then check it against today's mandi rate, the AI forecast, and eNAM before you agree to sell.",
    pgModeCost:"Calculate from cost",pgModeDirect:"Set directly",
    pgCostLabel:"Cost of production (₹/kg)",pgMarginLabel:"Minimum profit margin (%)",
    pgDirectLabel:"Your minimum price (₹/kg)",pgFloorLabel:"Your minimum price",
    cropTomato:"Tomato",cropOnion:"Onion",cropWheat:"Wheat",cropPotato:"Potato",cropSpinach:"Spinach",
    statCurrentL:"Current price",statForecastL:"7-day forecast",statLowL:"14-day low",statHighL:"14-day high",
    opsKicker:"Farmer Tools",opsTitle:"Book storage. Reserve your market spot.",
    how1t:"Choose a service",how1d:"Pick cold storage or a market-day stall.",
    how2t:"Pick your date & slot",how2d:"Select your move-in date or stall spot on the calendar.",
    how3t:"Get confirmed by SMS",how3d:"The facility or market confirms your booking straight to your phone.",
    csTitle:"❄ Cold Storage Booking",csDesc:"Reserve space at a nearby facility to protect unsold produce from spoilage.",
    csFrom:"Move-in date",csQty:"Quantity (kg)",csConfirm:"Confirm booking",csSuccess:"Booking request sent — the facility will confirm by SMS.",
    mdTitle:"📍 Market Day Scheduler",mdDesc:"Pick a market, date, and stall spot to sell directly to walk-in buyers.",
    mdMarket:"Market location",mdDate:"Date",mdSpot:"Stall spot",mdConfirm:"Reserve spot",
    mdSuccess:"Spot reserved — arrive 30 minutes before market opens.",
    mktA:"Sector 12 Weekly Haat",mktB:"Riverside Farmers Market",mktC:"Central Mandi Square",
    pfKicker:"Get Started",pfTitle:"Create your free account",
    roleFarmer:"I'm a Farmer / FPO",roleBuyer:"I'm a Buyer",
    feeBadge:"Farmer plan",feePer:"/month",feeNote:"Less than the cost of a cup of chai — keeps unlimited listings, AI price alerts and buyer matching free of middleman cuts.",feePerk1:"Unlimited produce & export listings",feePerk2:"Daily AI mandi price alerts",feePerk3:"Priority matching with buyers & companies",feeFreeNote:"Buyers & companies use KhetSetu free — always.",
    fldName:"Full name",fldPhone:"Phone number",fldLoc:"Village / City",fldSubmit:"Create account",
    fldAadhaar:"Aadhaar card number",fldAadhaarPh:"XXXX XXXX XXXX",
    fldAadhaarHint:"Used only for identity verification. Your 12-digit Aadhaar number is masked and never stored in plain text.",
    fldAadhaarError:"Enter a valid 12-digit Aadhaar number.",
    profileSuccess:"Account details submitted — we'll verify your Aadhaar and confirm by SMS.",
    fcDaybyday:"Day-by-day AI forecast",
    profilePhotoCaption:"Trusted by farmer producer organisations across Maharashtra",
    dpdpRibbon:"DPDP Act 2023 ready",
    privTitle:"Only what's needed, nothing more.",
    privBody:"We collect name, phone, location, and Aadhaar number purely to verify identity, connect you with buyers or sellers nearby, and confirm bookings. Your Aadhaar number is masked on-screen and never stored in plain text or shared. Designed following data-minimisation principles under India's DPDP Act, 2023.",
    fsKicker:"Roadmap",fsTitle:"What's next",
    fs1t:"Route optimisation",fs1d:"AI-planned delivery routes to cut logistics cost further.",
    fs2t:"Full regional languages",fs2d:"Expanding beyond Hindi to Marathi, Tamil, Telugu, and more.",
    fs3t:"Live logistics partners",fs3d:"Real-time integration with delivery and transport providers.",
    fs4t:"Verified FPO onboarding",fs4d:"KYC-backed verification for farmer producer organisations.",
    footDesc:"A direct marketplace built for SIH26033 — connecting farmers and FPOs with buyers, without the middlemen.",
    footContact:"Contact",footTeam:"Team submission · Smart India Hackathon 2026 · Theme: Agriculture, Food & Rural Development",
    footTag:"Straight from the khet to you",
    exKicker:"Export Opportunities",exTitle:"Sell beyond the mandi — export by demand",exDesc:"See which crops overseas buyers want right now, the price premium over today's mandi rate, and the paperwork needed — then register your produce and get matched to a destination.",exFilterCategory:"Category",exFilterDemand:"Demand level",exFilterSort:"Sort by",exDemandAll:"All demand levels",exDemandHigh:"High demand",exDemandMedium:"Medium demand",exDemandLow:"Low demand",exSortDemand:"Highest demand first",exSortPremiumHigh:"Export premium: high to low",exSortPremiumLow:"Export premium: low to high",exFormTitle:"📦 Register produce for export",exFormDesc:"Tell us what you have — we'll match it to the best-paying overseas destination for that crop.",exFieldCrop:"Crop",exFieldQty:"Quantity (kg)",exFieldGrade:"Quality grade",exGradeA:"Export Grade A",exGradeB:"Grade B",exGradeStd:"Standard",exSubmit:"Match me to a buyer",exSuccess:"Listed for export — matched to a buyer below. Our team will reach out to confirm pickup and paperwork.",exMyListingsTitle:"My export listings",exRibbon:"Illustrative demo data",exNoteTitle:"How the export match works",exNoteBody:"Demand levels, destination countries, and price premiums shown here are illustrative estimates for this prototype — not live trade data. In production this module would plug into APEDA/DGFT trade statistics and real buyer demand feeds to route each listing to a verified importer.",wxKicker:"Live Weather",wxTitle:"Weather forecast for your mandi",wxDesc:"Tap a pin on the map or search any village, city, or mandi for a 5-day outlook — rain, temperature, humidity and wind — so you know the best day to harvest, spray, or head to market.",wxSearchPh:"Search village, city or mandi…",wxSearchBtn:"Search",wxLocateBtn:"📍 Use my location",wxMapSub:"Tap a pin to load its forecast",wxDaybyday:"5-day outlook",wxHumidity:"Humidity",wxWind:"Wind",wxRainChance:"Rain chance",
    navDelivery:"Delivery",buyBtn:"Add to cart",dlKicker:"Home Delivery",dlTitle:"Farm-fresh produce, delivered to your door",dlDesc:"Review the crops you've added from the Marketplace, tell us where to deliver, and place your order — no mandi visit needed.",dlCartTitle:"Your Cart",dlFieldName:"Full name",dlFieldPhone:"Phone number",dlFieldAddress:"Delivery address",dlFieldCity:"City / Village",dlFieldPincode:"Pincode",dlPlaceOrder:"Place order",dlSubtotal:"Subtotal",dlDeliveryFee:"Delivery fee",dlTotal:"Total",dlOrderSuccess:"Order placed — the farmer/FPO will be notified and your delivery will be confirmed by SMS.",dlMyOrdersTitle:"My orders",dlRibbon:"Illustrative demo data",dlNoteTitle:"How delivery works",dlNoteBody:"Delivery fee and timelines shown here are illustrative for this prototype. In production this module would plug into local logistics/courier partners to route each order from the nearest verified farmer or FPO to the buyer's address.",
    navCompany:"Sell to Companies",
    cbKicker:"Direct-to-Company",cbTitle:"Companies post what they need — you supply it directly",
    cbDesc:"Food companies, mills, and exporters list exactly what crop, quantity, and price they're offering. Respond directly with your offer and skip the mandi and every middleman in between.",
    cbFilterCategory:"Category",cbFilterUrgency:"Urgency",cbFilterSort:"Sort by",
    cbUrgencyAll:"All requirements",cbUrgencyHigh:"Urgent need",cbUrgencyMedium:"Open need",cbUrgencyLow:"Ongoing need",
    cbSortUrgency:"Most urgent first",cbSortPriceHigh:"Offer price: high to low",cbSortPriceLow:"Offer price: low to high",
    cbRoleFarmer:"I'm a Farmer",cbRoleCompany:"I'm a Company",
    cbRespondTitle:"🤝 Offer to supply",cbRespondDesc:"Pick an open requirement below and send the quantity you can supply and your price — the company is notified directly.",
    cbFieldRequirement:"Requirement",cbFieldSupplyQty:"Quantity you can supply (kg)",cbFieldYourPrice:"Your price (₹/kg)",
    cbRespondSubmit:"Send offer to company",
    cbRespondSuccess:"Offer sent — the company will confirm pickup and payment directly with you.",
    cbMyResponsesTitle:"My offers sent",
    cbPostTitle:"📋 Post a requirement",cbPostDesc:"Tell farmers exactly what you need — it appears in the list above immediately so they can respond to you directly.",
    cbFieldCompanyName:"Company name",cbFieldCropNeeded:"Crop needed",cbFieldQtyNeeded:"Quantity needed (kg)",
    cbFieldOfferPrice:"Price you're offering (₹/kg)",cbFieldDeadline:"Needed by",cbFieldLocation:"Pickup location",
    cbPostSubmit:"Post requirement",
    cbPostSuccess:"Requirement posted — farmers can see and respond to it right away.",
    cbMyPostedTitle:"My posted requirements",
    cbRibbon:"Illustrative demo data",cbNoteTitle:"How direct-to-company sourcing works",
    cbNoteBody:"Requirements, offer prices, and fulfilment percentages shown here are illustrative for this prototype — not live company data. In production this module would let verified companies post real demand, notify matching nearby farmers instantly, and route pickup and payment directly between the two — cutting out mandi commission agents and other intermediaries entirely.",
    ql5t:"Farmer Community",ql5d:"Pool produce with nearby farmers for bulk deals.",
    navCommunity:"Community",
    cmKicker:"Farmer Community",cmTitle:"Alone you're one voice. Pooled, you're a mandi.",
    cmDesc:"Join or start a group with farmers growing the same crop nearby. Every member's quantity adds to one combined lot — and a bigger pooled lot means better price talks with companies and bulk buyers than any single farmer selling alone.",
    cmFilterCategory:"Category",cmFilterStatus:"Status",cmFilterSort:"Sort by",
    cmStatusAll:"All groups",cmStatusReady:"Ready for buyers",cmStatusForming:"Still pooling",
    cmSortProgress:"Most pooled first",cmSortMembers:"Most members first",cmSortPriceHigh:"Ask price: high to low",cmSortPriceLow:"Ask price: low to high",
    cmRoleJoin:"Join a Group",cmRoleCreate:"Start a Group",cmRoleBuyer:"I'm a Buyer",
    cmJoinTitle:"🤝 Add your produce to a group",cmJoinDesc:"Pick a group below and add the quantity you can contribute — it's added straight to the pooled total everyone benefits from.",
    cmFieldGroup:"Group",cmFieldJoinQty:"Quantity you'll contribute (kg)",
    cmJoinSubmit:"Add to pooled lot",
    cmJoinSuccess:"Added — your quantity now counts toward this group's pooled lot.",
    cmMyJoinedTitle:"Groups I've joined",
    cmCreateTitle:"🚜 Start a new group",cmCreateDesc:"No group for your crop and village yet? Start one — it appears above immediately so nearby farmers can find and join it.",
    cmFieldGroupName:"Group name",cmFieldCrop:"Crop",cmFieldVillage:"Village / City",
    cmFieldTarget:"Target pooled quantity (kg)",cmFieldStartQty:"Your starting quantity (kg)",cmFieldAskPrice:"Price you'd like to ask (₹/kg)",
    cmCreateSubmit:"Start this group",
    cmCreateSuccess:"Group started — it's now listed above for nearby farmers to join.",
    cmMyCreatedTitle:"Groups I've started",
    cmBuyerTitle:"🏭 Express interest in a pooled lot",cmBuyerDesc:"Browse groups above — the ones marked \"Ready for buyers\" have hit their pooling target. Send the quantity you want and your offer price directly to the group.",
    cmFieldBuyerQty:"Quantity you want (kg)",cmFieldBuyerPrice:"Your offer price (₹/kg)",
    cmBuyerSubmit:"Send interest to group",
    cmBuyerSuccess:"Interest sent — the group's members will be notified and can confirm pickup and payment directly with you.",
    cmMyInterestsTitle:"My interests sent",
    cmRibbon:"Illustrative demo data",cmNoteTitle:"How pooled group selling works",
    cmNoteBody:"Groups, pooled quantities, and member counts shown here are illustrative for this prototype — not live data. In production this module would let verified farmers form real village/crop groups, automatically total each member's contribution, and route the combined lot to companies and bulk buyers as one listing — giving small farmers the negotiating weight of a much larger seller."
  },
  hi:{
    brand:"खेतसेतु",tagline:"खेत से सीधे, आपके हाथ में",
    navHome:"होम",navMarket:"बाज़ार",navForecast:"मूल्य पूर्वानुमान",navWeather:"मौसम",navExport:"निर्यात",navServices:"सेवाएं बुक करें",navProfile:"शुरू करें",navcta:"मुफ़्त जुड़ें",
    eyebrow:"SIH26033 · उपभोक्ता मामले, खाद्य एवं सार्वजनिक वितरण मंत्रालय",
    heroTitle:'बिचौलियों को हटाएँ। <em>किसान का उचित हिस्सा सुरक्षित रखें।</em>',
    heroLead:"किसानों और एफपीओ को सीधे खरीदारों से जोड़ने वाली जेब में मंडी — लॉजिस्टिक्स सहायता, कोल्ड स्टोरेज बुकिंग, बाज़ार-दिवस स्लॉट और एआई मूल्य पूर्वानुमान के साथ।",
    heroTag1:"सत्यापित किसान",heroTag2:"सीधी मंडी",heroTag3:"एआई मूल्य अलर्ट",heroTag4:"DPDP अनुरूप ✓",
    ctaFarmer:"मैं किसान / एफपीओ हूँ",ctaBuyer:"मैं खरीदार हूँ",
    heroFloatCrop:"टमाटर की आज की दर",heroFloatPrice:"₹32/किलो",heroFloatTrend:"▲ कल से 6% ज़्यादा",
    splitTitle:"टमाटर की ₹100 की बिक्री वास्तव में कहाँ जाती है",
    splitSub:"पारंपरिक 4-बिचौलिया आपूर्ति श्रृंखला बनाम खेतसेतु की सीधी व्यवस्था",
    splitOldLabel:"पारंपरिक श्रृंखला",splitNewLabel:"खेतसेतु सीधा",
    legFarmer:"किसान का हिस्सा",legMid:"बिचौलिए",legLog:"लॉजिस्टिक्स",legNew:"किसान का हिस्सा (सीधा)",
    ql1t:"बाज़ार",ql1d:"ताज़ी उपज को कीमत के अनुसार देखें और फ़िल्टर करें।",
    ql2t:"मूल्य पूर्वानुमान",ql2d:"आने वाले सप्ताह के लिए एआई-अनुमानित भाव।",
    ql3t:"सेवाएं बुक करें",ql3d:"कोल्ड स्टोरेज और बाज़ार-दिवस स्टॉल आरक्षित करें।",
    ql4t:"शुरू करें",ql4d:"मुफ़्त किसान या खरीदार खाता बनाएँ।",
    qlGo:"खोलें →",
    tsKicker:"खेतों से आवाज़ें",tsTitle:"किसान क्या कह रहे हैं",
    t1q:"पहले मंडी में बहुत कम दाम मिलता था। अब सीधे खरीदार तक पहुँच होती है।",
    t1n:"रमेश कुमार",t1l:"नासिक · टमाटर किसान",
    t2q:"फ़ोन से कोल्ड स्टोरेज बुक करके पिछले मानसून में 2 टन प्याज़ बचाया।",
    t2n:"सुनीता देवी",t2l:"नागपुर · प्याज़ एफपीओ",
    t3q:"मूल्य पूर्वानुमान बताता है कि आम कब बेचना सही रहेगा।",
    t3n:"अनिल पाटिल",t3l:"रत्नागिरी · आम किसान",
    mpKicker:"बाज़ार",mpTitle:"खेत से सीधे ताज़ी उपज",
    mpDesc:"अपने आस-पास के सत्यापित किसानों और एफपीओ की उपज देखें। अपनी पसंद की कीमत के अनुसार फ़िल्टर करें।",
    mpStatL:"आज की ताज़ा आवक",mpStatV:"9,850 किलो · 59 फ़सलें",
    filterPrice:"मूल्य सीमा (₹ प्रति किलो)",filterCategory:"श्रेणी",filterSort:"क्रमबद्ध करें",
    catAll:"सभी उपज",catVeg:"सब्ज़ियाँ",catFruit:"फल",catGrain:"अनाज",
    sortLow:"मूल्य: कम से ज़्यादा",sortHigh:"मूल्य: ज़्यादा से कम",sortFresh:"सबसे ताज़ा पहले",
    fcKicker:"एआई मांग पूर्वानुमान",fcTitle:"कल का भाव आज जानें",
    fcDesc:"पिछले 14 दिनों के आधार पर अगले सप्ताह के भाव का अनुमान, ताकि किसान बेचने का सही समय चुन सकें।",
    fcPanelTitle:"मंडी भाव ट्रैकर",
    fcSub:"₹ प्रति किलो, पिछले 14 दिन + 7-दिन का एआई अनुमान",
    enamKicker:"eNAM नीलामी मूल्य",
    pgKicker:"प्राइस गार्ड",pgTitle:"जल्दबाज़ी में बिक्री से मुनाफ़ा न गंवाएँ",
    pgDesc:"वह न्यूनतम मूल्य तय करें जो आप स्वीकार कर सकते हैं, फिर बेचने का फ़ैसला करने से पहले उसे आज के मंडी भाव, एआई अनुमान और eNAM से जाँच लें।",
    pgModeCost:"लागत से गणना करें",pgModeDirect:"सीधे तय करें",
    pgCostLabel:"उत्पादन लागत (₹/किलो)",pgMarginLabel:"न्यूनतम लाभ मार्जिन (%)",
    pgDirectLabel:"आपका न्यूनतम मूल्य (₹/किलो)",pgFloorLabel:"आपका न्यूनतम मूल्य",
    cropTomato:"टमाटर",cropOnion:"प्याज़",cropWheat:"गेहूँ",cropPotato:"आलू",cropSpinach:"पालक",
    statCurrentL:"मौजूदा भाव",statForecastL:"7-दिन का अनुमान",statLowL:"14-दिन का निम्नतम",statHighL:"14-दिन का उच्चतम",
    opsKicker:"किसान उपकरण",opsTitle:"स्टोरेज बुक करें। अपनी बाज़ार जगह आरक्षित करें।",
    how1t:"सेवा चुनें",how1d:"कोल्ड स्टोरेज या बाज़ार-दिवस स्टॉल में से चुनें।",
    how2t:"तारीख़ और स्लॉट चुनें",how2d:"प्रवेश तिथि या स्टॉल जगह कैलेंडर पर चुनें।",
    how3t:"एसएमएस से पुष्टि पाएँ",how3d:"सुविधा या बाज़ार सीधे आपके फ़ोन पर बुकिंग की पुष्टि करता है।",
    csTitle:"❄ कोल्ड स्टोरेज बुकिंग",csDesc:"बिना बिकी उपज को खराब होने से बचाने के लिए नज़दीकी सुविधा में जगह आरक्षित करें।",
    csFrom:"प्रवेश तिथि",csQty:"मात्रा (किलो)",csConfirm:"बुकिंग की पुष्टि करें",csSuccess:"बुकिंग अनुरोध भेजा गया — सुविधा एसएमएस से पुष्टि करेगी।",
    mdTitle:"📍 बाज़ार दिवस शेड्यूलर",mdDesc:"सीधे ग्राहकों को बेचने के लिए बाज़ार, तिथि और स्टॉल जगह चुनें।",
    mdMarket:"बाज़ार स्थान",mdDate:"तिथि",mdSpot:"स्टॉल जगह",mdConfirm:"जगह आरक्षित करें",
    mdSuccess:"जगह आरक्षित — बाज़ार खुलने से 30 मिनट पहले पहुँचें।",
    mktA:"सेक्टर 12 साप्ताहिक हाट",mktB:"रिवरसाइड किसान बाज़ार",mktC:"केंद्रीय मंडी चौक",
    pfKicker:"शुरू करें",pfTitle:"अपना मुफ़्त खाता बनाएँ",
    roleFarmer:"मैं किसान / एफपीओ हूँ",roleBuyer:"मैं खरीदार हूँ",
    fldName:"पूरा नाम",fldPhone:"फ़ोन नंबर",fldLoc:"गाँव / शहर",fldSubmit:"खाता बनाएँ",
    fldAadhaar:"आधार कार्ड नंबर",fldAadhaarPh:"XXXX XXXX XXXX",
    fldAadhaarHint:"केवल पहचान सत्यापन के लिए उपयोग किया जाता है। आपका 12-अंकीय आधार नंबर छुपाया जाता है और कभी सादे टेक्स्ट में संग्रहीत नहीं किया जाता।",
    fldAadhaarError:"मान्य 12-अंकीय आधार नंबर दर्ज करें।",
    profileSuccess:"खाता विवरण सबमिट किया गया — हम आपके आधार को सत्यापित कर एसएमएस से पुष्टि करेंगे।",
    fcDaybyday:"दिन-प्रतिदिन एआई पूर्वानुमान",
    profilePhotoCaption:"महाराष्ट्र भर के किसान उत्पादक संगठनों का भरोसा",
    dpdpRibbon:"DPDP अधिनियम 2023 अनुरूप",
    privTitle:"केवल ज़रूरी जानकारी, और कुछ नहीं।",
    privBody:"हम नाम, फ़ोन, स्थान और आधार नंबर केवल पहचान सत्यापन, आपको आस-पास के खरीदारों या विक्रेताओं से जोड़ने, और बुकिंग की पुष्टि के लिए लेते हैं। आपका आधार नंबर स्क्रीन पर छुपाया जाता है और कभी सादे टेक्स्ट में संग्रहीत या साझा नहीं किया जाता। यह भारत के DPDP अधिनियम, 2023 के डेटा-न्यूनीकरण सिद्धांतों के अनुरूप बनाया गया है।",
    fsKicker:"रोडमैप",fsTitle:"आगे क्या",
    fs1t:"मार्ग अनुकूलन",fs1d:"लॉजिस्टिक्स लागत घटाने के लिए एआई-आधारित डिलीवरी मार्ग।",
    fs2t:"पूर्ण क्षेत्रीय भाषाएँ",fs2d:"हिंदी के अलावा मराठी, तमिल, तेलुगु आदि जोड़े जाएंगे।",
    fs3t:"लाइव लॉजिस्टिक्स पार्टनर",fs3d:"डिलीवरी और परिवहन प्रदाताओं के साथ रीयल-टाइम एकीकरण।",
    fs4t:"सत्यापित एफपीओ ऑनबोर्डिंग",fs4d:"किसान उत्पादक संगठनों के लिए केवाईसी-समर्थित सत्यापन।",
    footDesc:"SIH26033 के लिए बनाया गया एक सीधा बाज़ार — किसानों और एफपीओ को बिचौलियों के बिना खरीदारों से जोड़ता है।",
    footContact:"संपर्क",footTeam:"टीम प्रस्तुति · स्मार्ट इंडिया हैकाथॉन 2026 · थीम: कृषि, खाद्य एवं ग्रामीण विकास",
    footTag:"खेत से सीधे, आपके हाथ में",
    exKicker:"निर्यात के अवसर",exTitle:"मंडी से आगे बेचें — मांग के अनुसार निर्यात करें",exDesc:"देखें कि विदेशी खरीदार अभी कौन-सी फ़सलें चाहते हैं, आज की मंडी दर से कितना अधिक मूल्य मिलेगा, और किन कागज़ातों की ज़रूरत है — फिर अपनी उपज पंजीकृत करें और किसी गंतव्य से मिलान करवाएँ।",exFilterCategory:"श्रेणी",exFilterDemand:"मांग स्तर",exFilterSort:"इस अनुसार क्रमबद्ध करें",exDemandAll:"सभी मांग स्तर",exDemandHigh:"उच्च मांग",exDemandMedium:"मध्यम मांग",exDemandLow:"कम मांग",exSortDemand:"सबसे अधिक मांग पहले",exSortPremiumHigh:"निर्यात प्रीमियम: अधिक से कम",exSortPremiumLow:"निर्यात प्रीमियम: कम से अधिक",exFormTitle:"📦 निर्यात के लिए उपज पंजीकृत करें",exFormDesc:"हमें बताएं आपके पास क्या है — हम उसे उस फ़सल के लिए सबसे अच्छा भुगतान करने वाले विदेशी गंतव्य से मिलाएंगे।",exFieldCrop:"फ़सल",exFieldQty:"मात्रा (किलो)",exFieldGrade:"गुणवत्ता ग्रेड",exGradeA:"निर्यात ग्रेड A",exGradeB:"ग्रेड B",exGradeStd:"मानक",exSubmit:"मुझे खरीदार से मिलाएं",exSuccess:"निर्यात के लिए सूचीबद्ध — नीचे एक खरीदार से मिलान हुआ। हमारी टीम पिकअप और कागज़ी कार्रवाई की पुष्टि के लिए संपर्क करेगी।",exMyListingsTitle:"मेरी निर्यात सूचियाँ",exRibbon:"उदाहरणात्मक डेमो डेटा",exNoteTitle:"निर्यात मिलान कैसे काम करता है",exNoteBody:"यहाँ दिखाए गए मांग स्तर, गंतव्य देश और मूल्य प्रीमियम इस प्रोटोटाइप के लिए उदाहरणात्मक अनुमान हैं — लाइव व्यापार डेटा नहीं। उत्पादन में यह मॉड्यूल APEDA/DGFT व्यापार आँकड़ों और वास्तविक खरीदार मांग फ़ीड से जुड़कर प्रत्येक सूची को सत्यापित आयातक तक पहुँचाएगा।",wxKicker:"लाइव मौसम",wxTitle:"आपकी मंडी के लिए मौसम पूर्वानुमान",wxDesc:"मानचित्र पर किसी पिन पर टैप करें या किसी भी गाँव, शहर या मंडी को खोजें — बारिश, तापमान, नमी और हवा सहित 5-दिन का पूर्वानुमान देखें — ताकि आप जान सकें कि कटाई, छिड़काव या बाज़ार जाने का सबसे अच्छा दिन कौन सा है।",wxSearchPh:"गाँव, शहर या मंडी खोजें…",wxSearchBtn:"खोजें",wxLocateBtn:"📍 मेरा स्थान उपयोग करें",wxMapSub:"पूर्वानुमान देखने के लिए किसी पिन पर टैप करें",wxDaybyday:"5-दिन का पूर्वानुमान",wxHumidity:"नमी",wxWind:"हवा",wxRainChance:"बारिश की संभावना",
    navDelivery:"डिलीवरी",buyBtn:"कार्ट में डालें",dlKicker:"होम डिलीवरी",dlTitle:"खेत की ताज़ी उपज, आपके दरवाज़े तक",dlDesc:"मार्केटप्लेस से जोड़ी गई फ़सलें देखें, बताएं कहाँ डिलीवर करना है, और अपना ऑर्डर दें — मंडी जाने की ज़रूरत नहीं।",dlCartTitle:"आपकी कार्ट",dlFieldName:"पूरा नाम",dlFieldPhone:"फ़ोन नंबर",dlFieldAddress:"डिलीवरी पता",dlFieldCity:"शहर / गाँव",dlFieldPincode:"पिनकोड",dlPlaceOrder:"ऑर्डर दें",dlSubtotal:"उप-योग",dlDeliveryFee:"डिलीवरी शुल्क",dlTotal:"कुल",dlOrderSuccess:"ऑर्डर दिया गया — किसान/FPO को सूचित किया जाएगा और आपकी डिलीवरी SMS द्वारा पुष्ट की जाएगी।",dlMyOrdersTitle:"मेरे ऑर्डर",dlRibbon:"उदाहरणात्मक डेमो डेटा",dlNoteTitle:"डिलीवरी कैसे काम करती है",dlNoteBody:"यहाँ दिखाया गया डिलीवरी शुल्क और समय इस प्रोटोटाइप के लिए उदाहरणात्मक है। उत्पादन में यह मॉड्यूल स्थानीय लॉजिस्टिक्स/कूरियर पार्टनर्स से जुड़कर हर ऑर्डर को निकटतम सत्यापित किसान या FPO से खरीदार के पते तक पहुंचाएगा।",
    navCompany:"कंपनियों को बेचें",
    cbKicker:"सीधे कंपनी को",cbTitle:"कंपनियाँ अपनी ज़रूरत बताती हैं — आप सीधे आपूर्ति करें",
    cbDesc:"खाद्य कंपनियाँ, मिलें और निर्यातक बताते हैं कि उन्हें कौन-सी फ़सल, कितनी मात्रा और किस कीमत पर चाहिए। सीधे अपना प्रस्ताव भेजें और मंडी व हर बिचौलिए को बीच से हटाएं।",
    cbFilterCategory:"श्रेणी",cbFilterUrgency:"आवश्यकता",cbFilterSort:"इस अनुसार क्रमबद्ध करें",
    cbUrgencyAll:"सभी आवश्यकताएं",cbUrgencyHigh:"तत्काल आवश्यकता",cbUrgencyMedium:"खुली आवश्यकता",cbUrgencyLow:"निरंतर आवश्यकता",
    cbSortUrgency:"सबसे तत्काल पहले",cbSortPriceHigh:"प्रस्तावित मूल्य: अधिक से कम",cbSortPriceLow:"प्रस्तावित मूल्य: कम से अधिक",
    cbRoleFarmer:"मैं किसान हूँ",cbRoleCompany:"मैं कंपनी हूँ",
    cbRespondTitle:"🤝 आपूर्ति की पेशकश करें",cbRespondDesc:"नीचे किसी खुली आवश्यकता को चुनें और अपनी आपूर्ति मात्रा व कीमत भेजें — कंपनी को सीधे सूचित किया जाएगा।",
    cbFieldRequirement:"आवश्यकता",cbFieldSupplyQty:"आप कितनी आपूर्ति कर सकते हैं (किलो)",cbFieldYourPrice:"आपकी कीमत (₹/किलो)",
    cbRespondSubmit:"कंपनी को प्रस्ताव भेजें",
    cbRespondSuccess:"प्रस्ताव भेजा गया — कंपनी सीधे आपसे पिकअप और भुगतान की पुष्टि करेगी।",
    cbMyResponsesTitle:"मेरे भेजे गए प्रस्ताव",
    cbPostTitle:"📋 एक आवश्यकता पोस्ट करें",cbPostDesc:"किसानों को बताएं कि आपको वास्तव में क्या चाहिए — यह तुरंत ऊपर की सूची में दिखेगा ताकि वे सीधे आपसे संपर्क कर सकें।",
    cbFieldCompanyName:"कंपनी का नाम",cbFieldCropNeeded:"आवश्यक फ़सल",cbFieldQtyNeeded:"आवश्यक मात्रा (किलो)",
    cbFieldOfferPrice:"आपकी प्रस्तावित कीमत (₹/किलो)",cbFieldDeadline:"कब तक चाहिए",cbFieldLocation:"पिकअप स्थान",
    cbPostSubmit:"आवश्यकता पोस्ट करें",
    cbPostSuccess:"आवश्यकता पोस्ट हुई — किसान इसे तुरंत देख और जवाब दे सकते हैं।",
    cbMyPostedTitle:"मेरी पोस्ट की गई आवश्यकताएं",
    cbRibbon:"उदाहरणात्मक डेमो डेटा",cbNoteTitle:"सीधे कंपनी को बेचना कैसे काम करता है",
    cbNoteBody:"यहाँ दिखाई गई आवश्यकताएं, प्रस्तावित मूल्य और पूर्ति प्रतिशत इस प्रोटोटाइप के लिए उदाहरणात्मक हैं — वास्तविक कंपनी डेटा नहीं। उत्पादन में यह मॉड्यूल सत्यापित कंपनियों को वास्तविक मांग पोस्ट करने देगा, आस-पास के मिलते-जुलते किसानों को तुरंत सूचित करेगा, और पिकअप व भुगतान को दोनों के बीच सीधे भेजेगा — मंडी कमीशन एजेंटों और अन्य बिचौलियों को पूरी तरह हटाकर।",
    ql5t:"किसान समुदाय",ql5d:"बड़े सौदों के लिए आस-पास के किसानों के साथ उपज इकट्ठा करें।",
    navCommunity:"समुदाय",
    cmKicker:"किसान समुदाय",cmTitle:"अकेले आप एक आवाज़ हैं। साथ जुड़कर, आप एक मंडी हैं।",
    cmDesc:"अपनी फ़सल उगाने वाले आस-पास के किसानों के साथ किसी समूह में शामिल हों या नया समूह शुरू करें। हर सदस्य की मात्रा एक साझा लॉट में जुड़ती है — और बड़ा जुटा हुआ लॉट कंपनियों व थोक खरीदारों के साथ बेहतर मोलभाव की ताकत देता है, अकेले बेचने वाले किसी एक किसान से कहीं अधिक।",
    cmFilterCategory:"श्रेणी",cmFilterStatus:"स्थिति",cmFilterSort:"इस अनुसार क्रमबद्ध करें",
    cmStatusAll:"सभी समूह",cmStatusReady:"खरीदारों के लिए तैयार",cmStatusForming:"अभी जुट रही है",
    cmSortProgress:"सबसे अधिक जुटा हुआ पहले",cmSortMembers:"सबसे अधिक सदस्यों वाला पहले",cmSortPriceHigh:"मूल्य: अधिक से कम",cmSortPriceLow:"मूल्य: कम से अधिक",
    cmRoleJoin:"समूह में शामिल हों",cmRoleCreate:"समूह शुरू करें",cmRoleBuyer:"मैं एक खरीदार हूं",
    cmJoinTitle:"🤝 अपनी उपज एक समूह में जोड़ें",cmJoinDesc:"नीचे से एक समूह चुनें और अपनी योगदान मात्रा जोड़ें — यह सीधे साझा कुल मात्रा में जुड़ जाती है जिससे सभी को लाभ होता है।",
    cmFieldGroup:"समूह",cmFieldJoinQty:"आपकी योगदान मात्रा (किग्रा)",
    cmJoinSubmit:"पूल में जोड़ें",
    cmJoinSuccess:"जोड़ा गया — अब आपकी मात्रा इस समूह के जुटे हुए लॉट में गिनी जाएगी।",
    cmMyJoinedTitle:"मैं जिन समूहों में शामिल हुआ",
    cmCreateTitle:"🚜 नया समूह शुरू करें",cmCreateDesc:"अभी तक आपकी फ़सल और गांव के लिए कोई समूह नहीं? एक शुरू करें — यह तुरंत ऊपर सूचीबद्ध हो जाएगा ताकि आस-पास के किसान इसे ढूंढकर शामिल हो सकें।",
    cmFieldGroupName:"समूह का नाम",cmFieldCrop:"फ़सल",cmFieldVillage:"गांव / शहर",
    cmFieldTarget:"लक्षित पूल मात्रा (किग्रा)",cmFieldStartQty:"आपकी शुरुआती मात्रा (किग्रा)",cmFieldAskPrice:"आप जो मूल्य मांगना चाहते हैं (₹/किग्रा)",
    cmCreateSubmit:"यह समूह शुरू करें",
    cmCreateSuccess:"समूह शुरू हो गया — अब यह आस-पास के किसानों के शामिल होने के लिए ऊपर सूचीबद्ध है।",
    cmMyCreatedTitle:"मैंने शुरू किए समूह",
    cmBuyerTitle:"🏭 जुटे हुए लॉट में रुचि दिखाएं",cmBuyerDesc:"ऊपर समूह देखें — जिन पर \"खरीदारों के लिए तैयार\" लिखा है वे अपने लक्ष्य तक पहुंच चुके हैं। अपनी चाही गई मात्रा और प्रस्तावित मूल्य सीधे समूह को भेजें।",
    cmFieldBuyerQty:"आपको चाहिए मात्रा (किग्रा)",cmFieldBuyerPrice:"आपका प्रस्तावित मूल्य (₹/किग्रा)",
    cmBuyerSubmit:"समूह को रुचि भेजें",
    cmBuyerSuccess:"रुचि भेजी गई — समूह के सदस्यों को सूचित किया जाएगा और वे सीधे आपसे पिकअप व भुगतान तय कर सकते हैं।",
    cmMyInterestsTitle:"मेरी भेजी गई रुचियां",
    cmRibbon:"उदाहरणात्मक डेमो डेटा",cmNoteTitle:"समूह में जुड़कर बेचना कैसे काम करता है",
    cmNoteBody:"यहाँ दिखाए गए समूह, जुटी हुई मात्राएं और सदस्य संख्या इस प्रोटोटाइप के लिए उदाहरणात्मक हैं — वास्तविक डेटा नहीं। उत्पादन में यह मॉड्यूल सत्यापित किसानों को वास्तविक गांव/फ़सल समूह बनाने देगा, हर सदस्य के योगदान को स्वतः जोड़ेगा, और साझा लॉट को कंपनियों व थोक खरीदारों तक एक ही सूची के रूप में पहुंचाएगा — जिससे छोटे किसानों को एक बड़े विक्रेता जितनी मोलभाव की ताकत मिलेगी।"
  },
  te:{
    brand:'ఖేత్‌సేతు',tagline:'పొలం నుంచి నేరుగా మీకు',navHome:'హోమ్',navMarket:'మార్కెట్',navForecast:'ధర అంచనా',navWeather:'వాతావరణం',navExport:'ఎగుమతి',navServices:'సేవలను బుక్ చేయండి',navProfile:'ప్రారంభించండి',navcta:'ఉచితంగా చేరండి',
    heroTitle:'మధ్యవర్తులను తొలగించండి. <em>రైతుకు న్యాయమైన వాటాను అందించండి.</em>',heroLead:'రైతులు మరియు FPOలను కొనుగోలుదారులతో నేరుగా కలిపే డిజిటల్ మండీ — లాజిస్టిక్స్, కోల్డ్ స్టోరేజ్, మార్కెట్ స్లాట్లు మరియు AI ధర అంచనాలతో.',heroTag1:'ధృవీకరించిన రైతులు',heroTag2:'నేరుగా మండీ',heroTag3:'AI ధర హెచ్చరికలు',heroTag4:'DPDP సిద్ధం ✓',ctaFarmer:'నేను రైతు / FPO',ctaBuyer:'నేను కొనుగోలుదారుని',heroFloatCrop:'ఈరోజు టమాటా ధర',heroFloatPrice:'₹32/కిలో',heroFloatTrend:'▲ నిన్నటి కంటే 6% ఎక్కువ',
    splitTitle:'₹100 టమాటా అమ్మకాలలో నిజంగా ఎక్కడికి వెళ్తుంది',splitOldLabel:'సాంప్రదాయ గొలుసు',splitNewLabel:'KhetSetu ప్రత్యక్షం',legFarmer:'రైతు వాటా',legMid:'మధ్యవర్తులు',legLog:'లాజిస్టిక్స్',legNew:'రైతు వాటా (ప్రత్యక్షం)',ql1t:'మార్కెట్',ql1d:'తాజా పంటలను ధర ప్రకారం చూడండి.',ql2t:'ధర అంచనా',ql2d:'రాబోయే వారానికి AI అంచనా ధరలు.',ql3t:'సేవలను బుక్ చేయండి',ql3d:'కోల్డ్ స్టోరేజ్ మరియు మార్కెట్ స్టాళ్లను రిజర్వ్ చేయండి.',ql4t:'ప్రారంభించండి',ql4d:'ఉచిత రైతు లేదా కొనుగోలుదారు ఖాతా సృష్టించండి.',qlGo:'తెరవండి →',
    tsKicker:'పొలం నుంచి స్వరాలు',tsTitle:'రైతులు ఏమంటున్నారు',mpKicker:'మార్కెట్',mpTitle:'పొలం నుంచి నేరుగా తాజా పంట',mpDesc:'మీకు సమీపంలోని ధృవీకరించిన రైతులు మరియు FPOల పంటలను చూడండి.',filterPrice:'ధర పరిధి (₹/కిలో)',filterCategory:'వర్గం',filterSort:'క్రమబద్ధీకరించండి',catAll:'అన్ని పంటలు',catVeg:'కూరగాయలు',catFruit:'పండ్లు',catGrain:'ధాన్యాలు',sortLow:'ధర: తక్కువ నుంచి ఎక్కువ',sortHigh:'ధర: ఎక్కువ నుంచి తక్కువ',sortFresh:'తాజావి ముందు',
    fcKicker:'AI డిమాండ్ అంచనా',fcTitle:'రేపటి ధరను ఈరోజే తెలుసుకోండి',fcPanelTitle:'మండీ ధర ట్రాకర్',fcSub:'కిలోకు ధర, గత 14 రోజులు + 7 రోజుల AI అంచనా',cropTomato:'టమాటా',cropOnion:'ఉల్లిపాయ',cropWheat:'గోధుమ',statCurrentL:'ప్రస్తుత ధర',statForecastL:'7 రోజుల అంచనా',statLowL:'14 రోజుల కనిష్ఠం',statHighL:'14 రోజుల గరిష్ఠం',
    opsKicker:'రైతు సాధనాలు',opsTitle:'స్టోరేజ్ బుక్ చేయండి. మార్కెట్ స్థలాన్ని రిజర్వ్ చేయండి.',pfKicker:'ప్రారంభించండి',pfTitle:'మీ ఉచిత ఖాతాను సృష్టించండి',roleFarmer:'నేను రైతు / FPO',roleBuyer:'నేను కొనుగోలుదారుని',fldName:'పూర్తి పేరు',fldPhone:'ఫోన్ నంబర్',fldLoc:'గ్రామం / నగరం',fldSubmit:'ఖాతా సృష్టించండి',footContact:'సంప్రదించండి',footTag:'పొలం నుంచి నేరుగా మీకు',
    fldAadhaar:'ఆధార్ కార్డ్ నంబర్',fldAadhaarPh:'XXXX XXXX XXXX',fldAadhaarHint:'గుర్తింపు ధృవీకరణ కోసం మాత్రమే ఉపయోగించబడుతుంది. మీ 12-అంకెల ఆధార్ నంబర్ మాస్క్ చేయబడుతుంది మరియు ఎప్పుడూ ప్లెయిన్ టెక్స్ట్‌లో నిల్వ చేయబడదు.',fldAadhaarError:'చెల్లుబాటు అయ్యే 12-అంకెల ఆధార్ నంబర్‌ను నమోదు చేయండి.',profileSuccess:'ఖాతా వివరాలు సమర్పించబడ్డాయి — మేము మీ ఆధార్‌ను ధృవీకరించి SMS ద్వారా నిర్ధారిస్తాము.',fcDaybyday:'రోజువారీ AI అంచనా',
    eyebrow:'SIH26033 · వినియోగదారుల వ్యవహారాలు, ఆహారం & ప్రజా పంపిణీ మంత్రిత్వ శాఖ',splitSub:'సాధారణ 4-మధ్యవర్తి సరఫరా గొలుసు vs. KhetSetu ప్రత్యక్ష మోడల్ ఆధారంగా',
    t1q:'ఇంతకుముందు మండి నాకు ధరలో ఒక చిన్న భాగం మాత్రమే చెల్లించేది. ఇప్పుడు నేను నేరుగా కొనుగోలుదారుకు అమ్ముతాను.',t1n:'రమేష్ కుమార్',t1l:'నాసిక్ · టమోటా రైతు',
    t2q:'నా ఫోన్ నుండి కోల్డ్ స్టోరేజ్ బుక్ చేయడం వల్ల గత వర్షాకాలంలో రెండు టన్నుల ఉల్లిపాయలు రక్షించబడ్డాయి.',t2n:'సునీత దేవి',t2l:'నాగ్‌పూర్ · ఉల్లి FPO',
    t3q:'ధరల అంచనా నా మామిడిపండ్లను ఏ వారంలో అమ్మాలో ఖచ్చితంగా చెబుతుంది.',t3n:'అనిల్ పాటిల్',t3l:'రత్నగిరి · మామిడి రైతు',
    mpStatL:'ఈరోజు తాజా రాక',mpStatV:'9,850 కేజీ · 59 పంటలు',
    fcDesc:'గత 14 రోజుల ఆధారంగా ఒక ట్రెండ్ మోడల్ వచ్చే వారం ధరను అంచనా వేస్తుంది, తద్వారా రైతులు ఎప్పుడు అమ్మాలో మరియు కొనుగోలుదారులు కొనుగోళ్లను ఎప్పుడు ప్లాన్ చేయాలో నిర్ణయించుకోవచ్చు.',
    how1t:'సేవను ఎంచుకోండి',how1d:'కోల్డ్ స్టోరేజ్ లేదా మార్కెట్-డే స్టాల్‌ను ఎంచుకోండి.',how2t:'మీ తేదీ & స్లాట్‌ను ఎంచుకోండి',how2d:'క్యాలెండర్‌లో మీ ప్రవేశ తేదీ లేదా స్టాల్ స్థానాన్ని ఎంచుకోండి.',how3t:'SMS ద్వారా నిర్ధారణ పొందండి',how3d:'సదుపాయం లేదా మార్కెట్ మీ బుకింగ్‌ను నేరుగా మీ ఫోన్‌కు నిర్ధారిస్తుంది.',
    csTitle:'❄ కోల్డ్ స్టోరేజ్ బుకింగ్',csDesc:'అమ్ముడుకాని ఉత్పత్తులను చెడిపోకుండా కాపాడేందుకు సమీప సదుపాయంలో స్థలం రిజర్వ్ చేయండి.',csFrom:'ప్రవేశ తేదీ',csQty:'పరిమాణం (కేజీ)',csConfirm:'బుకింగ్ నిర్ధారించండి',csSuccess:'బుకింగ్ అభ్యర్థన పంపబడింది — సదుపాయం SMS ద్వారా నిర్ధారిస్తుంది.',
    mdTitle:'📍 మార్కెట్ డే షెడ్యూలర్',mdDesc:'వాక్-ఇన్ కొనుగోలుదారులకు నేరుగా అమ్మడానికి మార్కెట్, తేదీ మరియు స్టాల్ స్థానాన్ని ఎంచుకోండి.',mdMarket:'మార్కెట్ స్థానం',mdDate:'తేదీ',mdSpot:'స్టాల్ స్థానం',mdConfirm:'స్థానాన్ని రిజర్వ్ చేయండి',mdSuccess:'స్థానం రిజర్వ్ చేయబడింది — మార్కెట్ తెరవడానికి 30 నిమిషాల ముందు రండి.',
    fsKicker:'రోడ్‌మ్యాప్',fsTitle:'తర్వాత ఏమిటి',fs1t:'మార్గ ఆప్టిమైజేషన్',fs1d:'లాజిస్టిక్స్ ఖర్చును మరింత తగ్గించడానికి AI-ప్రణాళికాబద్ధమైన డెలివరీ మార్గాలు.',fs2t:'పూర్తి ప్రాంతీయ భాషలు',fs2d:'హిందీ దాటి మరాఠీ, తమిళం, తెలుగు మరియు మరిన్ని భాషలకు విస్తరణ.',fs3t:'లైవ్ లాజిస్టిక్స్ భాగస్వాములు',fs3d:'డెలివరీ మరియు రవాణా ప్రొవైడర్లతో నిజ-సమయ ఏకీకరణ.',fs4t:'ధృవీకరించబడిన FPO ఆన్‌బోర్డింగ్',fs4d:'రైతు ఉత్పత్తిదారుల సంస్థల కోసం KYC-ఆధారిత ధృవీకరణ.',
    dpdpRibbon:'DPDP చట్టం 2023కి సిద్ధం',privTitle:'అవసరమైనది మాత్రమే, మరేమీ కాదు.',privBody:'కొనుగోలుదారులు లేదా విక్రేతలతో మిమ్మల్ని సమీపంలో కలపడానికి మరియు బుకింగ్‌లను నిర్ధారించడానికి మేము పేరు, ఫోన్ మరియు స్థానాన్ని మాత్రమే సేకరిస్తాము. ఆర్థిక డేటా, ID రుజువు లేదా బ్రౌజింగ్ చరిత్ర నిల్వ చేయబడదు. భారతదేశ DPDP చట్టం, 2023 ప్రకారం డేటా-కనిష్టీకరణ సూత్రాలను అనుసరించి రూపొందించబడింది.',profilePhotoCaption:'మహారాష్ట్ర అంతటా రైతు ఉత్పత్తిదారుల సంస్థలచే విశ్వసించబడింది',
    footDesc:'SIH26033 కోసం రూపొందించిన ప్రత్యక్ష మార్కెట్‌ప్లేస్ — మధ్యవర్తులు లేకుండా రైతులు మరియు FPOలను కొనుగోలుదారులతో కలుపుతుంది.',footTeam:'టీమ్ సమర్పణ · స్మార్ట్ ఇండియా హ్యాకథాన్ 2026 · థీమ్: వ్యవసాయం, ఆహారం మరియు గ్రామీణాభివృద్ధి',
    exKicker:'ఎగుమతి అవకాశాలు',exTitle:'మండి దాటి అమ్మండి — డిమాండ్ ప్రకారం ఎగుమతి చేయండి',exDesc:"విదేశీ కొనుగోలుదారులు ఇప్పుడు ఏ పంటలు కోరుకుంటున్నారో, నేటి మండి ధర కంటే ఎంత ఎక్కువ ధర లభిస్తుందో, మరియు అవసరమైన పత్రాలను చూడండి — తర్వాత మీ ఉత్పత్తిని నమోదు చేసి ఒక గమ్యస్థానంతో సరిపోల్చుకోండి.",exFilterCategory:'వర్గం',exFilterDemand:'డిమాండ్ స్థాయి',exFilterSort:'దీని ప్రకారం క్రమబద్ధీకరించండి',exDemandAll:'అన్ని డిమాండ్ స్థాయిలు',exDemandHigh:'అధిక డిమాండ్',exDemandMedium:'మధ్యస్థ డిమాండ్',exDemandLow:'తక్కువ డిమాండ్',exSortDemand:'అత్యధిక డిమాండ్ మొదట',exSortPremiumHigh:'ఎగుమతి ప్రీమియం: ఎక్కువ నుండి తక్కువ',exSortPremiumLow:'ఎగుమతి ప్రీమియం: తక్కువ నుండి ఎక్కువ',exFormTitle:'📦 ఎగుమతి కోసం ఉత్పత్తిని నమోదు చేయండి',exFormDesc:"మీ వద్ద ఏమి ఉందో మాకు చెప్పండి — ఆ పంటకు అత్యధిక చెల్లింపు చేసే విదేశీ గమ్యస్థానంతో మేము దానిని సరిపోల్చుతాము.",exFieldCrop:'పంట',exFieldQty:'పరిమాణం (కిలోలు)',exFieldGrade:'నాణ్యత గ్రేడ్',exGradeA:'ఎగుమతి గ్రేడ్ A',exGradeB:'గ్రేడ్ B',exGradeStd:'ప్రామాణికం',exSubmit:'నన్ను కొనుగోలుదారుతో సరిపోల్చండి',exSuccess:"ఎగుమతి కోసం జాబితా చేయబడింది — క్రింద ఒక కొనుగోలుదారుతో సరిపోల్చబడింది. పికప్ మరియు పత్రాలను నిర్ధారించడానికి మా బృందం సంప్రదిస్తుంది.",exMyListingsTitle:'నా ఎగుమతి జాబితాలు',exRibbon:'ఉదాహరణాత్మక డెమో డేటా',exNoteTitle:'ఎగుమతి సరిపోలిక ఎలా పనిచేస్తుంది',exNoteBody:"ఇక్కడ చూపిన డిమాండ్ స్థాయిలు, గమ్యస్థాన దేశాలు మరియు ధర ప్రీమియంలు ఈ ప్రోటోటైప్ కోసం ఉదాహరణాత్మక అంచనాలు మాత్రమే — ప్రత్యక్ష వాణిజ్య డేటా కాదు. ఉత్పత్తిలో ఈ మాడ్యూల్ APEDA/DGFT వాణిజ్య గణాంకాలు మరియు నిజమైన కొనుగోలుదారు డిమాండ్ ఫీడ్‌లతో అనుసంధానమై ప్రతి జాబితాను ధృవీకరించబడిన దిగుమతిదారుకు మళ్ళిస్తుంది.",wxKicker:'ప్రత్యక్ష వాతావరణం',wxTitle:'మీ మండి కోసం వాతావరణ సూచన',wxDesc:"మ్యాప్‌లో ఒక పిన్‌ను నొక్కండి లేదా ఏదైనా గ్రామం, నగరం లేదా మండిని శోధించి 5-రోజుల సూచనను చూడండి — వర్షం, ఉష్ణోగ్రత, తేమ మరియు గాలి — తద్వారా పంట కోతకు, పిచికారీకి లేదా మార్కెట్‌కు వెళ్లడానికి ఉత్తమ రోజు ఏదో మీకు తెలుస్తుంది.",wxSearchPh:'గ్రామం, నగరం లేదా మండిని శోధించండి…',wxSearchBtn:'శోధించండి',wxLocateBtn:'📍 నా స్థానాన్ని ఉపయోగించండి',wxMapSub:'సూచన కోసం ఒక పిన్‌ను నొక్కండి',wxDaybyday:'5-రోజుల సూచన',wxHumidity:'తేమ',wxWind:'గాలి',wxRainChance:'వర్షం అవకాశం',
    navDelivery:'డెలివరీ',buyBtn:'కార్ట్‌కు జోడించండి',dlKicker:'హోమ్ డెలివరీ',dlTitle:'పొలం నుండి తాజా ఉత్పత్తులు, మీ ఇంటికి డెలివరీ',dlDesc:"మార్కెట్‌ప్లేస్ నుండి జోడించిన పంటలను చూడండి, డెలివరీ ఎక్కడకు కావాలో చెప్పండి, మరియు మీ ఆర్డర్‌ను ఇవ్వండి — మండికి వెళ్లాల్సిన అవసరం లేదు.",dlCartTitle:'మీ కార్ట్',dlFieldName:'పూర్తి పేరు',dlFieldPhone:'ఫోన్ నంబర్',dlFieldAddress:'డెలివరీ చిరునామా',dlFieldCity:'నగరం / గ్రామం',dlFieldPincode:'పిన్‌కోడ్',dlPlaceOrder:'ఆర్డర్ చేయండి',dlSubtotal:'ఉప-మొత్తం',dlDeliveryFee:'డెలివరీ ఛార్జీ',dlTotal:'మొత్తం',dlOrderSuccess:"ఆర్డర్ చేయబడింది — రైతు/FPOకి తెలియజేయబడుతుంది మరియు మీ డెలివరీ SMS ద్వారా నిర్ధారించబడుతుంది.",dlMyOrdersTitle:'నా ఆర్డర్లు',dlRibbon:'ఉదాహరణాత్మక డెమో డేటా',dlNoteTitle:'డెలివరీ ఎలా పనిచేస్తుంది',dlNoteBody:"ఇక్కడ చూపిన డెలివరీ ఛార్జీ మరియు సమయం ఈ ప్రోటోటైప్ కోసం ఉదాహరణాత్మకమైనవి. ఉత్పత్తిలో ఈ మాడ్యూల్ స్థానిక లాజిస్టిక్స్/కొరియర్ భాగస్వాములతో అనుసంధానమై ప్రతి ఆర్డర్‌ను సమీప ధృవీకరించిన రైతు లేదా FPO నుండి కొనుగోలుదారు చిరునామాకు మళ్ళిస్తుంది."
  },
  ta:{
    brand:'கேத்சேது',tagline:'வயலில் இருந்து நேராக உங்களிடம்',navHome:'முகப்பு',navMarket:'சந்தை',navForecast:'விலை கணிப்பு',navWeather:'வானிலை',navExport:'ஏற்றுமதி',navServices:'சேவைகளை முன்பதிவு',navProfile:'தொடங்குங்கள்',navcta:'இலவசமாக சேருங்கள்',heroTitle:'இடைத்தரகர்களை நீக்குங்கள். <em>விவசாயியின் நியாயமான பங்கை காப்போம்.</em>',heroLead:'விவசாயிகள் மற்றும் FPOகளை வாங்குபவர்களுடன் நேரடியாக இணைக்கும் டிஜிட்டல் மண்டி — லாஜிஸ்டிக்ஸ், குளிர்சாதன சேமிப்பு, சந்தை நேரங்கள் மற்றும் AI விலை கணிப்புடன்.',heroTag1:'சரிபார்க்கப்பட்ட விவசாயிகள்',heroTag2:'நேரடி மண்டி',heroTag3:'AI விலை எச்சரிக்கைகள்',heroTag4:'DPDP தயார் ✓',ctaFarmer:'நான் விவசாயி / FPO',ctaBuyer:'நான் வாங்குபவர்',heroFloatCrop:'இன்றைய தக்காளி விலை',heroFloatPrice:'₹32/கிலோ',heroFloatTrend:'▲ நேற்றைவிட 6% அதிகம்',ql1t:'சந்தை',ql1d:'புதிய விளைபொருட்களை விலைப்படி பார்க்கவும்.',ql2t:'விலை கணிப்பு',ql2d:'அடுத்த வாரத்திற்கான AI விலை கணிப்புகள்.',ql3t:'சேவைகளை முன்பதிவு',ql3d:'குளிர்சாதன சேமிப்பு மற்றும் சந்தை கடைகளை முன்பதிவு செய்யுங்கள்.',ql4t:'தொடங்குங்கள்',ql4d:'இலவச விவசாயி அல்லது வாங்குபவர் கணக்கை உருவாக்குங்கள்.',qlGo:'திறக்கவும் →',tsKicker:'வயல்வெளி குரல்கள்',tsTitle:'விவசாயிகள் என்ன சொல்கிறார்கள்',mpKicker:'சந்தை',mpTitle:'வயலில் இருந்து நேரடி புதிய விளைபொருட்கள்',mpDesc:'அருகிலுள்ள சரிபார்க்கப்பட்ட விவசாயிகள் மற்றும் FPOகளின் விளைபொருட்களைப் பாருங்கள்.',filterPrice:'விலை வரம்பு (₹/கிலோ)',filterCategory:'வகை',filterSort:'வரிசைப்படுத்து',catAll:'அனைத்து விளைபொருட்கள்',catVeg:'காய்கறிகள்',catFruit:'பழங்கள்',catGrain:'தானியங்கள்',sortLow:'விலை: குறைவிலிருந்து அதிகம்',sortHigh:'விலை: அதிகத்திலிருந்து குறைவு',sortFresh:'புதியவை முதலில்',fcKicker:'AI தேவை கணிப்பு',fcTitle:'நாளைய விலையை இன்றே அறியுங்கள்',fcPanelTitle:'மண்டி விலை கண்காணிப்பு',fcSub:'கிலோவுக்கு விலை, கடந்த 14 நாட்கள் + 7 நாள் AI கணிப்பு',cropTomato:'தக்காளி',cropOnion:'வெங்காயம்',cropWheat:'கோதுமை',statCurrentL:'தற்போதைய விலை',statForecastL:'7 நாள் கணிப்பு',statLowL:'14 நாள் குறைந்த விலை',statHighL:'14 நாள் அதிக விலை',opsKicker:'விவசாயி கருவிகள்',opsTitle:'சேமிப்பை முன்பதிவு செய்யுங்கள். சந்தை இடத்தை ஒதுக்குங்கள்.',pfKicker:'தொடங்குங்கள்',pfTitle:'உங்கள் இலவச கணக்கை உருவாக்குங்கள்',roleFarmer:'நான் விவசாயி / FPO',roleBuyer:'நான் வாங்குபவர்',fldName:'முழுப் பெயர்',fldPhone:'தொலைபேசி எண்',fldLoc:'கிராமம் / நகரம்',fldSubmit:'கணக்கை உருவாக்கு',footContact:'தொடர்பு',footTag:'வயலில் இருந்து நேராக உங்களிடம்',
    fldAadhaar:'ஆதார் கார்டு எண்',fldAadhaarPh:'XXXX XXXX XXXX',fldAadhaarHint:'அடையாள சரிபார்ப்பிற்காக மட்டுமே பயன்படுத்தப்படுகிறது. உங்கள் 12-இலக்க ஆதார் எண் மறைக்கப்பட்டு, எந்த நேரமும் எளிய உரையில் சேமிக்கப்படாது.',fldAadhaarError:'சரியான 12-இலக்க ஆதார் எண்ணை உள்ளிடவும்.',profileSuccess:'கணக்கு விவரங்கள் சமர்ப்பிக்கப்பட்டன — உங்கள் ஆதாரை சரிபார்த்து SMS மூலம் உறுதிப்படுத்துவோம்.',fcDaybyday:'நாள்தோறும் AI கணிப்பு',
    eyebrow:'SIH26033 · நுகர்வோர் விவகாரங்கள், உணவு மற்றும் பொது விநியோக அமைச்சகம்',splitTitle:'தக்காளி விற்பனையின் ₹100 உண்மையில் எங்கு செல்கிறது',splitSub:'வழக்கமான 4-இடைத்தரகர் விநியோகச் சங்கிலிக்கும் KhetSetu நேரடி மாதிரிக்கும் இடையிலான ஒப்பீடு',splitOldLabel:'பாரம்பரிய சங்கிலி',splitNewLabel:'KhetSetu நேரடி',legFarmer:'விவசாயி பங்கு',legLog:'பணிமுட்டு',legMid:'இடைத்தரகர்கள்',legNew:'விவசாயி பங்கு (நேரடி)',
    t1q:'முன்பு மண்டி எனக்கு விலையில் ஒரு சிறு பகுதியே கொடுத்தது. இப்போது நான் நேரடியாக வாங்குபவருக்கு விற்கிறேன்.',t1n:'ரமேஷ் குமார்',t1l:'நாசிக் · தக்காளி விவசாயி',
    t2q:'என் தொலைபேசியிலிருந்து குளிர்பதன சேமிப்பை முன்பதிவு செய்தது கடந்த மழைக்காலத்தில் இரண்டு டன் வெங்காயத்தை காப்பாற்றியது.',t2n:'சுனிதா தேவி',t2l:'நாக்பூர் · வெங்காய FPO',
    t3q:'விலை முன்னறிவிப்பு எந்த வாரத்தில் என் மாம்பழங்களை விற்பது என்று சரியாகச் சொல்கிறது.',t3n:'அனில் பாட்டீல்',t3l:'ரத்னகிரி · மாம்பழ விவசாயி',
    mpStatL:'இன்றைய புதிய வரவுகள்',mpStatV:'9,850 கிலோ · 59 பயிர்கள்',
    fcDesc:'கடந்த 14 நாட்களிலிருந்து ஒரு போக்கு மாதிரி அடுத்த வார விலையை கணிக்கிறது, இதனால் விவசாயிகள் எப்போது விற்பது என்றும் வாங்குபவர்கள் கொள்முதலை எப்போது திட்டமிடுவது என்றும் முடிவு செய்யலாம்.',
    how1t:'ஒரு சேவையைத் தேர்ந்தெடுக்கவும்',how1d:'குளிர்பதன சேமிப்பு அல்லது சந்தை-நாள் அரங்கைத் தேர்ந்தெடுக்கவும்.',how2t:'உங்கள் தேதி & நேரத்தைத் தேர்ந்தெடுக்கவும்',how2d:'நாட்காட்டியில் உங்கள் நுழையும் தேதி அல்லது அரங்கு இடத்தைத் தேர்ந்தெடுக்கவும்.',how3t:'SMS மூலம் உறுதிப்படுத்தல் பெறுங்கள்',how3d:'வசதி அல்லது சந்தை உங்கள் முன்பதிவை நேரடியாக உங்கள் தொலைபேசிக்கு உறுதிப்படுத்தும்.',
    csTitle:'❄ குளிர்பதன சேமிப்பு முன்பதிவு',csDesc:'விற்பனையாகாத விளைபொருட்களை கெட்டுப்போகாமல் பாதுகாக்க அருகிலுள்ள வசதியில் இடத்தை முன்பதிவு செய்யுங்கள்.',csFrom:'நுழையும் தேதி',csQty:'அளவு (கிலோ)',csConfirm:'முன்பதிவை உறுதிப்படுத்தவும்',csSuccess:'முன்பதிவு கோரிக்கை அனுப்பப்பட்டது — வசதி SMS மூலம் உறுதிப்படுத்தும்.',
    mdTitle:'📍 சந்தை நாள் திட்டமிடல்',mdDesc:'வாக்-இன் வாங்குபவர்களுக்கு நேரடியாக விற்க சந்தை, தேதி மற்றும் அரங்கு இடத்தைத் தேர்ந்தெடுக்கவும்.',mdMarket:'சந்தை இடம்',mdDate:'தேதி',mdSpot:'அரங்கு இடம்',mdConfirm:'இடத்தை முன்பதிவு செய்யவும்',mdSuccess:'இடம் முன்பதிவு செய்யப்பட்டது — சந்தை திறப்பதற்கு 30 நிமிடங்களுக்கு முன் வாருங்கள்.',
    fsKicker:'வரைபடம்',fsTitle:'அடுத்து என்ன',fs1t:'வழி உகந்தமயமாக்கல்',fs1d:'பணிமுட்டு செலவை மேலும் குறைக்க AI-திட்டமிடப்பட்ட டெலிவரி வழிகள்.',fs2t:'முழுமையான பிராந்திய மொழிகள்',fs2d:'இந்தியை தாண்டி மராத்தி, தமிழ், தெலுங்கு மற்றும் பலவற்றிற்கு விரிவாக்கம்.',fs3t:'நேரடி பணிமுட்டு பங்குதாரர்கள்',fs3d:'டெலிவரி மற்றும் போக்குவரத்து வழங்குநர்களுடன் நிகழ்நேர ஒருங்கிணைப்பு.',fs4t:'சரிபார்க்கப்பட்ட FPO இணைப்பு',fs4d:'விவசாயி உற்பத்தியாளர் அமைப்புகளுக்கான KYC-ஆதரவு சரிபார்ப்பு.',
    dpdpRibbon:'DPDP சட்டம் 2023க்கு தயார்',privTitle:'தேவையானது மட்டும், அதற்கு மேல் எதுவும் இல்லை.',privBody:'அருகிலுள்ள வாங்குபவர்கள் அல்லது விற்பவர்களுடன் உங்களை இணைக்கவும், முன்பதிவுகளை உறுதிப்படுத்தவும் மட்டுமே நாங்கள் பெயர், தொலைபேசி எண் மற்றும் இடத்தை சேகரிக்கிறோம். நிதி தரவு, அடையாள சான்று அல்லது உலாவல் வரலாறு சேமிக்கப்படாது. இந்தியாவின் DPDP சட்டம், 2023-ன் கீழ் தரவு-குறைப்பு கொள்கைகளைப் பின்பற்றி வடிவமைக்கப்பட்டது.',profilePhotoCaption:'மகாராஷ்டிரா முழுவதும் உள்ள விவசாயி உற்பத்தியாளர் அமைப்புகளால் நம்பப்படுகிறது',
    footDesc:'SIH26033க்காக உருவாக்கப்பட்ட நேரடி சந்தை — இடைத்தரகர்கள் இல்லாமல் விவசாயிகள் மற்றும் FPOக்களை வாங்குபவர்களுடன் இணைக்கிறது.',footTeam:'குழு சமர்ப்பணம் · ஸ்மார்ட் இந்தியா ஹேக்கத்தான் 2026 · தீம்: வேளாண்மை, உணவு மற்றும் ஊரக வளர்ச்சி',
    exKicker:'ஏற்றுமதி வாய்ப்புகள்',exTitle:'மண்டியை தாண்டி விற்பனை செய்யுங்கள் — தேவைக்கேற்ப ஏற்றுமதி',exDesc:"வெளிநாட்டு வாங்குபவர்கள் இப்போது எந்த பயிர்களை விரும்புகிறார்கள், இன்றைய மண்டி விலையை விட எவ்வளவு அதிக விலை கிடைக்கும், மற்றும் தேவையான ஆவணங்களை பாருங்கள் — பின்னர் உங்கள் விளைபொருளை பதிவு செய்து ஒரு இலக்குடன் பொருத்துங்கள்.",exFilterCategory:'வகை',exFilterDemand:'தேவை நிலை',exFilterSort:'இதன் அடிப்படையில் வரிசைப்படுத்து',exDemandAll:'அனைத்து தேவை நிலைகள்',exDemandHigh:'அதிக தேவை',exDemandMedium:'நடுத்தர தேவை',exDemandLow:'குறைந்த தேவை',exSortDemand:'அதிக தேவை முதலில்',exSortPremiumHigh:'ஏற்றுமதி பிரீமியம்: அதிகத்திலிருந்து குறைவு',exSortPremiumLow:'ஏற்றுமதி பிரீமியம்: குறைவிலிருந்து அதிகம்',exFormTitle:'📦 ஏற்றுமதிக்கு விளைபொருளை பதிவு செய்யுங்கள்',exFormDesc:"உங்களிடம் என்ன இருக்கிறது என்று சொல்லுங்கள் — அந்த பயிருக்கு அதிக விலை தரும் வெளிநாட்டு இலக்குடன் நாங்கள் அதை பொருத்துவோம்.",exFieldCrop:'பயிர்',exFieldQty:'அளவு (கிலோ)',exFieldGrade:'தர வகைப்பாடு',exGradeA:'ஏற்றுமதி தரம் A',exGradeB:'தரம் B',exGradeStd:'தரநிலை',exSubmit:'எனக்கு ஒரு வாங்குபவருடன் பொருத்துங்கள்',exSuccess:"ஏற்றுமதிக்கு பட்டியலிடப்பட்டது — கீழே ஒரு வாங்குபவருடன் பொருத்தப்பட்டது. பிக்அப் மற்றும் ஆவணங்களை உறுதிப்படுத்த எங்கள் குழு தொடர்பு கொள்ளும்.",exMyListingsTitle:'எனது ஏற்றுமதி பட்டியல்கள்',exRibbon:'விளக்கமான டெமோ தரவு',exNoteTitle:'ஏற்றுமதி பொருத்தம் எப்படி வேலை செய்கிறது',exNoteBody:"இங்கே காட்டப்படும் தேவை நிலைகள், இலக்கு நாடுகள் மற்றும் விலை பிரீமியங்கள் இந்த முன்மாதிரிக்கான விளக்கமான மதிப்பீடுகள் — நேரடி வர்த்தக தரவு அல்ல. உற்பத்தியில் இந்த தொகுதி APEDA/DGFT வர்த்தக புள்ளிவிவரங்கள் மற்றும் உண்மையான வாங்குபவர் தேவை ஊட்டங்களுடன் இணைந்து ஒவ்வொரு பட்டியலையும் சரிபார்க்கப்பட்ட இறக்குமதியாளரிடம் அனுப்பும்.",wxKicker:'நேரடி வானிலை',wxTitle:'உங்கள் மண்டிக்கான வானிலை முன்னறிவிப்பு',wxDesc:"வரைபடத்தில் ஒரு பின்னை தட்டவும் அல்லது எந்த கிராமம், நகரம் அல்லது மண்டியையும் தேடி 5-நாள் முன்னறிவிப்பைப் பாருங்கள் — மழை, வெப்பநிலை, ஈரப்பதம் மற்றும் காற்று — அறுவடை, தெளிப்பு அல்லது சந்தைக்குச் செல்ல சிறந்த நாள் எது என்பதை அறிய.",wxSearchPh:'கிராமம், நகரம் அல்லது மண்டியைத் தேடுங்கள்…',wxSearchBtn:'தேடு',wxLocateBtn:'📍 எனது இருப்பிடத்தைப் பயன்படுத்து',wxMapSub:'முன்னறிவிப்பைப் பார்க்க ஒரு பின்னைத் தட்டவும்',wxDaybyday:'5-நாள் முன்னறிவிப்பு',wxHumidity:'ஈரப்பதம்',wxWind:'காற்று',wxRainChance:'மழை வாய்ப்பு',
    navDelivery:'டெலிவரி',buyBtn:'கார்ட்டில் சேர்',dlKicker:'இல்ல டெலிவரி',dlTitle:'பண்ணையிலிருந்து புதிய விளைபொருட்கள், உங்கள் வீட்டு வாசலுக்கு',dlDesc:"மார்க்கெட்பிளேஸிலிருந்து சேர்த்த பயிர்களைப் பாருங்கள், எங்கு டெலிவரி செய்ய வேண்டும் என்று சொல்லுங்கள், உங்கள் ஆர்டரை வையுங்கள் — மண்டிக்குச் செல்ல வேண்டியதில்லை.",dlCartTitle:'உங்கள் கார்ட்',dlFieldName:'முழு பெயர்',dlFieldPhone:'தொலைபேசி எண்',dlFieldAddress:'டெலிவரி முகவரி',dlFieldCity:'நகரம் / கிராமம்',dlFieldPincode:'பின்கோட்',dlPlaceOrder:'ஆர்டர் செய்யுங்கள்',dlSubtotal:'துணைத்தொகை',dlDeliveryFee:'டெலிவரி கட்டணம்',dlTotal:'மொத்தம்',dlOrderSuccess:"ஆர்டர் வைக்கப்பட்டது — விவசாயி/FPOக்கு தெரிவிக்கப்படும், உங்கள் டெலிவரி SMS மூலம் உறுதிசெய்யப்படும்.",dlMyOrdersTitle:'எனது ஆர்டர்கள்',dlRibbon:'விளக்கமான டெமோ தரவு',dlNoteTitle:'டெலிவரி எப்படி வேலை செய்கிறது',dlNoteBody:"இங்கே காட்டப்படும் டெலிவரி கட்டணம் மற்றும் காலஅளவு இந்த முன்மாதிரிக்கான விளக்கமான மதிப்பீடுகள். உற்பத்தியில் இந்த தொகுதி உள்ளூர் லாஜிஸ்டிக்ஸ்/கூரியர் பங்குதாரர்களுடன் இணைந்து ஒவ்வொரு ஆர்டரையும் அருகிலுள்ள சரிபார்க்கப்பட்ட விவசாயி அல்லது FPOவிலிருந்து வாங்குபவரின் முகவரிக்கு அனுப்பும்."
  },
  ml:{
    brand:'ഖേത്സേതു',tagline:'കൃഷിയിടത്തിൽ നിന്ന് നേരിട്ട് നിങ്ങളിലേക്ക്',navHome:'ഹോം',navMarket:'മാർക്കറ്റ്‌പ്ലേസ്',navForecast:'വില പ്രവചനം',navWeather:'കാലാവസ്ഥ',navExport:'കയറ്റുമതി',navServices:'സേവനങ്ങൾ ബുക്ക് ചെയ്യുക',navProfile:'ആരംഭിക്കുക',navcta:'സൗജന്യമായി ചേരുക',heroTitle:'ഇടനിലക്കാരെ ഒഴിവാക്കൂ. <em>കർഷകന്റെ ന്യായമായ വിഹിതം സംരക്ഷിക്കൂ.</em>',heroLead:'കർഷകരെയും FPOകളെയും വാങ്ങുന്നവരുമായി നേരിട്ട് ബന്ധിപ്പിക്കുന്ന ഡിജിറ്റൽ മണ്ഡി — ലോജിസ്റ്റിക്സ്, കോൾഡ് സ്റ്റോറേജ്, മാർക്കറ്റ് സ്ലോട്ടുകൾ, AI വില പ്രവചനം എന്നിവയോടെ.',heroTag1:'പരിശോധിച്ച കർഷകർ',heroTag2:'നേരിട്ടുള്ള മണ്ഡി',heroTag3:'AI വില അലർട്ടുകൾ',heroTag4:'DPDP തയ്യാറാണ് ✓',ctaFarmer:'ഞാൻ കർഷകൻ / FPO',ctaBuyer:'ഞാൻ വാങ്ങുന്നയാൾ',heroFloatCrop:'ഇന്നത്തെ തക്കാളി വില',heroFloatPrice:'₹32/കിലോ',heroFloatTrend:'▲ ഇന്നലെയേക്കാൾ 6% കൂടുതൽ',ql1t:'മാർക്കറ്റ്‌പ്ലേസ്',ql1d:'പുതിയ വിളകൾ വില അനുസരിച്ച് കാണുക.',ql2t:'വില പ്രവചനം',ql2d:'അടുത്ത ആഴ്ചയ്ക്കുള്ള AI വില പ്രവചനങ്ങൾ.',ql3t:'സേവനങ്ങൾ ബുക്ക് ചെയ്യുക',ql3d:'കോൾഡ് സ്റ്റോറേജും മാർക്കറ്റ് സ്റ്റാളുകളും റിസർവ് ചെയ്യുക.',ql4t:'ആരംഭിക്കുക',ql4d:'സൗജന്യ കർഷക അല്ലെങ്കിൽ വാങ്ങുന്നയാൾ അക്കൗണ്ട് സൃഷ്ടിക്കുക.',qlGo:'തുറക്കുക →',tsKicker:'കൃഷിയിടത്തിൽ നിന്നുള്ള ശബ്ദങ്ങൾ',tsTitle:'കർഷകർ പറയുന്നത്',mpKicker:'മാർക്കറ്റ്‌പ്ലേസ്',mpTitle:'കൃഷിയിടത്തിൽ നിന്ന് നേരിട്ടുള്ള പുതിയ വിളകൾ',mpDesc:'നിങ്ങളുടെ സമീപത്തെ പരിശോധിച്ച കർഷകരുടെയും FPOകളുടെയും വിളകൾ കാണുക.',filterPrice:'വില പരിധി (₹/കിലോ)',filterCategory:'വിഭാഗം',filterSort:'ക്രമീകരിക്കുക',catAll:'എല്ലാ വിളകളും',catVeg:'പച്ചക്കറികൾ',catFruit:'പഴങ്ങൾ',catGrain:'ധാന്യങ്ങൾ',sortLow:'വില: കുറഞ്ഞത് മുതൽ കൂടുതൽ',sortHigh:'വില: കൂടുതലിൽ നിന്ന് കുറവ്',sortFresh:'ഏറ്റവും പുതിയത് ആദ്യം',fcKicker:'AI ആവശ്യകത പ്രവചനം',fcTitle:'നാളത്തെ വില ഇന്ന് അറിയൂ',fcPanelTitle:'മണ്ഡി വില ട്രാക്കർ',fcSub:'കിലോയ്ക്ക് വില, കഴിഞ്ഞ 14 ദിവസം + 7 ദിവസത്തെ AI പ്രവചനം',cropTomato:'തക്കാളി',cropOnion:'സവാള',cropWheat:'ഗോതമ്പ്',statCurrentL:'നിലവിലെ വില',statForecastL:'7 ദിവസത്തെ പ്രവചനം',statLowL:'14 ദിവസത്തെ കുറഞ്ഞ വില',statHighL:'14 ദിവസത്തെ ഉയർന്ന വില',opsKicker:'കർഷക ഉപകരണങ്ങൾ',opsTitle:'സ്റ്റോറേജ് ബുക്ക് ചെയ്യൂ. മാർക്കറ്റ് സ്ഥലം റിസർവ് ചെയ്യൂ.',pfKicker:'ആരംഭിക്കുക',pfTitle:'നിങ്ങളുടെ സൗജന്യ അക്കൗണ്ട് സൃഷ്ടിക്കുക',roleFarmer:'ഞാൻ കർഷകൻ / FPO',roleBuyer:'ഞാൻ വാങ്ങുന്നയാൾ',fldName:'പൂർണ്ണ പേര്',fldPhone:'ഫോൺ നമ്പർ',fldLoc:'ഗ്രാമം / നഗരം',fldSubmit:'അക്കൗണ്ട് സൃഷ്ടിക്കുക',footContact:'ബന്ധപ്പെടുക',footTag:'കൃഷിയിടത്തിൽ നിന്ന് നേരിട്ട് നിങ്ങളിലേക്ക്',
    fldAadhaar:'ആധാർ കാർഡ് നമ്പർ',fldAadhaarPh:'XXXX XXXX XXXX',fldAadhaarHint:'തിരിച്ചറിയൽ പരിശോധനയ്ക്ക് മാത്രം ഉപയോഗിക്കുന്നു. നിങ്ങളുടെ 12-അക്ക ആധാർ നമ്പർ മറയ്ക്കപ്പെടുകയും ഒരിക്കലും പ്ലെയിൻ ടെക്സ്റ്റിൽ സംഭരിക്കപ്പെടുകയും ചെയ്യില്ല.',fldAadhaarError:'സാധുവായ 12-അക്ക ആധാർ നമ്പർ നൽകുക.',profileSuccess:'അക്കൗണ്ട് വിശദാംശങ്ങൾ സമർപ്പിച്ചു — ഞങ്ങൾ നിങ്ങളുടെ ആധാർ പരിശോധിച്ച് SMS വഴി സ്ഥിരീകരിക്കും.',fcDaybyday:'ദിവസംതോറുമുള്ള AI പ്രവചനം',
    eyebrow:'SIH26033 · ഉപഭോക്തൃ കാര്യ, ഭക്ഷ്യ & പൊതുവിതരണ മന്ത്രാലയം',splitTitle:'തക്കാളി വിൽപ്പനയിലെ ₹100 യഥാർത്ഥത്തിൽ എവിടെ പോകുന്നു',splitSub:'ഒരു സാധാരണ 4-ഇടനില വിതരണ ശൃംഖലയും KhetSetu നേരിട്ടുള്ള മാതൃകയും തമ്മിലുള്ള താരതമ്യം',splitOldLabel:'പരമ്പരാഗത ശൃംഖല',splitNewLabel:'KhetSetu നേരിട്ട്',legFarmer:'കർഷക വിഹിതം',legLog:'ലോജിസ്റ്റിക്സ്',legMid:'ഇടനിലക്കാർ',legNew:'കർഷക വിഹിതം (നേരിട്ട്)',
    t1q:'മുമ്പ് മണ്ടി എനിക്ക് വിലയുടെ ഒരു ചെറിയ ഭാഗം മാത്രമേ നൽകിയിരുന്നുള്ളൂ. ഇപ്പോൾ ഞാൻ നേരിട്ട് വാങ്ങുന്നയാൾക്ക് വിൽക്കുന്നു.',t1n:'രമേഷ് കുമാർ',t1l:'നാസിക് · തക്കാളി കർഷകൻ',
    t2q:'എന്റെ ഫോണിൽ നിന്ന് കോൾഡ് സ്റ്റോറേജ് ബുക്ക് ചെയ്തത് കഴിഞ്ഞ മഴക്കാലത്ത് രണ്ട് ടൺ ഉള്ളി രക്ഷിച്ചു.',t2n:'സുനിത ദേവി',t2l:'നാഗ്പൂർ · ഉള്ളി FPO',
    t3q:'ഏത് ആഴ്ചയിൽ എന്റെ മാമ്പഴം വിൽക്കണമെന്ന് വില പ്രവചനം കൃത്യമായി പറയുന്നു.',t3n:'അനിൽ പാട്ടീൽ',t3l:'രത്നഗിരി · മാമ്പഴ കർഷകൻ',
    mpStatL:'ഇന്നത്തെ പുതിയ വരവുകൾ',mpStatV:'9,850 കിലോ · 59 വിളകൾ',
    fcDesc:'കഴിഞ്ഞ 14 ദിവസത്തെ അടിസ്ഥാനമാക്കി ഒരു ട്രെൻഡ് മോഡൽ അടുത്ത ആഴ്ചത്തെ വില പ്രവചിക്കുന്നു, അതിനാൽ കർഷകർക്ക് എപ്പോൾ വിൽക്കണമെന്നും വാങ്ങുന്നവർക്ക് വാങ്ങലുകൾ എപ്പോൾ ആസൂത്രണം ചെയ്യണമെന്നും തീരുമാനിക്കാം.',
    how1t:'ഒരു സേവനം തിരഞ്ഞെടുക്കുക',how1d:'കോൾഡ് സ്റ്റോറേജ് അല്ലെങ്കിൽ മാർക്കറ്റ്-ഡേ സ്റ്റാൾ തിരഞ്ഞെടുക്കുക.',how2t:'നിങ്ങളുടെ തീയതിയും സ്ലോട്ടും തിരഞ്ഞെടുക്കുക',how2d:'കലണ്ടറിൽ നിങ്ങളുടെ പ്രവേശന തീയതി അല്ലെങ്കിൽ സ്റ്റാൾ സ്ഥാനം തിരഞ്ഞെടുക്കുക.',how3t:'SMS വഴി സ്ഥിരീകരണം നേടുക',how3d:'സൗകര്യം അല്ലെങ്കിൽ മാർക്കറ്റ് നിങ്ങളുടെ ബുക്കിംഗ് നേരിട്ട് നിങ്ങളുടെ ഫോണിലേക്ക് സ്ഥിരീകരിക്കും.',
    csTitle:'❄ കോൾഡ് സ്റ്റോറേജ് ബുക്കിംഗ്',csDesc:'വിറ്റഴിക്കാത്ത ഉൽപ്പന്നങ്ങൾ കേടാകാതിരിക്കാൻ സമീപത്തുള്ള സൗകര്യത്തിൽ ഇടം റിസർവ് ചെയ്യുക.',csFrom:'പ്രവേശന തീയതി',csQty:'അളവ് (കിലോ)',csConfirm:'ബുക്കിംഗ് സ്ഥിരീകരിക്കുക',csSuccess:'ബുക്കിംഗ് അഭ്യർത്ഥന അയച്ചു — സൗകര്യം SMS വഴി സ്ഥിരീകരിക്കും.',
    mdTitle:'📍 മാർക്കറ്റ് ഡേ ഷെഡ്യൂളർ',mdDesc:'വാക്-ഇൻ വാങ്ങുന്നവർക്ക് നേരിട്ട് വിൽക്കാൻ മാർക്കറ്റ്, തീയതി, സ്റ്റാൾ സ്ഥാനം എന്നിവ തിരഞ്ഞെടുക്കുക.',mdMarket:'മാർക്കറ്റ് സ്ഥലം',mdDate:'തീയതി',mdSpot:'സ്റ്റാൾ സ്ഥാനം',mdConfirm:'സ്ഥാനം റിസർവ് ചെയ്യുക',mdSuccess:'സ്ഥാനം റിസർവ് ചെയ്തു — മാർക്കറ്റ് തുറക്കുന്നതിന് 30 മിനിറ്റ് മുമ്പ് എത്തുക.',
    fsKicker:'റോഡ്മാപ്പ്',fsTitle:'അടുത്തത് എന്ത്',fs1t:'റൂട്ട് ഒപ്റ്റിമൈസേഷൻ',fs1d:'ലോജിസ്റ്റിക്സ് ചെലവ് കൂടുതൽ കുറയ്ക്കാൻ AI-ആസൂത്രിത ഡെലിവറി റൂട്ടുകൾ.',fs2t:'പൂർണ്ണ പ്രാദേശിക ഭാഷകൾ',fs2d:'ഹിന്ദിക്കപ്പുറം മറാത്തി, തമിഴ്, തെലുങ്ക് എന്നിവയിലേക്കും കൂടുതലിലേക്കും വ്യാപനം.',fs3t:'തത്സമയ ലോജിസ്റ്റിക്സ് പങ്കാളികൾ',fs3d:'ഡെലിവറി, ഗതാഗത ദാതാക്കളുമായുള്ള തത്സമയ സംയോജനം.',fs4t:'സ്ഥിരീകരിച്ച FPO ഓൺബോർഡിംഗ്',fs4d:'കർഷക ഉൽപ്പാദക സംഘടനകൾക്കുള്ള KYC-അധിഷ്ഠിത സ്ഥിരീകരണം.',
    dpdpRibbon:'DPDP നിയമം 2023 തയ്യാർ',privTitle:'ആവശ്യമുള്ളത് മാത്രം, അതിലധികം ഒന്നുമില്ല.',privBody:'സമീപത്തുള്ള വാങ്ങുന്നവരെയോ വിൽക്കുന്നവരെയോ നിങ്ങളുമായി ബന്ധിപ്പിക്കാനും ബുക്കിംഗുകൾ സ്ഥിരീകരിക്കാനും മാത്രമായി ഞങ്ങൾ പേര്, ഫോൺ, സ്ഥലം എന്നിവ ശേഖരിക്കുന്നു. സാമ്പത്തിക വിവരങ്ങൾ, ഐഡി തെളിവ്, ബ്രൗസിംഗ് ചരിത്രം എന്നിവ സംഭരിക്കില്ല. ഇന്ത്യയുടെ DPDP നിയമം, 2023 പ്രകാരമുള്ള ഡാറ്റ-മിനിമൈസേഷൻ തത്വങ്ങൾ പിന്തുടർന്ന് രൂപകൽപ്പന ചെയ്തത്.',profilePhotoCaption:'മഹാരാഷ്ട്രയിലുടനീളമുള്ള കർഷക ഉൽപ്പാദക സംഘടനകൾ വിശ്വസിക്കുന്നു',
    footDesc:'SIH26033-നായി നിർമ്മിച്ച നേരിട്ടുള്ള മാർക്കറ്റ്‌പ്ലേസ് — ഇടനിലക്കാരില്ലാതെ കർഷകരെയും FPOകളെയും വാങ്ങുന്നവരുമായി ബന്ധിപ്പിക്കുന്നു.',footTeam:'ടീം സമർപ്പണം · സ്മാർട്ട് ഇന്ത്യ ഹാക്കത്തോൺ 2026 · തീം: കൃഷി, ഭക്ഷ്യം, ഗ്രാമവികസനം',
    exKicker:'കയറ്റുമതി അവസരങ്ങൾ',exTitle:'മണ്ഡിക്കപ്പുറം വിൽക്കൂ — ആവശ്യാനുസരണം കയറ്റുമതി ചെയ്യൂ',exDesc:"വിദേശ വാങ്ങുന്നവർ ഇപ്പോൾ ഏതെല്ലാം വിളകൾ ആഗ്രഹിക്കുന്നു, ഇന്നത്തെ മണ്ഡി നിരക്കിനേക്കാൾ എത്ര പ്രീമിയം ലഭിക്കും, ആവശ്യമായ രേഖകൾ എന്തെല്ലാം എന്ന് കാണുക — തുടർന്ന് നിങ്ങളുടെ ഉൽപ്പന്നം രജിസ്റ്റർ ചെയ്ത് ഒരു ലക്ഷ്യസ്ഥാനവുമായി പൊരുത്തപ്പെടുത്തുക.",exFilterCategory:'വിഭാഗം',exFilterDemand:'ആവശ്യ നിലവാരം',exFilterSort:'ഇതനുസരിച്ച് ക്രമീകരിക്കുക',exDemandAll:'എല്ലാ ആവശ്യ നിലവാരങ്ങളും',exDemandHigh:'ഉയർന്ന ആവശ്യം',exDemandMedium:'ഇടത്തരം ആവശ്യം',exDemandLow:'കുറഞ്ഞ ആവശ്യം',exSortDemand:'ഏറ്റവും ഉയർന്ന ആവശ്യം ആദ്യം',exSortPremiumHigh:'കയറ്റുമതി പ്രീമിയം: കൂടുതൽ മുതൽ കുറവ്',exSortPremiumLow:'കയറ്റുമതി പ്രീമിയം: കുറവ് മുതൽ കൂടുതൽ',exFormTitle:'📦 കയറ്റുമതിക്കായി ഉൽപ്പന്നം രജിസ്റ്റർ ചെയ്യുക',exFormDesc:"നിങ്ങളുടെ കൈവശം എന്താണെന്ന് ഞങ്ങളോട് പറയൂ — ആ വിളയ്ക്ക് ഏറ്റവും കൂടുതൽ വില നൽകുന്ന വിദേശ ലക്ഷ്യസ്ഥാനവുമായി ഞങ്ങൾ അത് പൊരുത്തപ്പെടുത്തും.",exFieldCrop:'വിള',exFieldQty:'അളവ് (കിലോ)',exFieldGrade:'ഗുണനിലവാര ഗ്രേഡ്',exGradeA:'കയറ്റുമതി ഗ്രേഡ് A',exGradeB:'ഗ്രേഡ് B',exGradeStd:'സ്റ്റാൻഡേർഡ്',exSubmit:'എന്നെ ഒരു വാങ്ങുന്നയാളുമായി പൊരുത്തപ്പെടുത്തൂ',exSuccess:"കയറ്റുമതിക്കായി ലിസ്റ്റ് ചെയ്തു — താഴെ ഒരു വാങ്ങുന്നയാളുമായി പൊരുത്തപ്പെടുത്തി. പിക്കപ്പും രേഖകളും സ്ഥിരീകരിക്കാൻ ഞങ്ങളുടെ ടീം ബന്ധപ്പെടും.",exMyListingsTitle:'എന്റെ കയറ്റുമതി ലിസ്റ്റിംഗുകൾ',exRibbon:'ദൃഷ്ടാന്ത ഡെമോ ഡാറ്റ',exNoteTitle:'കയറ്റുമതി പൊരുത്തപ്പെടുത്തൽ എങ്ങനെ പ്രവർത്തിക്കുന്നു',exNoteBody:"ഇവിടെ കാണിച്ചിരിക്കുന്ന ആവശ്യ നിലവാരങ്ങൾ, ലക്ഷ്യ രാജ്യങ്ങൾ, വില പ്രീമിയങ്ങൾ എന്നിവ ഈ പ്രോട്ടോടൈപ്പിനുള്ള ദൃഷ്ടാന്ത കണക്കുകൾ മാത്രമാണ് — തത്സമയ വ്യാപാര ഡാറ്റയല്ല. ഉൽപ്പാദനത്തിൽ ഈ മൊഡ്യൂൾ APEDA/DGFT വ്യാപാര സ്ഥിതിവിവരക്കണക്കുകളും യഥാർത്ഥ വാങ്ങൽ ആവശ്യ ഫീഡുകളുമായി ബന്ധിപ്പിച്ച് ഓരോ ലിസ്റ്റിംഗും സാക്ഷ്യപ്പെടുത്തിയ ഇറക്കുമതിക്കാരനിലേക്ക് നയിക്കും.",wxKicker:'തത്സമയ കാലാവസ്ഥ',wxTitle:'നിങ്ങളുടെ മണ്ഡിക്കായുള്ള കാലാവസ്ഥാ പ്രവചനം',wxDesc:"മാപ്പിലെ ഒരു പിന്നിൽ ടാപ്പ് ചെയ്യുക അല്ലെങ്കിൽ ഏതെങ്കിലും ഗ്രാമം, നഗരം, മണ്ഡി എന്നിവ തിരയുക — മഴ, താപനില, ആർദ്രത, കാറ്റ് എന്നിവയോടെ 5-ദിവസത്തെ പ്രവചനം കാണാൻ — അതുവഴി വിളവെടുപ്പിനോ തളിക്കാനോ ചന്തയിലേക്ക് പോകാനോ ഏറ്റവും നല്ല ദിവസം ഏതെന്ന് അറിയാം.",wxSearchPh:'ഗ്രാമം, നഗരം അല്ലെങ്കിൽ മണ്ഡി തിരയുക…',wxSearchBtn:'തിരയുക',wxLocateBtn:'📍 എന്റെ ലൊക്കേഷൻ ഉപയോഗിക്കുക',wxMapSub:'പ്രവചനം ലഭിക്കാൻ ഒരു പിന്നിൽ ടാപ്പ് ചെയ്യുക',wxDaybyday:'5-ദിവസത്തെ പ്രവചനം',wxHumidity:'ആർദ്രത',wxWind:'കാറ്റ്',wxRainChance:'മഴ സാധ്യത',
    navDelivery:'ഡെലിവറി',buyBtn:'കാർട്ടിൽ ചേർക്കുക',dlKicker:'ഹോം ഡെലിവറി',dlTitle:'വയലിൽ നിന്ന് പുതിയ ഉൽപ്പന്നങ്ങൾ, നിങ്ങളുടെ വീട്ടുവാതിൽക്കൽ',dlDesc:"മാർക്കറ്റ്‌പ്ലേസിൽ നിന്ന് ചേർത്ത വിളകൾ പരിശോധിക്കുക, എവിടേക്ക് ഡെലിവർ ചെയ്യണമെന്ന് പറയുക, നിങ്ങളുടെ ഓർഡർ നൽകുക — മണ്ഡിയിൽ പോകേണ്ട ആവശ്യമില്ല.",dlCartTitle:'നിങ്ങളുടെ കാർട്ട്',dlFieldName:'മുഴുവൻ പേര്',dlFieldPhone:'ഫോൺ നമ്പർ',dlFieldAddress:'ഡെലിവറി വിലാസം',dlFieldCity:'നഗരം / ഗ്രാമം',dlFieldPincode:'പിൻകോഡ്',dlPlaceOrder:'ഓർഡർ ചെയ്യുക',dlSubtotal:'ഉപ-ആകെത്തുക',dlDeliveryFee:'ഡെലിവറി ചാർജ്',dlTotal:'ആകെത്തുക',dlOrderSuccess:"ഓർഡർ നൽകി — കർഷകനെ/FPOയെ അറിയിക്കും, നിങ്ങളുടെ ഡെലിവറി SMS വഴി സ്ഥിരീകരിക്കും.",dlMyOrdersTitle:'എന്റെ ഓർഡറുകൾ',dlRibbon:'ദൃഷ്ടാന്ത ഡെമോ ഡാറ്റ',dlNoteTitle:'ഡെലിവറി എങ്ങനെ പ്രവർത്തിക്കുന്നു',dlNoteBody:"ഇവിടെ കാണിച്ചിരിക്കുന്ന ഡെലിവറി ചാർജും സമയക്രമവും ഈ പ്രോട്ടോടൈപ്പിനുള്ള ദൃഷ്ടാന്ത കണക്കുകൾ മാത്രമാണ്. ഉൽപ്പാദനത്തിൽ ഈ മൊഡ്യൂൾ പ്രാദേശിക ലോജിസ്റ്റിക്സ്/കൊറിയർ പങ്കാളികളുമായി ബന്ധിപ്പിച്ച് ഓരോ ഓർഡറും ഏറ്റവും അടുത്ത സാക്ഷ്യപ്പെടുത്തിയ കർഷകനിൽ നിന്നോ FPOയിൽ നിന്നോ വാങ്ങുന്നയാളുടെ വിലാസത്തിലേക്ക് നയിക്കും."
  },
  kn:{
    brand:'ಖೇತಸೇತು',tagline:'ಹೊಲದಿಂದ ನೇರವಾಗಿ ನಿಮ್ಮ ಬಳಿಗೆ',navHome:'ಮುಖಪುಟ',navMarket:'ಮಾರುಕಟ್ಟೆ',navForecast:'ಬೆಲೆ ಮುನ್ಸೂಚನೆ',navWeather:'ಹವಾಮಾನ',navExport:'ರಫ್ತು',navServices:'ಸೇವೆಗಳನ್ನು ಬುಕ್ ಮಾಡಿ',navProfile:'ಪ್ರಾರಂಭಿಸಿ',navcta:'ಉಚಿತವಾಗಿ ಸೇರಿ',heroTitle:'ಮಧ್ಯವರ್ತಿಗಳನ್ನು ತೆಗೆದುಹಾಕಿ. <em>ರೈತನ ನ್ಯಾಯಯುತ ಪಾಲನ್ನು ಉಳಿಸಿ.</em>',heroLead:'ರೈತರು ಮತ್ತು FPOಗಳನ್ನು ಖರೀದಿದಾರರೊಂದಿಗೆ ನೇರವಾಗಿ ಸಂಪರ್ಕಿಸುವ ಡಿಜಿಟಲ್ ಮಂಡಿ — ಲಾಜಿಸ್ಟಿಕ್ಸ್, ಕೋಲ್ಡ್ ಸ್ಟೋರೇಜ್, ಮಾರುಕಟ್ಟೆ ಸ್ಲಾಟ್‌ಗಳು ಮತ್ತು AI ಬೆಲೆ ಮುನ್ಸೂಚನೆಯೊಂದಿಗೆ.',heroTag1:'ಪರಿಶೀಲಿತ ರೈತರು',heroTag2:'ನೇರ ಮಂಡಿ',heroTag3:'AI ಬೆಲೆ ಎಚ್ಚರಿಕೆಗಳು',heroTag4:'DPDP ಸಿದ್ಧ ✓',ctaFarmer:'ನಾನು ರೈತ / FPO',ctaBuyer:'ನಾನು ಖರೀದಿದಾರ',heroFloatCrop:'ಇಂದಿನ ಟೊಮೇಟೊ ಬೆಲೆ',heroFloatPrice:'₹32/ಕೆಜಿ',heroFloatTrend:'▲ ನಿನ್ನೆಗೆ ಹೋಲಿಸಿದರೆ 6% ಹೆಚ್ಚು',ql1t:'ಮಾರುಕಟ್ಟೆ',ql1d:'ತಾಜಾ ಉತ್ಪನ್ನಗಳನ್ನು ಬೆಲೆಯ ಪ್ರಕಾರ ನೋಡಿ.',ql2t:'ಬೆಲೆ ಮುನ್ಸೂಚನೆ',ql2d:'ಮುಂದಿನ ವಾರದ AI ಬೆಲೆ ಅಂದಾಜುಗಳು.',ql3t:'ಸೇವೆಗಳನ್ನು ಬುಕ್ ಮಾಡಿ',ql3d:'ಕೋಲ್ಡ್ ಸ್ಟೋರೇಜ್ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಸ್ಟಾಲ್‌ಗಳನ್ನು ಕಾಯ್ದಿರಿಸಿ.',ql4t:'ಪ್ರಾರಂಭಿಸಿ',ql4d:'ಉಚಿತ ರೈತ ಅಥವಾ ಖರೀದಿದಾರರ ಖಾತೆ ರಚಿಸಿ.',qlGo:'ತೆರೆಯಿರಿ →',tsKicker:'ಹೊಲದ ಧ್ವನಿಗಳು',tsTitle:'ರೈತರು ಏನು ಹೇಳುತ್ತಾರೆ',mpKicker:'ಮಾರುಕಟ್ಟೆ',mpTitle:'ಹೊಲದಿಂದ ನೇರ ತಾಜಾ ಉತ್ಪನ್ನಗಳು',mpDesc:'ನಿಮ್ಮ ಸಮೀಪದ ಪರಿಶೀಲಿತ ರೈತರು ಮತ್ತು FPOಗಳ ಉತ್ಪನ್ನಗಳನ್ನು ನೋಡಿ.',filterPrice:'ಬೆಲೆ ವ್ಯಾಪ್ತಿ (₹/ಕೆಜಿ)',filterCategory:'ವರ್ಗ',filterSort:'ವಿಂಗಡಿಸಿ',catAll:'ಎಲ್ಲಾ ಉತ್ಪನ್ನಗಳು',catVeg:'ತರಕಾರಿಗಳು',catFruit:'ಹಣ್ಣುಗಳು',catGrain:'ಧಾನ್ಯಗಳು',sortLow:'ಬೆಲೆ: ಕಡಿಮೆಯಿಂದ ಹೆಚ್ಚು',sortHigh:'ಬೆಲೆ: ಹೆಚ್ಚಿನಿಂದ ಕಡಿಮೆ',sortFresh:'ತಾಜಾವಾದವು ಮೊದಲು',fcKicker:'AI ಬೇಡಿಕೆ ಮುನ್ಸೂಚನೆ',fcTitle:'ನಾಳೆಯ ಬೆಲೆಯನ್ನು ಇಂದು ತಿಳಿಯಿರಿ',fcPanelTitle:'ಮಂಡಿ ಬೆಲೆ ಟ್ರ್ಯಾಕರ್',fcSub:'ಕೆಜಿಗೆ ಬೆಲೆ, ಕಳೆದ 14 ದಿನಗಳು + 7 ದಿನಗಳ AI ಮುನ್ಸೂಚನೆ',cropTomato:'ಟೊಮೇಟೊ',cropOnion:'ಈರುಳ್ಳಿ',cropWheat:'ಗೋಧಿ',statCurrentL:'ಪ್ರಸ್ತುತ ಬೆಲೆ',statForecastL:'7 ದಿನಗಳ ಮುನ್ಸೂಚನೆ',statLowL:'14 ದಿನಗಳ ಕನಿಷ್ಠ',statHighL:'14 ದಿನಗಳ ಗರಿಷ್ಠ',opsKicker:'ರೈತ ಸಾಧನಗಳು',opsTitle:'ಸ್ಟೋರೇಜ್ ಬುಕ್ ಮಾಡಿ. ಮಾರುಕಟ್ಟೆ ಸ್ಥಳ ಕಾಯ್ದಿರಿಸಿ.',pfKicker:'ಪ್ರಾರಂಭಿಸಿ',pfTitle:'ನಿಮ್ಮ ಉಚಿತ ಖಾತೆಯನ್ನು ರಚಿಸಿ',roleFarmer:'ನಾನು ರೈತ / FPO',roleBuyer:'ನಾನು ಖರೀದಿದಾರ',fldName:'ಪೂರ್ಣ ಹೆಸರು',fldPhone:'ಫೋನ್ ಸಂಖ್ಯೆ',fldLoc:'ಗ್ರಾಮ / ನಗರ',fldSubmit:'ಖಾತೆ ರಚಿಸಿ',footContact:'ಸಂಪರ್ಕಿಸಿ',footTag:'ಹೊಲದಿಂದ ನೇರವಾಗಿ ನಿಮ್ಮ ಬಳಿಗೆ',
    fldAadhaar:'ಆಧಾರ್ ಕಾರ್ಡ್ ಸಂಖ್ಯೆ',fldAadhaarPh:'XXXX XXXX XXXX',fldAadhaarHint:'ಗುರುತಿನ ಪರಿಶೀಲನೆಗಾಗಿ ಮಾತ್ರ ಬಳಸಲಾಗುತ್ತದೆ. ನಿಮ್ಮ 12-ಅಂಕಿಯ ಆಧಾರ್ ಸಂಖ್ಯೆಯನ್ನು ಮರೆಮಾಡಲಾಗುತ್ತದೆ ಮತ್ತು ಎಂದಿಗೂ ಸರಳ ಪಠ್ಯದಲ್ಲಿ ಸಂಗ್ರಹಿಸಲಾಗುವುದಿಲ್ಲ.',fldAadhaarError:'ಮಾನ್ಯವಾದ 12-ಅಂಕಿಯ ಆಧಾರ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.',profileSuccess:'ಖಾತೆ ವಿವರಗಳನ್ನು ಸಲ್ಲಿಸಲಾಗಿದೆ — ನಾವು ನಿಮ್ಮ ಆಧಾರ್ ಅನ್ನು ಪರಿಶೀಲಿಸಿ SMS ಮೂಲಕ ದೃಢೀಕರಿಸುತ್ತೇವೆ.',fcDaybyday:'ದಿನದಿಂದ ದಿನಕ್ಕೆ AI ಮುನ್ಸೂಚನೆ',
    eyebrow:'SIH26033 · ಗ್ರಾಹಕ ವ್ಯವಹಾರಗಳು, ಆಹಾರ ಮತ್ತು ಸಾರ್ವಜನಿಕ ವಿತರಣಾ ಸಚಿವಾಲಯ',splitTitle:'ಟೊಮೇಟೊ ಮಾರಾಟದಲ್ಲಿ ₹100 ನಿಜವಾಗಿ ಎಲ್ಲಿಗೆ ಹೋಗುತ್ತದೆ',splitSub:'ವಿಶಿಷ್ಟ 4-ಮಧ್ಯವರ್ತಿ ಪೂರೈಕೆ ಸರಪಳಿ vs. KhetSetu ನೇರ ಮಾದರಿಯ ಆಧಾರದ ಮೇಲೆ',splitOldLabel:'ಸಾಂಪ್ರದಾಯಿಕ ಸರಪಳಿ',splitNewLabel:'KhetSetu ನೇರ',legFarmer:'ರೈತರ ಪಾಲು',legLog:'ಲಾಜಿಸ್ಟಿಕ್ಸ್',legMid:'ಮಧ್ಯವರ್ತಿಗಳು',legNew:'ರೈತರ ಪಾಲು (ನೇರ)',
    t1q:'ಮೊದಲು ಮಂಡಿ ನನಗೆ ಬೆಲೆಯ ಒಂದು ಸಣ್ಣ ಭಾಗವನ್ನು ಮಾತ್ರ ಪಾವತಿಸುತ್ತಿತ್ತು. ಈಗ ನಾನು ನೇರವಾಗಿ ಖರೀದಿದಾರರಿಗೆ ಮಾರಾಟ ಮಾಡುತ್ತೇನೆ.',t1n:'ರಮೇಶ್ ಕುಮಾರ್',t1l:'ನಾಸಿಕ್ · ಟೊಮೇಟೊ ಬೆಳೆಗಾರ',
    t2q:'ನನ್ನ ಫೋನ್‌ನಿಂದ ಕೋಲ್ಡ್ ಸ್ಟೋರೇಜ್ ಬುಕ್ ಮಾಡಿದ್ದು ಕಳೆದ ಮುಂಗಾರಿನಲ್ಲಿ ಎರಡು ಟನ್ ಈರುಳ್ಳಿಯನ್ನು ಉಳಿಸಿತು.',t2n:'ಸುನಿತಾ ದೇವಿ',t2l:'ನಾಗ್ಪುರ · ಈರುಳ್ಳಿ FPO',
    t3q:'ಬೆಲೆ ಮುನ್ಸೂಚನೆಯು ನನ್ನ ಮಾವಿನಹಣ್ಣುಗಳನ್ನು ಯಾವ ವಾರದಲ್ಲಿ ಮಾರಬೇಕೆಂದು ನಿಖರವಾಗಿ ಹೇಳುತ್ತದೆ.',t3n:'ಅನಿಲ್ ಪಾಟೀಲ್',t3l:'ರತ್ನಗಿರಿ · ಮಾವಿನ ಬೆಳೆಗಾರ',
    mpStatL:'ಇಂದಿನ ತಾಜಾ ಆಗಮನಗಳು',mpStatV:'9,850 ಕೆಜಿ · 59 ಬೆಳೆಗಳು',
    fcDesc:'ಕಳೆದ 14 ದಿನಗಳ ಆಧಾರದ ಮೇಲೆ ಒಂದು ಟ್ರೆಂಡ್ ಮಾದರಿ ಮುಂದಿನ ವಾರದ ಬೆಲೆಯನ್ನು ಅಂದಾಜು ಮಾಡುತ್ತದೆ, ಇದರಿಂದ ರೈತರು ಯಾವಾಗ ಮಾರಬೇಕೆಂದು ಮತ್ತು ಖರೀದಿದಾರರು ಖರೀದಿಗಳನ್ನು ಯಾವಾಗ ಯೋಜಿಸಬೇಕೆಂದು ನಿರ್ಧರಿಸಬಹುದು.',
    how1t:'ಸೇವೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',how1d:'ಕೋಲ್ಡ್ ಸ್ಟೋರೇಜ್ ಅಥವಾ ಮಾರುಕಟ್ಟೆ-ದಿನದ ಸ್ಟಾಲ್ ಆಯ್ಕೆಮಾಡಿ.',how2t:'ನಿಮ್ಮ ದಿನಾಂಕ ಮತ್ತು ಸ್ಲಾಟ್ ಆಯ್ಕೆಮಾಡಿ',how2d:'ಕ್ಯಾಲೆಂಡರ್‌ನಲ್ಲಿ ನಿಮ್ಮ ಪ್ರವೇಶ ದಿನಾಂಕ ಅಥವಾ ಸ್ಟಾಲ್ ಸ್ಥಳವನ್ನು ಆಯ್ಕೆಮಾಡಿ.',how3t:'SMS ಮೂಲಕ ದೃಢೀಕರಣ ಪಡೆಯಿರಿ',how3d:'ಸೌಲಭ್ಯ ಅಥವಾ ಮಾರುಕಟ್ಟೆ ನಿಮ್ಮ ಬುಕಿಂಗ್ ಅನ್ನು ನೇರವಾಗಿ ನಿಮ್ಮ ಫೋನ್‌ಗೆ ದೃಢೀಕರಿಸುತ್ತದೆ.',
    csTitle:'❄ ಕೋಲ್ಡ್ ಸ್ಟೋರೇಜ್ ಬುಕಿಂಗ್',csDesc:'ಮಾರಾಟವಾಗದ ಉತ್ಪನ್ನಗಳನ್ನು ಹಾಳಾಗದಂತೆ ರಕ್ಷಿಸಲು ಹತ್ತಿರದ ಸೌಲಭ್ಯದಲ್ಲಿ ಸ್ಥಳವನ್ನು ಕಾಯ್ದಿರಿಸಿ.',csFrom:'ಪ್ರವೇಶ ದಿನಾಂಕ',csQty:'ಪ್ರಮಾಣ (ಕೆಜಿ)',csConfirm:'ಬುಕಿಂಗ್ ದೃಢೀಕರಿಸಿ',csSuccess:'ಬುಕಿಂಗ್ ವಿನಂತಿ ಕಳುಹಿಸಲಾಗಿದೆ — ಸೌಲಭ್ಯವು SMS ಮೂಲಕ ದೃಢೀಕರಿಸುತ್ತದೆ.',
    mdTitle:'📍 ಮಾರುಕಟ್ಟೆ ದಿನ ವೇಳಾಪಟ್ಟಿ',mdDesc:'ವಾಕ್-ಇನ್ ಖರೀದಿದಾರರಿಗೆ ನೇರವಾಗಿ ಮಾರಾಟ ಮಾಡಲು ಮಾರುಕಟ್ಟೆ, ದಿನಾಂಕ ಮತ್ತು ಸ್ಟಾಲ್ ಸ್ಥಳವನ್ನು ಆಯ್ಕೆಮಾಡಿ.',mdMarket:'ಮಾರುಕಟ್ಟೆ ಸ್ಥಳ',mdDate:'ದಿನಾಂಕ',mdSpot:'ಸ್ಟಾಲ್ ಸ್ಥಳ',mdConfirm:'ಸ್ಥಳವನ್ನು ಕಾಯ್ದಿರಿಸಿ',mdSuccess:'ಸ್ಥಳ ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ — ಮಾರುಕಟ್ಟೆ ತೆರೆಯುವ 30 ನಿಮಿಷ ಮೊದಲು ಬನ್ನಿ.',
    fsKicker:'ರೋಡ್‌ಮ್ಯಾಪ್',fsTitle:'ಮುಂದೇನು',fs1t:'ಮಾರ್ಗ ಆಪ್ಟಿಮೈಸೇಶನ್',fs1d:'ಲಾಜಿಸ್ಟಿಕ್ಸ್ ವೆಚ್ಚವನ್ನು ಮತ್ತಷ್ಟು ಕಡಿಮೆ ಮಾಡಲು AI-ಯೋಜಿತ ಡೆಲಿವರಿ ಮಾರ್ಗಗಳು.',fs2t:'ಸಂಪೂರ್ಣ ಪ್ರಾದೇಶಿಕ ಭಾಷೆಗಳು',fs2d:'ಹಿಂದಿಯನ್ನು ಮೀರಿ ಮರಾಠಿ, ತಮಿಳು, ತೆಲುಗು ಮತ್ತು ಇನ್ನಷ್ಟು ಭಾಷೆಗಳಿಗೆ ವಿಸ್ತರಣೆ.',fs3t:'ಲೈವ್ ಲಾಜಿಸ್ಟಿಕ್ಸ್ ಪಾಲುದಾರರು',fs3d:'ವಿತರಣೆ ಮತ್ತು ಸಾರಿಗೆ ಪೂರೈಕೆದಾರರೊಂದಿಗೆ ನೈಜ-ಸಮಯದ ಏಕೀಕರಣ.',fs4t:'ಪರಿಶೀಲಿತ FPO ಆನ್‌ಬೋರ್ಡಿಂಗ್',fs4d:'ರೈತ ಉತ್ಪಾದಕ ಸಂಸ್ಥೆಗಳಿಗೆ KYC-ಬೆಂಬಲಿತ ಪರಿಶೀಲನೆ.',
    dpdpRibbon:'DPDP ಕಾಯ್ದೆ 2023 ಸಿದ್ಧ',privTitle:'ಅಗತ್ಯವಿರುವುದು ಮಾತ್ರ, ಇನ್ನೇನೂ ಇಲ್ಲ.',privBody:'ಹತ್ತಿರದ ಖರೀದಿದಾರರು ಅಥವಾ ಮಾರಾಟಗಾರರೊಂದಿಗೆ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಲು ಮತ್ತು ಬುಕಿಂಗ್‌ಗಳನ್ನು ದೃಢೀಕರಿಸಲು ಮಾತ್ರ ನಾವು ಹೆಸರು, ಫೋನ್ ಮತ್ತು ಸ್ಥಳವನ್ನು ಸಂಗ್ರಹಿಸುತ್ತೇವೆ. ಯಾವುದೇ ಆರ್ಥಿಕ ಡೇಟಾ, ID ಪುರಾವೆ ಅಥವಾ ಬ್ರೌಸಿಂಗ್ ಇತಿಹಾಸವನ್ನು ಸಂಗ್ರಹಿಸಲಾಗುವುದಿಲ್ಲ. ಭಾರತದ DPDP ಕಾಯ್ದೆ, 2023ರ ಅಡಿಯಲ್ಲಿ ಡೇಟಾ-ಕನಿಷ್ಠೀಕರಣ ತತ್ವಗಳನ್ನು ಅನುಸರಿಸಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.',profilePhotoCaption:'ಮಹಾರಾಷ್ಟ್ರದಾದ್ಯಂತ ರೈತ ಉತ್ಪಾದಕ ಸಂಸ್ಥೆಗಳಿಂದ ವಿಶ್ವಾಸಾರ್ಹ',
    footDesc:'SIH26033 ಗಾಗಿ ನಿರ್ಮಿಸಲಾದ ನೇರ ಮಾರುಕಟ್ಟೆ — ಮಧ್ಯವರ್ತಿಗಳಿಲ್ಲದೆ ರೈತರು ಮತ್ತು FPOಗಳನ್ನು ಖರೀದಿದಾರರೊಂದಿಗೆ ಸಂಪರ್ಕಿಸುತ್ತದೆ.',footTeam:'ತಂಡದ ಸಲ್ಲಿಕೆ · ಸ್ಮಾರ್ಟ್ ಇಂಡಿಯಾ ಹ್ಯಾಕಥಾನ್ 2026 · ವಿಷಯ: ಕೃಷಿ, ಆಹಾರ ಮತ್ತು ಗ್ರಾಮೀಣಾಭಿವೃದ್ಧಿ',
    exKicker:'ರಫ್ತು ಅವಕಾಶಗಳು',exTitle:'ಮಂಡಿ ಮೀರಿ ಮಾರಾಟ ಮಾಡಿ — ಬೇಡಿಕೆಗೆ ಅನುಗುಣವಾಗಿ ರಫ್ತು ಮಾಡಿ',exDesc:"ವಿದೇಶಿ ಖರೀದಿದಾರರು ಈಗ ಯಾವ ಬೆಳೆಗಳನ್ನು ಬಯಸುತ್ತಾರೆ, ಇಂದಿನ ಮಂಡಿ ದರಕ್ಕಿಂತ ಎಷ್ಟು ಹೆಚ್ಚು ಬೆಲೆ ಸಿಗುತ್ತದೆ ಮತ್ತು ಅಗತ್ಯವಿರುವ ದಾಖಲೆಗಳನ್ನು ನೋಡಿ — ನಂತರ ನಿಮ್ಮ ಉತ್ಪನ್ನವನ್ನು ನೋಂದಾಯಿಸಿ ಮತ್ತು ಒಂದು ಗಮ್ಯಸ್ಥಾನದೊಂದಿಗೆ ಹೊಂದಿಸಿ.",exFilterCategory:'ವರ್ಗ',exFilterDemand:'ಬೇಡಿಕೆ ಮಟ್ಟ',exFilterSort:'ಇದರ ಪ್ರಕಾರ ವಿಂಗಡಿಸಿ',exDemandAll:'ಎಲ್ಲಾ ಬೇಡಿಕೆ ಮಟ್ಟಗಳು',exDemandHigh:'ಹೆಚ್ಚಿನ ಬೇಡಿಕೆ',exDemandMedium:'ಮಧ್ಯಮ ಬೇಡಿಕೆ',exDemandLow:'ಕಡಿಮೆ ಬೇಡಿಕೆ',exSortDemand:'ಅತಿ ಹೆಚ್ಚಿನ ಬೇಡಿಕೆ ಮೊದಲು',exSortPremiumHigh:'ರಫ್ತು ಪ್ರೀಮಿಯಂ: ಹೆಚ್ಚಿನಿಂದ ಕಡಿಮೆಗೆ',exSortPremiumLow:'ರಫ್ತು ಪ್ರೀಮಿಯಂ: ಕಡಿಮೆಯಿಂದ ಹೆಚ್ಚಿಗೆ',exFormTitle:'📦 ರಫ್ತಿಗಾಗಿ ಉತ್ಪನ್ನವನ್ನು ನೋಂದಾಯಿಸಿ',exFormDesc:"ನಿಮ್ಮ ಬಳಿ ಏನಿದೆ ಎಂದು ನಮಗೆ ತಿಳಿಸಿ — ಆ ಬೆಳೆಗೆ ಅತ್ಯುತ್ತಮ ಬೆಲೆ ನೀಡುವ ವಿದೇಶಿ ಗಮ್ಯಸ್ಥಾನದೊಂದಿಗೆ ನಾವು ಅದನ್ನು ಹೊಂದಿಸುತ್ತೇವೆ.",exFieldCrop:'ಬೆಳೆ',exFieldQty:'ಪ್ರಮಾಣ (ಕೆಜಿ)',exFieldGrade:'ಗುಣಮಟ್ಟದ ದರ್ಜೆ',exGradeA:'ರಫ್ತು ದರ್ಜೆ A',exGradeB:'ದರ್ಜೆ B',exGradeStd:'ಪ್ರಮಾಣಿತ',exSubmit:'ನನ್ನನ್ನು ಖರೀದಿದಾರರೊಂದಿಗೆ ಹೊಂದಿಸಿ',exSuccess:"ರಫ್ತಿಗಾಗಿ ಪಟ್ಟಿ ಮಾಡಲಾಗಿದೆ — ಕೆಳಗೆ ಒಬ್ಬ ಖರೀದಿದಾರರೊಂದಿಗೆ ಹೊಂದಿಸಲಾಗಿದೆ. ಪಿಕಪ್ ಮತ್ತು ದಾಖಲೆಗಳನ್ನು ದೃಢೀಕರಿಸಲು ನಮ್ಮ ತಂಡ ಸಂಪರ್ಕಿಸುತ್ತದೆ.",exMyListingsTitle:'ನನ್ನ ರಫ್ತು ಪಟ್ಟಿಗಳು',exRibbon:'ವಿವರಣಾತ್ಮಕ ಡೆಮೊ ಡೇಟಾ',exNoteTitle:'ರಫ್ತು ಹೊಂದಾಣಿಕೆ ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ',exNoteBody:"ಇಲ್ಲಿ ತೋರಿಸಿರುವ ಬೇಡಿಕೆ ಮಟ್ಟಗಳು, ಗಮ್ಯಸ್ಥಾನ ದೇಶಗಳು ಮತ್ತು ಬೆಲೆ ಪ್ರೀಮಿಯಂಗಳು ಈ ಮೂಲಮಾದರಿಗಾಗಿ ವಿವರಣಾತ್ಮಕ ಅಂದಾಜುಗಳಾಗಿವೆ — ನೇರ ವ್ಯಾಪಾರ ದತ್ತಾಂಶವಲ್ಲ. ಉತ್ಪಾದನೆಯಲ್ಲಿ ಈ ಮಾಡ್ಯೂಲ್ APEDA/DGFT ವ್ಯಾಪಾರ ಅಂಕಿಅಂಶಗಳು ಮತ್ತು ನೈಜ ಖರೀದಿದಾರ ಬೇಡಿಕೆ ಫೀಡ್‌ಗಳೊಂದಿಗೆ ಸಂಪರ್ಕಗೊಂಡು ಪ್ರತಿ ಪಟ್ಟಿಯನ್ನು ಪರಿಶೀಲಿತ ಆಮದುದಾರರಿಗೆ ರವಾನಿಸುತ್ತದೆ.",wxKicker:'ನೇರ ಹವಾಮಾನ',wxTitle:'ನಿಮ್ಮ ಮಂಡಿಗಾಗಿ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ',wxDesc:"ನಕ್ಷೆಯಲ್ಲಿ ಒಂದು ಪಿನ್ ಅನ್ನು ಟ್ಯಾಪ್ ಮಾಡಿ ಅಥವಾ ಯಾವುದೇ ಗ್ರಾಮ, ನಗರ ಅಥವಾ ಮಂಡಿಯನ್ನು ಹುಡುಕಿ 5-ದಿನಗಳ ಮುನ್ಸೂಚನೆ ನೋಡಿ — ಮಳೆ, ತಾಪಮಾನ, ಆರ್ದ್ರತೆ ಮತ್ತು ಗಾಳಿ — ಇದರಿಂದ ಕೊಯ್ಲು, ಸಿಂಪಡಣೆ ಅಥವಾ ಮಾರುಕಟ್ಟೆಗೆ ಹೋಗಲು ಉತ್ತಮ ದಿನ ಯಾವುದೆಂದು ನಿಮಗೆ ತಿಳಿಯುತ್ತದೆ.",wxSearchPh:'ಗ್ರಾಮ, ನಗರ ಅಥವಾ ಮಂಡಿ ಹುಡುಕಿ…',wxSearchBtn:'ಹುಡುಕಿ',wxLocateBtn:'📍 ನನ್ನ ಸ್ಥಳವನ್ನು ಬಳಸಿ',wxMapSub:'ಮುನ್ಸೂಚನೆ ಪಡೆಯಲು ಪಿನ್ ಟ್ಯಾಪ್ ಮಾಡಿ',wxDaybyday:'5-ದಿನಗಳ ಮುನ್ಸೂಚನೆ',wxHumidity:'ಆರ್ದ್ರತೆ',wxWind:'ಗಾಳಿ',wxRainChance:'ಮಳೆ ಸಾಧ್ಯತೆ',
    navDelivery:'ವಿತರಣೆ',buyBtn:'ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ',dlKicker:'ಮನೆ ವಿತರಣೆ',dlTitle:'ಹೊಲದಿಂದ ತಾಜಾ ಉತ್ಪನ್ನಗಳು, ನಿಮ್ಮ ಮನೆ ಬಾಗಿಲಿಗೆ',dlDesc:"ಮಾರುಕಟ್ಟೆಯಿಂದ ಸೇರಿಸಿದ ಬೆಳೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ, ಎಲ್ಲಿಗೆ ವಿತರಿಸಬೇಕೆಂದು ತಿಳಿಸಿ, ಮತ್ತು ನಿಮ್ಮ ಆರ್ಡರ್ ಮಾಡಿ — ಮಂಡಿಗೆ ಹೋಗುವ ಅಗತ್ಯವಿಲ್ಲ.",dlCartTitle:'ನಿಮ್ಮ ಕಾರ್ಟ್',dlFieldName:'ಪೂರ್ಣ ಹೆಸರು',dlFieldPhone:'ಫೋನ್ ಸಂಖ್ಯೆ',dlFieldAddress:'ವಿತರಣಾ ವಿಳಾಸ',dlFieldCity:'ನಗರ / ಗ್ರಾಮ',dlFieldPincode:'ಪಿನ್‌ಕೋಡ್',dlPlaceOrder:'ಆರ್ಡರ್ ಮಾಡಿ',dlSubtotal:'ಉಪ-ಮೊತ್ತ',dlDeliveryFee:'ವಿತರಣಾ ಶುಲ್ಕ',dlTotal:'ಒಟ್ಟು',dlOrderSuccess:"ಆರ್ಡರ್ ಮಾಡಲಾಗಿದೆ — ರೈತ/FPOಗೆ ತಿಳಿಸಲಾಗುವುದು ಮತ್ತು ನಿಮ್ಮ ವಿತರಣೆ SMS ಮೂಲಕ ದೃಢಪಡಿಸಲಾಗುವುದು.",dlMyOrdersTitle:'ನನ್ನ ಆರ್ಡರ್‌ಗಳು',dlRibbon:'ವಿವರಣಾತ್ಮಕ ಡೆಮೊ ಡೇಟಾ',dlNoteTitle:'ವಿತರಣೆ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ',dlNoteBody:"ಇಲ್ಲಿ ತೋರಿಸಿರುವ ವಿತರಣಾ ಶುಲ್ಕ ಮತ್ತು ಸಮಯ ಈ ಮೂಲಮಾದರಿಗಾಗಿ ವಿವರಣಾತ್ಮಕವಾಗಿದೆ. ಉತ್ಪಾದನೆಯಲ್ಲಿ ಈ ಮಾಡ್ಯೂಲ್ ಸ್ಥಳೀಯ ಲಾಜಿಸ್ಟಿಕ್ಸ್/ಕೊರಿಯರ್ ಪಾಲುದಾರರೊಂದಿಗೆ ಸಂಪರ್ಕಗೊಂಡು ಪ್ರತಿ ಆರ್ಡರ್ ಅನ್ನು ಹತ್ತಿರದ ಪರಿಶೀಲಿತ ರೈತ ಅಥವಾ FPOನಿಂದ ಖರೀದಿದಾರರ ವಿಳಾಸಕ್ಕೆ ರವಾನಿಸುತ್ತದೆ."
  }
};

let currentLang = 'en'; // kept in memory only

function applyLang(lang){
  if(!dict[lang]) lang='en';
  currentLang=lang;
  const pack=dict[lang];
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key=el.getAttribute('data-i18n');
    if(pack[key]!==undefined) el.innerHTML=pack[key];
    else if(dict.en[key]!==undefined) el.innerHTML=dict.en[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
    const key=el.getAttribute('data-i18n-placeholder');
    if(pack[key]!==undefined) el.setAttribute('placeholder', pack[key]);
    else if(dict.en[key]!==undefined) el.setAttribute('placeholder', dict.en[key]);
  });
  document.querySelectorAll('.lang-option').forEach(btn=>btn.classList.toggle('active',btn.dataset.lang===lang));
  document.documentElement.lang=lang;
  const langCodeMap={en:'EN',hi:'HI',te:'TE',ta:'TA',ml:'ML',kn:'KN'};
  const langCodeEl=document.getElementById('langCode');
  if(langCodeEl) langCodeEl.textContent = langCodeMap[lang] || lang.toUpperCase();
  const menu=document.getElementById('langMenu');
  const trigger=document.getElementById('langTrigger');
  menu.classList.remove('open');
  trigger.setAttribute('aria-expanded','false');
  renderProduce();
  renderForecast(document.getElementById('cropSelect').value);
  // Let the Export and Weather modules (loaded as separate scripts)
  // know the site language changed so they can re-render their
  // dynamically-built content — otherwise those pages stay in
  // whatever language they first rendered in.
  if(typeof window.ksExportRefreshLang === 'function') window.ksExportRefreshLang(lang);
  if(typeof window.ksWeatherRefreshLang === 'function') window.ksWeatherRefreshLang(lang);
  if(typeof window.ksDeliveryRefreshLang === 'function') window.ksDeliveryRefreshLang(lang);
  if(typeof window.ksCompanyRefreshLang === 'function') window.ksCompanyRefreshLang(lang);
  if(typeof window.ksCommunityRefreshLang === 'function') window.ksCommunityRefreshLang(lang);
  if(typeof window.ksVoicebotSyncLang === 'function') window.ksVoicebotSyncLang(lang);
}
const langMenu=document.getElementById('langMenu');
const langTrigger=document.getElementById('langTrigger');
langTrigger.addEventListener('click',e=>{
  e.stopPropagation();
  const open=langMenu.classList.toggle('open');
  langTrigger.setAttribute('aria-expanded',String(open));
});
document.querySelectorAll('.lang-option').forEach(btn=>btn.addEventListener('click',()=>applyLang(btn.dataset.lang)));
document.addEventListener('click',e=>{
  if(!langMenu.contains(e.target)){
    langMenu.classList.remove('open');
    langTrigger.setAttribute('aria-expanded','false');
  }
});

/* =========================================================
   2. PAGE NAVIGATION
   ========================================================= */
function gotoPage(name){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const target = document.getElementById('page-'+name);
  if(target) target.classList.add('active');
  document.querySelectorAll('.nav-links button[data-goto]').forEach(b=>{
    b.classList.toggle('active', b.dataset.goto === name);
  });
  window.scrollTo({top:0, behavior:'instant'});
  if(name === 'forecast'){
    requestAnimationFrame(()=> renderForecast(document.getElementById('cropSelect').value));
  }
  if(name === 'weather' && typeof window.ksWeatherPageShown === 'function'){
    requestAnimationFrame(()=> window.ksWeatherPageShown());
  }
  if(name === 'export' && typeof window.ksExportPageShown === 'function'){
    requestAnimationFrame(()=> window.ksExportPageShown());
  }
  if(name === 'delivery' && typeof window.ksDeliveryPageShown === 'function'){
    requestAnimationFrame(()=> window.ksDeliveryPageShown());
  }
  if(name === 'company' && typeof window.ksCompanyPageShown === 'function'){
    requestAnimationFrame(()=> window.ksCompanyPageShown());
  }
  if(name === 'community' && typeof window.ksCommunityPageShown === 'function'){
    requestAnimationFrame(()=> window.ksCommunityPageShown());
  }
}
document.querySelectorAll('[data-goto]').forEach(btn=>{
  btn.addEventListener('click', ()=> gotoPage(btn.dataset.goto));
});

/* =========================================================
   3. MARKETPLACE
   ========================================================= */
const produce = [
  {name:"Tomato",img:IMG.tomato,price:32,cat:"veg",fresh:9,farmer:"Ramesh Kumar · Nashik"},
  {name:"Onion",img:IMG.onion,price:24,cat:"veg",fresh:6,farmer:"Sunita Devi · Nagpur"},
  {name:"Potato",img:IMG.potato,price:18,cat:"veg",fresh:8,farmer:"Kisan FPO · Agra"},
  {name:"Mango",img:IMG.mango,price:65,cat:"fruit",fresh:4,farmer:"Anil Patil · Ratnagiri"},
  {name:"Banana",img:IMG.banana,price:40,cat:"fruit",fresh:7,farmer:"Green Valley FPO · Jalgaon"},
  {name:"Wheat",img:IMG.wheat,price:26,cat:"grain",fresh:14,farmer:"Suresh Yadav · Meerut"},
  {name:"Rice",img:IMG.rice,price:44,cat:"grain",fresh:12,farmer:"Bhawani Farms · Karnal"},
  {name:"Spinach",img:IMG.spinach,price:20,cat:"veg",fresh:2,farmer:"Meera Bai · Solan"},
  {name:"Grapes",img:IMG.grapes,price:58,cat:"fruit",fresh:5,farmer:"Vinayak Kadam · Nashik"},
  {name:"Cauliflower",img:"https://images.pexels.com/photos/4963759/pexels-photo-4963759.jpeg?auto=compress&cs=tinysrgb&w=800",price:22,cat:"veg",fresh:1,farmer:"Harish Chauhan · Aligarh"},
  {name:"Cabbage",img:"https://images.pexels.com/photos/5569718/pexels-photo-5569718.jpeg?auto=compress&cs=tinysrgb&w=800",price:16,cat:"veg",fresh:2,farmer:"Lalita Sharma · Ooty"},
  {name:"Brinjal",img:"https://images.pexels.com/photos/3948546/pexels-photo-3948546.jpeg?auto=compress&cs=tinysrgb&w=800",price:28,cat:"veg",fresh:3,farmer:"Manoj Tiwari · Varanasi"},
  {name:"Okra",img:"https://images.pexels.com/photos/10487763/pexels-photo-10487763.jpeg?auto=compress&cs=tinysrgb&w=800",price:34,cat:"veg",fresh:4,farmer:"Farida Bano · Bhopal"},
  {name:"Carrot",img:"https://images.pexels.com/photos/73640/pexels-photo-73640.jpeg?auto=compress&cs=tinysrgb&w=800",price:30,cat:"veg",fresh:5,farmer:"Devendra Singh · Ooty"},
  {name:"Beetroot",img:"https://images.pexels.com/photos/5502852/pexels-photo-5502852.jpeg?auto=compress&cs=tinysrgb&w=800",price:26,cat:"veg",fresh:6,farmer:"Kavita Rawat · Pune"},
  {name:"Radish",img:"https://images.pexels.com/photos/12612096/pexels-photo-12612096.jpeg?auto=compress&cs=tinysrgb&w=800",price:18,cat:"veg",fresh:1,farmer:"Om Prakash · Meerut"},
  {name:"Green Peas",img:"https://images.pexels.com/photos/768090/pexels-photo-768090.jpeg?auto=compress&cs=tinysrgb&w=800",price:48,cat:"veg",fresh:2,farmer:"Balwinder Singh · Ludhiana"},
  {name:"Bottle Gourd",img:"https://commons.wikimedia.org/wiki/Special:FilePath/Bottle%20gourd.jpg",price:20,cat:"veg",fresh:3,farmer:"Shanti Devi · Kanpur"},
  {name:"Bitter Gourd",img:"https://commons.wikimedia.org/wiki/Special:FilePath/Bittergourd.jpg",price:36,cat:"veg",fresh:4,farmer:"Ravindra Patil · Kolhapur"},
  {name:"Ridge Gourd",img:"https://commons.wikimedia.org/wiki/Special:FilePath/Ridge%20gourd(%20beerakai%20).jpg",price:26,cat:"veg",fresh:5,farmer:"Yamuna Reddy · Guntur"},
  {name:"Pumpkin",img:"https://images.pexels.com/photos/18674316/pexels-photo-18674316.jpeg?auto=compress&cs=tinysrgb&w=800",price:17,cat:"veg",fresh:6,farmer:"Ganesh More · Satara"},
  {name:"Cucumber",img:"https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg?auto=compress&cs=tinysrgb&w=800",price:22,cat:"veg",fresh:1,farmer:"Preeti Yadav · Kanpur"},
  {name:"Capsicum",img:"https://upload.wikimedia.org/wikipedia/commons/b/b7/Green-Bell-Pepper.jpg",price:42,cat:"veg",fresh:2,farmer:"Ajay Deshmukh · Nashik"},
  {name:"Green Chilli",img:"https://upload.wikimedia.org/wikipedia/commons/8/86/Green_chillies.jpg",price:38,cat:"veg",fresh:3,farmer:"Rekha Naik · Guntur"},
  {name:"Garlic",img:"https://upload.wikimedia.org/wikipedia/commons/9/9a/Garlic_bulbs_and_cloves.jpg",price:92,cat:"veg",fresh:4,farmer:"Vitthal Jadhav · Nashik"},
  {name:"Ginger",img:"https://images.pexels.com/photos/20234970/pexels-photo-20234970.jpeg?auto=compress&cs=tinysrgb&w=800",price:68,cat:"veg",fresh:5,farmer:"Thoiba Devi · Shillong"},
  {name:"French Beans",img:"https://images.pexels.com/photos/10487661/pexels-photo-10487661.jpeg?auto=compress&cs=tinysrgb&w=800",price:44,cat:"veg",fresh:6,farmer:"Neha Rathi · Ooty"},
  {name:"Cluster Beans",img:"https://commons.wikimedia.org/wiki/Special:FilePath/Cyamopsis%20tetragonoloba,%20a%20valuable%20crop.%20A.J.T.Johnsingh.DSCN1576.jpg",price:32,cat:"veg",fresh:1,farmer:"Suraj Vora · Rajkot"},
  {name:"Drumstick",img:"https://commons.wikimedia.org/wiki/Special:FilePath/Drumsticks%20or%20Moringa.jpg",price:40,cat:"veg",fresh:2,farmer:"Muthu Selvam · Madurai"},
  {name:"Sweet Potato",img:"https://images.pexels.com/photos/6060223/pexels-photo-6060223.jpeg?auto=compress&cs=tinysrgb&w=800",price:24,cat:"veg",fresh:3,farmer:"Kamala Bai · Varanasi"},
  {name:"Colocasia",img:"https://commons.wikimedia.org/wiki/Special:FilePath/Taro%20(Colocasia%20esculenta).jpg",price:30,cat:"veg",fresh:4,farmer:"Anita Toppo · Ranchi"},
  {name:"Yam",img:"https://commons.wikimedia.org/wiki/Special:FilePath/YamsatBrixtonMarket.jpg",price:34,cat:"veg",fresh:5,farmer:"Selvi Murugan · Coimbatore"},
  {name:"Fenugreek Leaves",img:"https://upload.wikimedia.org/wikipedia/commons/d/dc/Washed_fenugreek_leaves_for_cooking_methi-chadachadi.jpg",price:14,cat:"veg",fresh:6,farmer:"Rukmini Devi · Jaipur"},
  {name:"Coriander Leaves",img:"https://images.pexels.com/photos/7456525/pexels-photo-7456525.jpeg?auto=compress&cs=tinysrgb&w=800",price:12,cat:"veg",fresh:1,farmer:"Sanjay Verma · Jaipur"},
  {name:"Mint Leaves",img:"https://images.pexels.com/photos/214165/pexels-photo-214165.jpeg?auto=compress&cs=tinysrgb&w=800",price:16,cat:"veg",fresh:2,farmer:"Farhana Khatoon · Lucknow"},
  {name:"Curry Leaves",img:"https://commons.wikimedia.org/wiki/Special:FilePath/Murraya%20koenigii%20leaves%20-%20curry%20leaves.jpg",price:20,cat:"veg",fresh:3,farmer:"Lakshmi Iyer · Salem"},
  {name:"Amaranth Leaves",img:"https://commons.wikimedia.org/wiki/Special:FilePath/Aleho%20Vegetables%20at%20Bakin%20Dogo%20Market,%20Kaduna%20North.jpg",price:15,cat:"veg",fresh:4,farmer:"Geeta Kumari · Patna"},
  {name:"Mustard Greens",img:"https://upload.wikimedia.org/wikipedia/commons/b/b9/Mustard_greens_on_a_tray.jpg",price:18,cat:"veg",fresh:5,farmer:"Harpreet Kaur · Amritsar"},
  {name:"Lettuce",img:"https://images.pexels.com/photos/5604/pexels-photo-5604.jpeg?auto=compress&cs=tinysrgb&w=800",price:46,cat:"veg",fresh:6,farmer:"Tenzin Dolma · Kalimpong"},
  {name:"Broccoli",img:"https://images.pexels.com/photos/161514/pexels-photo-161514.jpeg?auto=compress&cs=tinysrgb&w=800",price:58,cat:"veg",fresh:1,farmer:"Simran Gill · Panchkula"},
  {name:"Sweet Corn",img:"https://images.pexels.com/photos/603030/pexels-photo-603030.jpeg?auto=compress&cs=tinysrgb&w=800",price:26,cat:"veg",fresh:2,farmer:"Bhagwan Shinde · Junnar"},
  {name:"Spring Onion",img:"https://images.pexels.com/photos/15220072/pexels-photo-15220072.jpeg?auto=compress&cs=tinysrgb&w=800",price:24,cat:"veg",fresh:3,farmer:"Iqbal Sheikh · Nashik"},
  {name:"Turnip",img:"https://upload.wikimedia.org/wikipedia/commons/1/16/Turnip.JPG",price:20,cat:"veg",fresh:4,farmer:"Jaswant Kaur · Jalandhar"},
  {name:"Raw Banana",img:"https://upload.wikimedia.org/wikipedia/commons/6/68/Green_unripe_Plantain.jpg",price:22,cat:"veg",fresh:5,farmer:"Murugesan K · Trichy"},
  {name:"Ash Gourd",img:"https://upload.wikimedia.org/wikipedia/commons/b/b1/Winter_melon.jpg",price:19,cat:"veg",fresh:6,farmer:"Padma Naidu · Vijayawada"},
  {name:"Snake Gourd",img:"https://upload.wikimedia.org/wikipedia/commons/8/8f/Snake_Gourd.jpg",price:24,cat:"veg",fresh:1,farmer:"Chinnaswamy R · Erode"},
  {name:"Ivy Gourd",img:"https://upload.wikimedia.org/wikipedia/commons/8/81/Ivy_gourd_%28Coccinia_grandis%29_fruits.jpg",price:30,cat:"veg",fresh:2,farmer:"Kaveri Amma · Thanjavur"},
  {name:"Pointed Gourd",img:"https://upload.wikimedia.org/wikipedia/commons/2/2d/Pointed_gourd.jpg",price:38,cat:"veg",fresh:3,farmer:"Bimla Prasad · Patna"},
  {name:"Baby Corn",img:"https://commons.wikimedia.org/wiki/Special:FilePath/Baby%20corn%201.jpg",price:54,cat:"veg",fresh:4,farmer:"Dorjee Lepcha · Kalimpong"},
  {name:"Red Cabbage",img:"https://upload.wikimedia.org/wikipedia/commons/a/a2/Red_cabbage.jpg",price:44,cat:"veg",fresh:5,farmer:"Angmo Tashi · Manali"},
  {name:"Zucchini",img:"https://upload.wikimedia.org/wikipedia/commons/7/7c/Zucchini-Whole.jpg",price:48,cat:"veg",fresh:6,farmer:"Rajveer Chauhan · Solan"},
  {name:"Celery",img:"https://commons.wikimedia.org/wiki/Special:FilePath/Apium%20graveolens%20var.%20dulce%20(Staudensellerie)%202024-07-28%20(01).jpg",price:56,cat:"veg",fresh:1,farmer:"Wangmo Bhutia · Kalimpong"},
  {name:"Flat Beans",img:"https://upload.wikimedia.org/wikipedia/commons/5/54/Flat_beans.jpg",price:30,cat:"veg",fresh:2,farmer:"Ushaben Patel · Anand"},
  {name:"Elephant Foot Yam",img:"https://commons.wikimedia.org/wiki/Special:FilePath/Elephant%20foot%20yam%20or%20Pungapong.jpg",price:28,cat:"veg",fresh:3,farmer:"Subhadra Naik · Bhubaneswar"},
  {name:"Cherry Tomato",img:"https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=800",price:70,cat:"veg",fresh:4,farmer:"Meenakshi Pillai · Kodaikanal"},
  {name:"Yellow Bell Pepper",img:"https://images.pexels.com/photos/67821/pexels-photo-67821.jpeg?auto=compress&cs=tinysrgb&w=800",price:78,cat:"veg",fresh:5,farmer:"Harjot Singh · Jalandhar"},
  {name:"Red Bell Pepper",img:"https://upload.wikimedia.org/wikipedia/commons/5/5c/Red_bell_pepper.jpg",price:82,cat:"veg",fresh:6,farmer:"Nirmal Sodhi · Jalandhar"},
  {name:"Raw Jackfruit",img:"https://upload.wikimedia.org/wikipedia/commons/9/9b/Young_Jackfruit.JPG",price:32,cat:"veg",fresh:1,farmer:"Sasikala Menon · Kochi"},
  {name:"Water Chestnut",img:"https://upload.wikimedia.org/wikipedia/commons/e/e1/Water_chestnut.jpg",price:44,cat:"veg",fresh:2,farmer:"Ramkali Devi · Gorakhpur"},
];
/* Deterministic 14-day price history per produce item, seeded off its
   base price + a per-item offset, so every reload / language switch
   shows the same numbers for the same crop. Fed into the same
   projectForecast() trend model used on the Price Forecast page. */
function genHist(basePrice, seed){
  const hist=[];
  for(let i=0;i<14;i++){
    const wave = Math.sin((i+seed)*0.9)*(basePrice*0.05) + Math.sin((i+seed)*0.37)*(basePrice*0.025);
    hist.push(Math.round((basePrice+wave)*10)/10);
  }
  return hist;
}
produce.forEach((p,i)=>{ if(!p.hist) p.hist = genHist(p.price, i*2.3+1); });

function renderProduce(){
  const maxPrice = parseInt(document.getElementById('priceRange').value, 10);
  const cat = document.getElementById('categoryFilter').value;
  const sortMode = document.getElementById('sortFilter').value;

  let list = produce.filter(p => p.price <= maxPrice && (cat === "all" || p.cat === cat));
  if(sortMode === "low") list.sort((a,b)=>a.price-b.price);
  if(sortMode === "high") list.sort((a,b)=>b.price-a.price);
  if(sortMode === "fresh") list.sort((a,b)=>a.fresh-b.fresh);

  const grid = document.getElementById('produceGrid');
  if(list.length === 0){
    grid.innerHTML = `<div class="empty-note">No produce matches this filter yet — try widening the price range.</div>`;
    return;
  }
  const pack = dict[currentLang] || dict.en;
  grid.innerHTML = list.map(p=>{
    const future = projectForecast(p.hist);
    const pct = Math.round(((future[future.length-1]-p.price)/p.price)*1000)/10;
    const up = pct >= 0;
    return `
    <div class="produce-card">
      <div class="produce-thumb-wrap">
        <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src=phImg('${p.name}','${p.cat}');">
        <span class="badge">${p.fresh<=3?'Harvested today':'Fresh · '+p.fresh+'d'}</span>
      </div>
      <div class="produce-body">
        <h4>${p.name}</h4>
        <div class="produce-meta">${p.farmer}</div>
        <div class="produce-price">
          <span class="price-tag">₹${p.price} <span class="unit">/kg</span></span>
          <span class="forecast-chip ${up?'up':'down'}">${up?'▲':'▼'} ${Math.abs(pct)}% · 7d</span>
        </div>
        <div class="mini-forecast">
          ${future.slice(0,5).map((v,i)=>`<div class="mf-day"><span class="mf-l">D+${i+1}</span><span class="mf-v">₹${v}</span></div>`).join('')}
        </div>
        <button type="button" class="mini-btn buy-btn" data-name="${encodeURIComponent(p.name)}" style="width:100%;margin-top:10px;">${pack.buyBtn || 'Add to cart'}</button>
      </div>
    </div>
  `;}).join('');

  // "Add to cart" — hands the exact Marketplace produce entry (name,
  // price, image, category, farmer/location) to the Delivery module,
  // which is the single source of truth for cart/order item details.
  grid.querySelectorAll('.buy-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const name = decodeURIComponent(btn.dataset.name);
      const item = produce.find(x => x.name === name);
      if(item && typeof window.ksAddToCart === 'function') window.ksAddToCart(item);
    });
  });
}
document.getElementById('priceRange').addEventListener('input', e=>{
  document.getElementById('priceRangeVal').textContent = 'up to ₹'+e.target.value;
  renderProduce();
});
document.getElementById('categoryFilter').addEventListener('change', renderProduce);
document.getElementById('sortFilter').addEventListener('change', renderProduce);
renderProduce();

/* =========================================================
   4. AI PRICE FORECAST — real Agmarknet data + multi-factor model
   ========================================================= */

/* Kept for the marketplace card mini-forecasts (per-item synthetic
   history) — unrelated to the live Agmarknet feed below. */
function projectForecast(hist){
  const n = hist.length;
  const xs = hist.map((_,i)=>i);
  const meanX = xs.reduce((a,b)=>a+b,0)/n;
  const meanY = hist.reduce((a,b)=>a+b,0)/n;
  let num=0, den=0;
  for(let i=0;i<n;i++){ num += (xs[i]-meanX)*(hist[i]-meanY); den += (xs[i]-meanX)**2; }
  const slope = den===0 ? 0 : num/den;
  const intercept = meanY - slope*meanX;
  const future = [];
  for(let i=n;i<n+7;i++){
    const noise = Math.sin(i*1.3)*0.6;
    future.push(Math.round((slope*i+intercept+noise)*10)/10);
  }
  return future;
}

/* data.gov.in — "Current Daily Price of Various Commodities from
   Various Markets (Mandi)" (Agmarknet feed). The key below is the
   public TEST key published on data.gov.in's own API docs page — it
   works for anyone but is capped at ~10 records per call. For a real
   deployment, get a free key at https://data.gov.in (My Account →
   Generate API Key) and swap it in here. */
const DATA_GOV_API_KEY = '579b464db66ec23bdd00000104387014f57044175a140e3398aaf32c';
const MANDI_RESOURCE_ID = '9ef84268-d588-465a-a308-a864a43d0070';
const FETCH_TIMEOUT_MS = 6000;
const PROXY_TIMEOUT_MS = 4000; // shorter per-proxy timeout, since we may try several in sequence
const cropToCommodity = { tomato:'Tomato', onion:'Onion', wheat:'Wheat', potato:'Potato', spinach:'Spinach' };

/* Synthetic 14-day fallback — used whenever the live feed can't be
   reached (offline demo, no key, CORS blocked, or too few records). */
const fallbackHist = {
  tomato:[30,29,31,33,30,28,27,29,31,34,33,32,30,32],
  onion:[22,23,21,20,22,24,25,24,23,22,21,20,22,24],
  wheat:[24,24,25,25,26,26,25,25,26,27,27,26,26,26],
  potato:[17,18,17,16,18,19,18,17,16,18,19,18,17,18],
  spinach:[19,20,21,19,18,20,22,21,19,18,20,21,19,20]
};

const liveDataCache = {}; // keyed by `${crop}|${state}`

/* Tries a direct fetch first. If the browser's fetch() throws outright
   (the signature of a CORS block or a real network/DNS failure — the two
   are indistinguishable from JS), works through a small chain of public
   CORS proxies until one responds. Free proxies are individually flaky
   (rate-limited, sometimes down), so trying several beats trusting one.
   An HTTP error status (429, 403, etc.) from the DIRECT attempt is a real
   response from data.gov.in itself, not a CORS block — a proxy can't fix
   that, so we don't chase it through proxies (would just hit the same
   rate limit again from a different IP, wasting time). */
const CORS_PROXIES = [
  url => 'https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent(url),
  url => 'https://api.allorigins.win/raw?url=' + encodeURIComponent(url),
  url => 'https://corsproxy.io/?url=' + encodeURIComponent(url)
];

async function fetchWithCorsFallback(url, timeoutMs){
  try{
    const controller = new AbortController();
    const timer = setTimeout(()=>controller.abort(), timeoutMs);
    const res = await fetch(url, {signal:controller.signal});
    clearTimeout(timer);
    return {res, via:'direct'};
  }catch(directErr){
    const reason = directErr && directErr.name === 'AbortError' ? 'timed out' : (directErr && directErr.message) || 'unknown error';
    console.warn(`[Agmarknet] Direct fetch failed (${reason}) — likely CORS or network block. Trying CORS proxies…`);
    for(let i=0; i<CORS_PROXIES.length; i++){
      try{
        const proxyUrl = CORS_PROXIES[i](url);
        const controller2 = new AbortController();
        const timer2 = setTimeout(()=>controller2.abort(), PROXY_TIMEOUT_MS);
        const res2 = await fetch(proxyUrl, {signal:controller2.signal});
        clearTimeout(timer2);
        console.info(`[Agmarknet] CORS proxy #${i+1} responded.`);
        return {res:res2, via:`proxy#${i+1}`};
      }catch(proxyErr){
        const reason2 = proxyErr && proxyErr.name === 'AbortError' ? 'timed out' : (proxyErr && proxyErr.message) || 'unknown error';
        console.warn(`[Agmarknet] CORS proxy #${i+1} failed (${reason2}).`);
      }
    }
    throw new Error('direct fetch and all CORS proxies failed');
  }
}

/* IMPORTANT — what this Agmarknet resource actually is:
   it is a SAME-DAY snapshot, not a queryable historical archive. Every
   record returned has today's arrival_date; there's no way to pull
   "the last 14 days" from this single resource via the API. Filtering
   tightly by both commodity AND state on a single day often returns
   zero rows, since only a fraction of India's mandis report any given
   commodity on any given day.

   So the honest, useful thing this data can give us is a single real
   anchor point — today's actual average modal price for that commodity,
   preferring the selected state but falling back to a national average
   if that state reported nothing today. We then build the 7-day
   forecast and the "last 14 days" chart around that one real number,
   using the same demo-shaped trend as a stand-in for the days we have
   no live data for — and we say so plainly in the UI, rather than
   implying the whole history is live when only today's point is. */

async function queryAgmarknetToday(commodity, state){
  const url = `https://api.data.gov.in/resource/${MANDI_RESOURCE_ID}`
    + `?api-key=${DATA_GOV_API_KEY}&format=json&limit=200`
    + `&filters[commodity]=${encodeURIComponent(commodity)}`
    + (state ? `&filters[state]=${encodeURIComponent(state)}` : '');

  const { res, via } = await fetchWithCorsFallback(url, FETCH_TIMEOUT_MS);
  if(!res.ok){
    console.warn(`[Agmarknet] HTTP ${res.status} for ${commodity}${state?'/'+state:' (national)'} (via ${via}).`
      + (res.status === 429 ? ' (rate-limited — make sure you\'re using your own personal key)' : ''));
    return null;
  }
  const json = await res.json();
  const records = (json && json.records) || [];
  const modalPrices = records.map(r=>parseFloat(r.modal_price)).filter(v=>!isNaN(v) && v>0);
  if(!modalPrices.length){
    console.warn(`[Agmarknet] 0 usable record(s) for ${commodity}${state?'/'+state:' (national)'} today (via ${via}).`);
    return null;
  }
  const avgQuintal = modalPrices.reduce((a,b)=>a+b,0)/modalPrices.length;
  const priceKg = Math.round(avgQuintal/100*10)/10; // ₹/quintal → ₹/kg, 1dp
  const sample = records.find(r=>!isNaN(parseFloat(r.modal_price)));
  console.info(`[Agmarknet] ${commodity}${state?'/'+state:' (national)'}: ${modalPrices.length} report(s) today (via ${via}), avg ₹${priceKg}/kg.`);
  return { price: priceKg, market: sample && sample.market, state: sample && sample.state, n: modalPrices.length };
}

async function fetchTodaysMandiAnchor(cropKey, state){
  const commodity = cropToCommodity[cropKey];
  const cacheKey = cropKey + '|' + state;
  if(liveDataCache[cacheKey] !== undefined) return liveDataCache[cacheKey];

  let result = null, scope = 'state';
  try{
    result = await queryAgmarknetToday(commodity, state);
  }catch(err){
    console.warn(`[Agmarknet] Fetch failed for ${commodity}/${state}: ${(err&&err.message)||err}`);
  }
  if(!result){
    scope = 'national';
    try{
      result = await queryAgmarknetToday(commodity, null); // no state filter — any mandi in India today
    }catch(err){
      console.warn(`[Agmarknet] National fallback fetch also failed for ${commodity}: ${(err&&err.message)||err}`);
    }
  }
  if(!result){
    liveDataCache[cacheKey] = null;
    return null;
  }
  const anchor = { ...result, scope };
  liveDataCache[cacheKey] = anchor;
  return anchor;
}

/* Builds a 14-point series shaped like the demo trend for that crop,
   but rescaled so its final (today's) value exactly matches the real
   anchor price. This keeps the trend/seasonality/volatility math
   working the same way, while the one point that matters most —
   today — is genuinely real. */
function buildAnchoredSeries(cropKey, anchorPrice){
  const base = fallbackHist[cropKey];
  const baseLast = base[base.length-1];
  const scale = baseLast ? anchorPrice / baseLast : 1;
  const series = base.map(p => ({ date:null, modal: Math.round(p*scale*10)/10, min:null, max:null }));
  series[series.length-1].modal = anchorPrice; // force exact match, avoid rounding drift
  return series;
}

async function fetchRealMandiSeries(cropKey, state){
  const anchor = await fetchTodaysMandiAnchor(cropKey, state);
  if(!anchor) return null;
  const series = buildAnchoredSeries(cropKey, anchor.price);
  series.anchorMeta = anchor; // stash for the UI badge/source note
  return series;
}

/* Multi-factor forecast: trend regression + weekly seasonality +
   volatility band (from real min/max spread when available) + short-term momentum.
   weatherMultiplier widens the confidence band when bad weather is forecast —
   it never shifts the trend line itself, because we don't have a real trained
   coefficient linking rainfall to price direction, only to price *uncertainty*. */
function computeForecast(series, weatherMultiplier){
  weatherMultiplier = weatherMultiplier || 1;
  const modal = series.map(d=>d.modal);
  const n = modal.length;
  const xs = modal.map((_,i)=>i);
  const meanX = xs.reduce((a,b)=>a+b,0)/n;
  const meanY = modal.reduce((a,b)=>a+b,0)/n;
  let num=0, den=0;
  for(let i=0;i<n;i++){ num += (xs[i]-meanX)*(modal[i]-meanY); den += (xs[i]-meanX)**2; }
  const slope = den===0 ? 0 : num/den;
  const intercept = meanY - slope*meanX;

  const weekdayResidual = [0,0,0,0,0,0,0];
  const weekdayCount = [0,0,0,0,0,0,0];
  series.forEach((d,i)=>{
    const predicted = slope*i + intercept;
    const wd = d.date ? d.date.getDay() : i % 7;
    weekdayResidual[wd] += (d.modal - predicted);
    weekdayCount[wd]++;
  });
  const weekdaySeason = weekdayResidual.map((sum,i)=> weekdayCount[i] ? sum/weekdayCount[i] : 0);

  const spreads = series.filter(d=>d.min!=null && d.max!=null).map(d=>d.max-d.min);
  let volatility;
  if(spreads.length){
    volatility = spreads.reduce((a,b)=>a+b,0)/spreads.length/2;
  }else{
    const residuals = modal.map((v,i)=> v - (slope*i+intercept));
    const variance = residuals.reduce((a,b)=>a+b*b,0)/n;
    volatility = Math.sqrt(variance);
  }
  volatility = Math.max(volatility, meanY*0.03);
  volatility *= weatherMultiplier;

  const recentN = Math.min(3, n);
  const recentAvg = modal.slice(-recentN).reduce((a,b)=>a+b,0)/recentN;
  const momentum = recentAvg - meanY;

  const lastDate = series[series.length-1].date || new Date();
  const future = [];
  for(let step=1; step<=7; step++){
    const i = n - 1 + step;
    const fadeFactor = Math.max(0, 1 - step/7);
    const projDate = new Date(lastDate); projDate.setDate(projDate.getDate()+step);
    const wd = projDate.getDay ? projDate.getDay() : (i % 7);
    const base = slope*i + intercept + weekdaySeason[wd] + momentum*fadeFactor*0.5;
    const mid = Math.round(base*10)/10;
    future.push({
      day: step,
      mid,
      low: Math.round((mid - volatility)*10)/10,
      high: Math.round((mid + volatility)*10)/10
    });
  }
  return { future, slope, volatility, momentum, weekdaySeason };
}

/* =========================================================
   4a. WEATHER ADVISORY — Open-Meteo (free, no API key, CORS-friendly)
   Used only as a qualitative risk flag + confidence-band widener.
   No real trained coefficient links "Xmm rain -> ₹Y price move", so
   we never bake it into the trend line — only into the uncertainty band.
   (Independent of the site's separate Weather page/module.) */
const stateCoords = {
  'Maharashtra':   {lat:19.9975, lon:73.7898},  // Nashik — major produce mandi belt
  'Karnataka':     {lat:12.9716, lon:77.5946},  // Bengaluru
  'Uttar Pradesh': {lat:26.8467, lon:80.9462},  // Lucknow
  'Punjab':        {lat:30.9010, lon:75.8573},  // Ludhiana
  'Gujarat':       {lat:23.0225, lon:72.5714},  // Ahmedabad
  'Tamil Nadu':    {lat:11.0168, lon:76.9558},  // Coimbatore — major agri hub
  'Kerala':        {lat:9.9312,  lon:76.2673},  // Kochi
  'Andhra Pradesh':{lat:16.5062, lon:80.6480},  // Vijayawada — major mandi hub
  'Telangana':     {lat:17.3850, lon:78.4867}   // Hyderabad
};
const fcWeatherCache = {};

async function fetchWeatherOutlook(state){
  if(fcWeatherCache[state]) return fcWeatherCache[state];
  const coords = stateCoords[state];
  if(!coords) return null;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}`
    + `&daily=precipitation_sum,temperature_2m_max&forecast_days=7&timezone=auto`;
  const controller = new AbortController();
  const timer = setTimeout(()=>controller.abort(), FETCH_TIMEOUT_MS);
  try{
    const res = await fetch(url, {signal:controller.signal});
    clearTimeout(timer);
    if(!res.ok) return null;
    const json = await res.json();
    if(!json.daily || !json.daily.time) return null;
    const outlook = json.daily.time.map((t,i)=>({
      date: new Date(t),
      rain: json.daily.precipitation_sum[i],
      tempMax: json.daily.temperature_2m_max[i]
    }));
    fcWeatherCache[state] = outlook;
    return outlook;
  }catch(err){
    clearTimeout(timer);
    return null;
  }
}

const perishableCrops = { tomato:true, onion:true, wheat:false, potato:false, spinach:true };

function buildWeatherAdvisory(outlook, cropKey, isHi){
  if(!outlook){
    return {
      level:'unknown', multiplier:1,
      text: isHi ? 'मौसम डेटा फ़िलहाल उपलब्ध नहीं — पूर्वानुमान में मौसम शामिल नहीं है।'
                 : 'Weather data unavailable right now — forecast excludes weather this time.'
    };
  }
  const nearTerm = outlook.slice(0,4);
  const maxRain = Math.max(...nearTerm.map(d=>d.rain||0));
  const rainDay = nearTerm.find(d=> (d.rain||0) === maxRain);
  const maxTemp = Math.max(...outlook.map(d=>d.tempMax||0));
  const sensitive = perishableCrops[cropKey];
  const dateStr = rainDay ? rainDay.date.toLocaleDateString(isHi?'hi-IN':'en-IN',{weekday:'short', day:'numeric', month:'short'}) : '';

  if(maxRain >= 25 && sensitive){
    return { level:'danger', multiplier: 1.45,
      text: isHi ? `⚠ भारी बारिश की संभावना (${dateStr}, ~${Math.round(maxRain)}mm) — आवक घट सकती है, भाव में उछाल संभव।`
                 : `⚠ Heavy rain likely around ${dateStr} (~${Math.round(maxRain)}mm) — arrivals may drop, prices could firm up.` };
  }
  if(maxRain >= 25 && !sensitive){
    return { level:'warn', multiplier: 1.15,
      text: isHi ? `भारी बारिश की संभावना (${dateStr}) — भंडारित अनाज पर सीमित असर, फिर भी ढुलाई में देरी संभव।`
                 : `Heavy rain likely around ${dateStr} — limited impact on stored grain, but transport delays possible.` };
  }
  if(maxRain >= 10){
    return { level:'warn', multiplier: 1.2,
      text: isHi ? `मध्यम बारिश की संभावना (${dateStr}, ~${Math.round(maxRain)}mm) — आवक में मामूली असर संभव।`
                 : `Moderate rain possible around ${dateStr} (~${Math.round(maxRain)}mm) — some effect on arrivals possible.` };
  }
  if(maxTemp >= 42 && sensitive){
    return { level:'warn', multiplier: 1.2,
      text: isHi ? `अगले सप्ताह अधिक गर्मी (${Math.round(maxTemp)}°C) — जल्दी खराब होने का खतरा, जल्द बिक्री बेहतर।`
                 : `High heat ahead (${Math.round(maxTemp)}°C) — faster spoilage risk, selling sooner may be wiser.` };
  }
  return { level:'ok', multiplier: 1,
    text: isHi ? 'मौसम स्थिर दिख रहा है — इस सप्ताह मौसम से बड़ा जोखिम नहीं।'
               : 'Weather looks stable — no major price risk from weather this week.' };
}

/* =========================================================
   4b. eNAM AUCTION PRICE — best-effort attempt, honest fallback
   eNAM has no published public API: its trade-data dashboard
   (enam.gov.in/web/dashboard/trade-data) is a JS form with dependent
   state → APMC → commodity dropdowns, not a URL you can deep-link with
   query params, and its data endpoint is an internal AJAX call meant
   for that page's own frontend — not CORS-enabled for outside origins.
   We still attempt a real call, but design the UI around the fallback. */
const ENAM_ENDPOINT = 'https://enam.gov.in/web/Ajax_ctrl/trade_data_list';
const enamCache = {};

async function fetchEnamAuction(cropKey, state){
  const cacheKey = cropKey+'|'+state;
  if(enamCache[cacheKey] !== undefined) return enamCache[cacheKey];
  const commodity = cropToCommodity[cropKey];
  const today = new Date();
  const dd = String(today.getDate()).padStart(2,'0');
  const mm = String(today.getMonth()+1).padStart(2,'0');
  const yyyy = today.getFullYear();
  const dateStr = `${dd}-${mm}-${yyyy}`;
  const body = `language=en&stateName=${encodeURIComponent(state)}&apmcName=&commodityName=${encodeURIComponent(commodity)}&fromDate=${dateStr}&toDate=${dateStr}`;

  const controller = new AbortController();
  const timer = setTimeout(()=>controller.abort(), 5000);
  try{
    const res = await fetch(ENAM_ENDPOINT, {
      method:'POST',
      headers:{'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
      body,
      signal: controller.signal
    });
    clearTimeout(timer);
    if(!res.ok){ enamCache[cacheKey] = null; return null; }
    const json = await res.json();
    const rows = (json && (json.data || json.records)) || [];
    if(!rows.length){ enamCache[cacheKey] = null; return null; }
    const modalKey = Object.keys(rows[0]).find(k=>/modal/i.test(k));
    const marketKey = Object.keys(rows[0]).find(k=>/apmc|market/i.test(k));
    const prices = rows.map(r=>parseFloat(r[modalKey])).filter(v=>!isNaN(v));
    if(!prices.length){ enamCache[cacheKey] = null; return null; }
    const avg = prices.reduce((a,b)=>a+b,0)/prices.length;
    const result = { price: Math.round(avg/100*10)/10, market: rows[0][marketKey] || state };
    enamCache[cacheKey] = result;
    return result;
  }catch(err){
    clearTimeout(timer);
    enamCache[cacheKey] = null;
    return null; // expected: CORS-blocked from a foreign origin
  }
}

async function renderEnamPanel(cropKey, state, myToken){
  const badge = document.getElementById('enamBadge');
  const badgeText = document.getElementById('enamBadgeText');
  const body = document.getElementById('enamBody');
  if(!badge || !body) return;
  const isHi = currentLang==='hi';
  badge.className = 'data-badge';
  badgeText.textContent = isHi ? 'जाँच हो रही है…' : 'Checking…';

  const result = await fetchEnamAuction(cropKey, state);
  if(myToken !== forecastRequestToken) return;

  if(result){
    badge.classList.add('live');
    badgeText.textContent = isHi ? 'लाइव · eNAM' : 'Live · eNAM';
    body.innerHTML = `
      <div class="enam-price-block">
        <div class="ep-val">₹${result.price}</div>
        <div class="ep-lbl">${isHi?'औसत नीलामी भाव (प्रति किलो)':'Avg. auction price (per kg)'} · ${result.market}</div>
      </div>
      <div class="enam-fact">${isHi ? 'स्रोत: eNAM लाइव नीलामी फ़ीड।' : 'Source: eNAM live auction feed.'}</div>`;
  }else{
    badge.classList.add('error');
    badgeText.textContent = isHi ? 'सीधे उपलब्ध नहीं' : 'Not directly available';
    const enamUrl = 'https://enam.gov.in/web/dashboard/trade-data';
    body.innerHTML = `
      <div class="enam-empty">
        <p>${isHi
          ? 'eNAM के पास कोई सार्वजनिक API नहीं है जिसे कोई भी वेबसाइट सीधे कॉल कर सके — ब्राउज़र सुरक्षा नीति (CORS) इसे रोकती है, इसलिए यह यहाँ लाइव नहीं दिख सकता।'
          : `eNAM doesn't offer a public API a website can call directly — browser security policy (CORS) blocks the request, so it can't show live here.`}</p>
        <a class="enam-link" href="${enamUrl}" target="_blank" rel="noopener">${isHi?'eNAM डैशबोर्ड खोलें':'Open eNAM dashboard'} ↗</a>
      </div>
      <div class="enam-fact">${isHi
        ? 'नोट: eNAM की नीलामी-आधारित कीमतें ऊपर दिखाए गए भौतिक मंडी औसत से भिन्न हो सकती हैं — प्रतिस्पर्धी बोली के कारण अक्सर थोड़ी अधिक।'
        : "Note: eNAM's auction-based prices can differ from the physical mandi average shown above — often a bit higher due to competitive bidding."}</div>`;
  }
}

let forecastChart = null;
let forecastRequestToken = 0;

async function renderForecast(cropKey){
  const canvas = document.getElementById('forecastChart');
  if(!canvas || typeof Chart === 'undefined') return;
  const myToken = ++forecastRequestToken;
  const stateSelectEl = document.getElementById('stateSelect');
  const state = stateSelectEl ? stateSelectEl.value : 'Maharashtra';
  const isHi = currentLang==='hi';

  const badge = document.getElementById('dataSourceBadge');
  const badgeText = document.getElementById('dataSourceText');
  if(badge){
    badge.className = 'data-badge';
    badgeText.textContent = isHi ? 'लाइव डेटा जाँचा जा रहा है…' : 'Checking live data…';
  }

  renderEnamPanel(cropKey, state, myToken); // independent, non-blocking

  const [live, weatherOutlook] = await Promise.all([
    fetchRealMandiSeries(cropKey, state),
    fetchWeatherOutlook(state)
  ]);
  if(myToken !== forecastRequestToken) return;

  let series, isLive, anchorMeta = null;
  if(live){
    series = live;
    isLive = true;
    anchorMeta = live.anchorMeta || null;
    if(badge){
      badge.classList.add('live');
      if(anchorMeta && anchorMeta.scope === 'national'){
        badgeText.textContent = isHi
          ? `लाइव (आज, राष्ट्रीय औसत) · Agmarknet`
          : `Live (today, national avg) · Agmarknet`;
      }else{
        badgeText.textContent = isHi ? `लाइव (आज) · Agmarknet (${state})` : `Live (today) · Agmarknet (${state})`;
      }
    }
  }else{
    series = fallbackHist[cropKey].map((p)=>({date:null, modal:p, min:null, max:null}));
    isLive = false;
    if(badge){
      badge.classList.add('demo');
      badgeText.textContent = isHi ? 'डेमो डेटा (ऑफ़लाइन)' : 'Demo data (offline)';
    }
  }

  const advisory = buildWeatherAdvisory(weatherOutlook, cropKey, isHi);
  const { future, slope, volatility, momentum } = computeForecast(series, advisory.multiplier);
  const hist = series.map(d=>d.modal);
  const lastActual = hist[hist.length-1];

  document.getElementById('forecastCropName').textContent = dict[currentLang]['crop'+cropKey.charAt(0).toUpperCase()+cropKey.slice(1)] || dict.en['crop'+cropKey.charAt(0).toUpperCase()+cropKey.slice(1)];
  const forecastThumb = document.getElementById('forecastCropThumb');
  forecastThumb.onerror = function(){ this.onerror=null; this.src = phImg(cropKey, cropKey==='wheat'||cropKey==='rice' ? 'grain' : 'veg'); };
  forecastThumb.src = IMG[cropKey];
  forecastThumb.alt = cropKey;
  document.getElementById('statCurrent').textContent = '₹'+lastActual;
  document.getElementById('statForecast').textContent = '₹'+future[future.length-1].mid;
  document.getElementById('statLow').textContent = '₹'+Math.min(...hist);
  document.getElementById('statHigh').textContent = '₹'+Math.max(...hist);

  // Feed Price Guard with the latest known prices for this crop/state
  pgLastMandi = lastActual;
  pgLastForecast = future[future.length-1].mid;
  pgCurrentCrop = cropKey;
  pgCurrentState = state;
  renderPriceGuard();

  // Day-by-day forecast row — now driven by the multi-factor model's mid values
  const dayByDay = document.getElementById('dayByDayForecast');
  if(dayByDay){
    const now = new Date();
    dayByDay.innerHTML = future.map((f,i)=>{
      const prev = i===0 ? lastActual : future[i-1].mid;
      const up = f.mid >= prev;
      const dt = new Date(now); dt.setDate(dt.getDate()+i+1);
      const dayLabel = dt.toLocaleDateString(undefined,{weekday:'short', day:'numeric', month:'short'});
      return `<div class="dbd-card ${up?'up':'down'}">
        <div class="dbd-date">${dayLabel}</div>
        <div class="dbd-price">₹${f.mid}</div>
        <div class="dbd-trend">${up?'▲':'▼'} ${Math.abs(Math.round((f.mid-prev)*10)/10)}</div>
      </div>`;
    }).join('');
  }

  // Factor chips — the "more factors" behind the number, in plain language
  const trendPct = lastActual ? Math.round((slope/lastActual)*1000)/10 : 0;
  const trendDir = trendPct > 0.3 ? 'pos' : trendPct < -0.3 ? 'neg' : '';
  const volPct = lastActual ? Math.round((volatility/lastActual)*100) : 0;
  const volLabel = volPct < 8 ? (isHi?'कम':'Low') : volPct < 18 ? (isHi?'मध्यम':'Medium') : (isHi?'उच्च':'High');
  const momDir = momentum > 0.2 ? 'pos' : momentum < -0.2 ? 'neg' : '';
  const factorRow = document.getElementById('factorRow');
  if(factorRow){
    factorRow.innerHTML = `
      <div class="factor-chip">
        <span class="fc-label">${isHi?'रुझान':'Trend'}</span>
        <span class="fc-val ${trendDir}">${trendPct>0?'▲':trendPct<0?'▼':'—'} ${Math.abs(trendPct)}%/${isHi?'दिन':'day'}</span>
      </div>
      <div class="factor-chip">
        <span class="fc-label">${isHi?'अस्थिरता (मंडी रेंज)':'Volatility (mandi spread)'}</span>
        <span class="fc-val">${volLabel} · ±₹${Math.round(volatility*10)/10}</span>
      </div>
      <div class="factor-chip">
        <span class="fc-label">${isHi?'हाल का मोमेंटम':'Recent momentum'}</span>
        <span class="fc-val ${momDir}">${momentum>0?'▲':momentum<0?'▼':'—'} ₹${Math.abs(Math.round(momentum*10)/10)}</span>
      </div>
      <div class="factor-chip">
        <span class="fc-label">${isHi?'साप्ताहिक पैटर्न':'Weekly pattern'}</span>
        <span class="fc-val">${isHi?'दिन के हिसाब से समायोजित':'Adjusted by day-of-week'}</span>
      </div>
      <div class="factor-chip weather-chip ${advisory.level}">
        <span class="fc-label">${isHi?'मौसम सलाह · Open-Meteo':'Weather advisory · Open-Meteo'}</span>
        <span class="fc-val">${advisory.text}</span>
      </div>`;
  }

  const sourceNote = document.getElementById('fcSourceNote');
  if(sourceNote){
    const weatherNote = advisory.level==='unknown' ? '' :
      (isHi ? ' मौसम पूर्वानुमान: <a href="https://open-meteo.com" target="_blank" rel="noopener">Open-Meteo</a> से, अनिश्चितता-रेंज को समायोजित करने हेतु उपयोग किया गया (मूल्य-रुझान को नहीं)।'
            : ' Weather outlook via <a href="https://open-meteo.com" target="_blank" rel="noopener">Open-Meteo</a>, used only to widen the uncertainty range — not to shift the price trend itself.');
    let mainNote;
    if(isLive && anchorMeta){
      const n = anchorMeta.n || 1;
      if(anchorMeta.scope === 'national'){
        mainNote = isHi
          ? `आज ${state} में किसी मंडी ने यह फ़सल दर्ज नहीं की, इसलिए आज का मूल्य <a href="https://data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070" target="_blank" rel="noopener">data.gov.in — Agmarknet</a> पर आज देशभर की ${n} मंडी रिपोर्ट(ों) के औसत से लिया गया है — यह असली है, राज्य-विशिष्ट नहीं। पिछले 13 दिनों का आकार एक डेमो पैटर्न है, जिसे आज के असली मूल्य पर फिट किया गया है (Agmarknet इस संसाधन से इतिहास नहीं देता)।`
          : `No mandi in ${state} reported this crop today, so today's price is a real average from ${n} mandi report(s) across India via <a href="https://data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070" target="_blank" rel="noopener">data.gov.in — Agmarknet</a> — genuine, just not state-specific. The other 13 days shown are a demo-shaped pattern anchored to today's real price (this Agmarknet resource only exposes today's snapshot, not history).`;
      }else{
        mainNote = isHi
          ? `आज का मूल्य ${state} में ${n} मंडी रिपोर्ट(ों) के औसत से असली है, <a href="https://data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070" target="_blank" rel="noopener">data.gov.in — Agmarknet</a> से। पिछले 13 दिनों का आकार एक डेमो पैटर्न है जिसे आज के असली मूल्य पर फिट किया गया है — Agmarknet का यह संसाधन इतिहास नहीं, केवल आज का स्नैपशॉट देता है।`
          : `Today's price is real — averaged from ${n} mandi report(s) in ${state} via <a href="https://data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070" target="_blank" rel="noopener">data.gov.in — Agmarknet</a>. The other 13 days shown are a demo-shaped pattern anchored to today's real price — this Agmarknet resource only exposes today's snapshot, not a queryable history.`;
      }
    }else{
      mainNote = isHi
        ? `लाइव मंडी डेटा आज उपलब्ध नहीं हो सका (नेटवर्क/API सीमा या आज किसी मंडी ने रिपोर्ट नहीं की) — पूरी तरह डेमो डेटा दिखाया जा रहा है।`
        : `Live mandi data wasn't available today (network/API limit, or no mandi reported this crop at all today) — showing fully demo data.`;
    }
    sourceNote.innerHTML = mainNote + weatherNote;
  }

  // Chart: actual line + shaded low/high confidence band + dashed forecast mid line
  const histLabels = series.map((d,i)=> d.date
    ? d.date.toLocaleDateString(isHi?'hi-IN':'en-IN',{day:'numeric',month:'short'})
    : 'D-'+(series.length-1-i));
  const futureLabels = future.map(f=> f.day+'d');
  const allLabels = [...histLabels, ...futureLabels];
  const histLine = [...hist, ...Array(future.length).fill(null)];
  const midLine  = [...Array(hist.length-1).fill(null), lastActual, ...future.map(f=>f.mid)];
  const lowLine  = [...Array(hist.length-1).fill(null), lastActual, ...future.map(f=>f.low)];
  const highLine = [...Array(hist.length-1).fill(null), lastActual, ...future.map(f=>f.high)];

  const ctx = canvas.getContext('2d');
  if(forecastChart) forecastChart.destroy();
  forecastChart = new Chart(ctx,{
    type:'line',
    data:{
      labels: allLabels,
      datasets:[
        {label:'Actual price', data:histLine, borderColor:'#F6CB55', backgroundColor:'rgba(246,203,85,0.12)', fill:true, tension:0.35, pointRadius:2, spanGaps:false},
        {label:null, data:lowLine, borderColor:'transparent', pointRadius:0, fill:false, tension:0.35, spanGaps:false},
        {label:'Forecast range', data:highLine, borderColor:'transparent', backgroundColor:'rgba(215,240,74,0.14)', pointRadius:0, fill:'-1', tension:0.35, spanGaps:false},
        {label:'AI forecast', data:midLine, borderColor:'#D7F04A', borderDash:[6,4], backgroundColor:'rgba(215,240,74,0.06)', fill:false, tension:0.35, pointRadius:2, spanGaps:false}
      ]
    },
    options:{
      responsive:true,
      maintainAspectRatio:false,
      plugins:{legend:{position:'bottom', labels:{color:'#EAEDF6', font:{family:"'DM Sans'"}, filter: item => !!item.text}}},
      scales:{
        y:{ticks:{color:'#AEB8D6', callback:v=>'₹'+v, font:{family:"'DM Sans'"}}, grid:{color:'rgba(255,255,255,0.08)'}},
        x:{grid:{display:false}, ticks:{color:'#AEB8D6', font:{family:"'DM Sans'", size:10}}}
      }
    }
  });
}
document.getElementById('cropSelect').addEventListener('change', e=>renderForecast(e.target.value));
const stateSelectEl0 = document.getElementById('stateSelect');
if(stateSelectEl0) stateSelectEl0.addEventListener('change', ()=>renderForecast(document.getElementById('cropSelect').value));

/* =========================================================
   4c. PRICE GUARD — minimum acceptable price vs. every price source
   The farmer sets a floor (either "cost + margin" or typed directly).
   We never invent a number for them — it's their input — we just
   compare it against the prices already on screen (mandi, AI
   forecast, eNAM) and flag anything that would undercut them. */
let pgMode = 'cost';
let pgLastMandi = null;
let pgLastForecast = null;
let pgCurrentCrop = 'tomato';
let pgCurrentState = 'Maharashtra';

function pgFloorPrice(){
  if(pgMode === 'direct'){
    const v = parseFloat((document.getElementById('pgDirect')||{}).value);
    return isNaN(v) ? 0 : v;
  }
  const cost = parseFloat((document.getElementById('pgCost')||{}).value);
  const margin = parseFloat((document.getElementById('pgMargin')||{}).value);
  if(isNaN(cost) || cost <= 0) return 0;
  const m = isNaN(margin) ? 0 : margin;
  return Math.round(cost * (1 + m/100) * 10) / 10;
}

let pgRequestToken = 0;

async function renderPriceGuard(){
  const floorEl = document.getElementById('pgFloorValue');
  const grid = document.getElementById('pgCompareGrid');
  const note = document.getElementById('pgNote');
  if(!floorEl || !grid || !note) return;
  const myToken = ++pgRequestToken;
  const isHi = currentLang === 'hi';
  const floor = pgFloorPrice();
  floorEl.textContent = floor > 0 ? '₹'+floor : '—';

  if(floor <= 0){
    grid.innerHTML = '';
    note.textContent = isHi
      ? 'तुलना देखने के लिए ऊपर अपनी लागत या न्यूनतम मूल्य दर्ज करें।'
      : 'Enter your cost or minimum price above to see the comparison.';
    return;
  }

  const cardHtml = (label, price) => {
    if(price == null){
      return `<div class="pg-card na"><div class="pg-c-label">${label}</div><div class="pg-c-price">—</div><div class="pg-c-verdict">${isHi?'उपलब्ध नहीं':'Not available'}</div></div>`;
    }
    const safe = price >= floor;
    return `<div class="pg-card ${safe?'safe':'warn'}">
      <div class="pg-c-label">${label} <span class="pg-badge-icon">${safe?'✅':'⚠️'}</span></div>
      <div class="pg-c-price">₹${price}</div>
      <div class="pg-c-verdict">${safe ? (isHi?'आपके न्यूनतम से ऊपर':'Above your minimum') : (isHi?'आपके न्यूनतम से नीचे':'Below your minimum')}</div>
    </div>`;
  };

  // Mandi + AI forecast are already known synchronously from the last renderForecast run
  const enamResult = await fetchEnamAuction(pgCurrentCrop, pgCurrentState);
  if(myToken !== pgRequestToken) return; // a newer input/crop change superseded this

  grid.innerHTML =
    cardHtml(isHi?'मंडी भाव':'Mandi price', pgLastMandi) +
    cardHtml(isHi?'7-दिन AI अनुमान':'7-day AI forecast', pgLastForecast) +
    cardHtml('eNAM', enamResult ? enamResult.price : null);

  const pricesToCheck = [pgLastMandi, pgLastForecast, enamResult ? enamResult.price : null];
  const anyBelow = pricesToCheck.some(p => p != null && p < floor);
  note.textContent = anyBelow
    ? (isHi
        ? '⚠ कोई भी सौदा स्वीकार करने से पहले ध्यान से देखें — ऊपर दिखाए गए कुछ स्रोत आपके न्यूनतम मूल्य से नीचे हैं।'
        : '⚠ Double-check before accepting a deal — one or more sources shown above are below your minimum price.')
    : (isHi
        ? 'अच्छा संकेत — उपलब्ध सभी स्रोत आपके न्यूनतम मूल्य पर या उससे ऊपर हैं।'
        : 'Good sign — all available sources are at or above your minimum price.');
}

function pgSetMode(mode){
  pgMode = mode;
  const costBtn = document.getElementById('pgModeCostBtn');
  const directBtn = document.getElementById('pgModeDirectBtn');
  const costInputs = document.getElementById('pgInputsCost');
  const directInputs = document.getElementById('pgInputsDirect');
  if(costBtn) costBtn.classList.toggle('active', mode==='cost');
  if(directBtn) directBtn.classList.toggle('active', mode==='direct');
  if(costInputs) costInputs.style.display = mode==='cost' ? 'flex' : 'none';
  if(directInputs) directInputs.style.display = mode==='direct' ? 'flex' : 'none';
  renderPriceGuard();
}
const pgModeCostBtn = document.getElementById('pgModeCostBtn');
const pgModeDirectBtn = document.getElementById('pgModeDirectBtn');
if(pgModeCostBtn) pgModeCostBtn.addEventListener('click', ()=>pgSetMode('cost'));
if(pgModeDirectBtn) pgModeDirectBtn.addEventListener('click', ()=>pgSetMode('direct'));
['pgCost','pgMargin','pgDirect'].forEach(id=>{
  const el = document.getElementById(id);
  if(el) el.addEventListener('input', renderPriceGuard);
});

/* =========================================================
   5. COLD STORAGE + MARKET DAY BOOKING
   ========================================================= */

/* Small stylized minimap thumbnail — decorative, deterministic per index,
   drawn with the site's own CSS variables so it always matches the theme. */
function miniMapSVG(seed, accentVar){
  const rx = 16 + ((seed * 37) % 48);
  const ry = 12 + ((seed * 53) % 20);
  return `
    <svg viewBox="0 0 80 56" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="0" y="0" width="80" height="56" style="fill:var(--khadi-deep)"/>
      <path d="M0 18 H80 M0 38 H80 M22 0 V56 M54 0 V56" style="stroke:var(--line);stroke-width:1.3" fill="none"/>
      <circle cx="${rx}" cy="${ry+7}" r="10" style="fill:${accentVar};opacity:.16"/>
      <path d="M${rx} ${ry-2} c-5.5 0-10 4.3-10 9.7 0 7 10 15.3 10 15.3s10-8.3 10-15.3c0-5.4-4.5-9.7-10-9.7z" style="fill:${accentVar}"/>
      <circle cx="${rx}" cy="${ry+7}" r="3.1" style="fill:#fff"/>
    </svg>`;
}
function gmapsLink(query){
  return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(query);
}
function wireMapLinks(){
  document.querySelectorAll('.map-link[data-url]').forEach(el=>{
    el.addEventListener('click', e=>{
      e.stopPropagation();
      window.open(el.dataset.url, '_blank', 'noopener');
    });
  });
}

const storages = [
  {name:"Nashik Cold Hub A", km:"3.2 km", status:"open"},
  {name:"AgroFresh Storage B", km:"6.8 km", status:"low"},
  {name:"District Cold Chain C", km:"11.4 km", status:"open"}
];
let selectedStorage = 0;
function renderStorageList(){
  document.getElementById('storageList').innerHTML = storages.map((s,i)=>{
    const accent = s.status==='open' ? 'var(--neem)' : 'var(--haldi)';
    return `
    <button type="button" class="storage-item ${i===selectedStorage?'selected':''}" data-i="${i}">
      <div class="si-left">
        <div class="mini-map">${miniMapSVG(i, accent)}</div>
        <div class="si-text">
          <span class="si-name">${s.name}</span>
          <span class="si-km">${s.km}</span>
        </div>
      </div>
      <div class="si-right">
        <span class="avail ${s.status}">${s.status==='open' ? 'Space available' : 'Low space'}</span>
        <span class="map-link" data-url="${gmapsLink(s.name)}">View map ↗</span>
      </div>
    </button>`;
  }).join('');
  document.querySelectorAll('.storage-item').forEach(el=>{
    el.addEventListener('click', ()=>{ selectedStorage = parseInt(el.dataset.i, 10); renderStorageList(); });
  });
  wireMapLinks();
}
renderStorageList();

const marketLocations = [
  {name:"Sector 12 Weekly Haat", info:"2.1 km · Tue & Fri"},
  {name:"Riverside Farmers Market", info:"4.5 km · Daily"},
  {name:"Central Mandi Square", info:"7.0 km · Weekends"}
];
let selectedLocation = 0;
function renderLocationList(){
  document.getElementById('locationList').innerHTML = marketLocations.map((l,i)=>`
    <button type="button" class="loc-item ${i===selectedLocation?'selected':''}" data-i="${i}">
      <div class="si-left">
        <div class="mini-map">${miniMapSVG(i+5, 'var(--neem)')}</div>
        <div class="si-text">
          <span class="si-name">${l.name}</span>
          <span class="li-area">${l.info}</span>
        </div>
      </div>
      <span class="map-link" data-url="${gmapsLink(l.name)}">View map ↗</span>
    </button>
  `).join('');
  document.querySelectorAll('.loc-item').forEach(el=>{
    el.addEventListener('click', ()=>{ selectedLocation = parseInt(el.dataset.i, 10); renderLocationList(); });
  });
  wireMapLinks();
}
renderLocationList();

const spots = [
  {code:"A-01", desc:"Near main gate"},
  {code:"A-02", desc:"Center aisle"},
  {code:"B-05", desc:"Shaded corner"},
  {code:"C-11", desc:"Near parking"}
];
let selectedSpot = 0;
function renderSpotList(){
  document.getElementById('spotGrid').innerHTML = spots.map((s,i)=>`
    <button type="button" class="spot-item ${i===selectedSpot?'selected':''}" data-i="${i}">
      <div class="mini-map">${miniMapSVG(i+9, i===selectedSpot ? 'var(--neem)' : 'var(--sindoor)')}</div>
      <span class="spot-code">${s.code}</span>
      <span class="spot-desc">${s.desc}</span>
    </button>
  `).join('');
  document.querySelectorAll('.spot-item').forEach(el=>{
    el.addEventListener('click', ()=>{ selectedSpot = parseInt(el.dataset.i, 10); renderSpotList(); });
  });
}
renderSpotList();

document.getElementById('storageForm').addEventListener('submit', e=>{
  e.preventDefault();
  document.getElementById('csConfirmMsg').classList.add('show');
});
document.getElementById('marketForm').addEventListener('submit', e=>{
  e.preventDefault();
  document.getElementById('mdConfirmMsg').classList.add('show');
});

/* =========================================================
   6. PROFILE
   ========================================================= */
document.getElementById('roleFarmer').addEventListener('click', ()=>{
  document.getElementById('roleFarmer').classList.add('active');
  document.getElementById('roleBuyer').classList.remove('active');
  const feeCard = document.getElementById('farmerFeeCard');
  if(feeCard) feeCard.classList.remove('hidden');
});
document.getElementById('roleBuyer').addEventListener('click', ()=>{
  document.getElementById('roleBuyer').classList.add('active');
  document.getElementById('roleFarmer').classList.remove('active');
  const feeCard = document.getElementById('farmerFeeCard');
  if(feeCard) feeCard.classList.add('hidden');
});
const aadhaarInput = document.getElementById('aadhaarInput');
if(aadhaarInput){
  aadhaarInput.addEventListener('input', e=>{
    const digits = e.target.value.replace(/\D/g,'').slice(0,12);
    e.target.value = digits.replace(/(\d{4})(?=\d)/g,'$1 ').trim();
    aadhaarInput.setCustomValidity('');
  });
}
document.getElementById('profileForm').addEventListener('submit', e=>{
  e.preventDefault();
  const digits = aadhaarInput ? aadhaarInput.value.replace(/\D/g,'') : '';
  if(aadhaarInput && digits.length !== 12){
    const pack = dict[currentLang] || dict.en;
    aadhaarInput.setCustomValidity(pack.fldAadhaarError || dict.en.fldAadhaarError);
    aadhaarInput.reportValidity();
    document.getElementById('profileConfirmMsg').classList.remove('show');
    return;
  }
  document.getElementById('profileConfirmMsg').classList.add('show');
});

/* =========================================================
   7. INITIAL RENDER
   ========================================================= */
renderForecast('tomato');