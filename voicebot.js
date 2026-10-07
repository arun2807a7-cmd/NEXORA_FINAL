/* =========================================================
   KHETSETU VOICE ASSISTANT — "KhetSetu Sahayak"
   Multilingual (English / Hindi / Telugu / Tamil / Malayalam /
   Kannada) voice + text assistant that helps farmers use the
   KhetSetu website: navigating the marketplace, reading AI
   price forecasts, finding nearby cold storage, checking
   weather, and creating an account. Drop this file + voicebot.css
   onto any page of the site (after script.js) and it wires
   itself up.
   ========================================================= */
(function(){

/* ---------------------------------------------------------
   0. IMAGES — reuse the same real photos already used on the
   site so the assistant never feels like a bolted-on demo.
   --------------------------------------------------------- */
var IMG = {
  tomato:'https://upload.wikimedia.org/wikipedia/commons/f/f5/Tomatoes.jpg',
  onion:'https://upload.wikimedia.org/wikipedia/commons/a/a2/Mixed_onions.jpg',
  wheat:'https://images.pexels.com/photos/33411353/pexels-photo-33411353.jpeg?auto=compress&cs=tinysrgb&w=800',
  storage:'https://images.pexels.com/photos/10041323/pexels-photo-10041323.jpeg?auto=compress&cs=tinysrgb&w=800',
  market:'https://images.pexels.com/photos/32912931/pexels-photo-32912931.jpeg?auto=compress&cs=tinysrgb&w=800'
};

/* ---------------------------------------------------------
   1. LANGUAGE PACKS
   --------------------------------------------------------- */
var L = {
  en:{
    speechLang:'en-IN', code:'EN', name:'English',
    title:'KhetSetu Sahayak', subtitle:'Voice Assistant',
    greeting:"Namaste! I'm your KhetSetu voice assistant. Tap the mic or type to ask about the marketplace, price forecasts, cold storage, today's weather, or how to create your account.",
    listening:'Listening…', thinking:'Thinking…', speaking:'Speaking…',
    placeholder:'Type your question…',
    micBlocked:'Microphone access is blocked. Please allow it, or type your question below.',
    noSpeech:"I didn't catch that — please try again.",
    notSupported:"Voice input isn't supported in this browser. Please type your question instead.",
    quick:{market:'🧺 Marketplace', forecast:'📈 Price Forecast', storage:'❄ Cold Storage', login:'🌱 Get Started', weather:'🌦 Weather'},
    who:{user:'You', bot:'Sahayak'},
    cropLabel:{tomato:'Tomato', onion:'Onion', wheat:'Wheat'},
    storageOpen:'Space available', storageLow:'Low space', viewMap:'View on map →',
    help:"I can help you: browse the Marketplace, check the AI Price Forecast, find nearby Cold Storage, get today's Weather, or walk you through creating your account. Just ask, or tap a button below.",
    market:"Opening the Marketplace for you. You can filter fresh produce by price, category, or freshness — everything is listed straight from verified farmers and FPOs.",
    forecastIntro:function(crop, cur, wk, low, high){
      return "Here's the "+crop+" price: today it's ₹"+cur+" per kg. The AI model expects about ₹"+wk+" per kg in 7 days. Over the last 14 days it ranged between ₹"+low+" and ₹"+high+". Opening the full Price Forecast page for you.";
    },
    forecastAsk:"Which crop would you like the price forecast for — tomato, onion, or wheat?",
    storageIntro:"Here are cold storage facilities near you. Tap 'View on map' for directions. I'm opening the Book Services page so you can reserve space.",
    loginIntro:"Let's get your free account set up. On the Get Started page, choose whether you're a Farmer/FPO or a Buyer, then fill in your name, phone number, village or city, and your Aadhaar number for verification — it's masked and never stored in plain text. I'll highlight the fields for you now.",
    weatherIntro:"Checking today's weather for your area…",
    weatherFail:"I couldn't fetch live weather right now — please allow location access and try again, or check the India Meteorological Department site at mausam.imd.gov.in.",
    weatherLine:function(place, tMax, tMin, rain){
      return "Weather near "+place+": high "+tMax+"°C, low "+tMin+"°C, with about "+rain+"% chance of rain today. ";
    },
    weatherTip:"If rain is likely, it's a good day to move harvested produce into cold storage rather than leaving it out.",
    thanks:"You're welcome! Ask me anything else, or tap the mic again.",
    fallback:function(raw){
      return "I heard: \""+raw+"\". I can help with the marketplace, price forecasts, cold storage, weather, or creating your account — try asking about one of those, or tap a button below.";
    }
  },
  hi:{
    speechLang:'hi-IN', code:'HI', name:'हिन्दी',
    title:'खेतसेतु सहायक', subtitle:'आवाज़ सहायक',
    greeting:"नमस्ते! मैं आपका खेतसेतु आवाज़ सहायक हूँ। बाज़ार, मूल्य पूर्वानुमान, कोल्ड स्टोरेज, आज का मौसम, या खाता बनाने के बारे में पूछने के लिए माइक दबाएँ या टाइप करें।",
    listening:'सुन रहा हूँ…', thinking:'सोच रहा हूँ…', speaking:'बोल रहा हूँ…',
    placeholder:'अपना सवाल टाइप करें…',
    micBlocked:'माइक्रोफ़ोन की अनुमति नहीं है। कृपया अनुमति दें, या नीचे टाइप करें।',
    noSpeech:'मुझे सुनाई नहीं दिया — कृपया फिर से कोशिश करें।',
    notSupported:'इस ब्राउज़र में आवाज़ इनपुट समर्थित नहीं है। कृपया अपना सवाल टाइप करें।',
    quick:{market:'🧺 बाज़ार', forecast:'📈 मूल्य पूर्वानुमान', storage:'❄ कोल्ड स्टोरेज', login:'🌱 शुरू करें', weather:'🌦 मौसम'},
    who:{user:'आप', bot:'सहायक'},
    cropLabel:{tomato:'टमाटर', onion:'प्याज़', wheat:'गेहूँ'},
    storageOpen:'जगह उपलब्ध', storageLow:'कम जगह', viewMap:'मानचित्र देखें →',
    help:"मैं आपकी मदद कर सकता हूँ: बाज़ार देखना, एआई मूल्य पूर्वानुमान जांचना, पास का कोल्ड स्टोरेज ढूँढना, आज का मौसम बताना, या खाता बनाने में मार्गदर्शन करना। बस पूछें, या नीचे किसी बटन को दबाएँ।",
    market:"आपके लिए बाज़ार खोल रहा हूँ। आप ताज़ी उपज को कीमत, श्रेणी या ताज़गी के अनुसार फ़िल्टर कर सकते हैं — सब कुछ सत्यापित किसानों और एफपीओ से सीधे सूचीबद्ध है।",
    forecastIntro:function(crop, cur, wk, low, high){
      return crop+" का भाव: आज यह ₹"+cur+" प्रति किलो है। एआई मॉडल के अनुसार 7 दिन में यह लगभग ₹"+wk+" प्रति किलो हो सकता है। पिछले 14 दिनों में यह ₹"+low+" से ₹"+high+" के बीच रहा। आपके लिए पूरा मूल्य पूर्वानुमान पेज खोल रहा हूँ।";
    },
    forecastAsk:"आप किस फ़सल का मूल्य पूर्वानुमान जानना चाहते हैं — टमाटर, प्याज़, या गेहूँ?",
    storageIntro:"यहाँ आपके पास के कोल्ड स्टोरेज हैं। रास्ते के लिए 'मानचित्र देखें' दबाएँ। मैं सेवाएं बुक करें पेज खोल रहा हूँ ताकि आप जगह आरक्षित कर सकें।",
    loginIntro:"चलिए आपका मुफ़्त खाता बनाते हैं। शुरू करें पेज पर, चुनें कि आप किसान/एफपीओ हैं या खरीदार, फिर अपना नाम, फ़ोन नंबर, गाँव या शहर, और सत्यापन के लिए आधार नंबर भरें — यह छिपा रहता है और कभी सादे टेक्स्ट में सहेजा नहीं जाता। मैं अभी फ़ील्ड हाइलाइट कर रहा हूँ।",
    weatherIntro:"आपके क्षेत्र का आज का मौसम देख रहा हूँ…",
    weatherFail:"मैं अभी लाइव मौसम नहीं ला सका — कृपया लोकेशन की अनुमति दें और फिर कोशिश करें, या mausam.imd.gov.in पर भारत मौसम विज्ञान विभाग की वेबसाइट देखें।",
    weatherLine:function(place, tMax, tMin, rain){
      return place+" के पास मौसम: अधिकतम "+tMax+"°C, न्यूनतम "+tMin+"°C, और बारिश की लगभग "+rain+"% संभावना। ";
    },
    weatherTip:"अगर बारिश की संभावना है, तो कटी हुई उपज को खुले में रखने के बजाय कोल्ड स्टोरेज में रखना बेहतर है।",
    thanks:"आपका स्वागत है! कुछ और पूछें, या फिर से माइक दबाएँ।",
    fallback:function(raw){
      return "मैंने सुना: \""+raw+"\". मैं बाज़ार, मूल्य पूर्वानुमान, कोल्ड स्टोरेज, मौसम, या खाता बनाने में मदद कर सकता हूँ — इनमें से किसी के बारे में पूछें, या नीचे बटन दबाएँ।";
    }
  },
  te:{
    speechLang:'te-IN', code:'TE', name:'తెలుగు',
    title:'ఖేత్‌సేతు సహాయకుడు', subtitle:'వాయిస్ అసిస్టెంట్',
    greeting:"నమస్కారం! నేను మీ ఖేత్‌సేతు వాయిస్ అసిస్టెంట్‌ని. మార్కెట్‌ప్లేస్, ధరల అంచనా, కోల్డ్ స్టోరేజ్, ఈరోజు వాతావరణం లేదా ఖాతా ఎలా తెరవాలో అడగడానికి మైక్ నొక్కండి లేదా టైప్ చేయండి.",
    listening:'వింటున్నాను…', thinking:'ఆలోచిస్తున్నాను…', speaking:'మాట్లాడుతున్నాను…',
    placeholder:'మీ ప్రశ్న టైప్ చేయండి…',
    micBlocked:'మైక్రోఫోన్ అనుమతి లేదు. దయచేసి అనుమతించండి, లేదా కింద టైప్ చేయండి.',
    noSpeech:'నాకు వినిపించలేదు — దయచేసి మళ్ళీ ప్రయత్నించండి.',
    notSupported:'ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ లేదు. దయచేసి మీ ప్రశ్న టైప్ చేయండి.',
    quick:{market:'🧺 మార్కెట్‌ప్లేస్', forecast:'📈 ధరల అంచనా', storage:'❄ కోల్డ్ స్టోరేజ్', login:'🌱 ప్రారంభించండి', weather:'🌦 వాతావరణం'},
    who:{user:'మీరు', bot:'సహాయకుడు'},
    cropLabel:{tomato:'టమాటా', onion:'ఉల్లిపాయ', wheat:'గోధుమ'},
    storageOpen:'స్థలం అందుబాటులో ఉంది', storageLow:'తక్కువ స్థలం', viewMap:'మ్యాప్‌లో చూడండి →',
    help:"నేను సహాయం చేయగలను: మార్కెట్‌ప్లేస్ చూడటం, AI ధరల అంచనా తనిఖీ చేయడం, దగ్గరలోని కోల్డ్ స్టోరేజ్ కనుగొనడం, ఈరోజు వాతావరణం చెప్పడం, లేదా ఖాతా తెరవడంలో మార్గదర్శనం. అడగండి, లేదా కింద బటన్ నొక్కండి.",
    market:"మీ కోసం మార్కెట్‌ప్లేస్ తెరుస్తున్నాను. మీరు తాజా పంటలను ధర, రకం లేదా తాజాదనం ప్రకారం ఫిల్టర్ చేయవచ్చు — అన్నీ ధృవీకరించబడిన రైతులు మరియు FPOల నుండి నేరుగా జాబితా చేయబడ్డాయి.",
    forecastIntro:function(crop, cur, wk, low, high){
      return crop+" ధర: ఈరోజు కిలోకు ₹"+cur+". AI మోడల్ ప్రకారం 7 రోజుల్లో ఇది కిలోకు దాదాపు ₹"+wk+" ఉండవచ్చు. గత 14 రోజుల్లో ఇది ₹"+low+" నుండి ₹"+high+" మధ్య ఉంది. మీ కోసం పూర్తి ధరల అంచనా పేజీ తెరుస్తున్నాను.";
    },
    forecastAsk:"మీరు ఏ పంట ధరల అంచనా తెలుసుకోవాలనుకుంటున్నారు — టమాటా, ఉల్లిపాయ, లేదా గోధుమ?",
    storageIntro:"మీ దగ్గరలోని కోల్డ్ స్టోరేజ్‌లు ఇక్కడ ఉన్నాయి. దారి కోసం 'మ్యాప్‌లో చూడండి' నొక్కండి. మీరు స్థలం రిజర్వ్ చేసుకోవడానికి సేవలు బుక్ చేయండి పేజీ తెరుస్తున్నాను.",
    loginIntro:"మీ ఉచిత ఖాతాను సెటప్ చేద్దాం. ప్రారంభించండి పేజీలో, మీరు రైతు/FPO లేదా కొనుగోలుదారు అని ఎంచుకోండి, తర్వాత మీ పేరు, ఫోన్ నంబర్, గ్రామం లేదా నగరం, మరియు ధృవీకరణ కోసం ఆధార్ నంబర్ నింపండి — ఇది మాస్క్ చేయబడి ఉంటుంది మరియు ఎప్పుడూ ప్లెయిన్ టెక్స్ట్‌లో నిల్వ చేయబడదు. నేను ఇప్పుడు ఫీల్డ్‌లను హైలైట్ చేస్తున్నాను.",
    weatherIntro:"మీ ప్రాంతంలో ఈరోజు వాతావరణం చూస్తున్నాను…",
    weatherFail:"నేను ఇప్పుడు లైవ్ వాతావరణం తీసుకురాలేకపోయాను — దయచేసి లొకేషన్ అనుమతి ఇచ్చి మళ్ళీ ప్రయత్నించండి, లేదా mausam.imd.gov.in లో భారత వాతావరణ శాఖ వెబ్‌సైట్ చూడండి.",
    weatherLine:function(place, tMax, tMin, rain){
      return place+" దగ్గర వాతావరణం: గరిష్టం "+tMax+"°C, కనిష్టం "+tMin+"°C, వర్షం పడే అవకాశం దాదాపు "+rain+"%. ";
    },
    weatherTip:"వర్షం పడే అవకాశం ఉంటే, కోసిన పంటను బయట ఉంచడం కంటే కోల్డ్ స్టోరేజ్‌లో ఉంచడం మంచిది.",
    thanks:"పర్వాలేదు! మరేదైనా అడగండి, లేదా మళ్ళీ మైక్ నొక్కండి.",
    fallback:function(raw){
      return "నేను విన్నది: \""+raw+"\". నేను మార్కెట్‌ప్లేస్, ధరల అంచనా, కోల్డ్ స్టోరేజ్, వాతావరణం, లేదా ఖాతా తెరవడంలో సహాయం చేయగలను — వాటిలో ఒకటి అడగండి, లేదా కింద బటన్ నొక్కండి.";
    }
  },
  ta:{
    speechLang:'ta-IN', code:'TA', name:'தமிழ்',
    title:'கேட்செது உதவியாளர்', subtitle:'குரல் உதவியாளர்',
    greeting:"வணக்கம்! நான் உங்கள் கேட்செது குரல் உதவியாளர். சந்தை, விலை முன்னறிவிப்பு, குளிர்பதன கிடங்கு, இன்றைய வானிலை, அல்லது கணக்கு உருவாக்குவது பற்றி கேட்க மைக்கை அழுத்தவும் அல்லது தட்டச்சு செய்யவும்.",
    listening:'கேட்கிறேன்…', thinking:'யோசிக்கிறேன்…', speaking:'பேசுகிறேன்…',
    placeholder:'உங்கள் கேள்வியை தட்டச்சு செய்யவும்…',
    micBlocked:'மைக்ரோஃபோன் அனுமதி இல்லை. தயவுசெய்து அனுமதிக்கவும், அல்லது கீழே தட்டச்சு செய்யவும்.',
    noSpeech:'எனக்குக் கேட்கவில்லை — மீண்டும் முயற்சிக்கவும்.',
    notSupported:'இந்த உலாவியில் குரல் உள்ளீடு ஆதரிக்கப்படவில்லை. தயவுசெய்து உங்கள் கேள்வியை தட்டச்சு செய்யவும்.',
    quick:{market:'🧺 சந்தை', forecast:'📈 விலை முன்னறிவிப்பு', storage:'❄ குளிர்பதன கிடங்கு', login:'🌱 தொடங்குங்கள்', weather:'🌦 வானிலை'},
    who:{user:'நீங்கள்', bot:'உதவியாளர்'},
    cropLabel:{tomato:'தக்காளி', onion:'வெங்காயம்', wheat:'கோதுமை'},
    storageOpen:'இடம் உள்ளது', storageLow:'குறைந்த இடம்', viewMap:'வரைபடத்தில் காண்க →',
    help:"நான் உதவ முடியும்: சந்தையை உலாவுதல், AI விலை முன்னறிவிப்பைப் பார்த்தல், அருகிலுள்ள குளிர்பதன கிடங்கைக் கண்டறிதல், இன்றைய வானிலையைச் சொல்லுதல், அல்லது கணக்கு உருவாக்க வழிகாட்டுதல். கேளுங்கள், அல்லது கீழே உள்ள பொத்தானை அழுத்தவும்.",
    market:"உங்களுக்காக சந்தையைத் திறக்கிறேன். விலை, வகை அல்லது புத்துணர்ச்சியின் அடிப்படையில் புதிய விளைபொருட்களை வடிகட்டலாம் — அனைத்தும் சரிபார்க்கப்பட்ட விவசாயிகள் மற்றும் FPOக்களிடமிருந்து நேரடியாக பட்டியலிடப்பட்டுள்ளன.",
    forecastIntro:function(crop, cur, wk, low, high){
      return crop+" விலை: இன்று கிலோவுக்கு ₹"+cur+". AI மாதிரி 7 நாட்களில் கிலோவுக்கு சுமார் ₹"+wk+" ஆக இருக்கும் என எதிர்பார்க்கிறது. கடந்த 14 நாட்களில் இது ₹"+low+" முதல் ₹"+high+" வரை இருந்தது. உங்களுக்காக முழு விலை முன்னறிவிப்பு பக்கத்தைத் திறக்கிறேன்.";
    },
    forecastAsk:"எந்த பயிரின் விலை முன்னறிவிப்பை அறிய விரும்புகிறீர்கள் — தக்காளி, வெங்காயம், அல்லது கோதுமை?",
    storageIntro:"உங்களுக்கு அருகிலுள்ள குளிர்பதன கிடங்குகள் இங்கே உள்ளன. வழிக்கு 'வரைபடத்தில் காண்க' அழுத்தவும். இடம் ஒதுக்க சேவைகளை முன்பதிவு செய்யும் பக்கத்தைத் திறக்கிறேன்.",
    loginIntro:"உங்கள் இலவச கணக்கை அமைப்போம். தொடங்குங்கள் பக்கத்தில், நீங்கள் விவசாயி/FPO அல்லது வாங்குபவர் என்பதைத் தேர்ந்தெடுக்கவும், பின்னர் உங்கள் பெயர், தொலைபேசி எண், கிராமம் அல்லது நகரம், மற்றும் சரிபார்ப்புக்கான ஆதார் எண்ணை நிரப்பவும் — இது மறைக்கப்பட்டு, ஒருபோதும் எளிய உரையாக சேமிக்கப்படாது. இப்போது புலங்களை சிறப்பித்துக் காட்டுகிறேன்.",
    weatherIntro:"உங்கள் பகுதியின் இன்றைய வானிலையைப் பார்க்கிறேன்…",
    weatherFail:"இப்போது நேரடி வானிலையைப் பெற முடியவில்லை — தயவுசெய்து இருப்பிட அனுமதி வழங்கி மீண்டும் முயற்சிக்கவும், அல்லது mausam.imd.gov.in இல் இந்திய வானிலை ஆய்வு மைய இணையதளத்தைப் பார்க்கவும்.",
    weatherLine:function(place, tMax, tMin, rain){
      return place+" அருகே வானிலை: அதிகபட்சம் "+tMax+"°C, குறைந்தபட்சம் "+tMin+"°C, மழை பெய்யும் வாய்ப்பு சுமார் "+rain+"%. ";
    },
    weatherTip:"மழை பெய்யும் வாய்ப்பு இருந்தால், அறுவடை செய்த விளைபொருளை வெளியே வைப்பதை விட குளிர்பதன கிடங்கில் வைப்பது நல்லது.",
    thanks:"பரவாயில்லை! வேறு எதையும் கேளுங்கள், அல்லது மீண்டும் மைக்கை அழுத்தவும்.",
    fallback:function(raw){
      return "நான் கேட்டது: \""+raw+"\". சந்தை, விலை முன்னறிவிப்பு, குளிர்பதன கிடங்கு, வானிலை, அல்லது கணக்கு உருவாக்குதல் பற்றி நான் உதவ முடியும் — அவற்றில் ஒன்றைக் கேளுங்கள், அல்லது கீழே பொத்தானை அழுத்தவும்.";
    }
  },
  ml:{
    speechLang:'ml-IN', code:'ML', name:'മലയാളം',
    title:'ഖേത്സേതു സഹായി', subtitle:'വോയ്‌സ് അസിസ്റ്റന്റ്',
    greeting:"നമസ്കാരം! ഞാൻ നിങ്ങളുടെ ഖേത്സേതു വോയ്‌സ് അസിസ്റ്റന്റ് ആണ്. മാർക്കറ്റ്‌പ്ലേസ്, വില പ്രവചനം, കോൾഡ് സ്റ്റോറേജ്, ഇന്നത്തെ കാലാവസ്ഥ, അല്ലെങ്കിൽ അക്കൗണ്ട് ഉണ്ടാക്കുന്നത് എങ്ങനെയെന്ന് ചോദിക്കാൻ മൈക്ക് അമർത്തുക അല്ലെങ്കിൽ ടൈപ്പ് ചെയ്യുക.",
    listening:'കേൾക്കുന്നു…', thinking:'ചിന്തിക്കുന്നു…', speaking:'സംസാരിക്കുന്നു…',
    placeholder:'നിങ്ങളുടെ ചോദ്യം ടൈപ്പ് ചെയ്യുക…',
    micBlocked:'മൈക്രോഫോൺ അനുമതി ലഭ്യമല്ല. ദയവായി അനുവദിക്കുക, അല്ലെങ്കിൽ താഴെ ടൈപ്പ് ചെയ്യുക.',
    noSpeech:'എനിക്ക് കേൾക്കാനായില്ല — ദയവായി വീണ്ടും ശ്രമിക്കുക.',
    notSupported:'ഈ ബ്രൗസറിൽ വോയ്‌സ് ഇൻപുട്ട് പിന്തുണയ്ക്കുന്നില്ല. ദയവായി നിങ്ങളുടെ ചോദ്യം ടൈപ്പ് ചെയ്യുക.',
    quick:{market:'🧺 മാർക്കറ്റ്‌പ്ലേസ്', forecast:'📈 വില പ്രവചനം', storage:'❄ കോൾഡ് സ്റ്റോറേജ്', login:'🌱 ആരംഭിക്കുക', weather:'🌦 കാലാവസ്ഥ'},
    who:{user:'നിങ്ങൾ', bot:'സഹായി'},
    cropLabel:{tomato:'തക്കാളി', onion:'സവാള', wheat:'ഗോതമ്പ്'},
    storageOpen:'സ്ഥലം ലഭ്യമാണ്', storageLow:'സ്ഥലം കുറവാണ്', viewMap:'മാപ്പിൽ കാണുക →',
    help:"എനിക്ക് സഹായിക്കാൻ കഴിയും: മാർക്കറ്റ്‌പ്ലേസ് നോക്കുക, AI വില പ്രവചനം പരിശോധിക്കുക, അടുത്തുള്ള കോൾഡ് സ്റ്റോറേജ് കണ്ടെത്തുക, ഇന്നത്തെ കാലാവസ്ഥ അറിയിക്കുക, അല്ലെങ്കിൽ അക്കൗണ്ട് ഉണ്ടാക്കാൻ സഹായിക്കുക. ചോദിക്കൂ, അല്ലെങ്കിൽ താഴെയുള്ള ബട്ടൺ അമർത്തുക.",
    market:"നിങ്ങൾക്കായി മാർക്കറ്റ്‌പ്ലേസ് തുറക്കുന്നു. നിങ്ങൾക്ക് വില, വിഭാഗം, അല്ലെങ്കിൽ പുതുമ അനുസരിച്ച് പുതിയ വിളകൾ ഫിൽട്ടർ ചെയ്യാം — എല്ലാം സാക്ഷ്യപ്പെടുത്തിയ കർഷകരിൽ നിന്നും FPOകളിൽ നിന്നും നേരിട്ട് ലിസ്റ്റ് ചെയ്തതാണ്.",
    forecastIntro:function(crop, cur, wk, low, high){
      return crop+" വില: ഇന്ന് കിലോയ്ക്ക് ₹"+cur+". AI മോഡൽ പ്രകാരം 7 ദിവസത്തിനുള്ളിൽ ഏകദേശം കിലോയ്ക്ക് ₹"+wk+" ആകും. കഴിഞ്ഞ 14 ദിവസത്തിനുള്ളിൽ ഇത് ₹"+low+" മുതൽ ₹"+high+" വരെയായിരുന്നു. നിങ്ങൾക്കായി പൂർണ്ണ വില പ്രവചന പേജ് തുറക്കുന്നു.";
    },
    forecastAsk:"ഏത് വിളയുടെ വില പ്രവചനമാണ് നിങ്ങൾക്ക് അറിയേണ്ടത് — തക്കാളി, സവാള, അതോ ഗോതമ്പ്?",
    storageIntro:"നിങ്ങളുടെ അടുത്തുള്ള കോൾഡ് സ്റ്റോറേജുകൾ ഇതാ. വഴി അറിയാൻ 'മാപ്പിൽ കാണുക' അമർത്തുക. സ്ഥലം റിസർവ് ചെയ്യാൻ സേവനങ്ങൾ ബുക്ക് ചെയ്യുക പേജ് തുറക്കുന്നു.",
    loginIntro:"നിങ്ങളുടെ സൗജന്യ അക്കൗണ്ട് സജ്ജീകരിക്കാം. ആരംഭിക്കുക പേജിൽ, നിങ്ങൾ കർഷകൻ/FPO ആണോ വാങ്ങുന്നയാളാണോ എന്ന് തിരഞ്ഞെടുക്കുക, തുടർന്ന് നിങ്ങളുടെ പേര്, ഫോൺ നമ്പർ, ഗ്രാമം അല്ലെങ്കിൽ നഗരം, സ്ഥിരീകരണത്തിനായി ആധാർ നമ്പർ എന്നിവ പൂരിപ്പിക്കുക — ഇത് മറച്ചുവെക്കുകയും ഒരിക്കലും പ്ലെയിൻ ടെക്സ്റ്റായി സൂക്ഷിക്കാതിരിക്കുകയും ചെയ്യുന്നു. ഞാൻ ഇപ്പോൾ ഫീൽഡുകൾ ഹൈലൈറ്റ് ചെയ്യുന്നു.",
    weatherIntro:"നിങ്ങളുടെ പ്രദേശത്തെ ഇന്നത്തെ കാലാവസ്ഥ പരിശോധിക്കുന്നു…",
    weatherFail:"എനിക്ക് ഇപ്പോൾ തത്സമയ കാലാവസ്ഥ ലഭ്യമാക്കാൻ കഴിഞ്ഞില്ല — ദയവായി ലൊക്കേഷൻ അനുമതി നൽകി വീണ്ടും ശ്രമിക്കുക, അല്ലെങ്കിൽ mausam.imd.gov.in ൽ ഇന്ത്യൻ കാലാവസ്ഥാ വകുപ്പിന്റെ വെബ്സൈറ്റ് പരിശോധിക്കുക.",
    weatherLine:function(place, tMax, tMin, rain){
      return place+" സമീപത്തെ കാലാവസ്ഥ: കൂടിയത് "+tMax+"°C, കുറഞ്ഞത് "+tMin+"°C, മഴയ്ക്ക് ഏകദേശം "+rain+"% സാധ്യത. ";
    },
    weatherTip:"മഴയ്ക്ക് സാധ്യതയുണ്ടെങ്കിൽ, വിളവെടുത്ത ഉൽപ്പന്നം പുറത്ത് വയ്ക്കുന്നതിനേക്കാൾ കോൾഡ് സ്റ്റോറേജിൽ വയ്ക്കുന്നതാണ് നല്ലത്.",
    thanks:"സന്തോഷം! വേറെ എന്തെങ്കിലും ചോദിക്കൂ, അല്ലെങ്കിൽ വീണ്ടും മൈക്ക് അമർത്തുക.",
    fallback:function(raw){
      return "ഞാൻ കേട്ടത്: \""+raw+"\". മാർക്കറ്റ്‌പ്ലേസ്, വില പ്രവചനം, കോൾഡ് സ്റ്റോറേജ്, കാലാവസ്ഥ, അല്ലെങ്കിൽ അക്കൗണ്ട് ഉണ്ടാക്കൽ എന്നിവയിൽ എനിക്ക് സഹായിക്കാൻ കഴിയും — അതിലേതെങ്കിലും ചോദിക്കൂ, അല്ലെങ്കിൽ താഴെയുള്ള ബട്ടൺ അമർത്തുക.";
    }
  },
  kn:{
    speechLang:'kn-IN', code:'KN', name:'ಕನ್ನಡ',
    title:'ಖೇತಸೇತು ಸಹಾಯಕ', subtitle:'ಧ್ವನಿ ಸಹಾಯಕ',
    greeting:"ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಖೇತಸೇತು ಧ್ವನಿ ಸಹಾಯಕ. ಮಾರುಕಟ್ಟೆ, ಬೆಲೆ ಮುನ್ಸೂಚನೆ, ಕೋಲ್ಡ್ ಸ್ಟೋರೇಜ್, ಇಂದಿನ ಹವಾಮಾನ, ಅಥವಾ ಖಾತೆ ರಚಿಸುವುದು ಹೇಗೆ ಎಂದು ಕೇಳಲು ಮೈಕ್ ಒತ್ತಿ ಅಥವಾ ಟೈಪ್ ಮಾಡಿ.",
    listening:'ಕೇಳುತ್ತಿದ್ದೇನೆ…', thinking:'ಯೋಚಿಸುತ್ತಿದ್ದೇನೆ…', speaking:'ಮಾತನಾಡುತ್ತಿದ್ದೇನೆ…',
    placeholder:'ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ…',
    micBlocked:'ಮೈಕ್ರೋಫೋನ್ ಅನುಮತಿ ಇಲ್ಲ. ದಯವಿಟ್ಟು ಅನುಮತಿಸಿ, ಅಥವಾ ಕೆಳಗೆ ಟೈಪ್ ಮಾಡಿ.',
    noSpeech:'ನನಗೆ ಕೇಳಿಸಲಿಲ್ಲ — ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
    notSupported:'ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ.',
    quick:{market:'🧺 ಮಾರುಕಟ್ಟೆ', forecast:'📈 ಬೆಲೆ ಮುನ್ಸೂಚನೆ', storage:'❄ ಕೋಲ್ಡ್ ಸ್ಟೋರೇಜ್', login:'🌱 ಪ್ರಾರಂಭಿಸಿ', weather:'🌦 ಹವಾಮಾನ'},
    who:{user:'ನೀವು', bot:'ಸಹಾಯಕ'},
    cropLabel:{tomato:'ಟೊಮೇಟೊ', onion:'ಈರುಳ್ಳಿ', wheat:'ಗೋಧಿ'},
    storageOpen:'ಸ್ಥಳ ಲಭ್ಯವಿದೆ', storageLow:'ಕಡಿಮೆ ಸ್ಥಳ', viewMap:'ನಕ್ಷೆಯಲ್ಲಿ ನೋಡಿ →',
    help:"ನಾನು ಸಹಾಯ ಮಾಡಬಲ್ಲೆ: ಮಾರುಕಟ್ಟೆ ವೀಕ್ಷಿಸುವುದು, AI ಬೆಲೆ ಮುನ್ಸೂಚನೆ ಪರಿಶೀಲಿಸುವುದು, ಹತ್ತಿರದ ಕೋಲ್ಡ್ ಸ್ಟೋರೇಜ್ ಹುಡುಕುವುದು, ಇಂದಿನ ಹವಾಮಾನ ತಿಳಿಸುವುದು, ಅಥವಾ ಖಾತೆ ರಚಿಸಲು ಮಾರ್ಗದರ್ಶನ ನೀಡುವುದು. ಕೇಳಿ, ಅಥವಾ ಕೆಳಗಿನ ಬಟನ್ ಒತ್ತಿ.",
    market:"ನಿಮಗಾಗಿ ಮಾರುಕಟ್ಟೆ ತೆರೆಯುತ್ತಿದ್ದೇನೆ. ನೀವು ತಾಜಾ ಉತ್ಪನ್ನಗಳನ್ನು ಬೆಲೆ, ವರ್ಗ ಅಥವಾ ತಾಜಾತನದ ಪ್ರಕಾರ ಫಿಲ್ಟರ್ ಮಾಡಬಹುದು — ಎಲ್ಲವೂ ಪರಿಶೀಲಿತ ರೈತರು ಮತ್ತು FPOಗಳಿಂದ ನೇರವಾಗಿ ಪಟ್ಟಿ ಮಾಡಲಾಗಿದೆ.",
    forecastIntro:function(crop, cur, wk, low, high){
      return crop+" ಬೆಲೆ: ಇಂದು ಕೆಜಿಗೆ ₹"+cur+". AI ಮಾದರಿಯ ಪ್ರಕಾರ 7 ದಿನಗಳಲ್ಲಿ ಇದು ಸುಮಾರು ಕೆಜಿಗೆ ₹"+wk+" ಆಗಬಹುದು. ಕಳೆದ 14 ದಿನಗಳಲ್ಲಿ ಇದು ₹"+low+" ಇಂದ ₹"+high+" ವರೆಗೆ ಇತ್ತು. ನಿಮಗಾಗಿ ಸಂಪೂರ್ಣ ಬೆಲೆ ಮುನ್ಸೂಚನೆ ಪುಟ ತೆರೆಯುತ್ತಿದ್ದೇನೆ.";
    },
    forecastAsk:"ಯಾವ ಬೆಳೆಯ ಬೆಲೆ ಮುನ್ಸೂಚನೆ ನಿಮಗೆ ತಿಳಿಯಬೇಕು — ಟೊಮೇಟೊ, ಈರುಳ್ಳಿ, ಅಥವಾ ಗೋಧಿ?",
    storageIntro:"ನಿಮ್ಮ ಹತ್ತಿರದ ಕೋಲ್ಡ್ ಸ್ಟೋರೇಜ್‌ಗಳು ಇಲ್ಲಿವೆ. ದಾರಿಗಾಗಿ 'ನಕ್ಷೆಯಲ್ಲಿ ನೋಡಿ' ಒತ್ತಿ. ಸ್ಥಳ ಕಾಯ್ದಿರಿಸಲು ಸೇವೆಗಳನ್ನು ಬುಕ್ ಮಾಡಿ ಪುಟ ತೆರೆಯುತ್ತಿದ್ದೇನೆ.",
    loginIntro:"ನಿಮ್ಮ ಉಚಿತ ಖಾತೆಯನ್ನು ಸಿದ್ಧಪಡಿಸೋಣ. ಪ್ರಾರಂಭಿಸಿ ಪುಟದಲ್ಲಿ, ನೀವು ರೈತ/FPO ಅಥವಾ ಖರೀದಿದಾರ ಎಂದು ಆಯ್ಕೆಮಾಡಿ, ನಂತರ ನಿಮ್ಮ ಹೆಸರು, ಫೋನ್ ಸಂಖ್ಯೆ, ಗ್ರಾಮ ಅಥವಾ ನಗರ, ಮತ್ತು ಪರಿಶೀಲನೆಗಾಗಿ ಆಧಾರ್ ಸಂಖ್ಯೆಯನ್ನು ಭರ್ತಿ ಮಾಡಿ — ಇದು ಮರೆಮಾಚಲ್ಪಟ್ಟಿದ್ದು ಎಂದಿಗೂ ಸರಳ ಪಠ್ಯದಲ್ಲಿ ಸಂಗ್ರಹಿಸಲ್ಪಡುವುದಿಲ್ಲ. ನಾನು ಈಗ ಕ್ಷೇತ್ರಗಳನ್ನು ಹೈಲೈಟ್ ಮಾಡುತ್ತಿದ್ದೇನೆ.",
    weatherIntro:"ನಿಮ್ಮ ಪ್ರದೇಶದ ಇಂದಿನ ಹವಾಮಾನವನ್ನು ಪರಿಶೀಲಿಸುತ್ತಿದ್ದೇನೆ…",
    weatherFail:"ನನಗೆ ಈಗ ನೇರ ಹವಾಮಾನವನ್ನು ಪಡೆಯಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ — ದಯವಿಟ್ಟು ಸ್ಥಳ ಅನುಮತಿ ನೀಡಿ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ, ಅಥವಾ mausam.imd.gov.in ನಲ್ಲಿ ಭಾರತೀಯ ಹವಾಮಾನ ಇಲಾಖೆಯ ವೆಬ್‌ಸೈಟ್ ನೋಡಿ.",
    weatherLine:function(place, tMax, tMin, rain){
      return place+" ಬಳಿಯ ಹವಾಮಾನ: ಗರಿಷ್ಠ "+tMax+"°C, ಕನಿಷ್ಠ "+tMin+"°C, ಮಳೆಯ ಸುಮಾರು "+rain+"% ಸಾಧ್ಯತೆ. ";
    },
    weatherTip:"ಮಳೆಯ ಸಾಧ್ಯತೆ ಇದ್ದರೆ, ಕೊಯ್ಲು ಮಾಡಿದ ಉತ್ಪನ್ನವನ್ನು ಹೊರಗೆ ಇಡುವ ಬದಲು ಕೋಲ್ಡ್ ಸ್ಟೋರೇಜ್‌ನಲ್ಲಿ ಇಡುವುದು ಉತ್ತಮ.",
    thanks:"ಪರವಾಗಿಲ್ಲ! ಇನ್ನೇನಾದರೂ ಕೇಳಿ, ಅಥವಾ ಮತ್ತೆ ಮೈಕ್ ಒತ್ತಿ.",
    fallback:function(raw){
      return "ನಾನು ಕೇಳಿದ್ದು: \""+raw+"\". ಮಾರುಕಟ್ಟೆ, ಬೆಲೆ ಮುನ್ಸೂಚನೆ, ಕೋಲ್ಡ್ ಸ್ಟೋರೇಜ್, ಹವಾಮಾನ, ಅಥವಾ ಖಾತೆ ರಚಿಸುವಲ್ಲಿ ನಾನು ಸಹಾಯ ಮಾಡಬಲ್ಲೆ — ಅವುಗಳಲ್ಲಿ ಒಂದನ್ನು ಕೇಳಿ, ಅಥವಾ ಕೆಳಗಿನ ಬಟನ್ ಒತ್ತಿ.";
    }
  }
};

/* ---------------------------------------------------------
   2. INTENT KEYWORDS (merged across all 6 languages so typed
   or spoken input is recognised no matter which UI language
   is active).
   --------------------------------------------------------- */
var KW = {
  greet:['hi','hello','hey','namaste','నమస్కారం','వణక్కం','வணக்கம்','नमस्ते','నమస్తే','നമസ്കാരം','ನಮಸ್ಕಾರ'],
  help:['help','what can you do','how to use','मदद','कैसे','సహాయం','ఎలా','உதவி','எப்படி','സഹായം','എങ്ങനെ','ಸಹಾಯ','ಹೇಗೆ'],
  market:['marketplace','market','browse','बाज़ार','मंडी','मार्केट','మార్కెట్','విక్రయ','சந்தை','மார்க்கெட்','മാർക്കറ്റ്','ചന്ത','ಮಾರುಕಟ್ಟೆ','ಮಾರ್ಕೆಟ್'],
  forecast:['forecast','price','rate','bhav','भाव','कीमत','दाम','ధర','రేటు','விலை','நிலவரம்','ధరల','വില','വിലവിവരം','ಬೆಲೆ','ದರ'],
  storage:['cold storage','storage','godown','कोल्ड स्टोरेज','भंडारण','గిడ్డంగి','కోల్డ్ స్టోరేజ్','குளிர்பதன','சேமிப்பு','കോൾഡ് സ്റ്റോറേജ്','സംഭരണം','ಕೋಲ್ಡ್ ಸ್ಟೋರೇಜ್','ಸಂಗ್ರಹಣೆ'],
  login:['login','log in','sign up','signup','account','get started','register','खाता','लॉगिन','पंजीकरण','ఖాతా','లాగిన్','నమోదు','கணக்கு','பதிவு','അക്കൗണ്ട്','രജിസ്റ്റർ','ಖಾತೆ','ನೋಂದಣಿ'],
  weather:['weather','rain','temperature','forecast weather','मौसम','बारिश','వాతావరణం','వర్షం','வானிலை','மழை','കാലാവസ്ഥ','മഴ','ಹವಾಮಾನ','ಮಳೆ'],
  thanks:['thank','thanks','धन्यवाद','शुक्रिया','ధన్యవాదాలు','நன்றி','നന്ദി','ಧನ್ಯವಾದ']
};
var CROP_KW = {
  tomato:['tomato','टमाटर','టమాటా','தக்காளி','തക്കാളി','ಟೊಮೇಟೊ'],
  onion:['onion','प्याज','प्याज़','ఉల్లి','ఉల్లిపాయ','வெங்காயம்','സവാള','ಈರುಳ್ಳಿ'],
  wheat:['wheat','गेहूं','गेहूँ','గోధుమ','கோதுமை','ഗോതമ്പ്','ಗೋಧಿ']
};
function matchAny(text, list){
  for(var i=0;i<list.length;i++){ if(text.indexOf(list[i].toLowerCase())!==-1) return true; }
  return false;
}
function detectCrop(text){
  for(var k in CROP_KW){ if(matchAny(text, CROP_KW[k])) return k; }
  return null;
}
/* Check specific intents first, generic "help" last. Words that mean
   "how" (ఎలా / कैसे / எப்படி) live in the help list but also show up
   naturally inside real questions like "how do I create an account"
   or "how's the weather" — if help were checked first it would win
   every time and swallow those questions, which is why the assistant
   looked broken for Telugu/Hindi/Tamil voice queries. */
var INTENT_PRIORITY = ['greet','weather','storage','forecast','login','market','thanks','help'];
function detectIntent(text){
  for(var i=0;i<INTENT_PRIORITY.length;i++){
    var k = INTENT_PRIORITY[i];
    if(matchAny(text, KW[k])) return k;
  }
  return null;
}

/* ---------------------------------------------------------
   3. FORECAST + STORAGE DATA (mirrors the site's own numbers
   so the assistant's answer always matches the Forecast page).
   --------------------------------------------------------- */
var FORECAST = {
  tomato:{hist:[30,29,31,33,30,28,27,29,31,34,33,32,30,32], img:IMG.tomato},
  onion:{hist:[22,23,21,20,22,24,25,24,23,22,21,20,22,24], img:IMG.onion},
  wheat:{hist:[24,24,25,25,26,26,25,25,26,27,27,26,26,26], img:IMG.wheat}
};
function projectForecast(hist){
  var n=hist.length, xs=hist.map(function(_,i){return i;});
  var meanX=xs.reduce(function(a,b){return a+b;},0)/n;
  var meanY=hist.reduce(function(a,b){return a+b;},0)/n;
  var num=0, den=0;
  for(var i=0;i<n;i++){ num+=(xs[i]-meanX)*(hist[i]-meanY); den+=Math.pow(xs[i]-meanX,2); }
  var slope = den===0?0:num/den, intercept = meanY-slope*meanX, future=[];
  for(i=n;i<n+7;i++){ var noise=Math.sin(i*1.3)*0.6; future.push(Math.round((slope*i+intercept+noise)*10)/10); }
  return future;
}
var STORAGES = [
  {name:'Nashik Cold Hub A', km:'3.2 km', status:'open'},
  {name:'AgroFresh Storage B', km:'6.8 km', status:'low'},
  {name:'District Cold Chain C', km:'11.4 km', status:'open'}
];
function gmapsLink(q){ return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(q); }

/* ---------------------------------------------------------
   4. BUILD WIDGET DOM
   --------------------------------------------------------- */
var root = document.createElement('div');
root.id = 'ks-voicebot';
root.innerHTML =
'<button class="ks-fab" id="ksFab" aria-label="Open KhetSetu voice assistant" title="KhetSetu Sahayak">' +
  '<span class="ks-fab-icon">🎙️</span>' +
'</button>' +
'<div class="ks-panel">' +
  '<div class="ks-head">' +
    '<div class="ks-head-title"><span class="emoji">🌾</span><div class="txt"><div class="t1" id="ksTitle">KhetSetu Sahayak</div><div class="t2" id="ksSubtitle">Voice Assistant</div></div></div>' +
    '<div class="ks-head-actions">' +
      '<div class="ks-lang-row" id="ksLangRow"></div>' +
      '<button class="ks-close" id="ksClose" aria-label="Close">✕</button>' +
    '</div>' +
  '</div>' +
  '<div class="ks-orb-wrap">' +
    '<div class="ks-orb-stage" id="ksOrbStage"><div class="ks-orb-ring r2"></div><div class="ks-orb-ring"></div><div class="ks-orb"></div></div>' +
    '<div class="ks-status" id="ksStatus"></div>' +
  '</div>' +
  '<div class="ks-quick" id="ksQuick"></div>' +
  '<div class="ks-chat" id="ksChat"></div>' +
  '<div class="ks-input-row">' +
    '<button class="ks-mic-btn" id="ksMic" title="Tap to speak" aria-label="Tap to speak">🎤</button>' +
    '<input class="ks-text-input" id="ksTextInput" type="text" aria-label="Type a message" placeholder="Type a message…">' +
    '<button class="ks-send-btn" id="ksSend" title="Send" aria-label="Send message">➤</button>' +
  '</div>' +
'</div>';
document.body.appendChild(root);

var elFab=document.getElementById('ksFab'), elClose=document.getElementById('ksClose'),
    elLangRow=document.getElementById('ksLangRow'), elTitle=document.getElementById('ksTitle'),
    elSubtitle=document.getElementById('ksSubtitle'), elOrbStage=document.getElementById('ksOrbStage'),
    elStatus=document.getElementById('ksStatus'), elQuick=document.getElementById('ksQuick'),
    elChat=document.getElementById('ksChat'), elMic=document.getElementById('ksMic'),
    elTextInput=document.getElementById('ksTextInput'), elSend=document.getElementById('ksSend');

var currentLang = 'en';

/* ---------------------------------------------------------
   5. NAVIGATION HOOK — reuses the site's own gotoPage() if
   this widget is loaded on the KhetSetu page itself.
   --------------------------------------------------------- */
function tryGoto(page){
  if(typeof window.gotoPage === 'function'){
    window.gotoPage(page);
    return true;
  }
  return false;
}
function highlightSequence(selectors){
  var delay = 0;
  selectors.forEach(function(sel){
    setTimeout(function(){
      var el = document.querySelector(sel);
      if(el){
        el.classList.add('ks-highlight');
        if(typeof el.scrollIntoView === 'function') el.scrollIntoView({behavior:'smooth', block:'center'});
        setTimeout(function(){ el.classList.remove('ks-highlight'); }, 3400);
      }
    }, delay);
    delay += 900;
  });
}

/* ---------------------------------------------------------
   6. RENDER: language switch, quick chips, orb state
   --------------------------------------------------------- */
function setLang(lang){
  currentLang = L[lang] ? lang : 'en';
  var p = L[currentLang];
  elTitle.textContent = p.title;
  elSubtitle.textContent = p.subtitle;
  elTextInput.placeholder = p.placeholder;
  elLangRow.innerHTML = Object.keys(L).map(function(k){
    return '<button class="ks-lang-btn'+(k===currentLang?' active':'')+'" data-lang="'+k+'">'+L[k].code+'</button>';
  }).join('');
  Array.prototype.forEach.call(elLangRow.querySelectorAll('.ks-lang-btn'), function(btn){
    btn.addEventListener('click', function(){ setLang(btn.dataset.lang); });
  });
  elQuick.innerHTML =
    '<button class="ks-chip" data-act="market">'+p.quick.market+'</button>' +
    '<button class="ks-chip" data-act="forecast">'+p.quick.forecast+'</button>' +
    '<button class="ks-chip" data-act="storage">'+p.quick.storage+'</button>' +
    '<button class="ks-chip" data-act="login">'+p.quick.login+'</button>' +
    '<button class="ks-chip" data-act="weather">'+p.quick.weather+'</button>';
  Array.prototype.forEach.call(elQuick.querySelectorAll('.ks-chip'), function(btn){
    btn.addEventListener('click', function(){ handleIntent(btn.dataset.act, ''); });
  });
}

function setOrbState(state){
  elOrbStage.classList.remove('listening','speaking');
  if(state==='listening') elOrbStage.classList.add('listening');
  if(state==='speaking') elOrbStage.classList.add('speaking');
  elStatus.textContent = state==='listening' ? L[currentLang].listening
                        : state==='speaking' ? L[currentLang].speaking
                        : state==='thinking' ? L[currentLang].thinking
                        : '';
}

function appendMsg(sender, html, cls){
  var wrap = document.createElement('div');
  wrap.className = 'ks-msg ' + cls;
  wrap.innerHTML = '<span class="who">'+sender+'</span>' + html;
  elChat.appendChild(wrap);
  elChat.scrollTop = elChat.scrollHeight;
}
function say(text, cardHtml){
  var p = L[currentLang];
  appendMsg(p.who.bot, escapeHtml(text) + (cardHtml||''), 'bot');
  speak(text);
}
function escapeHtml(s){ return s.replace(/[&<>]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c]; }); }

