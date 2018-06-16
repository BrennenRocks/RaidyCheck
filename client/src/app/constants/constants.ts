export const DOMAIN: string = 'http://localhost:8080'; //'http://localhost:8080' for dev. '' for production.
export const REALMS: Array<{ id: number, realm: string }> = [
  { id: 0, realm: "Aegwynn" }, { id: 1, realm: "Aerie Peak" }, { id: 2, realm: "Agamaggan" }, { id: 3, realm: "Aggramar" }, { id: 4, realm: "Akama" }, { id: 5, realm: "Alexstrasza" }, { id: 6, realm: "Alleria" }, { id: 7, realm: "Altar of Storms" }, { id: 8, realm: "Alterac Mountains" },
  { id: 9, realm: "Aman'Thul" }, { id: 10, realm: "Andorhal" }, { id: 11, realm: "Anetheron" }, { id: 12, realm: "Antonidas" }, { id: 13, realm: "Anub'arak" }, { id: 14, realm: "Anvilmar" }, { id: 15, realm: "Arathor" }, { id: 16, realm: "Archimonde" }, { id: 17, realm: "Area 52" }, { id: 18, realm: "Argent Dawn" }, { id: 19, realm: "Arthas" },
  { id: 20, realm: "Arygos" }, { id: 21, realm: "Auchindoun" }, { id: 22, realm: "Azgalor" }, { id: 23, realm: "Azjol-Nerub" }, { id: 24, realm: "Azralon" }, { id: 25, realm: "Azshara" }, { id: 26, realm: "Azuremyst" }, { id: 27, realm: "Baelgun" }, { id: 28, realm: "Balnazzar" }, { id: 29, realm: "Barthilas" },
  { id: 30, realm: "Black Dragonflight" }, { id: 31, realm: "Blackhand" }, { id: 32, realm: "Blackrock" }, { id: 33, realm: "Blackwater Raiders" }, { id: 34, realm: "Blackwing Lair" }, { id: 35, realm: "Blade's Edge" }, { id: 36, realm: "Bladefist" }, { id: 37, realm: "Bleeding Hollow" },
  { id: 38, realm: "Blood Furnace" }, { id: 39, realm: "Bloodhoof" }, { id: 40, realm: "Bloodscalp" }, { id: 41, realm: "Bonechewer" }, { id: 42, realm: "Borean Tundra" }, { id: 43, realm: "Boulderfist" }, { id: 44, realm: "Bronzebeard" }, { id: 45, realm: "Burning Blade" }, { id: 46, realm: "Burning Legion" },
  { id: 47, realm: "Caelestrasz" }, { id: 48, realm: "Cairne" }, { id: 49, realm: "Cenarion Circle" }, { id: 50, realm: "Cenarius" }, { id: 51, realm: "Cho'gall" }, { id: 52, realm: "Chromaggus" }, { id: 53, realm: "Coilfang" }, { id: 54, realm: "Crushridge" }, { id: 55, realm: "Daggerspine" }, { id: 56, realm: "Dalaran" },
  { id: 57, realm: "Dalvengyr" }, { id: 58, realm: "Dark Iron" }, { id: 59, realm: "Darkspear" }, { id: 60, realm: "Darrowmere" }, { id: 61, realm: "Dath'Remar" }, { id: 62, realm: "Dawnbringer" }, { id: 63, realm: "Deathbringer" }, { id: 64, realm: "Deathwing" }, { id: 65, realm: "Demon Soul" }, { id: 66, realm: "Dentarg" },
  { id: 67, realm: "Destromath" }, { id: 68, realm: "Dethecus" }, { id: 69, realm: "Detheroc" }, { id: 70, realm: "Doomhammer" }, { id: 71, realm: "Draenor" }, { id: 72, realm: "Dragonblight" }, { id: 73, realm: "Dragonmaw" }, { id: 74, realm: "Drak'Tharon" }, { id: 75, realm: "Drak'thul" }, { id: 76, realm: "Draka" }, { id: 77, realm: "Drakkari" },
  { id: 78, realm: "Dreadmaul" }, { id: 79, realm: "Drenden" }, { id: 80, realm: "Durotan" }, { id: 81, realm: "Duskwood" }, { id: 82, realm: "Earthen Ring" }, { id: 83, realm: "Echo Isles" }, { id: 84, realm: "Eitrigg" }, { id: 85, realm: "Eldre'Thalas" }, { id: 86, realm: "Elune" }, { id: 87, realm: "Emerald Dream" }, { id: 88, realm: "Eonar" },
  { id: 89, realm: "Eredar" }, { id: 90, realm: "Executus" }, { id: 91, realm: "Exodar" }, { id: 92, realm: "Farstriders" }, { id: 93, realm: "Feathermoon" }, { id: 94, realm: "Fenris" }, { id: 95, realm: "Firetree" }, { id: 96, realm: "Fizzcrank" }, { id: 97, realm: "Frostmane" }, { id: 98, realm: "Frostmourne" }, { id: 99, realm: "Frostwolf" },
  { id: 100, realm: "Galakrond" }, { id: 101, realm: "Gallywix" }, { id: 102, realm: "Garithos" }, { id: 103, realm: "Garona" }, { id: 104, realm: "Garrosh" }, { id: 105, realm: "Ghostlands" }, { id: 106, realm: "Gilneas" }, { id: 107, realm: "Gnomeregan" }, { id: 108, realm: "Goldrinn" }, { id: 109, realm: "Gorefiend" }, { id: 110, realm: "Gorgonnash" },
  { id: 111, realm: "Greymane" }, { id: 112, realm: "Grizzly Hills" }, { id: 113, realm: "Gul'dan" }, { id: 114, realm: "Gundrak" }, { id: 115, realm: "Gurubashi" }, { id: 116, realm: "Hakkar" }, { id: 117, realm: "Haomarush" }, { id: 118, realm: "Hellscream" }, { id: 119, realm: "Hydraxis" }, { id: 120, realm: "Hyjal" }, { id: 121, realm: "Icecrown" },
  { id: 122, realm: "Illidan" }, { id: 123, realm: "Jaedenar" }, { id: 124, realm: "Jubei'Thos" }, { id: 125, realm: "Kael'thas" }, { id: 126, realm: "Kalecgos" }, { id: 127, realm: "Kargath" }, { id: 128, realm: "Kel'Thuzad" }, { id: 129, realm: "Khadgar" }, { id: 130, realm: "Khaz Modan" }, { id: 131, realm: "Khaz'goroth" }, { id: 132, realm: "Kil'Jaeden" },
  { id: 133, realm: "Kilrogg" }, { id: 134, realm: "Kirin Tor" }, { id: 135, realm: "Korgath" }, { id: 136, realm: "Korialstrasz" }, { id: 137, realm: "Kul Tiras" }, { id: 138, realm: "Laughing Skull" }, { id: 139, realm: "Lethon" }, { id: 140, realm: "Lightbringer" }, { id: 141, realm: "Lightning's Blade" },
  { id: 142, realm: "Lightninghoof" }, { id: 143, realm: "Llane" }, { id: 144, realm: "Lothar" }, { id: 145, realm: "Madoran" }, { id: 146, realm: "Maelstrom" }, { id: 147, realm: "Magtheridon" }, { id: 148, realm: "Maiev" }, { id: 149, realm: "Mal'Ganis" }, { id: 150, realm: "Malfurion" }, { id: 151, realm: "Malorne" }, { id: 152, realm: "Malygos" },
  { id: 153, realm: "Mannoroth" }, { id: 154, realm: "Medivh" }, { id: 155, realm: "Misha" }, { id: 156, realm: "Mok'Nathal" }, { id: 157, realm: "Moon Guard" }, { id: 158, realm: "Moonrunner" }, { id: 159, realm: "Mug'thol" }, { id: 160, realm: "Muradin" }, { id: 161, realm: "Nagrand" }, { id: 162, realm: "Nathrezim" }, { id: 163, realm: "Nazgrel" },
  { id: 164, realm: "Nazjatar" }, { id: 165, realm: "Nemesis" }, { id: 166, realm: "Ner'zhul" }, { id: 167, realm: "Nesingwary" }, { id: 168, realm: "Nordrassil" }, { id: 169, realm: "Norgannon" }, { id: 170, realm: "Onyxia" }, { id: 171, realm: "Perenolde" }, { id: 172, realm: "Proudmoore" }, { id: 173, realm: "Quel'Thalas" }, { id: 174, realm: "Quel'dorei" },
  { id: 175, realm: "Rangnaros" }, { id: 176, realm: "Ravencrest" }, { id: 177, realm: "Ravenholdt" }, { id: 178, realm: "Rexxar" }, { id: 179, realm: "Rivendare" }, { id: 180, realm: "Runetotem" }, { id: 181, realm: "Sargeras" }, { id: 182, realm: "Saurfang" }, { id: 183, realm: "Scarlet Crusade" }, { id: 184, realm: "Scilla" }, { id: 185, realm: "Sen'jin" },
  { id: 186, realm: "Sentinels" }, { id: 187, realm: "Shadow Council" }, { id: 188, realm: "Shadowmoon" }, { id: 189, realm: "Shadowsong" }, { id: 190, realm: "Shandris" }, { id: 191, realm: "Shattered Halls" }, { id: 192, realm: "Shattered Hand" }, { id: 193, realm: "Shu'halo" }, { id: 194, realm: "Silver Hand" },
  { id: 195, realm: "Silvermoon" }, { id: 196, realm: "Sisters of Elune" }, { id: 197, realm: "Skullcrusher" }, { id: 198, realm: "Skywall" }, { id: 199, realm: "Smoderthorn" }, { id: 200, realm: "Spinebreaker" }, { id: 201, realm: "Spirestone" }, { id: 202, realm: "Staghelm" }, { id: 203, realm: "Steamwheedle Cartel" },
  { id: 204, realm: "Stonemaul" }, { id: 205, realm: "Stormrage" }, { id: 206, realm: "Stormreaver" }, { id: 207, realm: "Stormscale" }, { id: 208, realm: "Suramar" }, { id: 209, realm: "Tanaris" }, { id: 210, realm: "Terenas" }, { id: 211, realm: "Terokkar" }, { id: 212, realm: "Thaurissan" }, { id: 213, realm: "The Forgotten Coast" },
  { id: 214, realm: "The Scryers" }, { id: 215, realm: "The Underbog" }, { id: 216, realm: "The Venture Co" }, { id: 217, realm: "Thorium Brotherhood" }, { id: 218, realm: "Thrall" }, { id: 219, realm: "Thunderhorn" }, { id: 220, realm: "Thunderlord" }, { id: 221, realm: "Tichondrius" }, { id: 222, realm: "Tol Barad" },
  { id: 223, realm: "Tortheldrin" }, { id: 224, realm: "Trollbane" }, { id: 225, realm: "Turalyon" }, { id: 226, realm: "Twisting Nether" }, { id: 227, realm: "Uldaman" }, { id: 228, realm: "Uldum" }, { id: 229, realm: "Undermine" }, { id: 230, realm: "Ursin" }, { id: 231, realm: "Uther" }, { id: 232, realm: "Vashj" }, { id: 233, realm: "Vek'nilash" }, { id: 234, realm: "Velen" },
  { id: 235, realm: "Warsong" }, { id: 236, realm: "Whisperwind" }, { id: 237, realm: "Wildhammer" }, { id: 238, realm: "Windrunner" }, { id: 239, realm: "Winterhoof" }, { id: 240, realm: "Wyrmrest Accord" }, { id: 241, realm: "Ysera" }, { id: 242, realm: "Ysondre" }, { id: 243, realm: "Zul'jin" }, { id: 244, realm: "Zuluhed" }
];

export const SLOTS: Array<String> = [
  "Head", "Neck", "Shoulder", "Back", "Chest", "Wrist", "Hands", "Waist", "Legs", "Feet", "Finger1", "Finger2", "Trinket1", "Trinket2", "MainHand", "OffHand"
];

export const ITEM_QUALITIES = {
  "0": "poor",
  "1": "common",
  "2": "uncommon",
  "3": "rare",
  "4": "epic",
  "5": "legendary",
  "6": "artifact",
  "7": "heirloom"
};

export const REGIONS = [
  'EU',
  'US'
];