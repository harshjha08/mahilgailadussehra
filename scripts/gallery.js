
/* ── THEME ── */
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const savedTheme = localStorage.getItem('mgd-theme') || 'light';
html.setAttribute('data-theme', savedTheme);
themeIcon.className = savedTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
themeToggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('mgd-theme', next);
  themeIcon.className = next === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
});

/* ── MOBILE NAV ── */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('show');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
});

/* ── NAVBAR SHADOW ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 20 ? '0 2px 20px rgba(139,0,0,0.12)' : 'none';
}, { passive: true });

const galleryData = {

    dussehra2025: {

        title: "दशहरा 2025",

        images: [
            "../assets/dussehra 2025/dussehra2501.jpeg",
            "../assets/dussehra 2025/dussehra2502.jpeg",
            "../assets/dussehra 2025/dussehra2503.jpeg",
            "../assets/dussehra 2025/dussehra2504.jpeg",
            "../assets/dussehra 2025/dussehra2505.jpeg",
            "../assets/dussehra 2025/dussehra2506.jpeg",
            "../assets/dussehra 2025/dussehra2507.jpeg"
        ]

    },

    dussehra2024: {

        title: "दशहरा 2024",

        images: [
            "../assets/dussehra 2024/dussehra2401.png",
            "../assets/dussehra 2024/dussehra2402.png",
            "../assets/dussehra 2024/dussehra2403.png",
            "../assets/dussehra 2024/dussehra2404.png",
            "../assets/dussehra 2024/dussehra2405.png" 
        ]

    },

    dussehra2023: {

        title: "दशहरा 2023",

        images: [
            "../assets/dussehra 2023/dussehra2301.jpeg",
            "../assets/dussehra 2023/dussehra2302.jpeg",
            "../assets/dussehra 2023/dussehra2303.jpeg",
            "../assets/dussehra 2023/dussehra2304.png",
            "../assets/dussehra 2023/dussehra2305.png",
            "../assets/dussehra 2023/dussehra2306.png",
            "../assets/dussehra 2023/dussehra2307.png",
            "../assets/dussehra 2023/dussehra2308.png",
            "../assets/dussehra 2023/dussehra2309.png",
            "../assets/dussehra 2023/dussehra2310.png"
        ]

    },

    dussehra2022: {

        title: "दशहरा 2022",

        images: [
            "../assets/dussehra 2022/dussehra2201.jpeg",
            "../assets/dussehra 2022/dussehra2202.jpeg",
            "../assets/dussehra 2022/dussehra2203.jpeg",
            "../assets/dussehra 2022/dussehra2204.jpeg"
        ]

    },

    dussehra2021: {

        title: "दशहरा 2021",

        images: [
            "../assets/dussehra 2021/dussehra2101.jpeg",
            "../assets/dussehra 2021/dussehra2102.jpeg",
            "../assets/dussehra 2021/dussehra2103.jpeg",
            "../assets/dussehra 2021/dussehra2104.jpeg",
            "../assets/dussehra 2021/dussehra2105.jpeg",
            "../assets/dussehra 2021/dussehra2106.jpeg",
            "../assets/dussehra 2021/dussehra2107.jpeg",
            "../assets/dussehra 2021/dussehra2108.jpeg",
            "../assets/dussehra 2021/dussehra2109.jpeg",
            "../assets/dussehra 2021/dussehra2110.jpeg",
            "../assets/dussehra 2021/dussehra2111.jpeg",
            "../assets/dussehra 2021/dussehra2112.jpeg",
            "../assets/dussehra 2021/dussehra2113.jpeg"           
        ]

    },

    dussehra2019: {

        title: "दशहरा 2019",

        images: [
"../assets/dussehra 2019/dussehra1901.jpeg",
"../assets/dussehra 2019/dussehra1902.jpeg",
"../assets/dussehra 2019/dussehra1903.jpeg",
"../assets/dussehra 2019/dussehra1904.jpeg",
"../assets/dussehra 2019/dussehra1905.jpeg",
"../assets/dussehra 2019/dussehra1906.jpeg",
"../assets/dussehra 2019/dussehra1907.jpeg",
"../assets/dussehra 2019/dussehra1908.jpeg",
"../assets/dussehra 2019/dussehra1909.jpeg",
"../assets/dussehra 2019/dussehra1910.jpeg",
"../assets/dussehra 2019/dussehra1911.jpeg",
"../assets/dussehra 2019/dussehra1912.jpeg",
"../assets/dussehra 2019/dussehra1913.jpeg",
"../assets/dussehra 2019/dussehra1914.jpeg",
"../assets/dussehra 2019/dussehra1915.jpeg",
"../assets/dussehra 2019/dussehra1916.jpeg",
"../assets/dussehra 2019/dussehra1917.jpeg",
"../assets/dussehra 2019/dussehra1918.jpeg",
"../assets/dussehra 2019/dussehra1919.jpeg",
"../assets/dussehra 2019/dussehra1920.jpeg",
"../assets/dussehra 2019/dussehra1921.jpeg",
"../assets/dussehra 2019/dussehra1922.jpeg",
"../assets/dussehra 2019/dussehra1923.jpeg",
"../assets/dussehra 2019/dussehra1924.jpeg",
"../assets/dussehra 2019/dussehra1925.jpeg",
"../assets/dussehra 2019/dussehra1926.jpeg",
"../assets/dussehra 2019/dussehra1927.jpeg",
"../assets/dussehra 2019/dussehra1928.jpeg",
"../assets/dussehra 2019/dussehra1929.jpeg",
"../assets/dussehra 2019/dussehra1930.jpeg",
"../assets/dussehra 2019/dussehra1931.jpeg",
"../assets/dussehra 2019/dussehra1932.jpeg",
"../assets/dussehra 2019/dussehra1933.jpeg",
"../assets/dussehra 2019/dussehra1934.jpeg",
"../assets/dussehra 2019/dussehra1935.jpeg",
"../assets/dussehra 2019/dussehra1936.jpeg",
"../assets/dussehra 2019/dussehra1937.jpeg",
"../assets/dussehra 2019/dussehra1938.jpeg",
"../assets/dussehra 2019/dussehra1939.jpeg",
"../assets/dussehra 2019/dussehra1940.jpeg",
"../assets/dussehra 2019/dussehra1941.jpeg",
"../assets/dussehra 2019/dussehra1942.jpeg",
"../assets/dussehra 2019/dussehra1943.jpeg",
"../assets/dussehra 2019/dussehra1944.jpeg",
"../assets/dussehra 2019/dussehra1945.jpeg",
"../assets/dussehra 2019/dussehra1946.jpeg",
"../assets/dussehra 2019/dussehra1947.jpeg",
"../assets/dussehra 2019/dussehra1948.jpeg",
"../assets/dussehra 2019/dussehra1949.jpeg",
"../assets/dussehra 2019/dussehra1950.jpeg",
"../assets/dussehra 2019/dussehra1951.jpeg",
"../assets/dussehra 2019/dussehra1952.jpeg",
"../assets/dussehra 2019/dussehra1953.jpeg",
"../assets/dussehra 2019/dussehra1954.jpeg",
"../assets/dussehra 2019/dussehra1955.jpeg",
"../assets/dussehra 2019/dussehra1956.jpeg",
"../assets/dussehra 2019/dussehra1957.jpeg",
"../assets/dussehra 2019/dussehra1958.jpeg",
"../assets/dussehra 2019/dussehra1959.jpeg",
"../assets/dussehra 2019/dussehra1960.jpeg",
"../assets/dussehra 2019/dussehra1961.jpeg",
"../assets/dussehra 2019/dussehra1962.jpeg",
"../assets/dussehra 2019/dussehra1963.jpeg",
"../assets/dussehra 2019/dussehra1964.jpeg",
"../assets/dussehra 2019/dussehra1965.jpeg",
"../assets/dussehra 2019/dussehra1966.jpeg",
"../assets/dussehra 2019/dussehra1967.jpeg",
"../assets/dussehra 2019/dussehra1968.jpeg",
"../assets/dussehra 2019/dussehra1969.jpeg",
"../assets/dussehra 2019/dussehra1970.jpeg",
"../assets/dussehra 2019/dussehra1971.jpeg",
"../assets/dussehra 2019/dussehra1972.jpeg",
"../assets/dussehra 2019/dussehra1973.jpeg",
"../assets/dussehra 2019/dussehra1974.jpeg",
"../assets/dussehra 2019/dussehra1975.jpeg",
"../assets/dussehra 2019/dussehra1976.jpeg",
"../assets/dussehra 2019/dussehra1977.jpeg",
"../assets/dussehra 2019/dussehra1978.jpeg",
"../assets/dussehra 2019/dussehra1979.jpeg",
"../assets/dussehra 2019/dussehra1980.jpeg",
"../assets/dussehra 2019/dussehra1981.jpeg",
"../assets/dussehra 2019/dussehra1982.jpeg",
"../assets/dussehra 2019/dussehra1983.jpeg",
"../assets/dussehra 2019/dussehra1984.jpeg",
"../assets/dussehra 2019/dussehra1985.jpeg",
"../assets/dussehra 2019/dussehra1986.jpeg",
"../assets/dussehra 2019/dussehra1987.jpeg",
"../assets/dussehra 2019/dussehra1988.jpeg",
"../assets/dussehra 2019/dussehra1989.jpeg",
"../assets/dussehra 2019/dussehra1990.jpeg",
"../assets/dussehra 2019/dussehra1991.jpeg",
"../assets/dussehra 2019/dussehra1992.jpeg",
"../assets/dussehra 2019/dussehra1993.jpeg",
"../assets/dussehra 2019/dussehra1994.jpeg",
"../assets/dussehra 2019/dussehra1995.jpeg",
"../assets/dussehra 2019/dussehra1996.jpeg",
"../assets/dussehra 2019/dussehra1998.jpeg",
"../assets/dussehra 2019/dussehra1999.jpeg",
"../assets/dussehra 2019/dussehra19100.jpeg",
"../assets/dussehra 2019/dussehra19101.jpeg",
"../assets/dussehra 2019/dussehra19102.jpeg",
"../assets/dussehra 2019/dussehra19103.jpeg",
"../assets/dussehra 2019/dussehra19104.jpeg",
"../assets/dussehra 2019/dussehra19105.jpeg",
"../assets/dussehra 2019/dussehra19106.jpeg",
"../assets/dussehra 2019/dussehra19107.jpeg",
"../assets/dussehra 2019/dussehra19108.jpeg",
"../assets/dussehra 2019/dussehra19109.jpeg",
"../assets/dussehra 2019/dussehra19110.jpeg",
"../assets/dussehra 2019/dussehra19111.jpeg",
"../assets/dussehra 2019/dussehra19112.jpeg",
"../assets/dussehra 2019/dussehra19113.jpeg",
"../assets/dussehra 2019/dussehra19114.jpeg",
"../assets/dussehra 2019/dussehra19115.jpeg",
"../assets/dussehra 2019/dussehra19116.jpeg",
"../assets/dussehra 2019/dussehra19117.jpeg",
"../assets/dussehra 2019/dussehra19118.jpeg",
"../assets/dussehra 2019/dussehra19119.jpeg",
"../assets/dussehra 2019/dussehra19120.jpeg",
"../assets/dussehra 2019/dussehra19121.jpeg",
"../assets/dussehra 2019/dussehra19122.jpeg",
"../assets/dussehra 2019/dussehra19123.jpeg",
"../assets/dussehra 2019/dussehra19124.jpeg",
"../assets/dussehra 2019/dussehra19125.jpeg",
"../assets/dussehra 2019/dussehra19126.jpeg",
"../assets/dussehra 2019/dussehra19127.jpeg",
"../assets/dussehra 2019/dussehra19128.jpeg",
"../assets/dussehra 2019/dussehra19129.jpeg",
"../assets/dussehra 2019/dussehra19130.jpeg",
"../assets/dussehra 2019/dussehra19131.jpeg",
"../assets/dussehra 2019/dussehra19132.jpeg",
"../assets/dussehra 2019/dussehra19133.jpeg",
"../assets/dussehra 2019/dussehra19134.jpeg",
"../assets/dussehra 2019/dussehra19135.jpeg",
"../assets/dussehra 2019/dussehra19136.jpeg",
"../assets/dussehra 2019/dussehra19137.jpeg",
"../assets/dussehra 2019/dussehra19138.jpeg",
"../assets/dussehra 2019/dussehra19139.jpeg",
"../assets/dussehra 2019/dussehra19140.jpeg",
"../assets/dussehra 2019/dussehra19141.jpeg",
"../assets/dussehra 2019/dussehra19142.jpeg",
"../assets/dussehra 2019/dussehra19143.jpeg",
"../assets/dussehra 2019/dussehra19144.jpeg",
"../assets/dussehra 2019/dussehra19145.jpeg",
"../assets/dussehra 2019/dussehra19146.jpeg",
"../assets/dussehra 2019/dussehra19147.jpeg",
"../assets/dussehra 2019/dussehra19148.jpeg",
"../assets/dussehra 2019/dussehra19149.jpeg",
"../assets/dussehra 2019/dussehra19150.jpeg",
"../assets/dussehra 2019/dussehra19151.jpeg",
"../assets/dussehra 2019/dussehra19152.jpeg",
"../assets/dussehra 2019/dussehra19153.jpeg",
"../assets/dussehra 2019/dussehra19154.jpeg",
"../assets/dussehra 2019/dussehra19155.jpeg"
     ]

    },

    seetaRamVivah2019: {

        title: "सीता राम विवाह 2019",

        images: [
            "../assets/sitaRamVivah 2019/SRVivaah1901.jpeg",
            "../assets/sitaRamVivah 2019/SRVivaah1902.jpeg",
            "../assets/sitaRamVivah 2019/SRVivaah1903.jpeg",
            "../assets/sitaRamVivah 2019/SRVivaah1904.jpeg",
            "../assets/sitaRamVivah 2019/SRVivaah1905.jpeg",
            "../assets/sitaRamVivah 2019/SRVivaah1906.jpeg"
        ]

    },

    dussehra2012: {

        title: "दशहरा 2012",

        images: [
            "../assets/dussehra 2012/dussehra1201.jpg",
            "../assets/dussehra 2012/dussehra1202.jpg",
            "../assets/dussehra 2012/dussehra1203.jpg",
            "../assets/dussehra 2012/dussehra1204.jpg",
            "../assets/dussehra 2012/dussehra1205.jpg",
            "../assets/dussehra 2012/dussehra1206.jpg",
            "../assets/dussehra 2012/dussehra1207.jpg",
            "../assets/dussehra 2012/dussehra1208.jpg",
            "../assets/dussehra 2012/dussehra1209.jpg",
            "../assets/dussehra 2012/dussehra1210.jpg",
            "../assets/dussehra 2012/dussehra1211.jpg",
            "../assets/dussehra 2012/dussehra1212.jpg",
            "../assets/dussehra 2012/dussehra1213.jpg",
            "../assets/dussehra 2012/dussehra1214.jpg",
            "../assets/dussehra 2012/dussehra1215.jpg",
            "../assets/dussehra 2012/dussehra1216.jpg",
            "../assets/dussehra 2012/dussehra1217.jpg",
            "../assets/dussehra 2012/dussehra1218.jpg",
            "../assets/dussehra 2012/dussehra1219.jpg",
            "../assets/dussehra 2012/dussehra1220.jpg",
            "../assets/dussehra 2012/dussehra1221.jpg",
            "../assets/dussehra 2012/dussehra1222.jpg",
            "../assets/dussehra 2012/dussehra1223.jpg",
            "../assets/dussehra 2012/dussehra1224.jpg",
            "../assets/dussehra 2012/dussehra1225.jpg",
            "../assets/dussehra 2012/dussehra1226.jpg",
            "../assets/dussehra 2012/dussehra1227.jpg",
            "../assets/dussehra 2012/dussehra1228.jpg",
            "../assets/dussehra 2012/dussehra1229.jpg",
            "../assets/dussehra 2012/dussehra1230.jpg",
            "../assets/dussehra 2012/dussehra1231.jpg",
            "../assets/dussehra 2012/dussehra1232.jpg",
            "../assets/dussehra 2012/dussehra1233.jpg",
            "../assets/dussehra 2012/dussehra1234.jpg",
            "../assets/dussehra 2012/dussehra1235.jpg",
            "../assets/dussehra 2012/dussehra1236.jpg",
            "../assets/dussehra 2012/dussehra1237.jpg",
            "../assets/dussehra 2012/dussehra1238.jpg",
            "../assets/dussehra 2012/dussehra1239.jpg",
            "../assets/dussehra 2012/dussehra1240.jpg",
            "../assets/dussehra 2012/dussehra1241.jpg",
            "../assets/dussehra 2012/dussehra1242.jpg",
            "../assets/dussehra 2012/dussehra1243.jpg",
            "../assets/dussehra 2012/dussehra1244.jpg",
            "../assets/dussehra 2012/dussehra1245.jpg",
            "../assets/dussehra 2012/dussehra1246.jpg",
            "../assets/dussehra 2012/dussehra1247.jpg",
            "../assets/dussehra 2012/dussehra1248.jpg",
            "../assets/dussehra 2012/dussehra1249.jpg",
            "../assets/dussehra 2012/dussehra1250.jpg",
            "../assets/dussehra 2012/dussehra1251.jpg",
            "../assets/dussehra 2012/dussehra1252.jpg",
            "../assets/dussehra 2012/dussehra1253.jpg",
            "../assets/dussehra 2012/dussehra1254.jpg",
            "../assets/dussehra 2012/dussehra1255.jpg",
            "../assets/dussehra 2012/dussehra1256.jpg",
            "../assets/dussehra 2012/dussehra1257.jpg",
            "../assets/dussehra 2012/dussehra1258.jpg",
            "../assets/dussehra 2012/dussehra1259.jpg",
            "../assets/dussehra 2012/dussehra1260.jpg",
            "../assets/dussehra 2012/dussehra1261.jpg",
            "../assets/dussehra 2012/dussehra1262.jpg",
            "../assets/dussehra 2012/dussehra1263.jpg",
            "../assets/dussehra 2012/dussehra1264.jpg",
            "../assets/dussehra 2012/dussehra1265.jpg",
            "../assets/dussehra 2012/dussehra1266.jpg",
            "../assets/dussehra 2012/dussehra1267.jpg",
            "../assets/dussehra 2012/dussehra1268.jpg",
            "../assets/dussehra 2012/dussehra1269.jpg",
            "../assets/dussehra 2012/dussehra1270.jpg",
            "../assets/dussehra 2012/dussehra1271.jpg",



        ]

    },
    dussehra2011: {

        title: "दशहरा 2011",

        images: [
            "../assets/dussehra 2011/dussehra1101.jpg",
            "../assets/dussehra 2011/dussehra1102.jpg",
            "../assets/dussehra 2011/dussehra1103.jpg",
            "../assets/dussehra 2011/dussehra1104.jpg",
            "../assets/dussehra 2011/dussehra1105.jpg",
            "../assets/dussehra 2011/dussehra1106.jpg",
            "../assets/dussehra 2011/dussehra1107.jpg",
            "../assets/dussehra 2011/dussehra1108.jpg",
            "../assets/dussehra 2011/dussehra1109.jpg",
            "../assets/dussehra 2011/dussehra1110.jpg",
            "../assets/dussehra 2011/dussehra1111.jpg",
            "../assets/dussehra 2011/dussehra1112.jpg",
            "../assets/dussehra 2011/dussehra1113.jpg",
            "../assets/dussehra 2011/dussehra1114.jpg",
            "../assets/dussehra 2011/dussehra1115.jpg",
            "../assets/dussehra 2011/dussehra1116.jpg",
            "../assets/dussehra 2011/dussehra1117.jpg",
            "../assets/dussehra 2011/dussehra1118.jpg",
            "../assets/dussehra 2011/dussehra1119.jpg",
            "../assets/dussehra 2011/dussehra1120.jpg",
            "../assets/dussehra 2011/dussehra1121.jpg",
            "../assets/dussehra 2011/dussehra1122.jpg",
            "../assets/dussehra 2011/dussehra1123.jpg",
            "../assets/dussehra 2011/dussehra1124.jpg",
            "../assets/dussehra 2011/dussehra1125.jpg",
            "../assets/dussehra 2011/dussehra1126.jpg",
            "../assets/dussehra 2011/dussehra1127.jpg",
            "../assets/dussehra 2011/dussehra1128.jpg",
            "../assets/dussehra 2011/dussehra1129.jpg",
            "../assets/dussehra 2011/dussehra1130.jpg",
            "../assets/dussehra 2011/dussehra1131.jpg",
            "../assets/dussehra 2011/dussehra1132.jpg",
            "../assets/dussehra 2011/dussehra1133.jpg",
            "../assets/dussehra 2011/dussehra1134.jpg",
            "../assets/dussehra 2011/dussehra1135.jpg",
            "../assets/dussehra 2011/dussehra1136.jpg",
            "../assets/dussehra 2011/dussehra1137.jpg",
            "../assets/dussehra 2011/dussehra1138.jpg",
            "../assets/dussehra 2011/dussehra1139.jpg",
            "../assets/dussehra 2011/dussehra1140.jpg",
            "../assets/dussehra 2011/dussehra1141.jpg",
            "../assets/dussehra 2011/dussehra1142.jpg",
            "../assets/dussehra 2011/dussehra1143.jpg",
            "../assets/dussehra 2011/dussehra1144.jpg",
            "../assets/dussehra 2011/dussehra1145.jpg",
            "../assets/dussehra 2011/dussehra1146.jpg",
            "../assets/dussehra 2011/dussehra1147.jpg",
            "../assets/dussehra 2011/dussehra1148.jpg",
            "../assets/dussehra 2011/dussehra1149.jpg",
            "../assets/dussehra 2011/dussehra1150.jpg",
            "../assets/dussehra 2011/dussehra1151.jpg",
            "../assets/dussehra 2011/dussehra1152.jpg",
            "../assets/dussehra 2011/dussehra1153.jpg",
            "../assets/dussehra 2011/dussehra1154.jpg",
            "../assets/dussehra 2011/dussehra1155.jpg",
            "../assets/dussehra 2011/dussehra1156.jpg",
            "../assets/dussehra 2011/dussehra1157.jpg",
            "../assets/dussehra 2011/dussehra1158.jpg",
            "../assets/dussehra 2011/dussehra1159.jpg",
            "../assets/dussehra 2011/dussehra1160.jpg",
            "../assets/dussehra 2011/dussehra1161.jpg",
            "../assets/dussehra 2011/dussehra1162.jpg",
            "../assets/dussehra 2011/dussehra1163.jpg",
            "../assets/dussehra 2011/dussehra1164.jpg",
            "../assets/dussehra 2011/dussehra1165.jpg",
            "../assets/dussehra 2011/dussehra1166.jpg",
            "../assets/dussehra 2011/dussehra1167.jpg",
            "../assets/dussehra 2011/dussehra1168.jpg",
            "../assets/dussehra 2011/dussehra1169.jpg",
            "../assets/dussehra 2011/dussehra1170.jpg",
            "../assets/dussehra 2011/dussehra1171.jpg",
            "../assets/dussehra 2011/dussehra1172.jpg",
            "../assets/dussehra 2011/dussehra1173.jpg",
            "../assets/dussehra 2011/dussehra1174.jpg",
            "../assets/dussehra 2011/dussehra1175.jpg",
            "../assets/dussehra 2011/dussehra1176.jpg",
            "../assets/dussehra 2011/dussehra1177.jpg",
            "../assets/dussehra 2011/dussehra1178.jpg",
            "../assets/dussehra 2011/dussehra1179.jpg",
            "../assets/dussehra 2011/dussehra1180.jpg",
            "../assets/dussehra 2011/dussehra1181.jpg",
            "../assets/dussehra 2011/dussehra1182.jpg",
            "../assets/dussehra 2011/dussehra1183.jpg",
            "../assets/dussehra 2011/dussehra1184.jpg",
            "../assets/dussehra 2011/dussehra1185.jpg",
            "../assets/dussehra 2011/dussehra1186.jpg",
            "../assets/dussehra 2011/dussehra1187.jpg",
            "../assets/dussehra 2011/dussehra1188.jpg",
            "../assets/dussehra 2011/dussehra1189.jpg",
            "../assets/dussehra 2011/dussehra1190.jpg",
            "../assets/dussehra 2011/dussehra1191.jpg",
            "../assets/dussehra 2011/dussehra1192.jpg",
            "../assets/dussehra 2011/dussehra1193.jpg",
            "../assets/dussehra 2011/dussehra1194.jpg",
            "../assets/dussehra 2011/dussehra1195.jpg",
            "../assets/dussehra 2011/dussehra1196.jpg",
            "../assets/dussehra 2011/dussehra1198.jpg",
            "../assets/dussehra 2011/dussehra1199.jpg",
            "../assets/dussehra 2011/dussehra11100.jpg",
            "../assets/dussehra 2011/dussehra11101.jpg",
            "../assets/dussehra 2011/dussehra11102.jpg",
            "../assets/dussehra 2011/dussehra11103.jpg",
            "../assets/dussehra 2011/dussehra11104.jpg",
            "../assets/dussehra 2011/dussehra11105.jpg",
            "../assets/dussehra 2011/dussehra11106.jpg",
            "../assets/dussehra 2011/dussehra11107.jpg",
            "../assets/dussehra 2011/dussehra11108.jpg",
            "../assets/dussehra 2011/dussehra11109.jpg",
            "../assets/dussehra 2011/dussehra11110.jpg",
            "../assets/dussehra 2011/dussehra11111.jpg",
            "../assets/dussehra 2011/dussehra11112.jpg",
            "../assets/dussehra 2011/dussehra11113.jpg",
            "../assets/dussehra 2011/dussehra11114.jpg",
            "../assets/dussehra 2011/dussehra11115.jpg",
            "../assets/dussehra 2011/dussehra11116.jpg",
            "../assets/dussehra 2011/dussehra11117.jpg",
            "../assets/dussehra 2011/dussehra11118.jpg",
            "../assets/dussehra 2011/dussehra11119.jpg",
            "../assets/dussehra 2011/dussehra11120.jpg",
            "../assets/dussehra 2011/dussehra11121.jpg",
            "../assets/dussehra 2011/dussehra11122.jpg",
            "../assets/dussehra 2011/dussehra11123.jpg",
            "../assets/dussehra 2011/dussehra11124.jpg",
            "../assets/dussehra 2011/dussehra11125.jpg",
            "../assets/dussehra 2011/dussehra11126.jpg",
            "../assets/dussehra 2011/dussehra11127.jpg",
            "../assets/dussehra 2011/dussehra11128.jpg",
            "../assets/dussehra 2011/dussehra11129.jpg",
            "../assets/dussehra 2011/dussehra11130.jpg",
            "../assets/dussehra 2011/dussehra11131.jpg",
            "../assets/dussehra 2011/dussehra11132.jpg",
            "../assets/dussehra 2011/dussehra11133.jpg",
            "../assets/dussehra 2011/dussehra11134.jpg",
            "../assets/dussehra 2011/dussehra11135.jpg",
            "../assets/dussehra 2011/dussehra11136.jpg",
            "../assets/dussehra 2011/dussehra11137.jpg",
            "../assets/dussehra 2011/dussehra11138.jpg",
            "../assets/dussehra 2011/dussehra11139.jpg",
            "../assets/dussehra 2011/dussehra11140.jpg",
            "../assets/dussehra 2011/dussehra11141.jpg",
            "../assets/dussehra 2011/dussehra11142.jpg",
            "../assets/dussehra 2011/dussehra11143.jpg",
            "../assets/dussehra 2011/dussehra11144.jpg",
            "../assets/dussehra 2011/dussehra11145.jpg",
            "../assets/dussehra 2011/dussehra11146.jpg",
            "../assets/dussehra 2011/dussehra11147.jpg",
            "../assets/dussehra 2011/dussehra11148.jpg",
            "../assets/dussehra 2011/dussehra11149.jpg",
            "../assets/dussehra 2011/dussehra11150.jpg"
        ]

    }

};


/* ── LIGHTBOX STATE ── */
const lightbox   = document.getElementById('lightbox');
const lbImg      = document.getElementById('lbImg');
const lbTitle    = document.getElementById('lbTitle');
const lbCounter  = document.getElementById('lbCounter');
const lbPrev     = document.getElementById('lbPrev');
const lbNext     = document.getElementById('lbNext');
const lbBack     = document.getElementById('lbBack');
const lbClose    = document.getElementById('lbClose');
const lbAutoplay = document.getElementById('lbAutoplay');
const lbThumbStrip = document.getElementById('lbThumbStrip');
const lbLoopNotice = document.getElementById('lbLoopNotice');