/* ---------------------------------------------------------
   7. SPEECH: recognition + synthesis
   --------------------------------------------------------- */
var SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
if(!SpeechRecognitionAPI){ elMic.disabled = true; }

function startListening(){
  if(!SpeechRecognitionAPI){ say(L[currentLang].notSupported); return; }
  var rec = new SpeechRecognitionAPI();
  rec.lang = L[currentLang].speechLang;
  rec.interimResults = false;
  rec.maxAlternatives = 1;
  elMic.classList.add('on');
  setOrbState('listening');
  rec.start();
  rec.onresult = function(ev){
    var text = ev.results[0][0].transcript;
    appendMsg(L[currentLang].who.user, escapeHtml(text), 'user');
    setOrbState('thinking');
    setTimeout(function(){ handleUserText(text); }, 250);
  };
  rec.onerror = function(ev){
    var msg = ev.error==='not-allowed'||ev.error==='service-not-allowed' ? L[currentLang].micBlocked
            : ev.error==='no-speech' ? L[currentLang].noSpeech
            : L[currentLang].noSpeech;
    elStatus.textContent = msg;
    elMic.classList.remove('on');
    setOrbState('idle');
  };
  rec.onend = function(){
    elMic.classList.remove('on');
    if(!elOrbStage.classList.contains('speaking')) setOrbState('idle');
  };
}

