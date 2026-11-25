# MedoMed – landing stranica za malog proizvođača meda

Seminarski rad: jednostranična web stranica (landing page) za **MedoMed**, izmišljenog malog proizvođača meda koji prodaje direktno kupcima. Stranica je napravljena isključivo u **HTML-u, CSS-u i JavaScriptu**, bez frameworka i bez servera.

Stranica je izrađena uz pomoć **[Claude Code](https://claude.com/claude-code)** (AI asistent za programiranje), uz dodatne skillove za dizajn i provjeru koda (Impeccable, Taste Skill, Ponytail).

## Pokretanje

Nije potrebna instalacija. Dovoljno je otvoriti `index.html` u pregledniku.
Za animacije je potreban internet, jer se biblioteka GSAP i fontovi učitavaju sa CDN-a. Bez interneta stranica i dalje radi, samo bez animacija.

## Koncept: „špajz“

Stranica izgleda kao kućna ostava (špajz): zid okrečen krečom, drvena polica sa teglama meda i ručno pisane ceduljice. Kroz stranicu se mijenja „svjetlo dana“, od jutarnjeg na početku do večernjeg (tamnog) dijela sa korpom.

Korištena paleta boja (zadana):

| Boja | Hex | Gdje se koristi |
|---|---|---|
| Sunflower Gold | `#ffc971` | bagremov med |
| Amber Flame | `#ffb627` | suncokretov med, glavna dugmad u korpi |
| Deep Saffron | `#ff9505` | livadski med, dugmad „Dodaj“ |
| Autumn Leaf | `#e2711d` | planinski med |
| Bronze Spice | `#cc5803` | šumski med, naglasci u tekstu |

Fontovi: **Gloock** (naslovi), **Commissioner** (tekst), **Patrick Hand** (ručno pisane etikete).

## Dijelovi stranice

1. **Polica** – pet tegli meda nacrtanih u SVG-u, svaka u jednoj boji palete. Ispod svake visi ceduljica sa podacima (kad cvjeta paša, koliko brzo med kristalizira) i dugmetom **Dodaj**. Klik na teglu ili dugme dodaje je u korpu, a kapljica meda „odleti“ do korpe u zaglavlju.
2. **Pašni kalendar** – tabela od aprila do septembra koja pokazuje kad cvjeta paša za svaku vrstu meda i kakav je med po okusu.
3. **„Zašećerio se? Tako i treba.“** – klizač na kojem se vidi kako med kristalizira kroz mjesece, i najčešća pitanja (kako vratiti med u tečno stanje, kako ga čuvati, zašto je šumski med taman, smiju li djeca jesti med). Pitanja se otvaraju uz animaciju.
4. **Korpa** – izbor veličine tegle (0,5 kg / 1 kg) i količine, forma sa provjerom podataka. Stranica od korpe i podataka složi tekst narudžbe, koji kupac pošalje emailom ili kopira u Viber/WhatsApp. Korpa se pamti u pregledniku (`localStorage`).
5. **Podnožje** – kontakt podaci.

**Medo:** mali stidljivi medvjedić („medo“) krije se na četiri mjesta na stranici. Izviri kad dođeš do njegove sekcije, a sakrije se kad mu priđeš mišem.

## Struktura projekta

```
index.html      – sadržaj i struktura stranice
css/style.css   – svi stilovi (paleta, raspored, responzivnost, animacije u CSS-u)
js/main.js      – tegle, kalendar, korpa, forma i animacije (GSAP)
img/krec.svg    – tekstura krečnog zida
PRODUCT.md      – kratak opis proizvoda i dogovorenih odluka (radni dokument za dizajn)
```

## Tehnički detalji

- **Responzivno:** radi na desktopu, tabletu i mobitelu; na mobitelu se polica pomjera prstom lijevo-desno.
- **Pristupačnost:** navigacija tastaturom, vidljiv fokus, oznake za čitače ekrana, poštuje se postavka „smanjeno kretanje“ (tada nema animacija).
- **Animacije:** biblioteka [GSAP](https://gsap.com/) sa dodatkom ScrollTrigger (točenje meda u tegle, kapljica do korpe, otvaranje pitanja, kalendar, medvjedić).
- **Bez servera:** narudžba se ne šalje automatski; kupac je šalje sam emailom ili porukom.

## Napomena

MedoMed je izmišljen za potrebe seminarskog rada. Kontakt podaci (telefon, email, adresa) su privremeni i nisu stvarni.