let currentImages = [];
let currentIdx    = 0;
let autoplayTimer = null;
let isPlaying     = false;

function openLightbox(galleryKey) {
  const data = galleryData[galleryKey];
  if (!data) return;
  currentImages = data.images;
  currentIdx    = 0;
  lbTitle.textContent = data.title;
  buildThumbs();
  showImage(0);
  lightbox.classList.add('show');
  document.body.style.overflow = 'hidden';
  lbImg.focus();
}

function closeLightbox() {
  lightbox.classList.remove('show');
  document.body.style.overflow = '';
  stopAutoplay();
}

function showImage(idx) {
  currentIdx = (idx + currentImages.length) % currentImages.length;
  lbImg.classList.add('fading');
  setTimeout(() => {
    lbImg.src = currentImages[currentIdx];
    lbImg.alt = lbTitle.textContent + ' — Photo ' + (currentIdx + 1);
    lbImg.classList.remove('fading');
  }, 200);
  lbCounter.textContent = (currentIdx + 1) + ' / ' + currentImages.length;
  lbPrev.disabled = false;
  lbNext.disabled = false;
  updateThumbs();
}

function buildThumbs() {
  lbThumbStrip.innerHTML = '';
  currentImages.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src; img.alt = ''; img.className = 'lb-thumb' + (i === 0 ? ' active' : '');
    img.setAttribute('role', 'listitem');
    img.addEventListener('click', () => showImage(i));
    lbThumbStrip.appendChild(img);
  });
}