var cachedVoices = [];
function loadVoices(){ cachedVoices = window.speechSynthesis ? window.speechSynthesis.getVoices() : []; }
if(window.speechSynthesis){
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}
function speak(text){
  if(!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  var utt = new SpeechSynthesisUtterance(text);
  var langPrefix = L[currentLang].speechLang.split('-')[0];
  var voice = cachedVoices.find(function(v){ return v.lang && v.lang.toLowerCase().indexOf(langPrefix)===0; });
  if(voice) utt.voice = voice;
  utt.lang = L[currentLang].speechLang;
  utt.onstart = function(){ setOrbState('speaking'); };
  utt.onend = function(){ setOrbState('idle'); };
  window.speechSynthesis.speak(utt);
}

/* ---------------------------------------------------------
   8. WEATHER (Open-Meteo — free, keyless, CORS-enabled)
   --------------------------------------------------------- */
function fetchWeather(){
  var p = L[currentLang];
  say(p.weatherIntro);
  setOrbState('thinking');
  function run(lat, lon, placeName){
    var url = 'https://api.open-meteo.com/v1/forecast?latitude='+lat+'&longitude='+lon+
      '&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=3';
    fetch(url).then(function(r){ return r.json(); }).then(function(d){
      if(!d.daily){ say(p.weatherFail); return; }
      var tMax = Math.round(d.daily.temperature_2m_max[0]);
      var tMin = Math.round(d.daily.temperature_2m_min[0]);
      var rain = d.daily.precipitation_probability_max ? d.daily.precipitation_probability_max[0] : 0;
      var line = p.weatherLine(placeName, tMax, tMin, rain) + p.weatherTip;
      say(line);
    }).catch(function(){ say(p.weatherFail); });
  }
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
      function(pos){ run(pos.coords.latitude.toFixed(3), pos.coords.longitude.toFixed(3), 'you'); },
      function(){ run(19.9975, 73.7898, 'Nashik'); },
      {timeout:5000}
    );
  } else {
    run(19.9975, 73.7898, 'Nashik');
  }
}

