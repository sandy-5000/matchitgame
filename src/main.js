let n = 12 * 2

const shuffle = (a) => {
    let tmp = null
    for (let i = a.length - 1; i > 0; --i) {
        let j = Math.floor(Math.random() * (i + 1))
        tmp = a[i]
        a[i] = a[j]
        a[j] = tmp
    }
    return a
}

let count = 0
let prev = ''
let finals = 0
let timeInterval = null

function show(index) {

    const span = document.getElementById('moves')
    span.innerText = +span.innerText + 1

    const flip = document.getElementById('flip-' + index)
    const curName = flip.getAttribute('name')

    ++count
    if (count == 3) {
        count = 1
        hideAll()
        prev = ''
    }

    if (curName == prev) {
        prev = ''
        const x = document.querySelectorAll(`div[name="${curName}"]`)
        for (const element of x) {
            element.setAttribute('final', 'true')
        }
        finals += 2
        if (finals == n && timeInterval) {
            clearInterval(timeInterval)
        }
    } else {
        prev = curName
    }

    flip.style.transform = 'rotateY(180deg)'
    setTimeout(() => {
        flip.style.transform = 'none'
    }, 400)
    const back = document.getElementById('back-' + index)
    back.style.display = 'none'
    const front = document.getElementById('front-' + index)
    front.style.display = 'block'

}

function hideAll() {
    for (let i = 0; i < n; ++i) {
        const flip = document.getElementById('flip-' + i)
        const front = document.getElementById('front-' + i)
        if (front.style.display == 'none' || flip.getAttribute('final') == 'true') {
            continue
        }
        flip.style.transform = 'rotateY(180deg)'
        setTimeout(() => {
            flip.style.transform = 'none'
        }, 500)
        front.style.display = 'none'
        const back = document.getElementById('back-' + i)
        back.style.display = 'block'
    }
}

function runTimer() {
    const timer = document.getElementById('timer')
    let timerCounter = 0
    timeInterval = setInterval(() => {
        ++timerCounter
        const mins = (Math.floor(timerCounter / 60) + '').padStart(2, '0')
        const secs = (Math.floor(timerCounter % 60) + '').padStart(2, '0')
        timer.innerText = mins + ':' + secs
    }, 1000)
}

function countDown() {
    let counter = 2
    let msgs = ['', 'Start', 'Ready']
    let timer = setInterval(() => {
        let countdown = document.getElementById('countdown')
        if (countdown) {
            countdown.remove()
        }
        countdown = document.createElement('span')
        countdown.setAttribute('id', 'countdown')
        countdown.innerText = msgs[counter]
        const countWrapper = document.getElementById('count-wrapper')
        countWrapper.appendChild(countdown)
        setTimeout(() => {
            if (counter > -1) {
                if (window.innerWidth < 768) {
                    countdown.style = 'font-size: 30vw; opacity: 0; z-index: 10;'
                } else {
                    countdown.style = 'font-size: 15vw; opacity: 0; z-index: 10;'
                }
            }
        }, 50)
        counter--
        if (counter == -1) {
            clearInterval(timer)
        }
    }, 1000)
}

function generate() {
    const x = document.getElementById('box')
    let innerDiv = ''
    const imagePath = '/images/'
    let images = new Array(n).fill(0)
    for (let i = 0; i < n; ++i) {
        let image = 'image_' + Math.floor(i / 2 + 1) + '.png'
        images[i] = image
    }
    images = shuffle(images)
    for (let i = 0; i < n; ++i) {
        innerDiv += `
        <div class="flip-card a-center">
            <div class="flip-card-inner" id="flip-${i}" name="${images[i]}" final="false">
                <div class="f-card back bg-dark" id="back-${i}" style="display: none;" onclick="show(${i})"> 
                </div>
                <div class="f-card front" id="front-${i}" style="background-image: url('${imagePath}${images[i]}');">
                </div>
            </div>
        </div>
        `
    }
    x.innerHTML = innerDiv

    setTimeout(() => {
        countDown()
        setTimeout(() => {
            hideAll()
            runTimer()
        }, 9000)
    }, 1000)
}

document.addEventListener("DOMContentLoaded", () => {
    generate()
})