function updateThumbs() {
  const thumbs = lbThumbStrip.querySelectorAll('.lb-thumb');
  thumbs.forEach((t, i) => t.classList.toggle('active', i === currentIdx));
  const active = thumbs[currentIdx];
  if (active) active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
}

function showLoopNotice() {
  lbLoopNotice.classList.add('show');
  setTimeout(() => lbLoopNotice.classList.remove('show'), 1800);
}

function nextImage() {
  const wasLast = currentIdx === currentImages.length - 1;
  showImage(currentIdx + 1);
  if (wasLast) showLoopNotice();
}

function prevImage() {
  showImage(currentIdx - 1);
}

function startAutoplay() {
  isPlaying = true;
  lbAutoplay.classList.add('playing');
  lbAutoplay.innerHTML = '<i class="fa-solid fa-pause" aria-hidden="true"></i> Pause';
  lbAutoplay.setAttribute('aria-pressed', 'true');
  autoplayTimer = setInterval(nextImage, 3000);
}

function stopAutoplay() {
  isPlaying = false;
  clearInterval(autoplayTimer);
  lbAutoplay.classList.remove('playing');
  lbAutoplay.innerHTML = '<i class="fa-solid fa-play" aria-hidden="true"></i> Auto Slide';
  lbAutoplay.setAttribute('aria-pressed', 'false');
}