/* ---------------------------------------------------------
   9. INTENT HANDLING
   --------------------------------------------------------- */
function forecastCard(cropKey){
  var p = L[currentLang];
  var d = FORECAST[cropKey];
  var future = projectForecast(d.hist);
  var cur = d.hist[d.hist.length-1];
  var wk = future[future.length-1];
  var low = Math.min.apply(null, d.hist);
  var high = Math.max.apply(null, d.hist);
  var label = p.cropLabel[cropKey];
  var html = '<div class="ks-card"><img src="'+d.img+'" alt="'+label+'">' +
    '<div class="ks-card-body">' +
      '<div class="ks-card-title">'+label+'</div>' +
      '<div class="ks-card-row"><span>Today</span><b>₹'+cur+'/kg</b></div>' +
      '<div class="ks-card-row"><span>7-day AI forecast</span><b>₹'+wk+'/kg</b></div>' +
      '<div class="ks-card-row"><span>14-day range</span><b>₹'+low+' – ₹'+high+'</b></div>' +
    '</div></div>';
  return { text: p.forecastIntro(label, cur, wk, low, high), html: html, cur:cur, wk:wk, low:low, high:high, label:label };
}
function storageCard(){
  var p = L[currentLang];
  var rows = STORAGES.map(function(s){
    var statusLabel = s.status==='open' ? p.storageOpen : p.storageLow;
    return '<div class="ks-storage-item"><span class="nm">'+s.name+' · '+s.km+'</span>' +
      '<span class="st '+s.status+'">'+statusLabel+'</span></div>';
  }).join('');
  var links = STORAGES.map(function(s){
    return '<a class="ks-card-link" href="'+gmapsLink(s.name)+'" target="_blank" rel="noopener">'+s.name+' — '+p.viewMap+'</a>';
  }).join('<br>');
  var html = '<div class="ks-card"><img src="'+IMG.storage+'" alt="Cold storage">' +
    '<div class="ks-card-body">' + rows + '<div style="margin-top:6px;">'+links+'</div></div></div>';
  return html;
}

