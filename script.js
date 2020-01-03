var animation = bodymovin.loadAnimation({
  container: document.getElementById('auto-start'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'scripts/auto-start.json'
})

var animation = bodymovin.loadAnimation({
  container: document.getElementById('battery-optimization'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'scripts/battery-optimization.json'
})

var animation = bodymovin.loadAnimation({
  container: document.getElementById('bluetooth'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'scripts/bluetooth.json'
})

var animation = bodymovin.loadAnimation({
  container: document.getElementById('bluetooth-error'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'scripts/bluetooth-error.json'
})

var animation = bodymovin.loadAnimation({
  container: document.getElementById('car-scan'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'scripts/car-scan.json'
})

var animation = bodymovin.loadAnimation({
  container: document.getElementById('location'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'scripts/location.json'
})

var animation = bodymovin.loadAnimation({
  container: document.getElementById('no-internet'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'scripts/no-internet.json'
})

var animation = bodymovin.loadAnimation({
  container: document.getElementById('hopper-logo-animation'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'scripts/hopper-logo.json'
})

var animation = bodymovin.loadAnimation({
  container: document.getElementById('blt-search'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'scripts/bluetooth-search.json'
})

var animation = bodymovin.loadAnimation({
  container: document.getElementById('hopper-loading'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'scripts/hopper-loading.json'
})

var animation = bodymovin.loadAnimation({
  container: document.getElementById('hopper-logo-car'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'scripts/hopper-logo-car.json'
})

document.querySelectorAll("[x-filter]").forEach((e) => {
    const filter = e.getAttribute("x-filter")
    e.onclick = () => {
        document.querySelectorAll("[x-filter]").forEach((x) => x.className = "")
        e.className = "active"
        
        document.querySelectorAll("[x-hide]").forEach((h) => h.setAttribute("x-hide", "true"))
        setTimeout(() => {
            document.querySelectorAll("[x-hide='true']").forEach((h) => h.style = "display: none;")
            if(filter) {
                document.querySelectorAll("[x-hide]")
                    .forEach((h) =>{ 
                        if(h.className.includes(filter)) {
                            h.style = ""
                            h.setAttribute("x-hide", "false")
                        }
                    })
            } else {
                //all
                document.querySelectorAll("[x-hide]").forEach((h) => {
                    h.style = ""
                    h.setAttribute("x-hide", "false")   
                })
            }
        }, 400);
    }
})

window.__forceSmoothScrollPolyfill__ = true;
const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
const anchor = window.location.hash.replace("#", "");
const anchorElement = document.querySelector("[x-anchor='"+anchor+"']")
if(anchorElement) anchorElement.scrollIntoView({behavior: "smooth", block: "center"})