lbBack.addEventListener('click', closeLightbox);
lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', prevImage);
lbNext.addEventListener('click', nextImage);
lbAutoplay.addEventListener('click', () => isPlaying ? stopAutoplay() : startAutoplay());

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('show')) return;
  if (e.key === 'ArrowRight') nextImage();
  else if (e.key === 'ArrowLeft') prevImage();
  else if (e.key === 'Escape') closeLightbox();
});

/* ── CARD CLICK → OPEN LIGHTBOX ── */
document.querySelectorAll('.gallery-card').forEach(card => {
  const handler = () => openLightbox(card.dataset.gallery);
  card.addEventListener('click', handler);
  card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); } });
});

/* ── SEARCH & FILTER ── */
const searchInput  = document.getElementById('searchInput');
const chips        = document.querySelectorAll('.chip');
const cards        = document.querySelectorAll('.gallery-card');
const emptyState   = document.getElementById('emptyState');
const resultsCount = document.getElementById('resultsCount');

let activeFilter = 'all';
let searchQuery  = '';

function applyFilters() {
  let visible = 0;
  cards.forEach(card => {
    const year   = card.dataset.year || '';
    const tags   = (card.dataset.tags || '').toLowerCase();
    const title  = (card.dataset.title || '').toLowerCase();
    const matchFilter = activeFilter === 'all' || year === activeFilter || (activeFilter === 'older' && card.dataset.year === 'older');
    const matchSearch = !searchQuery || tags.includes(searchQuery) || title.includes(searchQuery);

    if (matchFilter && matchSearch) {
      card.style.display = '';
      visible++;
    } else {
      card.style.display = 'none';
    }
  });
  emptyState.style.display = visible === 0 ? 'block' : 'none';
  resultsCount.textContent = visible + ' संग्रह';
}

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    activeFilter = chip.dataset.filter;
    applyFilters();
  });
});

searchInput.addEventListener('input', () => {
  searchQuery = searchInput.value.toLowerCase().trim();
  applyFilters();
});

/* ── FADE-UP ON SCROLL ── */
const fadeEls = document.querySelectorAll('.fade-up');
const fadeObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); fadeObs.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
fadeEls.forEach(el => fadeObs.observe(el));

/* ── REDUCED MOTION ── */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible'));
}