function handleIntent(intent, rawText){
  var p = L[currentLang];
  switch(intent){
    case 'greet':
      say(p.greeting); break;
    case 'help':
      say(p.help); break;
    case 'market':
      say(p.market);
      tryGoto('marketplace');
      break;
    case 'forecast': {
      var crop = detectCrop(rawText.toLowerCase()) || 'tomato';
      if(!detectCrop(rawText.toLowerCase()) && rawText.trim()===''){
        // came from quick-chip tap with no crop specified — default to tomato but ask too
      }
      var f = forecastCard(crop);
      say(f.text, f.html);
      tryGoto('forecast');
      break;
    }
    case 'storage':
      say(p.storageIntro, storageCard());
      tryGoto('services');
      break;
    case 'login':
      say(p.loginIntro);
      tryGoto('profile');
      setTimeout(function(){
        highlightSequence(['#roleFarmer', '#profileForm input[type="text"]', '#profileForm input[type="tel"]', '#aadhaarInput', '#profileForm button[type="submit"]']);
      }, 450);
      break;
    case 'weather':
      fetchWeather();
      break;
    case 'thanks':
      say(p.thanks); break;
    default:
      say(p.fallback(rawText));
  }
}

function handleUserText(rawText){
  var text = rawText.toLowerCase().trim();
  if(!text){ say(L[currentLang].noSpeech); return; }
  var crop = detectCrop(text);
  var intent = detectIntent(text);
  if(!intent && crop) intent = 'forecast';
  handleIntent(intent || 'fallback', rawText);
}

