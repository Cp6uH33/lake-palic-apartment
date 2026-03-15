import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { MapPin, Wifi, Car, Airplay, Phone, Mail, Plus, ArrowUpRight, ArrowUp, Code2 } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// ==========================================
// 0. REČNIK (PREVODI)
// ==========================================
const translations = {
  sr: {
    nav_apartments: "Apartmani",
    nav_contact: "Kontakt",
    hero_title: "Jezero Palić",
    hero_subtitle: "Vaš mir, vaš smeštaj",
    btn_book: "Rezervišite odmah",
    acc_title: "Apartmani",
    acc_desc: "Naši apartmani se nalaze na dva minuta hoda od jezera Palić.",
    acc_max_people: "Max 4 osobe",
    acc1_desc: "Moderno opremljen i prostran apartman idealan za parove ili porodice. Nudi maksimalan komfor uz prelepu terasu.",
    acc2_desc: "Vaš dom daleko od kuće. Opremljen svim neophodnim uređajima za duži i bezbrižan boravak u prirodi.",
    guide_title: "Šta videti u okolini?",
    guide_btn: "Saznaj više",
    guide_modal_about: "O lokaciji",
    guide_modal_map: "Prikaži na mapi",
    faq_badge: "FAQs",
    faq_title: "Često\npostavljana\npitanja",
    faq_desc: "Trebate više informacija? Pošaljite nam svoj upit ovde.",
    btn_contact: "Kontaktirajte nas",
    form_badge: "Rezervacija",
    form_title: "Pošaljite nam upit",
    form_desc: "Odgovorićemo vam u najkraćem mogućem roku sa ponudom i slobodnim terminima.",
    form_name: "Ime",
    form_surname: "Prezime",
    form_email: "Email adresa",
    form_phone: "Broj telefona",
    form_message: "Vaša poruka (Datumi, broj osoba, pitanja)",
    form_btn: "Pošalji upit",
    form_sending: "Slanje...",
    form_success_title: "Hvala vam na poruci!",
    form_success_desc: "Vaš upit je uspešno poslat. Očekujte naš odgovor na vašu email adresu uskoro.",
    form_success_btn: "Pošalji novu poruku",
    footer_title: "Rezervišite vaš odmor danas.",
    footer_location: "Lokacija"
  },
  en: {
    nav_apartments: "Apartments",
    nav_contact: "Contact",
    hero_title: "Lake Palić",
    hero_subtitle: "Your peace, your stay",
    btn_book: "Book Now",
    acc_title: "Our Apartments",
    acc_desc: "Find the perfect accommodation for your needs.",
    acc_max_people: "Max 4 people",
    acc1_desc: "Modern and spacious apartment ideal for couples or families. Offers maximum comfort with a beautiful terrace.",
    acc2_desc: "Your home away from home. Equipped with all necessary appliances for a long and carefree stay in nature.",
    guide_title: "What to see nearby?",
    guide_btn: "Learn more",
    guide_modal_about: "About location",
    guide_modal_map: "Show on map",
    faq_badge: "FAQs",
    faq_title: "Frequently\nAsked\nQuestions",
    faq_desc: "Need more information? Send us your inquiry here.",
    btn_contact: "Contact us",
    form_badge: "Reservation",
    form_title: "Send an Inquiry",
    form_desc: "We will reply as soon as possible with an offer and availability.",
    form_name: "First Name",
    form_surname: "Last Name",
    form_email: "Email Address",
    form_phone: "Phone Number",
    form_message: "Your message (Dates, number of people, questions)",
    form_btn: "Send Inquiry",
    form_sending: "Sending...",
    form_success_title: "Thank you for your message!",
    form_success_desc: "Your inquiry has been successfully sent. Expect our reply to your email address soon.",
    form_success_btn: "Send another message",
    footer_title: "Book your stay today.",
    footer_location: "Location"
  },
  hu: {
    nav_apartments: "Apartmanok",
    nav_contact: "Kapcsolat",
    hero_title: "Palicsi-tó",
    hero_subtitle: "Az ön békéje, az ön szállása",
    btn_book: "Foglaljon most",
    acc_title: "Apartmanjaink",
    acc_desc: "Találja meg a tökéletes szállást igényeinek megfelelően.",
    acc_max_people: "Max 4 fő",
    acc1_desc: "Modern és tágas apartman, ideális párok vagy családok számára. Maximális kényelmet nyújt egy gyönyörű terasszal.",
    acc2_desc: "Otthon az otthontól távol. Minden szükséges eszközzel felszerelve egy hosszú és gondtalan természetközeli tartózkodáshoz.",
    guide_title: "Látnivalók a környéken",
    guide_btn: "Tudjon meg többet",
    guide_modal_about: "A helyszínről",
    guide_modal_map: "Mutatás térképen",
    faq_badge: "GYIK",
    faq_title: "Gyakran\nIsmételt\nKérdések",
    faq_desc: "További információra van szüksége? Küldje el kérdését itt.",
    btn_contact: "Lépjen kapcsolatba velünk",
    form_badge: "Foglalás",
    form_title: "Küldjön érdeklődést",
    form_desc: "A lehető leghamarabb válaszolunk ajánlatunkkal és a szabad időpontokkal.",
    form_name: "Keresztnév",
    form_surname: "Vezetéknév",
    form_email: "Email cím",
    form_phone: "Telefonszám",
    form_message: "Üzenet (Dátumok, személyek száma, kérdések)",
    form_btn: "Érdeklődés küldése",
    form_sending: "Küldés...",
    form_success_title: "Köszönjük üzenetét!",
    form_success_desc: "Érdeklődését sikeresen elküldtük. Hamarosan várhatja válaszunkat email címére.",
    form_success_btn: "Új üzenet küldése",
    footer_title: "Foglalja le pihenését még ma.",
    footer_location: "Helyszín"
  }
};

