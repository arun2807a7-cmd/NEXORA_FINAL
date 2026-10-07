/* =========================================================
   KHETSETU WEATHER MODULE
   - Interactive Leaflet map with pins for mandi towns
   - Live current conditions + 5-day outlook via Open-Meteo
     (free public API, no key required)
   - Simple farming advisory line based on the forecast
   ========================================================= */
(function(){

  // Mandi towns shown as pins on the map (mirrors the farmer
  // locations already used in the marketplace/services demo data).
  const WX_LOCATIONS = [
    { name:"Nashik",   state:"Maharashtra",   lat:19.9975, lon:73.7898 },
    { name:"Nagpur",   state:"Maharashtra",   lat:21.1458, lon:79.0882 },
    { name:"Agra",     state:"Uttar Pradesh", lat:27.1767, lon:78.0081 },
    { name:"Ratnagiri",state:"Maharashtra",   lat:16.9902, lon:73.3120 },
    { name:"Jalgaon",  state:"Maharashtra",   lat:21.0077, lon:75.5626 },
    { name:"Meerut",   state:"Uttar Pradesh", lat:28.9845, lon:77.7064 },
    { name:"Karnal",   state:"Haryana",       lat:29.6857, lon:76.9905 },
    { name:"Solan",    state:"Himachal Pradesh", lat:30.9045, lon:77.0967 },
  ];

  const WEATHER_ICONS = {
    0:"☀️",1:"🌤️",2:"⛅",3:"☁️",45:"🌫️",48:"🌫️",
    51:"🌦️",53:"🌦️",55:"🌦️",56:"🌦️",57:"🌦️",
    61:"🌧️",63:"🌧️",65:"🌧️",66:"🌧️",67:"🌧️",
    71:"🌨️",73:"🌨️",75:"🌨️",77:"🌨️",
    80:"🌦️",81:"🌦️",82:"🌧️",85:"🌨️",86:"🌨️",
    95:"⛈️",96:"⛈️",99:"⛈️"
  };

  /* ---------------------------------------------------------
     LANGUAGE PACKS — every string this module renders on its
     own (map popups, current conditions, advisory line, 5-day
     outlook, search/location messages). Static labels on the
     page itself (kicker, title, filters, stat labels) are
     handled by script.js's own `dict` + data-i18n system; this
     module has its own pack because everything below is built
     dynamically in JS rather than sitting in the HTML.
     --------------------------------------------------------- */
  const WX_I18N = {
    en:{
      loading:"Loading weather…", updatedPrefix:"Updated ",
      couldNotLoad:"Could not load weather — check your connection and try again.",
      searching:"Searching…", noPlaceFound:'No place found for "{q}" — try a nearby bigger town.',
      searchFailed:"Search failed — check your connection and try again.",
      locationNotSupported:"Location is not supported on this device/browser.",
      findingLocation:"Finding your location…",
      locationFailed:"Could not access your location — search a town instead.",
      yourLocation:"Your location", seeWeather:"See weather", pickLocation:"Pick a location to see today's farming advisory.",
      dayToday:"Today", days:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
      mapLabel:"Map", satelliteLabel:"Satellite", loadingLocation:"Locating…",
      clickedPoint:"Selected point", locateGeoFailed:"Could not identify this location — showing coordinates instead.",
      cond:{0:"Clear sky",1:"Mainly clear",2:"Partly cloudy",3:"Overcast",45:"Fog",48:"Depositing fog",
        51:"Light drizzle",53:"Drizzle",55:"Dense drizzle",56:"Freezing drizzle",57:"Freezing drizzle",
        61:"Light rain",63:"Rain",65:"Heavy rain",66:"Freezing rain",67:"Freezing rain",
        71:"Light snow",73:"Snow",75:"Heavy snow",77:"Snow grains",
        80:"Rain showers",81:"Rain showers",82:"Violent showers",85:"Snow showers",86:"Snow showers",
        95:"Thunderstorm",96:"Thunderstorm + hail",99:"Thunderstorm + hail"},
      adv:{ storm:"⛈️ Thunderstorms expected — avoid spraying pesticides and bring harvested produce under cover.",
        rain:"🌧️ Rain expected — delay harvesting and drying, and cover any produce waiting for pickup.",
        fog:"🌫️ Foggy conditions — start field work a little later once visibility clears.",
        rainChance:"☔ Good chance of rain today — plan irrigation and transport around the showers.",
        heat:"🥵 High heat expected — irrigate early morning or evening and protect young seedlings from scorch.",
        clear:"☀️ Clear skies — a good day for harvesting, sun-drying grain, and transporting produce to market.",
        fair:"🌤️ Fair conditions expected — a normal day for field work and market transport." }
    },
    hi:{
      loading:"मौसम लोड हो रहा है…", updatedPrefix:"अपडेट किया गया ",
      couldNotLoad:"मौसम लोड नहीं हो सका — कृपया अपना कनेक्शन जाँचें और फिर कोशिश करें।",
      searching:"खोज रहे हैं…", noPlaceFound:'"{q}" के लिए कोई जगह नहीं मिली — पास के किसी बड़े शहर से खोजें।',
      searchFailed:"खोज विफल — कृपया अपना कनेक्शन जाँचें और फिर कोशिश करें।",
      locationNotSupported:"इस डिवाइस/ब्राउज़र पर लोकेशन समर्थित नहीं है।",
      findingLocation:"आपका स्थान ढूँढ रहे हैं…",
      locationFailed:"आपके स्थान तक नहीं पहुँच सके — इसके बजाय किसी शहर को खोजें।",
      yourLocation:"आपका स्थान", seeWeather:"मौसम देखें", pickLocation:"आज की खेती सलाह देखने के लिए एक स्थान चुनें।",
      dayToday:"आज", days:["रवि","सोम","मंगल","बुध","गुरु","शुक्र","शनि"],
      cond:{0:"साफ़ आसमान",1:"अधिकांशतः साफ़",2:"आंशिक रूप से बादल",3:"घने बादल",45:"कोहरा",48:"जमने वाला कोहरा",
        51:"हल्की बूंदाबांदी",53:"बूंदाबांदी",55:"घनी बूंदाबांदी",56:"जमने वाली बूंदाबांदी",57:"जमने वाली बूंदाबांदी",
        61:"हल्की बारिश",63:"बारिश",65:"भारी बारिश",66:"जमने वाली बारिश",67:"जमने वाली बारिश",
        71:"हल्की बर्फ़बारी",73:"बर्फ़बारी",75:"भारी बर्फ़बारी",77:"बर्फ़ के कण",
        80:"बारिश की बौछारें",81:"बारिश की बौछारें",82:"तेज़ बौछारें",85:"बर्फ़ की बौछारें",86:"बर्फ़ की बौछारें",
        95:"आंधी-तूफ़ान",96:"आंधी-तूफ़ान + ओले",99:"आंधी-तूफ़ान + ओले"},
      adv:{ storm:"⛈️ आंधी-तूफ़ान की संभावना — कीटनाशक छिड़काव से बचें और कटी उपज को ढककर रखें।",
        rain:"🌧️ बारिश की संभावना — कटाई और सुखाना टालें, और पिकअप का इंतज़ार कर रही उपज को ढकें।",
        fog:"🌫️ कोहरे की स्थिति — दृश्यता साफ़ होने के बाद ही खेत का काम शुरू करें।",
        rainChance:"☔ आज बारिश की अच्छी संभावना — सिंचाई और परिवहन बौछारों के अनुसार योजना बनाएं।",
        heat:"🥵 अधिक गर्मी की संभावना — सुबह या शाम को सिंचाई करें और नए पौधों को झुलसने से बचाएं।",
        clear:"☀️ साफ़ आसमान — कटाई, अनाज सुखाने और उपज बाज़ार ले जाने के लिए अच्छा दिन।",
        fair:"🌤️ सामान्य मौसम की संभावना — खेत के काम और बाज़ार परिवहन के लिए सामान्य दिन।" }
    },
    te:{
      loading:"వాతావరణం లోడ్ అవుతోంది…", updatedPrefix:"నవీకరించబడింది ",
      couldNotLoad:"వాతావరణం లోడ్ చేయలేకపోయాము — దయచేసి మీ కనెక్షన్‌ని తనిఖీ చేసి మళ్ళీ ప్రయత్నించండి.",
      searching:"శోధిస్తోంది…", noPlaceFound:'"{q}" కోసం ప్రదేశం కనుగొనబడలేదు — దగ్గరలోని పెద్ద పట్టణాన్ని ప్రయత్నించండి.',
      searchFailed:"శోధన విఫలమైంది — దయచేసి మీ కనెక్షన్‌ని తనిఖీ చేసి మళ్ళీ ప్రయత్నించండి.",
      locationNotSupported:"ఈ పరికరం/బ్రౌజర్‌లో లొకేషన్ మద్దతు లేదు.",
      findingLocation:"మీ స్థానాన్ని కనుగొంటోంది…",
      locationFailed:"మీ స్థానాన్ని పొందలేకపోయాము — బదులుగా ఒక పట్టణాన్ని శోధించండి.",
      yourLocation:"మీ స్థానం", seeWeather:"వాతావరణం చూడండి", pickLocation:"ఈరోజు వ్యవసాయ సలహా చూడటానికి ఒక ప్రదేశాన్ని ఎంచుకోండి.",
      dayToday:"ఈరోజు", days:["ఆది","సోమ","మంగళ","బుధ","గురు","శుక్ర","శని"],
      cond:{0:"నిర్మలమైన ఆకాశం",1:"ఎక్కువగా నిర్మలం",2:"పాక్షిక మేఘావృతం",3:"మేఘావృతం",45:"పొగమంచు",48:"గడ్డకట్టే పొగమంచు",
        51:"తేలికపాటి తుంపర",53:"తుంపర",55:"దట్టమైన తుంపర",56:"గడ్డకట్టే తుంపర",57:"గడ్డకట్టే తుంపర",
        61:"తేలికపాటి వర్షం",63:"వర్షం",65:"భారీ వర్షం",66:"గడ్డకట్టే వర్షం",67:"గడ్డకట్టే వర్షం",
        71:"తేలికపాటి మంచు",73:"మంచు",75:"భారీ మంచు",77:"మంచు రేణువులు",
        80:"వర్ష జల్లులు",81:"వర్ష జల్లులు",82:"తీవ్ర జల్లులు",85:"మంచు జల్లులు",86:"మంచు జల్లులు",
        95:"ఉరుములతో కూడిన తుఫాను",96:"ఉరుములు + వడగళ్ళు",99:"ఉరుములు + వడగళ్ళు"},
      adv:{ storm:"⛈️ ఉరుములతో కూడిన తుఫాను అవకాశం — పురుగుమందుల పిచికారీ మానుకోండి మరియు కోసిన పంటను కప్పి ఉంచండి.",
        rain:"🌧️ వర్షం అవకాశం — కోత మరియు ఆరబెట్టడం వాయిదా వేయండి, పికప్ కోసం వేచి ఉన్న పంటను కప్పండి.",
        fog:"🌫️ పొగమంచు పరిస్థితులు — దృశ్యమానత్వం మెరుగుపడిన తర్వాతే పొలం పని ప్రారంభించండి.",
        rainChance:"☔ ఈరోజు వర్షం అవకాశం ఎక్కువ — నీటిపారుదల మరియు రవాణాను జల్లుల ప్రకారం ప్రణాళిక చేయండి.",
        heat:"🥵 అధిక వేడి అవకాశం — ఉదయం లేదా సాయంత్రం నీరు పెట్టండి, లేత మొక్కలను ఎండ నుండి రక్షించండి.",
        clear:"☀️ నిర్మలమైన ఆకాశం — కోతకు, ధాన్యం ఎండబెట్టడానికి, పంటను మార్కెట్‌కు తరలించడానికి మంచి రోజు.",
        fair:"🌤️ సాధారణ వాతావరణం అవకాశం — పొలం పని మరియు మార్కెట్ రవాణాకు మామూలు రోజు." }
    },
    ta:{
      loading:"வானிலை ஏற்றப்படுகிறது…", updatedPrefix:"புதுப்பிக்கப்பட்டது ",
      couldNotLoad:"வானிலையை ஏற்ற முடியவில்லை — உங்கள் இணைப்பைச் சரிபார்த்து மீண்டும் முயற்சிக்கவும்.",
      searching:"தேடுகிறது…", noPlaceFound:'"{q}" க்கு இடம் கிடைக்கவில்லை — அருகிலுள்ள பெரிய நகரத்தை முயற்சிக்கவும்.',
      searchFailed:"தேடல் தோல்வியடைந்தது — உங்கள் இணைப்பைச் சரிபார்த்து மீண்டும் முயற்சிக்கவும்.",
      locationNotSupported:"இந்த சாதனம்/உலாவியில் இருப்பிடம் ஆதரிக்கப்படவில்லை.",
      findingLocation:"உங்கள் இருப்பிடத்தைக் கண்டறிகிறது…",
      locationFailed:"உங்கள் இருப்பிடத்தை அணுக முடியவில்லை — பதிலாக ஒரு நகரத்தைத் தேடுங்கள்.",
      yourLocation:"உங்கள் இருப்பிடம்", seeWeather:"வானிலையைப் பார்க்க", pickLocation:"இன்றைய விவசாய ஆலோசனையைப் பார்க்க ஒரு இடத்தைத் தேர்ந்தெடுக்கவும்.",
      dayToday:"இன்று", days:["ஞாயி","திங்","செவ்","புத","வியா","வெள்","சனி"],
      cond:{0:"தெளிவான வானம்",1:"பெரும்பாலும் தெளிவு",2:"பகுதி மேகமூட்டம்",3:"முழு மேகமூட்டம்",45:"பனிமூட்டம்",48:"உறையும் பனிமூட்டம்",
        51:"லேசான தூறல்",53:"தூறல்",55:"அடர் தூறல்",56:"உறையும் தூறல்",57:"உறையும் தூறல்",
        61:"லேசான மழை",63:"மழை",65:"கனமழை",66:"உறையும் மழை",67:"உறையும் மழை",
        71:"லேசான பனிப்பொழிவு",73:"பனிப்பொழிவு",75:"கன பனிப்பொழிவு",77:"பனித் துகள்கள்",
        80:"மழை தூறல்கள்",81:"மழை தூறல்கள்",82:"கடும் தூறல்கள்",85:"பனி தூறல்கள்",86:"பனி தூறல்கள்",
        95:"இடிமுழக்கத்துடன் புயல்",96:"இடி + ஆலங்கட்டி",99:"இடி + ஆலங்கட்டி"},
      adv:{ storm:"⛈️ இடி மற்றும் புயல் எதிர்பார்க்கப்படுகிறது — பூச்சிக்கொல்லி தெளிப்பதைத் தவிர்த்து அறுவடை செய்த விளைபொருளை மூடி வையுங்கள்.",
        rain:"🌧️ மழை எதிர்பார்க்கப்படுகிறது — அறுவடை மற்றும் உலர்த்துவதை தாமதப்படுத்தி, பிக்அப் காத்திருக்கும் விளைபொருளை மூடுங்கள்.",
        fog:"🌫️ பனிமூட்ட நிலைமைகள் — காட்சி தெளிவானதும் வயல் வேலையைத் தொடங்குங்கள்.",
        rainChance:"☔ இன்று மழைக்கான வாய்ப்பு அதிகம் — நீர்ப்பாசனம் மற்றும் போக்குவரத்தை மழையைப் பொறுத்து திட்டமிடுங்கள்.",
        heat:"🥵 அதிக வெப்பம் எதிர்பார்க்கப்படுகிறது — காலை அல்லது மாலையில் நீர்ப்பாசனம் செய்து இளம் நாற்றுகளை பாதுகாக்கவும்.",
        clear:"☀️ தெளிவான வானம் — அறுவடை, தானியம் உலர்த்துதல், சந்தைக்கு கொண்டு செல்வதற்கு நல்ல நாள்.",
        fair:"🌤️ சாதாரண வானிலை எதிர்பார்க்கப்படுகிறது — வயல் வேலை மற்றும் சந்தை போக்குவரத்துக்கான சாதாரண நாள்." }
    },
    ml:{
      loading:"കാലാവസ്ഥ ലോഡ് ചെയ്യുന്നു…", updatedPrefix:"അപ്ഡേറ്റ് ചെയ്തു ",
      couldNotLoad:"കാലാവസ്ഥ ലോഡ് ചെയ്യാനായില്ല — നിങ്ങളുടെ കണക്ഷൻ പരിശോധിച്ച് വീണ്ടും ശ്രമിക്കുക.",
      searching:"തിരയുന്നു…", noPlaceFound:'"{q}" എന്നതിന് സ്ഥലം കണ്ടെത്തിയില്ല — അടുത്തുള്ള വലിയ പട്ടണം പരീക്ഷിക്കുക.',
      searchFailed:"തിരയൽ പരാജയപ്പെട്ടു — നിങ്ങളുടെ കണക്ഷൻ പരിശോധിച്ച് വീണ്ടും ശ്രമിക്കുക.",
      locationNotSupported:"ഈ ഉപകരണത്തിൽ/ബ്രൗസറിൽ ലൊക്കേഷൻ പിന്തുണയ്ക്കുന്നില്ല.",
      findingLocation:"നിങ്ങളുടെ ലൊക്കേഷൻ കണ്ടെത്തുന്നു…",
      locationFailed:"നിങ്ങളുടെ ലൊക്കേഷൻ ആക്‌സസ് ചെയ്യാനായില്ല — പകരം ഒരു പട്ടണം തിരയുക.",
      yourLocation:"നിങ്ങളുടെ ലൊക്കേഷൻ", seeWeather:"കാലാവസ്ഥ കാണുക", pickLocation:"ഇന്നത്തെ കാർഷിക ഉപദേശം കാണാൻ ഒരു സ്ഥലം തിരഞ്ഞെടുക്കുക.",
      dayToday:"ഇന്ന്", days:["ഞായർ","തിങ്കൾ","ചൊവ്വ","ബുധൻ","വ്യാഴം","വെള്ളി","ശനി"],
      cond:{0:"തെളിഞ്ഞ ആകാശം",1:"മിക്കവാറും തെളിഞ്ഞത്",2:"ഭാഗിക മേഘാവൃതം",3:"മേഘാവൃതം",45:"മൂടൽമഞ്ഞ്",48:"ഉറയുന്ന മൂടൽമഞ്ഞ്",
        51:"നേരിയ ചാറ്റൽ",53:"ചാറ്റൽ",55:"കട്ടിയുള്ള ചാറ്റൽ",56:"ഉറയുന്ന ചാറ്റൽ",57:"ഉറയുന്ന ചാറ്റൽ",
        61:"നേരിയ മഴ",63:"മഴ",65:"കനത്ത മഴ",66:"ഉറയുന്ന മഴ",67:"ഉറയുന്ന മഴ",
        71:"നേരിയ മഞ്ഞുവീഴ്ച",73:"മഞ്ഞുവീഴ്ച",75:"കനത്ത മഞ്ഞുവീഴ്ച",77:"മഞ്ഞ് തരികൾ",
        80:"മഴ ചാറ്റലുകൾ",81:"മഴ ചാറ്റലുകൾ",82:"ശക്തമായ ചാറ്റലുകൾ",85:"മഞ്ഞ് ചാറ്റലുകൾ",86:"മഞ്ഞ് ചാറ്റലുകൾ",
        95:"ഇടിമിന്നലോടുകൂടിയ കൊടുങ്കാറ്റ്",96:"ഇടിമിന്നൽ + ആലിപ്പഴം",99:"ഇടിമിന്നൽ + ആലിപ്പഴം"},
      adv:{ storm:"⛈️ ഇടിമിന്നലോടുകൂടിയ കൊടുങ്കാറ്റ് പ്രതീക്ഷിക്കുന്നു — കീടനാശിനി തളിക്കുന്നത് ഒഴിവാക്കി വിളവെടുത്ത ഉൽപ്പന്നം മൂടിവയ്ക്കുക.",
        rain:"🌧️ മഴ പ്രതീക്ഷിക്കുന്നു — വിളവെടുപ്പും ഉണക്കലും വൈകിക്കുക, പിക്കപ്പിനായി കാത്തിരിക്കുന്ന ഉൽപ്പന്നം മൂടുക.",
        fog:"🌫️ മൂടൽമഞ്ഞ് സാഹചര്യം — ദൃശ്യപരത മെച്ചപ്പെട്ട ശേഷം മാത്രം വയൽ ജോലി തുടങ്ങുക.",
        rainChance:"☔ ഇന്ന് മഴയ്ക്ക് നല്ല സാധ്യത — ജലസേചനവും ഗതാഗതവും മഴയ്ക്ക് അനുസരിച്ച് ആസൂത്രണം ചെയ്യുക.",
        heat:"🥵 അമിത ചൂട് പ്രതീക്ഷിക്കുന്നു — രാവിലെയോ വൈകുന്നേരമോ നനയ്ക്കുകയും ഇളം തൈകളെ സംരക്ഷിക്കുകയും ചെയ്യുക.",
        clear:"☀️ തെളിഞ്ഞ ആകാശം — വിളവെടുപ്പിനും ധാന്യം ഉണക്കുന്നതിനും ചന്തയിലേക്ക് കൊണ്ടുപോകുന്നതിനും നല്ല ദിവസം.",
        fair:"🌤️ സാധാരണ കാലാവസ്ഥ പ്രതീക്ഷിക്കുന്നു — വയൽ ജോലിക്കും ചന്ത ഗതാഗതത്തിനും സാധാരണ ദിവസം." }
    },
    kn:{
      loading:"ಹವಾಮಾನ ಲೋಡ್ ಆಗುತ್ತಿದೆ…", updatedPrefix:"ನವೀಕರಿಸಲಾಗಿದೆ ",
      couldNotLoad:"ಹವಾಮಾನ ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ — ದಯವಿಟ್ಟು ನಿಮ್ಮ ಸಂಪರ್ಕ ಪರಿಶೀಲಿಸಿ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
      searching:"ಹುಡುಕಲಾಗುತ್ತಿದೆ…", noPlaceFound:'"{q}" ಗಾಗಿ ಸ್ಥಳ ಕಂಡುಬಂದಿಲ್ಲ — ಹತ್ತಿರದ ದೊಡ್ಡ ಪಟ್ಟಣವನ್ನು ಪ್ರಯತ್ನಿಸಿ.',
      searchFailed:"ಹುಡುಕಾಟ ವಿಫಲವಾಗಿದೆ — ದಯವಿಟ್ಟು ನಿಮ್ಮ ಸಂಪರ್ಕ ಪರಿಶೀಲಿಸಿ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
      locationNotSupported:"ಈ ಸಾಧನ/ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಸ್ಥಳ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ.",
      findingLocation:"ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಹುಡುಕಲಾಗುತ್ತಿದೆ…",
      locationFailed:"ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಪ್ರವೇಶಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ — ಬದಲಿಗೆ ಒಂದು ಪಟ್ಟಣವನ್ನು ಹುಡುಕಿ.",
      yourLocation:"ನಿಮ್ಮ ಸ್ಥಳ", seeWeather:"ಹವಾಮಾನ ನೋಡಿ", pickLocation:"ಇಂದಿನ ಕೃಷಿ ಸಲಹೆ ನೋಡಲು ಒಂದು ಸ್ಥಳವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
      dayToday:"ಇಂದು", days:["ಭಾನು","ಸೋಮ","ಮಂಗಳ","ಬುಧ","ಗುರು","ಶುಕ್ರ","ಶನಿ"],
      cond:{0:"ಸ್ಪಷ್ಟ ಆಕಾಶ",1:"ಬಹುತೇಕ ಸ್ಪಷ್ಟ",2:"ಭಾಗಶಃ ಮೋಡ",3:"ಮೋಡ ಕವಿದ",45:"ಮಂಜು",48:"ಘನೀಕರಿಸುವ ಮಂಜು",
        51:"ಹಗುರ ತುಂತುರು",53:"ತುಂತುರು",55:"ದಟ್ಟ ತುಂತುರು",56:"ಘನೀಕರಿಸುವ ತುಂತುರು",57:"ಘನೀಕರಿಸುವ ತುಂತುರು",
        61:"ಹಗುರ ಮಳೆ",63:"ಮಳೆ",65:"ಭಾರೀ ಮಳೆ",66:"ಘನೀಕರಿಸುವ ಮಳೆ",67:"ಘನೀಕರಿಸುವ ಮಳೆ",
        71:"ಹಗುರ ಹಿಮ",73:"ಹಿಮ",75:"ಭಾರೀ ಹಿಮ",77:"ಹಿಮ ಕಣಗಳು",
        80:"ಮಳೆ ಸಿಂಚನ",81:"ಮಳೆ ಸಿಂಚನ",82:"ತೀವ್ರ ಸಿಂಚನ",85:"ಹಿಮ ಸಿಂಚನ",86:"ಹಿಮ ಸಿಂಚನ",
        95:"ಗುಡುಗು ಸಹಿತ ಬಿರುಗಾಳಿ",96:"ಗುಡುಗು + ಆಲಿಕಲ್ಲು",99:"ಗುಡುಗು + ಆಲಿಕಲ್ಲು"},
      adv:{ storm:"⛈️ ಗುಡುಗು ಸಹಿತ ಬಿರುಗಾಳಿ ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ — ಕೀಟನಾಶಕ ಸಿಂಪಡಣೆ ತಪ್ಪಿಸಿ ಮತ್ತು ಕೊಯ್ಲು ಮಾಡಿದ ಉತ್ಪನ್ನವನ್ನು ಮುಚ್ಚಿಡಿ.",
        rain:"🌧️ ಮಳೆ ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ — ಕೊಯ್ಲು ಮತ್ತು ಒಣಗಿಸುವಿಕೆಯನ್ನು ಮುಂದೂಡಿ, ಪಿಕಪ್‌ಗಾಗಿ ಕಾಯುತ್ತಿರುವ ಉತ್ಪನ್ನವನ್ನು ಮುಚ್ಚಿಡಿ.",
        fog:"🌫️ ಮಂಜಿನ ಪರಿಸ್ಥಿತಿ — ಗೋಚರತೆ ಸುಧಾರಿಸಿದ ನಂತರವೇ ಹೊಲದ ಕೆಲಸ ಪ್ರಾರಂಭಿಸಿ.",
        rainChance:"☔ ಇಂದು ಮಳೆಯ ಉತ್ತಮ ಸಾಧ್ಯತೆ — ನೀರಾವರಿ ಮತ್ತು ಸಾಗಣೆಯನ್ನು ಮಳೆಗೆ ಅನುಗುಣವಾಗಿ ಯೋಜಿಸಿ.",
        heat:"🥵 ಹೆಚ್ಚಿನ ಶಾಖ ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ — ಬೆಳಿಗ್ಗೆ ಅಥವಾ ಸಂಜೆ ನೀರಾವರಿ ಮಾಡಿ ಮತ್ತು ಎಳೆಯ ಸಸಿಗಳನ್ನು ಬಿಸಿಲಿನಿಂದ ರಕ್ಷಿಸಿ.",
        clear:"☀️ ಸ್ಪಷ್ಟ ಆಕಾಶ — ಕೊಯ್ಲು, ಧಾನ್ಯ ಒಣಗಿಸುವಿಕೆ ಮತ್ತು ಉತ್ಪನ್ನವನ್ನು ಮಾರುಕಟ್ಟೆಗೆ ಸಾಗಿಸಲು ಉತ್ತಮ ದಿನ.",
        fair:"🌤️ ಸಾಧಾರಣ ಹವಾಮಾನ ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ — ಹೊಲದ ಕೆಲಸ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಸಾಗಣೆಗೆ ಸಾಮಾನ್ಯ ದಿನ." }
    }
  };
  function wxLang(){
    var l = (typeof currentLang !== 'undefined' && WX_I18N[currentLang]) ? currentLang : 'en';
    return WX_I18N[l];
  }
  function wxInfo(code){
    var pack = wxLang();
    return { d: pack.cond[code] || WX_I18N.en.cond[code] || "—", i: WEATHER_ICONS[code] || "🌡️" };
  }

  let map = null;
  let markers = [];   // { marker, loc }
  let mapReady = false;
  let lastLoaded = null;
  let streetLayer = null;
  let satLayer = null;
  let usingSatellite = false;
  let clickMarker = null;

  function advisoryFor(code, rainChance, tempMax){
    var pack = wxLang();
    if(code >= 95) return pack.adv.storm;
    if(code >= 61 && code <= 82) return pack.adv.rain;
    if(code === 45 || code === 48) return pack.adv.fog;
    if(rainChance >= 50) return pack.adv.rainChance;
    if(tempMax >= 38) return pack.adv.heat;
    if(code <= 1) return pack.adv.clear;
    return pack.adv.fair;
  }

  async function loadWeatherFor(lat, lon, label, sub){
    const pack = wxLang();
    const updatedEl = document.getElementById('wxUpdated');
    updatedEl.textContent = pack.loading;
    document.getElementById('wxPlaceName').textContent = sub ? `${label}, ${sub}` : label;

    try{
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=5`;
      const res = await fetch(url);
      if(!res.ok) throw new Error('weather fetch failed');
      const data = await res.json();

      const cur = data.current;
      const info = wxInfo(cur.weather_code);
      document.getElementById('wxNowIcon').textContent = info.i;
      document.getElementById('wxNowTemp').textContent = Math.round(cur.temperature_2m) + '°C';
      document.getElementById('wxNowCond').textContent = info.d;
      document.getElementById('wxHumidity').textContent = Math.round(cur.relative_humidity_2m) + '%';
      document.getElementById('wxWind').textContent = Math.round(cur.wind_speed_10m) + ' km/h';
      const rainChance = (data.daily.precipitation_probability_max && data.daily.precipitation_probability_max[0]) || 0;
      document.getElementById('wxRain').textContent = rainChance + '%';

      document.getElementById('wxAdvisoryText').textContent = advisoryFor(cur.weather_code, rainChance, data.daily.temperature_2m_max[0]);

      const row = document.getElementById('wxDailyRow');
      row.innerHTML = '';
      data.daily.time.forEach((dateStr, idx)=>{
        const d = new Date(dateStr + 'T00:00:00');
        const dInfo = wxInfo(data.daily.weather_code[idx]);
        const dayLabel = idx === 0 ? pack.dayToday : pack.days[d.getDay()];
        const cell = document.createElement('div');
        cell.className = 'wx-day';
        cell.innerHTML = `
          <div class="d">${dayLabel}</div>
          <div class="ic">${dInfo.i}</div>
          <div class="hi">${Math.round(data.daily.temperature_2m_max[idx])}°</div>
          <div class="lo">${Math.round(data.daily.temperature_2m_min[idx])}°</div>
        `;
        row.appendChild(cell);
      });

      const now = new Date();
      updatedEl.textContent = pack.updatedPrefix + now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
      lastLoaded = { lat, lon, label, sub };
      if(map) map.setView([lat, lon], Math.max(map.getZoom(), 7));
    }catch(err){
      updatedEl.textContent = pack.couldNotLoad;
    }
  }

  function pinIcon(){
    return L.divIcon({
      className: 'wx-pin',
      html: '<div style="width:26px;height:26px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:#BE4A26;border:2px solid #fff;box-shadow:0 3px 8px rgba(0,0,0,.35);"></div>',
      iconSize: [26,26],
      iconAnchor: [13,26]
    });
  }

  function popupHtml(loc, popupId){
    const pack = wxLang();
    return `<div class="wx-pin-popup"><b>${loc.name}</b><br>${loc.state}<br><button id="${popupId}">${pack.seeWeather}</button></div>`;
  }

  function initWeatherMap(){
    if(mapReady) return;
    const el = document.getElementById('wxMap');
    if(!el || typeof L === 'undefined') return;

    map = L.map('wxMap', { scrollWheelZoom:false }).setView([21.5, 78.5], 5);

    streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    });
    satLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19,
      attribution: 'Tiles &copy; Esri — Source: Esri, Maxar, Earthstar Geographics'
    });
    streetLayer.addTo(map);

    WX_LOCATIONS.forEach(loc=>{
      const marker = L.marker([loc.lat, loc.lon], { icon: pinIcon() }).addTo(map);
      const popupId = 'wxpop-' + loc.name.replace(/\s+/g,'');
      marker.bindPopup(popupHtml(loc, popupId));
      // Stop marker clicks from also bubbling up as a generic map click,
      // so tapping a pin never double-fires the "load weather here" handler below.
      marker.on('click', (e)=> L.DomEvent.stopPropagation(e));
      marker.on('popupopen', ()=>{
        const btn = document.getElementById(popupId);
        if(btn) btn.addEventListener('click', ()=>{
          loadWeatherFor(loc.lat, loc.lon, loc.name, loc.state);
          marker.closePopup();
        });
      });
      markers.push({ marker, loc, popupId });
    });

    // Tap/click anywhere else on the map (not just a pin) to load that
    // exact spot's forecast — drop a temporary pin there and reverse-
    // geocode it for a friendly place name.
    map.on('click', (e)=> handleMapClick(e.latlng.lat, e.latlng.lng));

    initLayerToggle();

    mapReady = true;
  }

  function initLayerToggle(){
    const btn = document.getElementById('wxLayerToggle');
    if(!btn) return;
    btn.addEventListener('click', ()=>{
      const pack = wxLang();
      usingSatellite = !usingSatellite;
      if(usingSatellite){
        map.removeLayer(streetLayer);
        satLayer.addTo(map);
        btn.innerHTML = '🗺️ ' + (pack.mapLabel || 'Map');
      } else {
        map.removeLayer(satLayer);
        streetLayer.addTo(map);
        btn.innerHTML = '🛰️ ' + (pack.satelliteLabel || 'Satellite');
      }
    });
  }

  async function handleMapClick(lat, lon){
    const pack = wxLang();

    if(clickMarker) map.removeLayer(clickMarker);
    clickMarker = L.marker([lat, lon], { icon: pinIcon() }).addTo(map);

    loadWeatherFor(lat, lon, pack.loadingLocation || pack.loading, '');

    try{
      const place = await reverseGeocodePoint(lat, lon);
      if(place){
        document.getElementById('wxPlaceName').textContent = place.sub ? `${place.name}, ${place.sub}` : place.name;
        if(lastLoaded && lastLoaded.lat === lat && lastLoaded.lon === lon){
          lastLoaded.label = place.name;
          lastLoaded.sub = place.sub;
        }
      }
    }catch(err){
      // Non-fatal — the forecast itself already loaded; just fall back
      // to plain coordinates as the place label.
      const fallback = `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`;
      document.getElementById('wxPlaceName').textContent = fallback;
      if(lastLoaded && lastLoaded.lat === lat && lastLoaded.lon === lon){
        lastLoaded.label = fallback;
        lastLoaded.sub = '';
      }
    }
  }

  async function reverseGeocodePoint(lat, lon){
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`;
    const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
    if(!res.ok) throw new Error('reverse geocode failed');
    const data = await res.json();
    const addr = data.address || {};
    const name = addr.village || addr.town || addr.city || addr.municipality ||
      addr.county || addr.state_district ||
      (data.display_name ? data.display_name.split(',')[0] : null) ||
      `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`;
    const sub = addr.state || '';
    return { name, sub };
  }

  function refreshMapPopups(){
    markers.forEach(({ marker, loc, popupId })=>{
      marker.setPopupContent(popupHtml(loc, popupId));
    });
  }

  async function searchPlace(query){
    if(!query || !query.trim()) return;
    const pack = wxLang();
    const updatedEl = document.getElementById('wxUpdated');
    updatedEl.textContent = pack.searching;
    try{
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json&countryCode=IN`;
      const res = await fetch(url);
      const data = await res.json();
      if(!data.results || !data.results.length){
        updatedEl.textContent = pack.noPlaceFound.replace('{q}', query);
        return;
      }
      const r = data.results[0];
      loadWeatherFor(r.latitude, r.longitude, r.name, r.admin1 || '');
    }catch(err){
      updatedEl.textContent = pack.searchFailed;
    }
  }

  function useMyLocation(){
    const pack = wxLang();
    const updatedEl = document.getElementById('wxUpdated');
    if(!navigator.geolocation){
      updatedEl.textContent = pack.locationNotSupported;
      return;
    }
    updatedEl.textContent = pack.findingLocation;
    navigator.geolocation.getCurrentPosition(
      pos=> loadWeatherFor(pos.coords.latitude, pos.coords.longitude, pack.yourLocation, ''),
      ()=>{ updatedEl.textContent = pack.locationFailed; },
      { timeout: 8000 }
    );
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    const searchBtn = document.getElementById('wxSearchBtn');
    const searchInput = document.getElementById('wxSearchInput');
    const locateBtn = document.getElementById('wxLocateBtn');
    if(searchBtn) searchBtn.addEventListener('click', ()=> searchPlace(searchInput.value));
    if(searchInput) searchInput.addEventListener('keydown', e=>{ if(e.key === 'Enter') searchPlace(searchInput.value); });
    if(locateBtn) locateBtn.addEventListener('click', useMyLocation);
  });

  // Called by script.js's gotoPage() whenever the Weather page is shown,
  // so the map lays itself out correctly and a default town loads on first visit.
  window.ksWeatherPageShown = function(){
    initWeatherMap();
    if(map) setTimeout(()=> map.invalidateSize(), 60);
    if(!lastLoaded){
      const first = WX_LOCATIONS[0];
      loadWeatherFor(first.lat, first.lon, first.name, first.state);
    }
  };

  // Called by script.js's applyLang() whenever the site language changes,
  // so this module's own dynamically-built content (map popups, current
  // conditions, advisory line, 5-day outlook) re-renders in the new
  // language instead of staying stuck in whatever language it first loaded in.
  window.ksWeatherRefreshLang = function(){
    if(mapReady) refreshMapPopups();
    if(lastLoaded){
      loadWeatherFor(lastLoaded.lat, lastLoaded.lon, lastLoaded.label, lastLoaded.sub);
    } else {
      const updatedEl = document.getElementById('wxUpdated');
      const adEl = document.getElementById('wxAdvisoryText');
      if(updatedEl) updatedEl.textContent = wxLang().loading;
      if(adEl) adEl.textContent = wxLang().pickLocation;
    }
  };

})();