/* ---------------------------------------------------------
   10. WIRE UP UI EVENTS
   --------------------------------------------------------- */
elFab.addEventListener('click', function(){
  root.classList.add('open');
  if(!elChat.childElementCount){ say(L[currentLang].greeting); }
});
elClose.addEventListener('click', function(){ root.classList.remove('open'); if(window.speechSynthesis) window.speechSynthesis.cancel(); });
elMic.addEventListener('click', startListening);
elSend.addEventListener('click', submitText);
elTextInput.addEventListener('keydown', function(e){ if(e.key==='Enter') submitText(); });
function submitText(){
  var text = elTextInput.value.trim();
  if(!text) return;
  appendMsg(L[currentLang].who.user, escapeHtml(text), 'user');
  elTextInput.value = '';
  setOrbState('thinking');
  setTimeout(function(){ handleUserText(text); }, 150);
}

setLang('en');

/* ---------------------------------------------------------
   11. FOLLOW THE SITE'S OWN LANGUAGE SWITCHER
   script.js calls this after its applyLang() runs, so opening
   the assistant for the first time speaks in whatever language
   the farmer already picked for the site — instead of always
   starting in English regardless of the site language.
   --------------------------------------------------------- */
var langManuallyChosen = false;
elLangRow.addEventListener('click', function(){ langManuallyChosen = true; }, true);
window.ksVoicebotSyncLang = function(lang){
  if(langManuallyChosen) return; // respect an explicit in-widget choice
  if(L[lang]) setLang(lang);
};

})();