// ==========================================
// 1. NAVBAR
// ==========================================
const Navbar = ({ lang, setLang }) => {
  const [scrolled, setScrolled] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#2B2118]/80 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-4 sm:gap-8 group">
          {/* ✅ width, height dodati */}
          <img src="/logo.webp" alt="Lake Palić Apartment,Apartman Rakanovic Logo" width={80} height={80} className="h-14 sm:h-16 md:h-20 w-auto group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <a href="#smestaj" className="text-slate-200 hover:text-[#fffeeb] font-medium text-sm transition hidden md:block">{t.nav_apartments}</a>
          <a href="#rezervacija" className="bg-transparent hover:bg-[#FFD700]/20 text-[#fffeeb] px-5 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-sm transition-all shadow-md hidden sm:block border-2 border-[#FFD700]">
            {t.nav_contact}
          </a>
          <div className="hidden sm:block w-px h-6 bg-white/20"></div>
          <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-full p-1 border border-white/10 shadow-inner">
            {/* ✅ aria-label dodat na sva 3 dugmeta */}
            <button
              onClick={() => setLang('sr')}
              aria-label="Srpski jezik"
              className={`w-8 h-8 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 ${lang === 'sr' ? 'ring-2 ring-[#FFD700] ring-offset-2 ring-offset-slate-900 scale-110' : 'opacity-60 hover:opacity-100 hover:scale-105'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className="w-full h-full object-cover"><rect width="3" height="2" fill="#c6363c" /><rect width="3" height="1.333" y="0.667" fill="#0c4076" /><rect width="3" height="0.667" y="1.333" fill="#fff" /></svg>
            </button>
            <button
              onClick={() => setLang('en')}
              aria-label="English language"
              className={`w-8 h-8 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 ${lang === 'en' ? 'ring-2 ring-[#FFD700] ring-offset-2 ring-offset-slate-900 scale-110' : 'opacity-60 hover:opacity-100 hover:scale-105'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-full h-full object-cover"><clipPath id="s"><path d="M0,0 v30 h60 v-30 z" /></clipPath><clipPath id="t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" /></clipPath><g clipPath="url(#s)"><path d="M0,0 v30 h60 v-30 z" fill="#012169" /><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" /><path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4" /><path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" /><path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" /></g></svg>
            </button>
            <button
              onClick={() => setLang('hu')}
              aria-label="Magyar nyelv"
              className={`w-8 h-8 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 ${lang === 'hu' ? 'ring-2 ring-[#FFD700] ring-offset-2 ring-offset-slate-900 scale-110' : 'opacity-60 hover:opacity-100 hover:scale-105'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className="w-full h-full object-cover"><rect width="3" height="2" fill="#436F4D" /><rect width="3" height="1.333" fill="#FFF" /><rect width="3" height="0.667" fill="#CD2A3E" /></svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};


// ==========================================
// 2. HERO SEKCIJA (Sa prevedenim recenzijama)
// ==========================================
const Hero = ({ lang }) => {
  const t = translations[lang];

  const getTestimonials = () => {
    if (lang === 'en') {
      return [
        { text: "Absolutely perfect vacation. The lake view takes your breath away!", author: "Marko J." },
        { text: "Spotlessly clean, modern, and just a minute from the water. Highly recommended!", author: "Jelena N." },
        { text: "True peace and quiet. The hosts were extremely kind and helpful.", author: "Stefan and Ana" }
      ];
    } else if (lang === 'hu') {
      return [
        { text: "Abszolút tökéletes nyaralás. A tóra nyíló kilátás lélegzetelállító!", author: "Marko J." },
        { text: "Ragyogóan tiszta, modern és csak egy percre a víztől. Erősen ajánlott!", author: "Jelena N." },
        { text: "Igazi béke és csend. A házigazdák rendkívül kedvesek és segítőkészek voltak.", author: "Stefan és Ana" }
      ];
    }
    return [
      { text: "Apsolutno savršen odmor. Pogled na jezero ostavlja bez daha!", author: "Marko J." },
      { text: "Besprekorno čisto, moderno i na samo minut od vode. Preporuka!", author: "Jelena N." },
      { text: "Pravi mir i tišina. Domaćini su bili izuzetno ljubazni i uslužni.", author: "Stefan i Ana" }
    ];
  };

  const testimonials = getTestimonials();

  return (
    <header className="relative min-h-[95vh] flex flex-col items-center justify-center w-full overflow-hidden pb-8 pt-24 sm:pt-32">

      <img
        src="/hero.webp"
        alt="Jezero Palić"
        fetchPriority="high"
        loading="eager"
        decoding="async"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80"></div>

      {/* Centralni sadržaj — naslov i dugme */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center h-full">
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-serif font-bold text-[#fffeeb] mb-4 leading-tight drop-shadow-2xl">
          {t.hero_title}
        </h1>
        <p className="text-[#fffeeb] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-light text-base md:text-2xl mb-10 drop-shadow-lg animate-bounce-in">
          {t.hero_subtitle}
        </p>

        <a href="#rezervacija" className="group flex items-center bg-[#FFD700]/20 hover:bg-transparent transition-all duration-300 rounded-full pl-6 pr-2 py-2 border border-[#FFD700] hover:border-[#FFD700] shadow-xl">
          <span className="font-medium text-[#fffeeb] group-hover:text-[#fffeeb] transition-colors duration-300 mr-4 text-sm sm:text-base">
            {t.btn_book}
          </span>
          <div className="w-10 h-10 bg-transparent group-hover: border border-[#FFD700] rounded-full flex items-center justify-center transition-colors duration-300">
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 ease-in-out group-hover:rotate-45" style={{ color: '#fffeeb' }} />
          </div>
        </a>


      </div>

      {/* Recenzije — donji desni ugao*/}
      <div className="block absolute bottom-8 right-10 z-10 w-80 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl shadow-2xl">
        <Swiper modules={[Autoplay]} autoplay={{ delay: 5000, disableOnInteraction: false }} loop={true} allowTouchMove={false} className="w-full">
          {testimonials.map((t_item, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="flex gap-1 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 drop-shadow-md" style={{ color: '#FFD700', fill: '#FFD700' }} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#fffeeb] text-sm font-light italic leading-relaxed">
                  "{t_item.text}"
                </p>
                <p className="text-xs font-medium uppercase tracking-wider text-[#fffeeb]" >
                  {t_item.author}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </header>
  );
};



// ==========================================
// 3. SMEŠTAJ
// ==========================================
const Accommodation = ({ lang }) => {
  const t = translations[lang];
  const amenities = [
    { icon: <Wifi className="w-5 h-5" />, text: lang === 'sr' ? "Besplatan Wi-Fi" : lang === 'en' ? "Free Wi-Fi" : "Ingyenes Wi-Fi" },
    { icon: <Car className="w-5 h-5" />, text: lang === 'sr' ? "Privatan Parking" : lang === 'en' ? "Private Parking" : "Saját parkoló" },
    { icon: <Airplay className="w-5 h-5" />, text: lang === 'sr' ? "Klima Uređaj" : lang === 'en' ? "Air Conditioning" : "Légkondicionáló" },
    { icon: <MapPin className="w-5 h-5" />, text: lang === 'sr' ? "Blizu Jezera" : lang === 'en' ? "Near the Lake" : "Tó közelében" }
  ];

  return (
    <section className="py-24 bg-[#FFFDD0]" id="smestaj">
      <div className="px-6 max-w-7xl mx-auto">
        <div className="mb-16 md:flex justify-between items-end">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2B2118] mb-4">{t.acc_title}</h2>
            <p className="text-[#2B2118] text-lg">{t.acc_desc}</p>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">

          {/* ── Apartman 1 ── */}
          <div className="bg-[#fffeeb] rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col">
            <div className="h-72 md:h-80 relative group">
              <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }} loop={true} className="w-full h-full">
                <SwiperSlide><img src="/PSlika1.webp" loading="lazy" width={800} height={600} className="w-full h-full object-cover" alt="Dnevna soba apartmana Lake Palić Apartment na Paliću" /></SwiperSlide>
                <SwiperSlide><img src="/PSlika2.webp" loading="lazy" width={800} height={600} className="w-full h-full object-cover" alt="Dnevna soba apartmana Lake Palić Apartment na Paliću" /></SwiperSlide>
                <SwiperSlide><img src="/PSlika5.webp" loading="lazy" width={800} height={600} className="w-full h-full object-cover" alt="Dnevna soba apartmana Lake Palić Apartment na Paliću" /></SwiperSlide>
              </Swiper>
              <div className="absolute top-4 right-4 z-10 bg-[#fffeeb] backdrop-blur py-1 px-3 rounded-full text-sm font-bold text-[#2B2118] shadow-sm">{t.acc_max_people}</div>
            </div>
            <div className="p-8 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-serif font-bold text-[#2B2118] mb-4">Lake Palić Apartment</h3>
                <p className="text-[#2B2118]/70 leading-relaxed mb-6">{t.acc1_desc}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                {amenities.map((item, i) => (<div key={i} className="flex items-center text-[#2B2118]/70 text-sm"><span className="text-[#2B2118]/70 mr-2">{item.icon}</span> {item.text}</div>))}
              </div>
            </div>
          </div>

          {/* ── Apartman 2 ── */}
          <div className="bg-[#fffeeb] rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col">
            <div className="h-72 md:h-80 relative group">
              <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }} loop={true} className="w-full h-full">
                <SwiperSlide><img src="/Rslika1.webp" loading="lazy" width={800} height={600} className="w-full h-full object-cover" alt="Dnevna soba apartmana Rakanović blizu jezera Palić" /></SwiperSlide>
                <SwiperSlide><img src="/Rslika3.webp" loading="lazy" width={800} height={600} className="w-full h-full object-cover" alt="Dnevna soba apartmana Rakanović blizu jezera Palić" /></SwiperSlide>
                <SwiperSlide><img src="/Rslika4.webp" loading="lazy" width={800} height={600} className="w-full h-full object-cover" alt="Dnevna soba apartmana Rakanović blizu jezera Palić" /></SwiperSlide>
                <SwiperSlide><img src="/Rslika7.webp" loading="lazy" width={800} height={600} className="w-full h-full object-cover" alt="Spavaća soba apartmana Rakanović blizu jezera Palić" /></SwiperSlide>
                <SwiperSlide><img src="/Rslika6.webp" loading="lazy" width={800} height={600} className="w-full h-full object-cover" alt="Spavaća soba apartmana Rakanović blizu jezera Palić" /></SwiperSlide>
                <SwiperSlide><img src="/Rslika5.webp" loading="lazy" width={800} height={600} className="w-full h-full object-cover" alt="Spavaća soba apartmana Rakanović blizu jezera Palić" /></SwiperSlide>
                <SwiperSlide><img src="/Rslika8.webp" loading="lazy" width={800} height={600} className="w-full h-full object-cover" alt="Kuhinja apartmana Rakanović blizu jezera Palić" /></SwiperSlide>
                <SwiperSlide><img src="/Rslika9.webp" loading="lazy" width={800} height={600} className="w-full h-full object-cover" alt="Kuhinja apartmana Rakanović blizu jezera Palić" /></SwiperSlide>
                <SwiperSlide><img src="/Rslika10.webp" loading="lazy" width={800} height={600} className="w-full h-full object-cover" alt="Kupatilo apartmana Rakanović blizu jezera Palić" /></SwiperSlide>
              </Swiper>
              <div className="absolute top-4 right-4 z-10 bg-[#fffeeb] backdrop-blur py-1 px-3 rounded-full text-sm font-bold text-[#2B2118] shadow-sm">{t.acc_max_people}</div>
            </div>
            <div className="p-8 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-serif font-bold text-[#2B2118] mb-4">Apartman Rakanović</h3>
                <p className="text-[#2B2118]/70 leading-relaxed mb-6">{t.acc2_desc}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                {amenities.map((item, i) => (<div key={i} className="flex items-center text-[#2B2118]/70 text-sm"><span className="text-[#2B2118]/70 mr-2">{item.icon}</span> {item.text}</div>))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// ==========================================
// 4. VODIČ SA MODALOM (Puna verzija - 6 mesta)
// ==========================================
const Guide = ({ lang }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const t = translations[lang];

  const getPlaces = () => {
    if (lang === 'en') {
      return [
        { name: 'Lake Palić', desc: 'Symbol of the region, ideal for long walks and relaxation.', fullDesc: 'Lake Palić is the largest natural lake in Serbia and a true oasis of peace. Surrounded by beautiful promenades, old luxury villas from the Art Nouveau period, and century-old parks.', location: 'Lajos Vermes Coast, Palić', tag: 'Nature', image: '/mesto1.webp' },
        { name: 'Palić Zoo', desc: 'Beautiful park with rich flora and fauna, perfect for families.', fullDesc: 'Not just an ordinary zoo, but a beautiful botanical park with over 270 species of trees and shrubs.', location: 'Krfska 4, Palić', tag: 'Family', image: '/mesto2.webp' },
        { name: 'Zvonko Bogdan Winery', desc: 'Enjoy premium wines and beautiful architecture.', fullDesc: 'Located just a few hundred meters from the lake, it represents a blend of modern technology and traditional architecture in the Art Nouveau style.', location: 'Kanjiški put 45, Palić', tag: 'Gastronomy', image: '/mesto3.webp' },
        { name: 'City Hall', desc: 'Masterpiece of Hungarian Art Nouveau in the center of Subotica.', fullDesc: 'Symbol of Subotica and one of the most significant architectural works in the region. Built in the early 20th century, richly decorated with Zsolnay ceramics.', location: 'Trg Slobode 1, Subotica', tag: 'Architecture', image: '/mesto4.webp' },
        { name: 'Synagogue', desc: 'One of the most beautiful and largest buildings of this type in Europe.', fullDesc: 'Subotica Synagogue, built in 1902, is the second largest in Europe. Its interior takes your breath away – painted with floral motifs.', location: 'Trg Jakaba i Komora 6, Subotica', tag: 'Culture', image: '/mesto5.webp' },
        { name: 'Raichle Palace', desc: 'A building of surreal beauty that looks like it came from a fairy tale.', fullDesc: 'Raichle Palace is probably the most photographed building in Subotica. Architect Ferenc Raichle built it as his home and architectural office.', location: 'Park Rajhl Ferenca 5, Subotica', tag: 'Art', image: '/mesto6.webp' }
      ];
    } else if (lang === 'hu') {
      return [
        { name: 'Palicsi-tó', desc: 'A régió szimbóluma, ideális hosszú sétákra és pihenésre.', fullDesc: 'A Palicsi-tó Szerbia legnagyobb természetes tava és a béke igazi oázisa. Gyönyörű sétányok, szecessziós luxusvillák és évszázados parkok veszik körül.', location: 'Lajos Vermes part, Palics', tag: 'Természet', image: '/mesto1.webp' },
        { name: 'Palicsi Állatkert', desc: 'Gyönyörű park gazdag növény- és állatvilággal, tökéletes családoknak.', fullDesc: 'Nem csak egy hétköznapi állatkert, hanem egy gyönyörű botanikus kert több mint 270 fafajjal.', location: 'Korfu utca 4, Palics', tag: 'Család', image: '/mesto2.webp' },
        { name: 'Zvonko Bogdan Pincészet', desc: 'Élvezze a prémium borokat és a gyönyörű építészetet.', fullDesc: 'Alig néhány száz méterre a tótól, a modern technológia és a hagyományos szecessziós építészet ötvözete.', location: 'Kanizsai út 45, Palics', tag: 'Gasztronómia', image: '/mesto3.webp' },
        { name: 'Városháza', desc: 'A magyar szecesszió remekműve Szabadka központjában.', fullDesc: 'Szabadka szimbóluma és a régió egyik legjelentősebb építészeti alkotása. A 20. század elején épült, Zsolnay kerámiával gazdagon díszítve.', location: 'Szabadság tér 1, Szabadka', tag: 'Építészet', image: '/mesto4.webp' },
        { name: 'Zsinagóga', desc: 'Európa egyik legszebb és legnagyobb ilyen típusú épülete.', fullDesc: 'Az 1902-ben épült szabadkai zsinagóga Európa második legnagyobbja. Belseje lélegzetelállító – virágmotívumokkal festve.', location: 'Jakab és Komor tér 6, Szabadka', tag: 'Kultúra', image: '/mesto5.webp' },
        { name: 'Raichle-palota', desc: 'Szürreális szépségű épület, amely mintha egy meséből lépett volna elő.', fullDesc: 'A Raichle-palota talán a legtöbbet fényképezett épület Szabadkán. Raichle Ferenc építész saját otthonaként és irodájaként építette.', location: 'Raichle Ferenc park 5, Szabadka', tag: 'Művészet', image: '/mesto6.webp' }
      ];
    }
    return [
      { name: 'Palićko Jezero', desc: 'Simbol regiona, idealno za duge šetnje, vožnju biciklom i potpuno opuštanje pored vode.', fullDesc: 'Palićko jezero je najveće prirodno jezero u Srbiji i prava oaza mira. Okruženo je prelepim šetalištima, starim luksuznim vilama iz perioda secesije i stoletnim parkovima.', location: 'Obala Lajoša Vermeša, Palić', tag: 'Priroda', image: '/mesto1.webp' },
      { name: 'Zoološki Vrt Palić', desc: 'Prelep park sa bogatom florom i faunom, savršen za porodični izlet i decu svih uzrasta.', fullDesc: 'Zoološki vrt na Paliću nije običan zoološki vrt – on je ujedno i prelep botanički park sa preko 270 vrsta drveća i žbunja.', location: 'Krfska 4, Palić', tag: 'Porodica', image: '/mesto2.webp' },
      { name: 'Vinarija Zvonko Bogdan', desc: 'Uživajte u vrhunskim vinima i prelepoj arhitekturi inspirisanoj tradicionalnim panonskim stilom.', fullDesc: 'Smeštena na samo nekoliko stotina metara od jezera, Vinarija Zvonko Bogdan predstavlja spoj najmodernije tehnologije i tradicionalne arhitekture u stilu secesije.', location: 'Kanjiški put 45, Palić', tag: 'Gastronomija', image: '/mesto3.webp' },
      { name: 'Gradska Kuća', desc: 'Remek-delo mađarske secesije u samom centru Subotice sa prelepim vidikovcem na vrhu.', fullDesc: 'Simbol Subotice i jedno od najznačajnijih arhitektonskih dela u regionu. Sagrađena početkom 20. veka, bogato je ukrašena Žolnai keramikom, vitražima i drvoredima.', location: 'Trg Slobode 1, Subotica', tag: 'Arhitektura', image: '/mesto4.webp' },
      { name: 'Sinagoga', desc: 'Jedna od najlepših i najvećih građevina ovog tipa u Evropi, nedavno potpuno restaurirana.', fullDesc: 'Subotička Sinagoga, izgrađena 1902. godine, druga je po veličini u Evropi. Njena unutrašnjost oduzima dah – obojena je floralnim motivima u stilu mađarske secesije.', location: 'Trg Jakaba i Komora 6, Subotica', tag: 'Kultura', image: '/mesto5.webp' },
      { name: 'Palata Rajhl', desc: 'Zgrada nestvarne lepote koja izgleda kao iz bajke, danas dom Savremene galerije Subotice.', fullDesc: 'Palata Rajhl je verovatno najfotografisanija zgrada u Subotici. Izgradio ju je arhitekta Ferenc Rajhl kao svoj dom i arhitektonski biro.', location: 'Park Rajhl Ferenca 5, Subotica', tag: 'Umetnost', image: '/mesto6.webp' }
    ];
  };

  const places = getPlaces();

  return (
    <section className="bg-[#FFFDD0] py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2B2118] mb-4">{t.guide_title}</h2>
          <div className="w-24 h-1 bg-[#2B2118] mx-auto rounded-full mb-6"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {places.map((place, index) => (
            <div key={index} onClick={() => setSelectedPlace(place)} className="bg-[#fffeeb] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group flex flex-col h-full cursor-pointer">
              <div className="h-56 w-full relative overflow-hidden bg-slate-200">
                <div className="absolute top-4 left-4 z-10"><span className="text-xs font-bold text-[#2B2118] bg-[#FFD700] backdrop-blur px-3 py-1.5 rounded-full uppercase tracking-wider">{place.tag}</span></div>
                {/* ✅ loading="lazy", width, height dodati */}
                <img
                  src={place.image}
                  alt={place.name}
                  loading="lazy"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-bold font-serif text-2xl text-[#2B2118] mb-3 group-hover:text-[#2B2118]/50 transition-colors">{place.name}</h3>
                <p className="text-[#2B2118] text-sm leading-relaxed mb-4 flex-1">{place.desc}</p>
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center text-[#2B2118] text-sm font-semibold group-hover:gap-2 transition-all">{t.guide_btn} <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPlace && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#fffeeb] w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
            {/* ✅ aria-label dodat na close button */}
            <button
              onClick={() => setSelectedPlace(null)}
              aria-label="Zatvori modal"
              className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-md transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <div className="h-64 sm:h-80 w-full relative shrink-0">
              {/* ✅ loading="lazy", width, height dodati na modal sliku */}
              <img
                src={selectedPlace.image}
                alt={selectedPlace.name}
                loading="lazy"
                width={800}
                height={500}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 md:left-10 text-white">
                <span className="text-xs font-bold text-[#2B2118] bg-[#FFD700] px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">{selectedPlace.tag}</span>
                <h3 className="text-4xl md:text-5xl font-serif font-bold">{selectedPlace.name}</h3>
              </div>
            </div>
            <div className="p-6 md:p-10 overflow-y-auto">
              <div className="flex items-center text-[#2B2118] font-medium mb-6 bg-[#fffeeb] p-4 rounded-xl border border-[#FFD700]">
                <MapPin className="w-5 h-5 text-[#2B2118] mr-3" /><span>{selectedPlace.location}</span>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedPlace.name + ' ' + selectedPlace.location)}`} target="_blank" rel="noreferrer" className="ml-auto text-sm text-[#2B2118] hover:underline font-semibold">{t.guide_modal_map}</a>
              </div>
              <h4 className="text-xl font-bold text-[#2B2118] mb-3">{t.guide_modal_about}</h4>
              <p className="text-[#2B2118] leading-relaxed text-lg">{selectedPlace.fullDesc}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};


// ==========================================
// 5. FAQ SEKCIJA
// ==========================================

// (AccordionItem)
const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-xl mb-4 bg-[#fffeeb] overflow-hidden transition-all duration-300 hover:shadow-sm">
      <button onClick={() => setIsOpen(!isOpen)} className="flex w-full justify-between items-center text-left px-6 py-5 focus:outline-none">
        <h3 className="font-medium text-lg text-[#2B2118] pr-8">{title}</h3>
        <Plus className={`w-5 h-5 text-[#2B2118] shrink-0 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-45' : ''}`} />
      </button>
      <div className={`transition-all duration-300 ease-in-out px-6 ${isOpen ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 py-0 opacity-0'}`}>
        <p className="text-[#2B2118] text-sm leading-relaxed">{content}</p>
      </div>
    </div>
  );
};

// FAQ SEKCIJA (Sa 6 pitanja)
const FAQ = ({ lang }) => {
  const t = translations[lang];

  const getFaqs = () => {
    if (lang === 'en') {
      return [
        { q: "What are the payment methods?", a: "Payment is made upon arrival in cash, or in advance via bank transfer. We are introducing card payments soon." },
        { q: "Can I cancel or change my reservation?", a: "Yes, you can cancel your reservation for free up to 7 days before your planned arrival. After that period, we retain the deposit." },
        { q: "What is the check-in and check-out time?", a: "Check-in is possible from 14:00h, while check-out is strictly by 10:00h on the day of departure." },
        { q: "Is there parking available for guests?", a: "Absolutely. Each apartment has a guaranteed, free, and secure parking space in the courtyard." },
        { q: "Do the apartments have Wi-Fi and air conditioning?", a: "All our apartments are equipped with fast optical internet and modern air conditioning units without extra charge." },
        { q: "Are bed linen and towels provided?", a: "Yes, clean bed linen, towels, and basic cosmetics (shampoo, soap) will be waiting for you in the apartment." }
      ];
    } else if (lang === 'hu') {
      return [
        { q: "Milyen fizetési módok vannak?", a: "A fizetés érkezéskor készpénzben történik, vagy előre banki átutalással. Hamarosan bevezetjük a kártyás fizetést is." },
        { q: "Módosíthatom vagy lemondhatom a foglalást?", a: "Igen, a foglalás ingyenesen lemondható az érkezés előtt 7 nappal. Ezen időszak után a foglalót megtartjuk." },
        { q: "Mikor van a bejelentkezés (check-in) és a kijelentkezés (check-out)?", a: "A bejelentkezés 14:00 órától lehetséges, míg a kijelentkezés az indulás napján legkésőbb 10:00 óráig történik." },
        { q: "Van parkolási lehetőség a vendégek számára?", a: "Abszolút. Minden apartmanhoz biztosított, ingyenes és biztonságos parkolóhely tartozik az udvarban." },
        { q: "Van az apartmanokban Wi-Fi és légkondicionáló?", a: "Minden apartmanunk gyors optikai internettel és modern légkondicionálókkal van felszerelve, felár nélkül." },
        { q: "Biztosítanak ágyneműt és törölközőt?", a: "Igen, tiszta ágynemű, törölközők és alapvető kozmetikumok (sampon, szappan) várják Önt az apartmanban." }
      ];
    }
    return [
      { q: "Koji su načini plaćanja?", a: "Plaćanje se vrši prilikom dolaska u apartman u gotovini, ili unapred uplatom na tekući račun. Uskoro uvodimo i plaćanje karticama." },
      { q: "Da li je moguće otkazati ili promeniti rezervaciju?", a: "Da, rezervaciju je moguće besplatno otkazati do 7 dana pre planiranog dolaska. Nakon tog perioda zadržavamo depozit." },
      { q: "Koje je vreme prijave (check-in) i odjave (check-out)?", a: "Prijavljivanje u apartman je moguće od 14:00h, dok je odjavljivanje najkasnije do 10:00h ujutru na dan odlaska." },
      { q: "Da li je obezbeđen parking za goste?", a: "Apsolutno. Svaki apartman ima obezbeđeno, besplatno i sigurno parking mesto u dvorištu objekta." },
      { q: "Da li apartmani imaju Wi-Fi i klimu?", a: "Svi naši apartmani su opremljeni brzim optičkim internetom i modernim klima uređajima bez dodatne doplate." },
      { q: "Da li je posteljina i peškiri obezbeđeni?", a: "Da, čista posteljina, peškiri, kao i osnovna kozmetika (šampon, sapun) vas čekaju u apartmanu." }
    ];
  };

  const faqs = getFaqs();

  return (
    <section className="py-24 bg-[#FFFDD0]">
      <div className="px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-8">
          <div className="lg:col-span-5 flex flex-col items-start">
            <span className="bg-[#FFD700] text-[#2B2118] text-xs font-semibold px-3 py-1 rounded-full mb-6">{t.faq_badge}</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#2B2118] mb-6 leading-tight whitespace-pre-line">{t.faq_title}</h2>
            <p className="text-[#2B2118] text-lg mb-10 max-w-md">{t.faq_desc}</p>
            <a href="#rezervacija" className="group flex items-center bg-transparent border border-[#FFD700] hover:bg-[#2B2118] transition-colors duration-300 rounded-full pl-6 pr-2 py-2">
              <span className="font-medium text-[#2B2118] group-hover:text-white transition-colors duration-300 mr-4">{t.btn_contact}</span>
              <div className="w-10 h-10 bg-[#FFD700] group-hover:bg-[#fffeeb] rounded-full flex items-center justify-center transition-colors duration-300">
                <ArrowUpRight className="w-5 h-5 text-[#fffeeb] group-hover:text-[#2B2118] transition-transform duration-300 ease-in-out group-hover:rotate-45" />
              </div>
            </a>
          </div>
          <div className="lg:col-span-7">
            {faqs.map((faq, idx) => (<AccordionItem key={idx} title={faq.q} content={faq.a} />))}
          </div>
        </div>
      </div>
    </section>
  );
};


// ==========================================
// 5.5 KONTAKT FORMA
// ==========================================
const ContactForm = ({ lang }) => {
  const [status, setStatus] = useState("idle");
  const t = translations[lang];

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");
    const form = e.target;
    const formData = new FormData(form);
    fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(formData).toString() })
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"));
  };

  return (
    <section className="bg-[#FFFDD0] py-24 px-6 relative" id="rezervacija">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="bg-[#FFD700] text-[#2B2118] text-xs font-bold px-4 py-1.5 rounded-full mb-4 inline-block uppercase tracking-wider">{t.form_badge}</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2B2118] mb-4">{t.form_title}</h2>
          <p className="text-[#2B2118] text-lg">{t.form_desc}</p>
        </div>
        <div className="bg-[#fffeeb] p-8 md:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 min-h-[400px] flex flex-col justify-center">
          {status === "success" ? (
            <div className="text-center animate-fade-in flex flex-col items-center py-10">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"><svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
              <h3 className="text-3xl font-serif font-bold text-slate-900 mb-4">{t.form_success_title}</h3>
              <p className="text-slate-600 text-lg max-w-md mx-auto">{t.form_success_desc}</p>
              <button onClick={() => setStatus("idle")} className="mt-8 text-blue-600 font-medium hover:text-blue-800 transition-colors underline">{t.form_success_btn}</button>
            </div>
          ) : (
            <form className={`space-y-6 transition-opacity duration-300 ${status === "submitting" ? "opacity-50 pointer-events-none" : "opacity-100"}`} name="rezervacija" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit}>
              <input type="hidden" name="form-name" value="rezervacija" />
              <p className="hidden"><input name="bot-field" /></p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2"><label htmlFor="ime" className="text-sm font-semibold text-[#2B2118] ml-1">{t.form_name}</label><input type="text" id="ime" name="ime" required className="w-full bg-[#fffeeb] border border-[#FFD700] rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 outline-none" /></div>
                <div className="space-y-2"><label htmlFor="prezime" className="text-sm font-semibold text-[#2B2118] ml-1">{t.form_surname}</label><input type="text" id="prezime" name="prezime" className="w-full bg-[#fffeeb] border border-[#FFD700] rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 outline-none" /></div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2"><label htmlFor="email" className="text-sm font-semibold text-[#2B2118] ml-1">{t.form_email}</label><input type="email" id="email" name="email" required className="w-full bg-[#fffeeb] border border-[#FFD700] rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 outline-none" /></div>
                <div className="space-y-2"><label htmlFor="telefon" className="text-sm font-semibold text-[#2B2118] ml-1">{t.form_phone}</label><input type="tel" id="telefon" name="telefon" className="w-full bg-[#fffeeb] border border-[#FFD700] rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 outline-none" /></div>
              </div>
              <div className="space-y-2"><label htmlFor="poruka" className="text-sm font-semibold text-[#2B2118] ml-1">{t.form_message}</label><textarea id="poruka" name="poruka" required rows="4" className="w-full bg-[#fffeeb] border border-[#FFD700] rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none"></textarea></div>
              <div className="pt-4 flex justify-end">
                <button type="submit" disabled={status === "submitting"} className="group flex items-center bg-[#2B2118] hover:bg-[#fffeeb] border border-[#FFD700] transition-colors duration-300 rounded-full pl-8 pr-2 py-2 shadow-lg disabled:opacity-70">
                  <span className="font-medium text-[#FFD700] group-hover:text-[#2B2118] mr-4">{status === "submitting" ? t.form_sending : t.form_btn}</span>
                  <div className="w-10 h-10 bg-[#FFD700] border border-[#FFD700] rounded-full flex items-center justify-center transition-colors"><ArrowUpRight className="w-5 h-5 text-[#2B2118] group-hover:text-slate-900 transition-transform group-hover:rotate-45" /></div>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 6. SCROLL TO TOP DUGME
// ==========================================
const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <button type="button" onClick={scrollToTop} className={["fixed bottom-6 right-6 z-50 group w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#2B2118] hover:bg-[#2B2118] shadow-xl flex items-center justify-center transition-all duration-500 ease-in-out focus:outline-none border border-[#FFD700]", visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-8 pointer-events-none"].join(" ")}>
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors duration-300">
        <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-[#FFD700] group-hover:text-[#FFD700] transition-transform duration-300 ease-in-out group-hover:-rotate-45" />
      </div>
    </button>
  );
};



// ==========================================
// 7. CHAT DUGMIĆI (WhatsApp & Viber)
// ==========================================
const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "38162228034";
  const viberNumber = "+38162228034";
  return (
    <div className="fixed bottom-6 left-6 z-[999] flex flex-col items-center gap-3 pointer-events-none">
      <div className={`flex flex-col gap-3 transition-all duration-300 origin-bottom pointer-events-auto ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-10 pointer-events-none'}`}>
        {/* VIBER */}
        <a
          href={`viber://chat?number=${viberNumber}`}
          className="w-12 h-12 bg-[#7360f2] hover:bg-[#5e4bcf] rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 group relative"
          aria-label="Viber"
        >
          {/* SIMPLIFIKOVANA I ZADEBLJANA VIBER IKONICA */}
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.6 11.23c0-4.63-4.08-8.4-9.1-8.4S3.4 6.6 3.4 11.23c0 2.66 1.34 5.03 3.44 6.54l-1.3 3.65a.65.65 0 0 0 .84.81l4.03-1.38a10.1 10.1 0 0 0 2.09.22c5.02 0 9.1-3.77 9.1-8.4zm-4.7 3.52c-.37.77-1.1.98-1.57 1.05-.58.09-1.28-.15-2.6-.74-1.63-.73-3.17-2.1-4.05-3.32-.88-1.22-1.36-2.58-1.2-3.83.08-.66.52-1.2 1.12-1.42.54-.2 1.04-.15 1.35.33.24.37.66 1.48.81 1.83.2.44.07.82-.19 1.13-.19.23-.39.42-.56.63-.12.16-.25.33-.12.63.53 1.18 1.43 2.15 2.5 2.76.27.15.43.15.6-.02.2-.21.4-.44.64-.67.33-.31.7-.35 1.08-.18.39.17 1.48.71 1.83.89.37.2.45.54.31.93zm-1.85-6.8a3.17 3.17 0 0 0-2.33-2.32c-.31-.07-.5-.35-.43-.65.07-.3.35-.48.65-.43a4.43 4.43 0 0 1 3.25 3.24c.07.29-.12.58-.42.65-.3.07-.58-.1-.65-.4zm.8 1.85a1.86 1.86 0 0 0-1.35-1.35c-.32-.07-.5-.38-.43-.68.07-.31.37-.5.68-.43a3.13 3.13 0 0 1 2.27 2.26c.07.31-.11.61-.42.68-.31.06-.6-.1-.68-.4z" />
          </svg>
          <span className="absolute left-full ml-3 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">Viber</span>
        </a>


        <a href={`https://wa.me/${phoneNumber}?text=Poštovani, zanima me smeštaj u vašem apartmanu.`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#25D366] hover:bg-[#128C7E] rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 group relative" aria-label="WhatsApp">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.405-.883-.733-1.48-1.638-1.653-1.935-.173-.298-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
          <span className="absolute left-full ml-3 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">WhatsApp</span>
        </a>
      </div>
      <button onClick={() => setIsOpen(!isOpen)} className="w-14 h-14 bg-[#2B2118] hover:bg-[#2B2118] rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-105 pointer-events-auto border border-[#FFD700]">
        {isOpen ? (
          <svg className="w-6 h-6" style={{ color: '#FFD700' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" style={{ color: '#FFD700' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

    </div>
  );
};

// ==========================================
// 8. FOOTER
// ==========================================
const Footer = ({ lang }) => {
  const t = translations[lang];
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 px-6" id="kontakt">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 mb-16">
        <div>
          <h2 className="text-4xl font-serif font-bold text-white mb-6">{t.footer_title}</h2>
          <p className="text-slate-400 max-w-md mb-8">{t.form_desc}</p>
          <div className="space-y-4">
            <a href="tel:+38162228034" className="flex items-center text-lg hover:text-white transition group">
              <span className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-600 transition"><Phone className="w-5 h-5 text-white" /></span>
              +381 62 228 034
            </a>
            <a href="mailto:lakepalicapt@gmail.com" className="flex items-center text-lg hover:text-white transition group">
              <span className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-600 transition"><Mail className="w-5 h-5 text-white" /></span>
              lakepalicapt@gmail.com
            </a>
          </div>
        </div>
        <div className="bg-slate-800 p-8 rounded-3xl flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-white mb-2">{t.footer_location}</h3>
          <p className="text-slate-400 mb-6 flex items-center"><MapPin className="w-5 h-5 mr-2" />Kanjiški put 17b, Palić, Srbija</p>
          <div className="h-56 md:h-64 bg-slate-700 rounded-xl overflow-hidden shadow-inner">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2766.584779375152!2d19.76222137587712!3d46.09925339084416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4743617c48e792a7%3A0x7bbd7cfb05637bb7!2sLake%20Pali%C4%87%20Apartment!5e0!3m2!1sen!2srs!4v1772964410305!5m2!1sen!2srs" width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Google Mapa"></iframe>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} Lake Palić Apartments. Sva prava zadržana.</p>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="relative group flex items-center justify-center">
            <a href="#" className="p-2 bg-slate-800/50 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white transition-all duration-300"><Code2 className="w-4 h-4" /></a>
            <div className="absolute bottom-full right-0 mb-3 w-max px-3 py-2 bg-slate-800 text-white text-xs font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-xl border border-slate-700 pointer-events-none transform translate-y-2 group-hover:translate-y-0 z-50">
              Dizajn i izrada: Ignjatije
              <div className="absolute -bottom-1 right-3.5 w-2 h-2 bg-slate-800 border-b border-r border-slate-700 transform rotate-45"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ==========================================
// GLAVNA APLIKACIJA
// ==========================================
export default function App() {
  const [lang, setLang] = useState('sr');

  return (
    <div className="font-sans text-slate-800 bg-white selection:bg-blue-200 selection:text-blue-900 scroll-smooth">
      <Navbar lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <Accommodation lang={lang} />
      <Guide lang={lang} />
      <FAQ lang={lang} />
      <ContactForm lang={lang} />
      <Footer lang={lang} />
      <ScrollToTopButton />
      <FloatingChat />
    </div>
  );
}
