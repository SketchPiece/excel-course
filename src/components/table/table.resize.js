import {$} from '@core/dom'

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const $pearent = $resizer.closest('[data-type="resizable"]')
  const coords = $pearent.getCoords()
  const type = $resizer.data.resize
  const sideProp = type === 'col' ? 'bottom' : 'right'
  let value
  $resizer.css({
    opacity: 1,
    [sideProp]: '-5000px'
  })
  const cells = $root.findAll(`[data-col="${$pearent.data.col}"]`)

  document.onmousemove = e => {
    if (type === 'col') {
      const delta = e.pageX - coords.right
      value = coords.width + delta
      $resizer.css({right: -delta + 'px'})
    } else {
      const delta = e.pageY - coords.bottom
      value = coords.height + delta
      $resizer.css({bottom: -delta + 'px'})
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
    if (type === 'col') {
      $pearent.css({width: value + 'px'})
      cells.forEach(el => $(el).css({width: value + 'px'}))
    } else {
      $pearent.css({height: value + 'px'})
    }

    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0
    })
  }
}
