export default function(containerElement) {
    let isDown = false
    let startX
    let scrollLeft

    if (!containerElement) return console.error('element not exist')

    // Mouse down
    containerElement.addEventListener('mousedown', e => {
        isDown = true
        containerElement.classList.add('active')
        startX = e.pageX - containerElement.offsetLeft
        scrollLeft = containerElement.scrollLeft
        return
    })

    // Mouse leave
    containerElement.addEventListener('mouseleave', () => {
        isDown = false
        containerElement.classList.remove('active')
        return
    })

    // Mouse up
    containerElement.addEventListener('mouseup', () => {
        isDown = false
        containerElement.classList.remove('active')
        return
    })

    // Mouse move
    containerElement.addEventListener('mousemove', e => {
        if (!isDown) return
        e.preventDefault()
        const x = e.pageX - containerElement.offsetLeft
        const walk = (x - startX) * 2
        containerElement.scrollLeft = scrollLeft - walk
        return
    })
}
